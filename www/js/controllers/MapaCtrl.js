'use strict';

angular.module('starter').controller('MapaCtrl', MapaCtrl);

MapaCtrl.$inject = ['$scope', '$timeout', '$stateParams', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject', '$cordovaGeolocation'];

function MapaCtrl($scope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $cordovaGeolocation){

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
       $scope.$parent.mc_Lovin();
       console.log("mapas!!!");
    });

  $scope.isExpanded = false;
//  $scope.$parent.setExpanded(false);
//  $scope.$parent.setHeaderFab('right');

var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      streetViewControl:false,
      mapTypeControl:false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });  

 var infoWindow = new google.maps.InfoWindow({
      content: "Você está aqui!<br/><a href='#/app/series'>Clique aqui para acessar um perfil prévio de academia.</a>"
  });
 

  $timeout(function() {
        infoWindow.open($scope.map, marker);
  }, 2000);

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });     
 
  }, function(error){
    console.log("Could not get location");
  });


};