// Code goes here

//'use strict';
app.controller("mainCtrl", function ($scope, $location, $q, clientService, arrService) {

    var ctrl = this;
    var data;
    $scope.minAssetFilterOptions = clientService.getMinTotalAssetsFilterOptions();
    $scope.maxAssetFilterOptions = clientService.getMaxTotalAssetsFilterOptions();
    $scope.investmentObjectiveOpt = clientService.getInvestmentObjectOptions();
    $scope.investmentDeadlineOpt = clientService.getRetirementObject();

    this.sortType = 'firstName'; // set the default sort type
    this.sortReverse = false;
    this.clientAdded = false;
    this.name = clientService.getName();
    // set the default sort type
    loadClientData();

    this.retirementobj = clientService.getRetirementObject();

    this.investmentObj = clientService.getInvestmentObject();

    this.showPortfolio = function (client) {
        $location.path("/portfolio/" + client.key);
    };

    $scope.clientFilter = function (client) {
        var valid = true;
        if ($scope.selectedMinAssetFilter) {
            valid = client.value.sum >= $scope.selectedMinAssetFilter;
        }

        if (valid && $scope.selectedMaxAssetFilter) {
            valid = client.value.sum <= $scope.selectedMaxAssetFilter;
        }
        if (valid && $scope.selectedObjective) {
            valid = (client.value.investingObjective.objective == $scope.selectedObjective);
        }
        if (valid && $scope.selectedDeadline) {
            valid = (client.value.investingObjective.investingDeadline == $scope.selectedDeadline);
        }
        return valid;
    };

    this.delete = function (doc) {
        clientService.deleteDocument(doc.value).then(function (response) {
            loadClientData();
        }, function (errReponse) {
            console.error('Error while getting the Client portfolio');
            this.clients = null;
        });
    };

    this.NewClient = function () {
        $location.path("/NewClient");
    };

    function loadClientData() {
        clientService.getClient().then(function (response) {
            calculateobj(response.data).then(function (reply) {
                ctrl.clients = reply;
            });
        }, function (errReponse) {
            console.error('Error while getting the Client portfolio');
            this.clients = null;
        });
    }

    function calculateobj(data) {
        var promises = [];
        var values = [];
        angular.forEach(data, function (dataobj) {
            dataobj.value.total = dataobj.value.assetsInvested + dataobj.value.assetsToInvest;
            if (dataobj.value.returns) {
                dataobj.value.arr = dataobj.value.returns[dataobj.value.returns.length - 1];
            } else {
                dataobj.value.arr = 0;
            }
            values.push(dataobj);
            //promises.push(clientService.getClientById(dataobj.value._id).promise);
        });
        /*  $q.all(promises).then(function (results) {

              for (var index = 0; index < results.length; index++) {
                  console.log(results[index]);
                  var dataobj = results[index].data[0];
                  dataobj.value.sum = dataobj.value.assetsInvested + dataobj.value.assetsToInvest;

                  var totalPortofolioAmount = 0;
                  for (var portfolio of dataobj.value.portfolio) {
                      for (var payment of portfolio.totalPayments) {
                          totalPortofolioAmount = totalPortofolioAmount + payment;
                      }
                  }
                  values.push(dataobj);
                  dataobj.value.arr = arrService.getClientARR(dataobj.value);
                  console.log();
                  dataobj.value.total = Math.round((totalPortofolioAmount + dataobj.value.assetsToInvest) * 100) / 100;


              }
          });*/

        return $q.when(values);
    }
    this.Validalpha = function (alpha, word) {
        var filter = /^[a-zA-Z\s]*$/
        if (!filter.test(alpha) && alpha !== "" && alpha !== null) {
            if (word == 'Fname') {
                this.isfalphaerror = true;
                this.falphaerrormessage = "Please provide alphabets only ";
                this.isAlphaerror = false;
            } else if (word == 'Lname') {
                this.islalphaerror = true;
                this.lalphaerrormessage = "Please provide alphabets only ";
                this.isAlphaerror = false;

            }
        } else {
            if (word == 'Fname') {
                this.isfalphaerror = false;
                this.falphaerrormessage = "";
            }
            if (word == 'Lname') {
                this.islalphaerror = false;
                this.lalphaerrormessage = "";
            }
            this.isAlphaerror = true;
        }
    }
    this.Verifyemail = function (email) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z\-])+\.)+([a-zA-Z]{2,4})+$/;
        if ((!filter.test(email)) && email !== "" && email !== null) {
            this.isemailerror = true;
            this.emailerrormessage = "Please provide valid email address";
            //alert("wrong email");
            this.ismailerror = false;
        } else {
            this.isemailerror = false;
            this.emailerrormessage = "";
            this.ismailerror = true;
        }


    }
    this.Validatenumber = function (curr) {
        var filter = /^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i; ///^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
        if ((!filter.test(curr)) && curr !== '' && curr !== null) {
            this.iscurerror = true;
            //$scope.errormessage = " Please provide valid Emergency Contact Email address";
            this.Currerrormessage = "Please provide numbers only";
            //alert("wrong email");
            this.iscurrencyerror = false;

        } else {
            this.iscurerror = false;
            this.Currerrormessage = "";
            this.iscurrencyerror = true;
        }
    }
    this.reset = function () {
        this.isfalphaerror = false;
        this.falphaerrormessage = "";
        this.islalphaerror = false;
        this.lalphaerrormessage = "";
        this.isAlphaerror = true;
        this.isemailerror = false;
        this.emailerrormessage = "";
        this.ismailerror = true;
        this.iscurerror = false;
        this.Currerrormessage = "";
        this.iscurrencyerror = true;
        this.FirstName = "";
        this.LastName = "";
        this.Email = "";
        this.investmentObjective = [];
        this.retirement = [];
        this.Amount = "";

    }

    var onSuccess = function onSuccess(response) {
        loadClientData();
        /* this.resetNewClient();*/
        //$location.path("/portfolio/" + response.data.id);
        alert("Success! Client added successfully...");
        console.log(response);
    };

    var onFailure = function onFailure(response) {
        console.log(response);
    };

   /* this.resetNewClient = function () {
            this.FirstName = "";
            this.LastName = "";
            this.Email = "";
            this.investingObjective = [];
            this.retirement = [];
            this.Amount = "";
             this.FirstName = {};
             this.LastName = {};
             this.Email = {}; 
             this.investingObjective = {};
             this.retirement = {};
             this.Amount = {};
        }*/
        /*this.getresult = function (data) {
            this.data="up";
            return data;
        }*/
    this.saveClient = function () {
        var investObject = {};
        var riskTolerance = {};

        var clientData = {
            firstName: this.FirstName,
            lastName: this.LastName,
            Email: this.Email,
            assetsToInvest: this.Amount,
            assetsInvested: 0,
            portfolio: [],
            investingObjective: {
                objective: this.investmentObjective,
            }
        };
        console.log("Outside:" + this.retirement);

        if (this.retirement) {
            console.log("Inside:" + this.retirement);
            clientData.investingObjective.investingDeadline = this.retirement;
        }
        clientData.riskTolerance = clientService.getRiskTolerance(clientData.investingObjective)
        clientService.saveClient(clientData).then(onSuccess, onFailure);
        ctrl.clientAdded = true;
        loadClientData();
        this.reset();
    };
    // this.init();
});

