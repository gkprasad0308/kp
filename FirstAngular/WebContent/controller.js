app.controller("BuyCtrl", function($scope,$routeParams,customerService){
	$scope.productName = $routeParams.productName;
	loadData();
	
	
	function loadData(){
		
		customerService.getCustomer().then(
			function(response) {
				$scope.persons = response.data;
				console.log($scope.persons);
			}, function(errReponse) {
				console.error('Error while creating user');
				$scope.persons = null;
			});
	}
	
});

app.controller("ProductCtrl", function($scope,$location,productService,customerService){
	loadProducts();
	$scope.showHomePage = function() {
		$location.path("/");
	};
	
	function loadProducts(){
		productService.getProduct().then(function(response) {
			$scope.products = response.data.rows;
		}, function(errResponse) {
			console.log("Error while getting the products");
			$scope.products=null;
		});
	}
	
	$scope.buyProduct=function(product){
		
		$scope.productName = product.productName;
		$location.path("/Buy/"+$scope.productName);
		
	};
});

app.controller("CustomerCtrl", function($scope,$location,$window, customerService) {
	
	$scope.id,$scope.name,$scope.city;
	$scope.added = false;
	$scope.inValidData = false;
	$scope.view = false;
	$scope.add = true;
	$scope.update = false;
	$scope.showSave = false;
	
	loadData();
	
	$scope.showHomePage = function() {
		$location.path("/");
	};
	
	$scope.navigateToCustomer = function(){
		$location.path("/addCustomer");		
	};
	
	$scope.addCustomer = function(){
		alert();
		if($scope.id==null || $scope.name==null || $scope.city==null){
			$scope.inValidData = true;
		}
		if(!$scope.inValidData){
			customerService.addCustomer($scope.id, $scope.name, $scope.city).then(function(response) {
				$scope.added=true;
			}, function(errReponse) {
				console.error('Error while creating Person');
			});
			alert($scope.added);
		}
		
	};
	
	$scope.updateCustomer = function(person){
			console.log(person);
			customerService.updateCustomer(person.value).then(function(response) {
				$scope.added=true;
			}, function(errReponse) {
				console.error('Error while creating Person');
			});
			$scope.showSave = false;
			$scope.personId = null;
			loadData();
		
	};

	$scope.deleteCustomer = function(person) {
		deleteUser = $window.confirm("Are you sure, you want to delete?");
		if (deleteUser) {
			customerService.deleteCustomer(person.value).then(
					function(response) {
						$scope.added = true;
					}, function(errReponse) {
						console.error('Error while creating Person');
					});
			loadData();
		}

	};
	
	$scope.showUpdateCustomerData = function(person){
		$scope.personId = person.value._id;
		loadData();
	};
	
	$scope.viewCustomerData = function(person){
		$scope.add = false;
		$scope.view = true;
		$scope.update = false;
		$scope.id=person.personId;
		$scope.name=person.personName;
		$scope.city=person.personCity;		
	};
	
	$scope.cancelUpdate = function(){		
		$scope.personId = "";
		loadData();
	};
	
	function loadData(){
		customerService.getCustomer().then(
			function(response) {
				$scope.persons = response.data.rows;				
			}, function(errReponse) {
				console.error('Error while creating user');
				$scope.persons = null;
			});	
		
	}
});