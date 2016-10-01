'use strict';

angular.module('starter').controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$timeout', '$stateParams', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject'];

function LoginCtrl($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject){

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
    });


};