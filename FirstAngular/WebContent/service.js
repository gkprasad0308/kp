app.service("customerService", function($http,appSettings) {
	
	this.getCustomer = function() {
		//return $http.get("http://localhost:8080/ngdemo/rest/persons");
		return $http.get(appSettings.db_url+"/person/_design/personDesign/_view/getPerson");
	};
	
	this.addCustomer = function(id,name,city){
		var person ={_id:id,personName:name,personCity:city};
		return $http.post(appSettings.db_url+"/person", person);
		
	};
	
	this.updateCustomer = function(person){
		var object = {_id:person._id,personName:person.personName,personCity:person.personCity};
		return $http.put(appSettings.db_url+"/person/"+person._id, person);
		
	};
	
	this.deleteCustomer = function(person){
		return $http.delete(appSettings.db_url+"/person/"+person._id+"?rev="+person._rev);	
	};

});

app.service("productService", function($http,appSettings) {
	this.getProduct = function(){
		return $http.get(appSettings.db_url+"/product/_design/prodDesign/_view/prodView");
	};
	
});