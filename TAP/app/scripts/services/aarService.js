//'use strict';

app.factory('arrService', function($q){

	
function calculate_ARR(totalPrincipalPaid, totalInterestPaid, numPeriods) {
    if (typeof numPeriods !== 'undefined') {
        numPeriods = 12;
    }
    /**
    Input: totalPrincipalPaid (float), totalInterestPaid (float), numPeriods (int, default to 12 periods)
    Output: float
    Desc: this function will take as input the total amount of itnerest and principal and return
        the Annualized Rate of Return (ARR). The default number of periods is 12 since we are taking the 
        'annualized' rate. 
    ''' **/
    
    return ((totalPrincipalPaid + totalInterestPaid) / totalPrincipalPaid ) * (numPeriods);
 }

 function get_loan_ARR(loan) {
 	/*
    '''
    Input: loan (dict)
    Output: annualizedRateOfReturn (dict)
    Desc: this function will take as input the a single loan and calculate the total amount 
        of interest and principal paid as well as the ARR and insert a new key into the loan dict.
        This will allow for easier calculations of total portfolio ARR.
    '''       
    */
    // weight the loanAmount and the installment by how much is invested in it
    var loanAmount = loan['loanAmount'] * loan['ownershipShare']
    var installment = loan['installment'] * loan['ownershipShare']
    var numTotalPayments = loan['term']
    var allExpectedPayments = installment * numTotalPayments
    var allExpectedInterest = allExpectedPayments - loanAmount
    // calculate what proportion of the apyment foes to principal
    var prncpProportion = allExpectedInterest / allExpectedPayments
    // calculate what proportion of the apyment foes to principal
    var intProportion = 1 - prncpProportion
    var totalPayments = loan['totalPayments'].reduce(function(pv, cv) { return pv + cv; }, 0);
    var numPaymentsMade = loan['totalPayments'].length;

    // apply interest payments first
    var requiredInterest = (numPaymentsMade / numTotalPayments) * allExpectedInterest;
    // if the requried interest payment is made then apply the remaining payment to the principal
    var prncpPaid;
    var intPaid;
    if (totalPayments > requiredInterest) {
        prncpPaid = totalPayments - requiredInterest
        intPaid = requiredInterest
    }
    else {
        prncpPaid = 0
        intPaid = totalPayments
    }

    // use this data structure to make future ARR computations easy
    return {'currentARR': calculate_ARR(prncpPaid, intPaid),
            'totalInterestPaid': intPaid,
            'totalPrincipalPaid': prncpPaid};
  }

function get_client_ARR(clientDocument) {
    /**'''
    Input: clientDocument (dict) as a json like object
    Output: annualizedRateOfReturn (float)
    Desc: this function will take as input the a single a single client document as then loop over the
        loans in the porfolio to calculate the overall ARR for the portfolio. The function takes
        a weighted average of the individual loan ARRs where the weighting is determined by how much
        money is invested in each loan. Right now, the default is 25.0 but a more sophisticated model
        may adjust the amount according to some stratedgy.
    '''    **/
    
    //arrs = []
    var sum = 0;
    if (clientDocument['portfolio']) {
    for (var index = 0; index < clientDocument.portfolio.length; index++) {  
        var loan = clientDocument.portfolio[index];
        loan['annualizedRateOfReturn'] = get_loan_ARR(loan);
        var loanARR = loan['annualizedRateOfReturn']['currentARR'];
        var loanWeighting = Math.round(loan['ownershipShare'] * loan['loanAmount']) / clientDocument['assetsInvested']
        //arrs.append((loanARR, loanWeighting))
        sum += loanARR * loanWeighting;
    }
   }
    
    // return the sum of all the individual arrs weighted by the amount invested in each loan
    // this is the overall ARR for a clients portfolio
    //return sum([entry[0] * entry[1] for entry in arrs]) ;
     return Math.round(sum * 100) / 100;
    } 
 	
 	return {


        getClientARR : function (clientDoc) {
            return get_client_ARR(clientDoc);
        }
 	}
});

