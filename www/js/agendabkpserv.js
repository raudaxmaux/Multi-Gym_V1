(function(){
	'use_strict';

	/**
	*  Module
	*
	* Description
	*/

	angular
	.module('starter')
	.factory('AgendarTreino', AgendarTreino);

	function AgendarTreino($firebaseObject, $timeout, $rootScope, $firebaseArray, $location, $timeout, accessFactory, Utils){
		// body...
		var theId = '';
		var agendStart = accessFactory.pegaAgendamento();
		var agendaReady = $firebaseArray(agendStart.orderByChild("usuario").equalTo(theId));

		var post_it = {
			getAgenda: _getAgenda,
			saveAgenda: _saveAgenda,
			getMyAgenda: _getMyAgenda
		};
		return post_it;

		function _getAgenda() {
			// para o admin
			return agendaReady;
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

		function _getMyAgenda(meuId, scope) {
			// body...

        var acadNotes = accessFactory.pegaAgendamento();
        var objMaromba = $firebaseObject(acadNotes.orderByChild("usuario").equalTo(meuId));
        objMaromba.$loaded().then(function(){
        	console.log(objMaromba.length);
        	objMaromba.$bindTo(scope, "agendamentos");
        });			
		}


	}
})();//fim da função geral JS - ATENÇÃO!!!	