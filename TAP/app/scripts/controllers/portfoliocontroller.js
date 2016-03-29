// Code goes here

//'use strict';
app.controller("portfolioCtrl", function ($location, $timeout, $routeParams, clientService) {

    var ctrl = this;
    this.name = clientService.getName();
    ctrl.displayitems = [];
    ctrl.pagecount = 1;
    ctrl.totalpagecount = 0;

    if (angular.isDefined($routeParams.id)) {
        loadClientPortfolio($routeParams.id);
    }

    this.showAmountsByGrade = function (clientId) {
        $location.path("/amountsByGrade/" + clientId); 
    };

    /*if (angular.isDefined($routeParams.id)) {
        loadClientPortfolio($routeParams.id);
    }

    this.showAmountsByGrade = function (clientId) {
        $location.path("/amountsByGrade/" + clientId);
    };*/

    this.showARR = function (id) {
        $location.path("/arr/" + id);
    };

    this.showDataTable = function (id) {
        $location.path("/dataTable/" + id);
    };

    this.backToClientDashBoard = function (id) {
        $location.path("/portfolio/" + id);
    };

    this.backToAllClients = function () {
        $location.path("/");
    };

    this.donutColours = ['#adebeb', '#32cdcd', '#28a4a4', ' #196767', '#0f3e3e'];

    this.setValues = function () {

        this.donutModel = [{
            name: 'A',
            value: getTotalLoanBasedOnGrade('A')
    }, {
            name: 'B',
            value: getTotalLoanBasedOnGrade('B')
    }, {
            name: 'C',
            value: getTotalLoanBasedOnGrade('C')
    }, {
            name: 'D',
            value: getTotalLoanBasedOnGrade('D')
    }, {
            name: 'E',
            value: getTotalLoanBasedOnGrade('E')
    }];

    };

    $timeout(function timeout() {

        // Initialise after a second to simulate an AJAX request.
        //this.setValues();

    }, 3000);

    this.selectedModel = {};
    /**
     * @method random
     * @return {Number}
     */
    this.random = function random() {
        /* alert("dfsfsdfsd "+Math.random());
        alert("value :  "+Math.round(Math.random() * 100)); */
        return Math.round(Math.random() * 100);
    };
    this.openTooltip = function (model) {
        this.selectedModel = model;
        /*        console.log(this.selectedModel);
                console.log(model);*/
    };
    /**
     * @method closeTooltip
     * @return {void}
     */
    this.closeTooltip = function () {
        this.selectedModel = {};
    };

    function loadClientPortfolio(clientId) {
        clientService.getClientById(clientId).promise.then(function (response) {
           /* console.log('response:' + response);*/
            ctrl.clientPortfolio = createPortfolio(response.data[0].value);
            ctrl.clientIdenticalGrades = ctrl.getIdenticalGrades(ctrl.clientPortfolio.value.dataTable);
            ctrl.clientLoans = ctrl.clientPortfolio.value.dataTable;
            ctrl.clientallitems = ctrl.clientPortfolio.value.dataTable.reverse();
            ctrl.totalpagecount = (ctrl.clientallitems.length / 10);
            ctrl.paggingdata(ctrl.pagecount);
            ctrl.setValues();
        }, function (errReponse) {
            console.error('Error while getting the client portfolio');
            ctrl.portfolio = null;
           
        });
    }
     this.paggingdata = function (itemnumber) {
                /*alert("sfsdfsdf : " + itemnumber);*/
                ctrl.pagecount = itemnumber;
                ctrl.displayitems = [];
                var j = itemnumber * 10;
                var x = j - 10;
                for (var i = x; i < j; i++) {
                    ctrl.displayitems[i] = ctrl.clientallitems[i];
                }
                /*ctrl.displayitems = ctrl.displayitemsarray;*/
                /*console.log(ctrl.displayitems);*/
            }

    function createPortfolio(doc) {
        var totalPortofolioAmount = 0;
        var investedAmount = 0;
        var dataArray = [];
        if (doc.portfolio) { 
            for (var index=0; index < doc.portfolio.length; index++) {
                var portfolio = doc.portfolio[index];
                investedAmount = investedAmount + portfolio.loanAmount * portfolio.ownershipShare;
                if (portfolio.totalPayments) {

                for (var i = 0; i < portfolio.totalPayments.length; i++) {
                var payment = portfolio.totalPayments[i];
                    totalPortofolioAmount = totalPortofolioAmount + payment;
                }
            }
            }
        }
        var totalReturn = totalPortofolioAmount - investedAmount;
        var arrValue = Math.round((totalReturn / investedAmount) * 10000) / 100;
        var record = {
            clientId: doc._id,
            clientName: doc.firstName + ' ' + doc.lastName,
            totalAssets: Math.round(totalPortofolioAmount * 100) / 100,
            investedAmount: investedAmount,
            cash: doc.assetsToInvest,
            investingObjective: doc.investingObjective,
            arr: arrValue + "%",
            dataTable: doc.portfolio
        }
        return {
            key: doc._id,
            value: record
        };
    }
    this.getIdenticalGrades = function (loans) {
        var identicalGrades = [];
        for (var i = 0; i < loans.length; i++) {
            var grade = this.getGrade(loans[i].grade);
            if (identicalGrades.indexOf(grade) < 0) {
                identicalGrades.push(grade);
            }
        }

        /* console.dir(identicalGrades);*/

        return identicalGrades;
    }

    function getTotalLoanBasedOnGrade(grade) {
        var total = 0;

        for (var i = 0; i < ctrl.clientLoans.length; i++) {
            var loan = ctrl.clientLoans[i];
            if (loan.grade.indexOf(grade) >= 0) {
                total += loan.loanAmount;
            }
        }
        /* console.log(total.toString());*/
        return total;
    }

    this.getGrade = function (strGrade) {
        if (strGrade != null && strGrade.length > 0) {
            /* console.log(strGrade.substring(0, 1));*/
            return strGrade.substring(0, 1);
        }
        return "";
    }
});