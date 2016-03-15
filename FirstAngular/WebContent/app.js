var app = angular.module("serviceapp", ["ngRoute"]);

app.constant("appSettings", {db_url:"http://127.0.0.1:5984"});

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "HomePage.html"
	}).when("/Customer", {
		templateUrl : "Customer.html"
	}).when("/addCustomer", {
		templateUrl : "AddCustomer.html"
	}).when("/Product", {
		templateUrl : "Product.html",
		controller: "ProductCtrl"
	}).when("/Buy/:productName", {
		templateUrl : "BuyProduct.html",
		controller: "ProductCtrl"
	}).otherwise({
		redirectTo : '/'
	});
});