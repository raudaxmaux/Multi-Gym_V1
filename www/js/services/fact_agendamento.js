(function(){
	'use_strict';

	/**
	*	AgendarTreino
	*	Agendamento de treinos
	*/

	angular
	.module('starter')
	.factory('AgendarTreino', AgendarTreino);

	function AgendarTreino($firebaseObject, $timeout, $rootScope, $firebaseArray, $location, $timeout, accessFactory, Utils){
		// body...
		var theId = '';
		var agendStart = accessFactory.pegaAgendamento();
		var agendaReady = [];

		var post_it = {
			getAgenda: _getAgenda,
			arrAgenda: _arrAgenda,
			saveAgenda: _saveAgenda,
			getMyAgenda: _getMyAgenda
		};
		return post_it;

		function _getAgenda() {
			return agendaReady;
		};

		function _arrAgenda(id) {
			var acadNotes = accessFactory.pegaAgendamento();
        	meuAcadNotes = acadNotes.orderByChild("usuario").equalTo(id);
        	agendaReady = $firebaseArray(meuAcadNotes);
		}

		function _saveAgenda(agenda) {
			// body...
			console.log(agendaReady)
			console.log(agenda);
			agendaReady.$add(agenda).then(function(chave){
				console.log(chave);
				$rootScope.$broadcast("saved_Sched");
			}).catch(function(error){
				console.log("não foi salvo")
				console.log(error)
				$rootScope.$broadcast("error_Sched");
			})
			/*
			var saveBam = accessFactory.pegaAgendamento()
			var newSchedule = saveBam.push(angular.fromJson(angular.toJson(agenda))).then(function(success){
				console.log("foi salvo")
				$rootScope.$broadcast("saved_Sched");
			}).catch(function(error){
				console.log("não foi salvo")
				$rootScope.$broadcast("error_Sched");
			})
			*/
		}

		function _getMyAgenda(meuId, scope) {
			// body...

        var acadNotes = accessFactory.pegaAgendamento();
        var objMaromba = $firebaseObject(acadNotes.orderByChild("usuario").equalTo(meuId));
        objMaromba.$loaded().then(function(){
        	objMaromba.$bindTo(scope, "agendamentos");
        });			
		}


	}
})();//fim da função geral JS - ATENÇÃO!!!	