(function(){
	'use strict';
	/**
	* accessFactory
	* Facilita o caminho para os conteúdo na base de dados
	* Alexandre Brito 2016
	*/
	angular.module('starter')
	.factory('accessFactory', accessFactory);


	function accessFactory(){
		var userPath = firebase.database().ref("usuarios");
		var academyPath = firebase.database().ref("academias");
		var geoPath = firebase.database().ref("acad_position");
		var homePath = firebase.database().ref("usuario_home_position");		
		var treinosPath = firebase.database().ref("treinos");
		var nakedPath = firebase.database();		
		
		var accessBack = {
			pegaUsuario: pegaUsuario,
			pegaUserList: pegaUserList,			
			pegaAcademiaUnica: pegaAcademiaUnica,
			pegaAcademiaList: pegaAcademiaList,
			pegaMapeamento: pegaMapeamento,
			pegaUserHome: pegaUserHome,					
			pegaAgendamento: pegaAgendamento
		};
		return accessBack;

		function pegaUsuario(key){
			return userPath.child(key);
		}

		function pegaUserList(){
			return userPath;
		}		

		function pegaAcademiaUnica(key){
			return academyPath.child(key);
		}

		function pegaAcademiaList(){
			return academyPath;
		}

		function pegaAgendamento(key){
			return treinosPath.child(key);
		};

		function pegaMapeamento(){
			return geoPath;
		};

		function pegaUserHome() {
			return homePath;
		}

		function pegaBaseData(){
			return nakedPath;
		};		
		
	}; // fim da função principal
})(); // fim do arquivo JS
