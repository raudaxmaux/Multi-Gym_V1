  'use_strict';

  angular.module('starter').controller('RegisterFinalCtrl', RegisterFinalCtrl);

  function RegisterFinalCtrl($scope, $rootScope, $ionicModal, $location, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $filter, acadFactory, accessFactory, service_Register){
        $scope.$on("$ionicView.enter", function(event, data){
         // handle event
         $scope.$parent.showHeader();
         $scope.usuarioAtivo = $rootScope.usuarioAtivo;       
        });

        $scope.getOut = function(){
        	$location.path("app/inicio")
        };

  };