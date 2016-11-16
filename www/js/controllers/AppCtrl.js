'use strict';

angular.module('starter')
.controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, $location, $ionicModal, $ionicPopover, $timeout, FireAuth){
     // Form data for the login modal
$scope.userUid = '';
  $scope.userData = [];

  $scope.foto = 'img/photoless.jpg';

    $scope.$on("$ionicView.enter", function(event, data){
        firebase.auth().onAuthStateChanged(function(user){          
            if(user){
                console.log("com user");
                $scope.userUid = user.uid;           
                $scope.hereGoes = true;
                FireAuth.pegaUser($scope.userUid, $scope);
                //$location.path("app/loginfo");                
            }else{
                console.log("Sem user");
                $scope.hereGoes = false;
                $scope.foto = 'img/photoless.jpg';
               // $location.path("app/login_inicial");              
            };
        });


    });


    
    ////////////////////////////////////////
    // Pega Caras
    ////////////////////////////////////////

    $rootScope.$on("getUserInfo", function(ev){
        console.log("getUserInfo");
        $rootScope.unregistered = $rootScope.usuarioAtivo.pagante;     
      if($rootScope.usuarioAtivo.photoURL !== '' || $rootScope.usuarioAtivo.photoURL !== undefined){
        $scope.foto = $rootScope.usuarioAtivo.photoURL;

        console.log("tem foto")
      }else{
        console.log("não tem foto")
      }
      if(!$rootScope.usuarioAtivo.displayName){
        $scope.nome = "Olá, visitante";
      }else{
          $scope.nome = $rootScope.usuarioAtivo.displayName;

      }
      console.log("Fiquei bem na foto: " + $scope.foto)           
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
    //  $location.path("app/loginfo");
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


    $scope.join = function(){
      console.log("Este botão é para juntar-se ao clube")
    };



};