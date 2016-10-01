'use strict';

angular.module('starter').controller('Treinos_agendadosCtrl', Treinos_agendadosCtrl);

Treinos_agendadosCtrl.$inject = ['$scope', '$timeout', '$stateParams', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject'];

function Treinos_agendadosCtrl($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject){

$scope.showConfirm01 = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Cancelar Treino',
     template: 'Você tem certeza ?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };

 $scope.showConfirm02 = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Remarcar Treino',
     template: 'Você tem certeza? Não há garantia de horário'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };


   $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
    });

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();    


};