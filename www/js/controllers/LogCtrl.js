'use strict';

angular.module('starter').controller('LogCtrl', LogCtrl);

LogCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject', 'FireAuth'];

function LogCtrl($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, FireAuth){

    $scope.user = {
      email: '',
      password: ''
    };


		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
         $scope.$parent.hideHeader();

		  });


    $scope.registro_simples = function(usuario){
      $scope.user.email = usuario.email;
      $scope.password = usuario.password;

      FireAuth.register($scope.user);
    }

    $scope.login_simples = function(usuario){
      $scope.user.email = usuario.email;
      $scope.password = usuario.password;

      FireAuth.login($scope.user);
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

       // Set Ink
       ionicMaterialInk.displayEffect();

};

