'use strict';

angular.module('starter')
.controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, $location, $ionicModal, $ionicPopover, $timeout, FireAuth){
     // Form data for the login modal

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    $timeout(function() {
        console.log($scope.hereGoes + " daqui do menu.");
        
    }, 600);   
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////


    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
        console.log("fecha Nav Bar");
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        console.log("abre Nav Bar");        
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

    $scope.mc_Lovin = function() {
        console.log("McLoving is the best"); 
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


     /*  Hide Logout Nav Bar  */
    $scope.logoutHiderNav = function(){
      $timeout(function() {
        $scope.hideHeader();
      }, 0);
      $location.path("app/logout");
    };   


    $scope.toastMess = function(message){
      console.log(message);
      $cordovaToast.showLongCenter(message).then(function(success) {
          // success
        }, function (error) {
          // error
        });
    };
};