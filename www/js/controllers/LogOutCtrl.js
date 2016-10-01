'use strict';

angular.module('starter').controller('LogOutCtrl', LogOutCtrl);

LogOutCtrl.$inject = ['$scope', '$rootScope', '$location', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject', 'FireAuth', 'LocalDB'];

function LogOutCtrl($scope, $rootScope, $location, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, FireAuth, LocalDB){

    $scope.isLogged = false;

		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
        $scope.$parent.hideHeader();
        LocalDB.initLogin();       
        firebase.auth().onAuthStateChanged(function(user){
                 console.log('onAuthStateChanged');                
        });
		  });


$scope.logout = function(){
      //FireAuth.logout();
      //$scope.$parent.hereGoes = false;
      //$location.path("app/login_inicial");
      ionic.Platform.exitApp();
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

