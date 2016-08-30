'use strict';

angular.module('starter').controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$rootScope', 'storageService', 'FireAuth', '$firebaseAuth', '$firebaseObject', 'Utils'];

function ProfileCtrl($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $rootScope, storageService, FireAuth, $firebaseAuth, $firebaseObject, Utils){

  /// VARIÁVEIS
  $scope.isLoggedIn = false;
  $scope.userUid = '';
  $scope.userData = [];

  $scope.foto;
  $scope.nome;




		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
       $scope.$parent.showHeader();
       firebase.auth().onAuthStateChanged(function(user){	        
        if(user){
          $scope.isLoggedIn = true;
          $scope.userUid = user.uid;
          $scope.PegaUser($scope.userUid);
        }else{
          isLoggedIn = false;

        };
        });      
		  });

    $scope.PegaUser = function(uid){
      console.log(uid + " é o que há!")  
      firebase.database().ref('/usuarios/'+uid).once("value", function(snapUser){
        $scope.userData = snapUser.val()
        console.log($scope.userData);
         $timeout(function() {
        $scope.mandaPerfil($scope.userData);
      }, 600);
      })

    };

    $scope.mandaPerfil = function(Arraial){
      
      if($scope.userData.photoURL !== ''){
        $scope.foto = Arraial.photoURL;
      }else{
        $scope.foto = 'img/profile-icon.png';
      }
      if(!Arraial.displayName){
        $scope.nome = "Olá, visitante";
        $scope.aviso();
      }else{
          $scope.nome = Arraial.displayName;

      }
    };

    $scope.aviso = function(){
      Utils.alertshow('Dados incompletos', 'Para uma melhor utilização do aplicativo precisamos de mais dados seus. Clique info e preencha com outras informações.');
    };

//////////////////////////////////////////////////////////////////////////////
       // Set Motion
//////////////////////////////////////////////////////////////////////////////       


       $timeout(function() {
           ionicMaterialMotion.slideUp({
               selector: '.slide-up'

           });
       }, 600);

       $timeout(function() {
           ionicMaterialMotion.blinds({
               startVelocity: 3000
           });
       }, 300);

       // Set Ink
       ionicMaterialInk.displayEffect();

};