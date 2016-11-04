'use strict';

angular.module('starter').controller('LogCtrl', LogCtrl);

function LogCtrl($scope, $rootScope, $location, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, FireAuth, LocalDB){

    $scope.user = {
      email: '',
      password: ''
    };

    $rootScope.isLogged = false;

		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
         console.log("LogCtrl começa");
        $scope.$parent.hideHeader();
        LocalDB.initLogin();
		  });

    $scope.registro_simples = function(usuario){
      $scope.user.email = usuario.email;
      $scope.user.password = usuario.password;

      FireAuth.register($scope.user);
    }


    $scope.login_simples = function(usuario){
      $scope.user.email = usuario.email;
      $scope.password = usuario.password;

      FireAuth.login(usuario);
    }  


    $scope.faceLogin = function(){
      FireAuth.signFB();
    }


       // Set Motion
       $timeout(function() {
           ionicMaterialMotion.slideUp({
               selector: '.slide-up'
           });
       }, 300);


       $scope.directUser = function(){
        $location.path("app/inicio");
       };

       // Set Ink
       ionicMaterialInk.displayEffect();

};

