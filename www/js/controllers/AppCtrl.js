'use strict';

angular.module('starter')
.controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, $location, $ionicModal, $ionicPopover, $timeout, FireAuth){
     // Form data for the login modal
$scope.userUid = '';
  $scope.userData = [];

  $scope.foto;
  $scope.nome;

    $scope.$on("$ionicView.enter", function(event, data){
        firebase.auth().onAuthStateChanged(function(user){          
            if(user){
                console.log("com user");
                $scope.userUid = user.uid;
                $scope.hereGoes = true;
                FireAuth.pegaUser($scope.userUid, $scope);
            }else{
                console.log("Sem user");
            };
        });


    });


    ////////////////////////////////////////
    // Pega Caras
    ////////////////////////////////////////

    $rootScope.$on("getUserInfo", function(ev){
        console.log("getUserInfo");
        console.log($rootScope.usuarioAtivo);
        //$scope.mandaPerfi($rootScope.usuarioAtivo);
      if($rootScope.usuarioAtivo.photoURL !== '' || $rootScope.usuarioAtivo.photoURL !== undefined){
        $scope.foto = $rootScope.usuarioAtivo.photoURL;
      }else{
        $scope.foto = 'img/profile-icon.png';
      }
      if(!$rootScope.usuarioAtivo.displayName){
        $scope.nome = "Olá, visitante";
      }else{
          $scope.nome = $rootScope.usuarioAtivo.displayName;

      }        
    })

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
        console.log("esconde Nav Bar");
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
        console.log("mostra Nav Bar");        
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


    $scope.mandaPerfil = function(Arraial){
        console.log("perfil enviado");
      
      if(Arraial.photoURL !== '' || Arraial.photoURL !== undefined){
        $scope.foto = Arraial.photoURL;
      }else{
        $scope.foto = 'img/profile-icon.png';
      }
      if(!Arraial.displayName){
        $scope.nome = "Olá, visitante";
        $scope.aviso();
      }else{
          $scope.nome = Arraial.displayName;

      }
    };



};