'use strict';

angular.module('starter').controller('RegisterNextCtrl', RegisterNextCtrl);

function RegisterNextCtrl($scope, $rootScope, $location, $timeout, $geofire, $filter, Utils, service_Register, accessFactory) {
	$scope.$on("$ionicView.beforeEnter", function(event, data){
       $scope.nearHome = [];
       $scope.closer = [];
       $scope.closest = [];
       $scope.$parent.showHeader();
       $scope.chooseSayings = "Estamos direcionando você para a academia Multigym mais próxima de sua residência."
       if($rootScope.usuarioAtivo){
			console.log("Vamos arranjar uma academia pra você.");
			service_Register.nearest_gym($rootScope.usuarioAtivo.uid);
       }else{
			console.log("return and gopher it");
			$location.path("app/inicio")
       };
   });

    $rootScope.$on("ENVIARESIDENCIA", function(event, data){
       $scope.homeDepot = data;
       console.log($scope.homeDepot.l);
       $scope.knockthedoor();
    });

    $scope.knockthedoor = function(){

      $timeout(function(){
          $scope.getOrder()        
      }, 3000);

      var $geo = $geofire(accessFactory.pegaMapeamento());

      var query = $geo.$query({
        center: [$scope.homeDepot.l[0], $scope.homeDepot.l[1]],
        radius: 10
      });
 
      var geoQueryCallback = query.on("key_entered", "HOMER:KEY_ENTERED");

      $scope.$on("HOMER:KEY_ENTERED", function (event, key, location, distance) {
          var obje = {key: key, location: location, distance: distance};

          $scope.nearHome.push(obje);

      });      

    };


    $scope.getOrder = function(){
          console.log($scope.nearHome);

          console.log("////////////////////////////////////////////////////////")
          $scope.closer = $filter('orderBy')($scope.nearHome, 'distance');
          $scope.closer.length = 1;
          //console.log($scope.closer);
          
          var finalUser = accessFactory.pegaAcademiaUnica($scope.closer[0].key);
          finalUser.once('value').then(function(snapshot) {
            $scope.closer[0].info = snapshot.val();
            $scope.transformer();
          });                
    };

    $scope.transformer = function(){
            $scope.closest = $scope.closer[0];
            console.log($scope.closest.info);
    }

};