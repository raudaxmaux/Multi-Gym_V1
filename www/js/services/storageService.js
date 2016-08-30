(function(){
	/**
	* storageService
	* guardar dados enquanto estiver ativo
	*/
	angular.module('starter')
	.factory('storageService', storageService);

	function storageService(){

		var userActive = 'default';
        var academiaEscolhida = null;

         warehouse = {
         	setUser: setUser,
         	setGym: setGym,
         	getUser: getUser,
         	getGym: getGym         	
         }
         return warehouse;

         function setUser(Name) {
             userActive = Name;
         };

         function setGym(Academia) {
             academiaEscolhida = Academia;
         };

          function getUser() {
             return userActive;
         };

         function getGym() {
             return academiaEscolhida;
         };
        



	};// fim storageService - ATENÇÃO!!!	
})();//fim da função geral JS - ATENÇÃO!!!