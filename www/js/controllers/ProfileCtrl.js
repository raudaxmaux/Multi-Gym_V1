'use strict';

angular.module('starter').controller('ProfileCtrl', ProfileCtrl);


function ProfileCtrl($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $rootScope, FireAuth, $firebaseAuth, $firebaseObject, Utils, accessFactory){

  /// VARIÁVEIS
  $scope.userUid = '';
  $scope.userData = [];

  $scope.foto;
  $scope.nome;

		$scope.$on("$ionicView.enter", function(event, data){
		     // handle event
       $scope.$parent.showHeader();
       firebase.auth().onAuthStateChanged(function(user){	        
        if(user){
          console.log("e o meu user?");
          $scope.userUid = user.uid;
          $scope.PegaUser($scope.userUid);
        }else{

        };
        });
        console.log("aqui será renomeado para 'Início'");      
		  });

    $scope.PegaUser = function(uid){
      console.log(uid + " é o que há!")
        var theUser = accessFactory.pegaUsuario(uid);  
        var objU = $firebaseObject(theUser);
        objU.$bindTo($scope, "usuarioAtivo");
      
        objU.$loaded().then(function(){
            console.log("consegui")
            console.log($scope.usuarioAtivo);    
            $scope.mandaPerfil($scope.usuarioAtivo);
            $rootScope.usuarioAtivo = $scope.usuarioAtivo;    
        })

        //console.log($scope.userData);
         $timeout(function() {
        //$scope.mandaPerfil($scope.usuarioAtivo);
      }, 600);
      //})

    };

    $scope.mandaPerfil = function(Arraial){
      
      if(Arraial.photoURL !== '' || Arraial.photoURL !== undefined){
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