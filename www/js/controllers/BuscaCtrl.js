'use strict';

angular.module('starter').controller('BuscaCtrl', BuscaCtrl);

function BuscaCtrl($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $ionicPopup){

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
    });

  $scope.isExpanded = false;
//  $scope.$parent.setExpanded(false);
//  $scope.$parent.setHeaderFab('right');

$scope.tipPopUp2 = function() {

   var alertPopup = $ionicPopup.alert({
     title: 'Escolha via Listagem',
     template: 'Área em desenvolvimento.'
   });
 };

};