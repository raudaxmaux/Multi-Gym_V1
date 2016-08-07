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
      $cordovaToast.show(message, 'long', 'center');
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

.controller('Agendar_treinosCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.showHeader();
    });

})

////////////////////////////////////////
// Busca
////////////////////////////////////////

.controller('BuscaCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
  $scope.$parent.showHeader();
  $scope.isExpanded = false;
//  $scope.$parent.setExpanded(false);
//  $scope.$parent.setHeaderFab('right');
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