//This controller will populates the data from service show it in datatable.html
app.controller("dataTableCtrl", function ($routeParams, clientService, $location) {
    /*var portfolioctroller = $controller('portfolioCtrl')
    var data = 2;*/
    // portfolioctroller.paggingdata(data)

    var ctrl = this;
    this.name = clientService.getName();

    loadDataTable($routeParams.id);
    ctrl.displayitems = [];
    ctrl.pagecount = 1;
    ctrl.totalpagecount = 0;

    this.backToClientDashBoard = function (id) {
        $location.path("/portfolio/" + id);
    };

    function loadDataTable(clientId) {
        clientService.getClientById(clientId).promise.then(function (resp) {
            var clientDoc = resp.data[0].value;
            ctrl.client = createDataTable(clientDoc);
            console.log(ctrl.client);
            ctrl.clientallitems = ctrl.client.value.dataTable.reverse();
            ctrl.totalpagecount = Math.ceil(ctrl.client.value.dataTable.length / 15);
            console.log(ctrl.clientallitems[0]);
            ctrl.paggingdata(ctrl.pagecount);
        }, function (errReponse) {
            console.error('Error while getting the data table');
            ctrl.client = null;
        });
    };


    //
    this.paggingdata = function (itemnumber) {
        /*alert("sfsdfsdf : " + itemnumber);*/
        ctrl.pagecount = itemnumber;
        ctrl.displayitems = [];
        var j = itemnumber * 15;
        var x = j - 15;
        if (j > ctrl.client.value.dataTable.length) {
            j = ctrl.client.value.dataTable.length;
        }
        var temparr = [];
        var index = 0;
        for (var i = x; i < j; i++) {

            temparr[index++] = ctrl.clientallitems[i];
        }
        ctrl.displayitems = temparr;

        /*ctrl.displayitems = ctrl.displayitemsarray;*/
        /*console.log(ctrl.displayitems);*/
    }
    //
    function createDataTable(doc) {
        var dataArray = [];
        for (var i = 0; i < doc.portfolio.length; i++) {
            var amtInvest = 0;
            for (var j = 0; j < doc.portfolio[i].totalPayments.length; j++) {
                amtInvest += doc.portfolio[i].totalPayments[j];
            }
            var object = {
                id: doc.portfolio[i].id,
                loanAmount: doc.portfolio[i].loanAmount,
                interestRate: doc.portfolio[i].intRate,
                term: doc.portfolio[i].term,
                grade: doc.portfolio[i].subGrade,
                defProb: doc.portfolio[i].predictedDefault,
                amountInvested: Math.round(amtInvest)
            };
            dataArray.push(object);
        }
        var record = {
            clientId: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            cash: doc.assetsToInvest,
            dataTable: doc.portfolio
        }
        return {
            key: doc._id,
            value: record
        };
    }
    this.getGrade = function (strGrade) {
        if (strGrade != null && strGrade.length > 0) {
            console.log(strGrade.substring(0, 1));
            return strGrade.substring(0, 1);
        }

        return "";
    }
});