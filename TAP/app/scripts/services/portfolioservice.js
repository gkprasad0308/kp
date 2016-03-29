//'use strict';

app.service('clientService', function($q, $http, arrService){

  this.getName = function(){
    return "John Doe";
  };

  this.getClient = function(){
    return $http.get('/api/views/client/all');
  };

  this.getClientById = function(id){
    var promise = $q.defer();
    $http.get('/api/views/client/byId?key=' + id ).then(function(response) {
      promise.resolve(response);
    }, function(response) {
       promise.reject(response);
    });
    return promise;
  };

  this.saveClient = function(client) {
    return $http.post("/api/save", client);
  };

  this.deleteDocument = function(doc) {
    return $http.post("api/delete/" + doc._id + "/" + doc._rev);
  };

  this.getRetirementObject = function(){
    return ['2020', '2025', '2030', '2035', '2040', '2045', '2050'];
  };

  this.getInvestmentObject = function(){
    return ['Preservation', 'Retirement'];
  };

    this.getInvestmentObjectOptions = function(){
    return ['Preservation', 'Retirement'];
  };

  this.getMinTotalAssetsFilterOptions = function() {
    var filter = [0, 100000, 500000, 1000000];
    return filter;      
  };

   this.getMaxTotalAssetsFilterOptions = function() {
    var filter = [99999, 249999, 499999, 9999999];
    return filter;      
  };
  
  this.getInvestmentObjectives = function() {
    var filter = ['Growth', 'Retirement'];
    return filter;
  };


  this.getRiskTolerance = function(investingObjective) {
    var obj = investingObjective.objective;
    var deadLine = investingObjective.investingDeadline;

    if (obj == 'Preservation') {
      return {'A': 1.0};
    } else if (obj == 'Retirement') {
      if (deadLine == '2020') {
        return  {'A': 0.8, 'B': 0.2};
      } else if (deadLine == '2025') {
        return  {'A': 0.7, 'B': 0.3};
      } else if (deadLine == '2030') {
        return  {'A': 0.5, 'B': 0.5};
      } else if (deadLine == '2035') {
        return  {'A': 0.3, 'B': 0.5, 'C': 0.2};
      } else if (deadLine == '2040') {
        return  {'A': 0.1, 'B': 0.6, 'C': 0.3};
      } else if (deadLine == '2045') {
        return  {'B': 0.5, 'C': 0.5};
      } else if (deadLine == '2050') {
        return  {'B': 0.5, 'C': 0.5};
      }
    }
  };
});


