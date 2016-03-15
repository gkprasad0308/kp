var app = angular.module("myapp", []);
app.factory("MessageFactory", function() {

	return {
		sayHello : function(name) {
			return 'Hello ' + name;
		},
		sayBye : function(name) {
			return 'Bye ' + name;
		}

	}

});

app.service("MessageService", function() {

	this.sayHello = function(name) {
		return 'Hello,How are you! ' + name;
	};

	this.sayBye = function(name) {
		return 'Bye and have good weekend ' + name;
	};

});

app.controller("MessageCtrl", [ "MessageService", function(MessageService) {

	this.name = '';
	this.message = '';
	this.hello = function() {
		this.message = MessageService.sayHello(this.name);
	};
	this.bye = function() {
		this.message = MessageService.sayBye(this.name);
	};

} ]);