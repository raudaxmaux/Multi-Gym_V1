(function(){
	'use_strict';

	/**
	*  Module
	*
	* Description
	*/

	angular
	.module('starter')
	.factory('agendarTreino', agendarTreino);

	function agendarTreino($firebaseAuth, $firebaseObject, $timeout, $rootScope, $firebaseArray, $location, $timeout, accessFactory, Utils){
		// body...
		var post_it = {
			getAllAgenda: _getAllAgenda,
			saveAgenda: _saveAgenda,
			getMyAgenda: _getMyAgenda
		};
		return post_it;

		function _getAllAgenda() {
			// body...
		};

		function _saveAgenda(agenda) {
			// body...
			console.log(agenda)
			var saveBam = accessFactory.pegaAgendamento()
			var newSchedule = saveBam.push(angular.fromJson(angular.toJson(agenda))).then(function(success){
				console.log("foi salvo")
				$rootScope.$broadcast("saved_Sched");
			}).catch(function(error){
				console.log("não foi salvo")
				$rootScope.$broadcast("error_Sched");
			})
		}

		function _getMyAgenda(meuId) {
			// body...
		}


	}
})();//fim da função geral JS - ATENÇÃO!!!	