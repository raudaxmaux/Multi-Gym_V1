'use strict';

angular.module('starter')
.controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl($scope, $rootScope, $location, $timeout, $geofire, ionicMaterialInk, $firebaseObject, accessFactory, $filter, service_Register, Utils) {
	$scope.$on("$ionicView.beforeEnter", function(event, data){
       $scope.$parent.showHeader();
       $scope.nearHome = [];
       $scope.closer = [];
       $scope.closest = [];
       if($rootScope.usuarioAtivo){
			console.log("still on the game!");
	          console.log($rootScope.usuarioAtivo);
	          if(!$rootScope.usuarioAtivo.endereco || !$rootScope.usuarioAtivo.numero || !$rootScope.usuarioAtivo.bairro || !$rootScope.usuarioAtivo.cidade){
	              $scope.confirmed = false;
	          }else{
	              $scope.confirmed = true;
	          }       		

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


	$scope.newDirection = function(){
			service_Register.nearest_gym($rootScope.usuarioAtivo.uid);
	};

	$scope.knockthedoor = function(){	
		console.log("new direction!!!");

		$timeout(function(){
			$scope.getOrder()        
		}, 3000);
		Utils.show();
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
    		console.log("$scope.getOrder inicializado")

          $scope.closer = $filter('orderBy')($scope.nearHome, 'distance');
          $scope.closer.length = 1;
          var finalUser = accessFactory.pegaAcademiaUnica($scope.closer[0].key);
          finalUser.once('value').then(function(snapshot) {
            $scope.closer[0].info = snapshot.val();
            $scope.transformer();
          });                
    };

     $scope.transformer = function(){
            $scope.closest = $scope.closer[0];
            service_Register.passingData = $scope.closest;

				
				$scope.fuga()        

    }


    $scope.fuga = function(){
    		Utils.hide();
    		 console.log(service_Register.passingData);
			$location.path("app/registro_continua")
    };   	

};/// end
