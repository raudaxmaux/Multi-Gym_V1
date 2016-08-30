'use strict';

angular.module('starter').controller('Agendar_treinosCtrl', Agendar_treinosCtrl);

Agendar_treinosCtrl.$inject = ['$scope', '$timeout', '$stateParams', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject'];

function Agendar_treinosCtrl($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject){

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
    });

$scope.tipPopUp = function() {

   var alertPopup = $ionicPopup.alert({
     title: 'Escolha via Listagem',
     template: 'Área em desenvolvimento.'
   });
 };


};