'use strict';

angular.module('starter').controller('AvisosCtrl', AvisosCtrl);

AvisosCtrl.$inject = ['$scope', '$timeout', '$stateParams', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject'];

function AvisosCtrl($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject){

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