'use strict';

angular.module('starter').controller('GetLogInfo', GetLogInfo);

function GetLogInfo($scope, $rootScope, $location, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, FireAuth, LocalDB){

    $rootScope.isLogged = false;

		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
        console.log("GetLogInfo começa"); 
        $scope.$parent.hideHeader();
        LocalDB.initLogin();       
        firebase.auth().onAuthStateChanged(function(user){
                 console.log('onAuthStateChanged');         
          $timeout(function() {          
             if(user){
                $rootScope.hereGoes = true;
                console.log('tem usuário');
                $location.path("app/inicio");
             }else{
               $rootScope.hereGoes = false;
                console.log('não tem usuário');
                $location.path("app/login_inicial");
            }
         }, 2000);        
        });
		  });

            $scope.tipPopUp = function(titulo, msg) {
                $scope.tits = titulo;
                $scope.msg = msg
               var alertPopup = $ionicPopup.alert({
                 title: $scope.tits,
                 cssClass: 'popme',
                 template: $scope.msg
               });
             };



       // Set Ink
       ionicMaterialInk.displayEffect();

};

