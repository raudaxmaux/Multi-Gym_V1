'use strict';

angular.module('starter').controller('InicioCtrl', InicioCtrl);

function InicioCtrl($scope, $rootScope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $ionicPopup, $cordovaGeolocation, $ionicPlatform, $http, acadFactory){

 
    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();

       if($rootScope.lat && $rootScope.long){
		  	console.log("Já tinha pego");       		
       		$scope.academyGeoRequest();
       }else{
		var options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 0};
 
  		$cordovaGeolocation.getCurrentPosition(options).then(function(position){

		  		console.log("peguei");
		  		$rootScope.lat = position.coords.latitude;
		  		$rootScope.long = position.coords.longitude;
		  		$scope.academyGeoRequest();

		  }, function(error){
		  		console.log(error);
		  		console.log(error.message);
                $scope.tipPopUp('Sem academias', 'Academias não encontradas. Verifique se seu GPS está ativado.');

		  });

  		};



    });
		  

    $scope.academyGeoRequest = function(){		
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+$rootScope.lat+','+$rootScope.long+'&key=AIzaSyChKa78lMHv_X99iRTr4VNWZnu1QQFwlZY').success(function(mapData) {
                $rootScope.transpott = {
                	cidade: mapData.results[0].address_components[4].long_name,
                	estado: mapData.results[0].address_components[5].short_name,
                	pais: mapData.results[0].address_components[6].long_name
                };
	                $scope.cityScape = $rootScope.transpott.cidade;
	                $scope.stateScape = $rootScope.transpott.estado;
                console.log($rootScope.transpott);

	                $scope.frontAcads = acadFactory.fitByCity($rootScope.transpott.cidade);
                setTimeout(function() {
	                console.log($scope.frontAcads);
                }, 2000);
                              
           },function(error){
                console.log("Não foi possível achar as academias");
                $scope.tipPopUp('Sem academias', 'Academias não encontradas. Verifique se seu GPS está ativado.');
       	 });

    };

            console.log($scope.usuarioAtivo);

    $scope.throwAcad = function(id){
    	console.log("Monte aqui minhas academia! "+id )
    };


  $scope.isExpanded = false;
//  $scope.$parent.setExpanded(false);
//  $scope.$parent.setHeaderFab('right');

$scope.tipPopUp = function(titulo, msg) {
	$scope.tits = 'Erro';
	$scope.msg = msg
   var alertPopup = $ionicPopup.alert({
     title: $scope.tits,
     template: $scope.msg
   });
 };

};