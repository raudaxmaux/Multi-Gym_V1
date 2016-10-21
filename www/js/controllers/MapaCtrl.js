'use strict';

angular.module('starter').controller('MapaCtrl', MapaCtrl);

function MapaCtrl($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $cordovaGeolocation, NgMap, $geofire, accessFactory){

    $scope.searchResults = [];
    
    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
       $scope.$parent.mc_Lovin();
       console.log("mapas!!!");
    });


    
    
    var $geo = $geofire(accessFactory.pegaMapeamento());

    var options = {timeout: 20000, enableHighAccuracy: true};  
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      
      $scope.coords = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      console.log($scope.coords);

      var query = $geo.$query({
        center: [$scope.coords.lat, $scope.coords.long],
        radius: 1
      });
 
      var geoQueryCallback = query.on("key_entered", "SEARCH:KEY_ENTERED");

      $scope.$on("SEARCH:KEY_ENTERED", function (event, key, location, distance) {
          var obje = {key: key, location: location, distance: distance};
          
          console.log("entrou "+ key);
          var fatUser = accessFactory.pegaAcademiaUnica(key);
          fatUser.once('value').then(function(snapshot) {
            obje.info = snapshot.val();
            $scope.searchResults.push(obje);
          });
          console.log($scope.searchResults)  
      });

             NgMap.getMap().then(function(map) {
        $scope.map = map;
      });   
    
    }, function(error){
      console.log("Could not get location");
    });


    $scope.mandapraLa = function(evt, chave){
      console.log(chave);
      $scope.resulte = $scope.searchResults[chave];
      console.log($scope.resulte)
      console.log($scope.resulte.info.nome)
      $scope.map.showInfoWindow('mostra', this);     
    }


};