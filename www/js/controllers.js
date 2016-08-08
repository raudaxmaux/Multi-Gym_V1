/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $location, $ionicModal, $ionicPopover, $timeout, $cordovaToast) {
    // Form data for the login modal
    $scope.loginData = {};


    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        console.log("fecha Nav Bar");
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };


    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    /*  Hide Login Nav Bar  */
    $scope.loginHiderNav = function(){
      $timeout(function() {
        $scope.hideHeader();
      }, 0);
      $location.path("app/login_inicial");
    };


    $scope.toastMess = function(message){
      console.log(message);
      $cordovaToast.showLongCenter(message).then(function(success) {
          // success
        }, function (error) {
          // error
        });
    };

})


////////////////////////////////////////
// Login
////////////////////////////////////////

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $timeout(function() {
      $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

////////////////////////////////////////
// Perfil
////////////////////////////////////////

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

  $scope.$on("$ionicView.enter", function(event, data){
     // handle event
     $scope.$parent.showHeader();
  });


       // Set Motion
       $timeout(function() {
           ionicMaterialMotion.slideUp({
               selector: '.slide-up'
           });
       }, 300);

       $timeout(function() {
           ionicMaterialMotion.blinds({
               startVelocity: 3000
           });
       }, 300);

       // Set Ink
       ionicMaterialInk.displayEffect();

})



.controller('PerfilCompCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
    });



  // Set Motion
  $timeout(function() {
      ionicMaterialMotion.slideUp({
          selector: '.slide-up'
      });
  }, 300);

  $timeout(function() {
      ionicMaterialMotion.blinds({
          startVelocity: 3000
      });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();


  $scope.ajuda = function(mensagem){
    $scope.$parent.toastMess(mensagem);
  }
})
////////////////////////////////////////
// Avisos
////////////////////////////////////////

.controller('AvisosCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

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
})


////////////////////////////////////////
// Treinos
////////////////////////////////////////

.controller('Treinos_agendadosCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup) {

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
    });

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

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();    

})

.controller('Agendar_treinosCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup) {

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
    });

$scope.tipPopUp = function() {

   var alertPopup = $ionicPopup.alert({
     title: 'Escolha via Listagem',
     template: 'Área em desenvolvimento.'
   });
 };

})


.controller('MapaCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $cordovaGeolocation) {
  $scope.$parent.showHeader();
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


     
 


})

////////////////////////////////////////
// Busca
////////////////////////////////////////

.controller('BuscaCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup) {
  $scope.$parent.showHeader();
  $scope.isExpanded = false;
//  $scope.$parent.setExpanded(false);
//  $scope.$parent.setHeaderFab('right');

$scope.tipPopUp2 = function() {

   var alertPopup = $ionicPopup.alert({
     title: 'Escolha via Listagem',
     template: 'Área em desenvolvimento.'
   });
 };

})

////////////////////////////////////////
// Controles de associado
////////////////////////////////////////



.controller('SeriesCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
  $scope.$parent.showHeader();
  $scope.isExpanded = false;
//  $scope.$parent.setExpanded(false);
//  $scope.$parent.setHeaderFab('right');
});
