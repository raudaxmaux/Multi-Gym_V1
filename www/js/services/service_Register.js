'use strict';
angular.module('starter').factory('service_Register', service_Register);

function service_Register($rootScope, $firebaseObject, $location, $timeout, Utils, $geofire, accessFactory) {
	// body...
	var dadosiniciais = {}
	var passingData = {};
	var registroFinal = {
		nearest_gym: _nearest_gym,
		changeStatus: _changeStatus
	};
	return registroFinal;

	function _nearest_gym(user){
		console.log(user);
		var objUser = {};
		console.log("start nearest");
		var regRef = accessFactory.pegaOneUserHome(user);
		regRef.once('value').then(function(snapshot){
		console.log("peguei")	
		objUser =  snapshot.val();
			dadosiniciais = objUser;
			$rootScope.$broadcast("ENVIARESIDENCIA", dadosiniciais);

		});
	};

	function _changeStatus(argument) {
		// body...
	};

};// fim da factory