'use strict';

angular.module('starter').controller('LogCtrl', LogCtrl);

LogCtrl.$inject = ['$scope', '$rootScope', '$location', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject', 'FireAuth', 'LocalDB'];

function LogCtrl($scope, $rootScope, $location, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, FireAuth, LocalDB){

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.isLogged = false;

		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
        $scope.$parent.hideHeader();
        LocalDB.initLogin();       
        firebase.auth().onAuthStateChanged(function(user){
                 console.log('onAuthStateChanged');         
          $timeout(function() {          
             if(user){
                $rootScope.hereGoes = true;
                console.log('tem usuário');
                $scope.directUser();
             }else{
               $rootScope.hereGoes = false;
                console.log('não tem usuário');
            }
                console.log($rootScope.userIs + " bem daqui");
         }, 300);        
        });
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


    $scope.logout = function(){
      FireAuth.logout();
      $scope.$parent.hereGoes = false;
    }


       // Set Motion
       $timeout(function() {
           ionicMaterialMotion.slideUp({
               selector: '.slide-up'
           });
       }, 300);


       $scope.directUser = function(){
        $location.path("app/perfil");
       };

       // Set Ink
       ionicMaterialInk.displayEffect();

};

