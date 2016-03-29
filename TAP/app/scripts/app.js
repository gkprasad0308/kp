//'use strict';

var app = angular.module('tapApp', [ 'ngAnimate', 'ngCookies', 'ngResource',
  'ngRoute', 'ngSanitize', 'ngTouch','ngDonut', 'chart.js']);

 app.constant("appSettings", {
  db_url : "http://54.158.46.36:5984",
  db_name : "ovl4zmrifzs7go1d"
});

 app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl : "views/HomePage.html",
    controller : "mainCtrl",
    controllerAs : "ctrl"
  }).when("/portfolio/:id", {
    templateUrl : "views/ClientPortfolio.html",
    controller : "portfolioCtrl",
    controllerAs : "ctrl"
  }).when("/amountsByGrade/:id", {
    templateUrl : "views/grade.html",
    controller : "portfolioCtrl",
    controllerAs : "ctrl"
  }).when("/arr/:id", {
    templateUrl : "views/arr.html",
    controller : "arrCtrl",
    controllerAs : "actrl"
  }).when("/dataTable/:id", {
    templateUrl : "views/datatable.html",
    controller : "dataTableCtrl",
    controllerAs : "ctrl"
  }).otherwise({
    redirectTo : '/'
  });
});

app.filter("removeDups", function(){
  return function(data) {
    if(angular.isArray(data)) {
      var result = [];
      var key = {};
      for(var i=0; i<data.length; i++) {
        var val = data[i];
        if(angular.isUndefined(key[val])) {
          key[val] = val;
          result.push(val);
        }
      }
      if(result.length > 0) {
        return result;
      }
    }
    return data;
  }
})

app.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});

app.directive('tooltip', function tooltipDirective() {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @property model
             * @type {Object}
             */
            scope: {
                model: '=ngModel'
            },

            /**
             * @property require
             * @type {String}
             */
            require: 'ngModel'/*,

            *
             * @property template
             * @type {String}
             
            templateUrl: 'partials/tooltip.html'*/

        };

    });



