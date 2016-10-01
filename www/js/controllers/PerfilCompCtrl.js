'use strict';

angular.module('starter').controller('PerfilCompCtrl', PerfilCompCtrl);

PerfilCompCtrl.$inject = ['$scope', '$timeout', '$stateParams', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject'];

function PerfilCompCtrl($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject){

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
       $scope.usuarioAtivo = $rootScope.usuarioAtivo;
    });


  // Set Motion
  $timeout(function() {
      ionicMaterialMotion.slideUp({
          selector: '.slide-up'
      });
  }, 300);

  $timeout(function() {
      ionicMaterialMotion.blinds({
          startVelocity: 3000
      });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();


  $scope.ajuda = function(mensagem){
    $scope.$parent.toastMess(mensagem);
  }


};