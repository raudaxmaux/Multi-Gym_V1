(function(){
	'use strict';
	/**
	* Bindings
	* Controla o 3-way data-binding 
	*/
	angular.module('starter').factory('DataBinding', DataBinding)
	
	function DataBinding($firebaseObject, $timeout, $rootScope, $firebaseArray, $location, $timeout, accessFactory, Utils) {
		// body...
		var binders = {
			bindAgenda: _bindAgenda,
			bindAcademia: _bindAcademia
		};
		return binders;

		function bindAgenda(scope, $rootScope) {
			// body...
		}
		function bindAcademia(scope, $rootScope) {
			// body...
		}

	}
})()