'use strict';

angular.module('starter')
.controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl($scope, $rootScope, $location, $timeout) {
	$scope.$on("$ionicView.beforeEnter", function(event, data){
       $scope.$parent.showHeader();
       if($rootScope.usuarioAtivo){
			console.log("still on the game!");
	          console.log($rootScope.usuarioAtivo);
	          if(!$rootScope.usuarioAtivo.endereco || !$rootScope.usuarioAtivo.numero || !$rootScope.usuarioAtivo.bairro || !$rootScope.usuarioAtivo.cidade){
	              $scope.confirmed = false;
	          }else{
	              $scope.confirmed = true;
	          }       		

       }else{
			console.log("return and gopher it");
			$location.path("app/inicio")
       };
       	
   });

};//fim do Controller

/*
      resolve:{
        fullProfile: function($rootScope){
          console.log($rootScope.usuarioAtivo);
          if(!$rootScope.usuarioAtivo.endereco || !$rootScope.usuarioAtivo.numero || !$rootScope.usuarioAtivo.bairro || !$rootScope.usuarioAtivo.cidade){
              var confirmed = false;
              return confirmed;
          }else{
              var confirmed = true;
              return confirmed;
          }
        }
      }

*/