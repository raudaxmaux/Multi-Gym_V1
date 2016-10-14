(function(){
	'use_strict';

	/**
	*  Module
	*
	* Description
	*/
	angular
	.module('starter')
	.factory('acadFactory', acadFactory);

	function acadFactory($firebaseAuth, $firebaseObject, $timeout, $rootScope, $firebaseArray, $location, $timeout, accessFactory, Utils){
		console.log("as academias estão sob o meu controle");

		var partida = accessFactory.pegaAcademiaList();

		var academia = {
			pegaAcademias: pegaAcademias,
			fitByCity: fitByCity
		};
		return academia;

		//////////////   FUNÇÕES   ////////////// 

		function pegaAcademias(){
			var resposta = [];
			var queryFit = partida.orderByKey();
			resposta = $firebaseArray(queryFit)
			//queryFit.once("value").then(function(snapshot){
			//	var mezzo = snapshot.val()
			//	resposta = mezzo;
			//});
			return resposta;
		}

		function fitByCity(place){
			console.log(place + " é de onde vou retirar as academias");
			var respostaCidade = [];
			//var especifico = partida.child("endereco/cidade")
			var queryCity = partida.orderByKey();
			var mezzo = $firebaseArray(queryCity);
			mezzo.$loaded().then(function(){
				angular.forEach(mezzo, function(value, key){
						
						if(value.endereco.cidade === place){
							respostaCidade.push(value)
						}
				});
			})
			//respostaCidade = $firebaseArray(queryCity);

			return respostaCidade;
		}



	};// fim service_Auth - ATENÇÃO!!!
})();//fum da função geral JS - ATENÇÃO!!!