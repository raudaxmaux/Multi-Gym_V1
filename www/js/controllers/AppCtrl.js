'use strict';

angular.module('starter')
.controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, $location, $ionicModal, $ionicPopover, $timeout, FireAuth, AgendarTreino){
     // Form data for the login modal
  $scope.userUid = '';
  $scope.userData = [];
  $scope.array = [];
  $scope.agendaDeTreinos = [];
  $scope.treinoZerado = false;
  $scope.foto = 'img/photoless.jpg';

    $scope.$on("$ionicView.enter", function(event, data){
        firebase.auth().onAuthStateChanged(function(user){          
            if(user){
                console.log("com user");
                $scope.userUid = user.uid;   
                AgendarTreino.theId = $scope.userUid;     
                $scope.hereGoes = true;
                FireAuth.pegaUser($scope.userUid, $scope);
                if($scope.agendaDeTreinos.length === 0 && !$scope.treinoZerado){
                  console.log("não entrei antes")
                  AgendarTreino.arrAgenda($scope.userUid)
                    $timeout(function(){
                      $scope.agendaDeTreinos = AgendarTreino.getAgenda();
                      $rootScope.agendaDeTreinos = $scope.agendaDeTreinos


                    }, 1000);
                  if($rootScope.agendaDeTreinos.length === 0){
                    $scope.treinoZerado = true;
                  }else{
                      console.log("agenda carregada normalmente")                        
                  }
                }else{
                  console.log('Agenda OK')
                }
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
      if($rootScope.usuarioAtivo.academia){
        AgendarTreino.getMyAgenda($scope.userUid, $scope);

         $scope.$watch("agendamentos", function(newValue, oldValue){
          var velho = newValue;

          if(velho == Object){
            console.log("mudou");
            var keys = Object.keys(velho)

            console.log(keys.length)            
          }
          console.log(newValue)
          $rootScope.$broadcast("mudaAgenda");           
        })
               
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