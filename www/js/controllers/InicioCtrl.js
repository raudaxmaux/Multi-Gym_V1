'use strict';

angular.module('starter').controller('InicioCtrl', InicioCtrl);

function InicioCtrl($scope, $rootScope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $cordovaGeolocation, $ionicPlatform, $http, acadFactory, NgMap, geoPos, Utils, AgendarTreino, $location, $ionicModal, $ionicPopup, $localStorage){
    


    $scope.$on("$ionicView.beforeEnter", function(event, data){
       if($localStorage.marcacao){
          console.log("está comprometido")
          $location.path('app/passaporte');
          Utils.hide();
       }
    });

      $scope.$on("$ionicView.enter", function(event, data){
       // handle event

       $scope.$parent.showHeader();

    if(geoPos){
      console.log(geoPos)
          $rootScope.lat = geoPos.coords.latitude;
          $rootScope.long = geoPos.coords.longitude;
          $scope.academyGeoRequest();         
          console.log("abre!")
          Utils.hide();                    
    }else{
                Utils.alertshow('Sem academias', 'Academias não encontradas. Verifique se seu GPS está ativado.');      
    }

    });

    $scope.acadio = {};
    var appointment = {};
    $scope.buttonDisabled = false;

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

                NgMap.getMap("primeiro").then(function(map) {
                  $scope.map = map;
                  console.log("fecha!")
                  Utils.hide();
                });                  

           },function(error){
                console.log("fecha!")
                Utils.hide();
                console.log("Não foi possível achar as academias");
                //$scope.tipPopUp('Sem academias', 'Academias não encontradas. Verifique se seu GPS está ativado.');
                //Utils.alertshow('Sem academias', 'Academias não encontradas. Verifique se seu GPS está ativado.');
                Utils.alertshow('Sem academias', 'Academias não encontradas. Mesmo com GPS ativado.');
       	 });

    };

            console.log($scope.usuarioAtivo);

    $scope.throwAcad = function(id){
    	console.log("Monte aqui minhas academias! "+id )
                      console.log("fecha!")
                Utils.hide();
    };


  $scope.isExpanded = false;
//  $scope.$parent.setExpanded(false);
//  $scope.$parent.setHeaderFab('right');


    $scope.mostraMe = function(evt, chave){
      console.log(chave);
      $scope.resultado = $scope.frontAcads[chave];
      console.log($scope.resultado)
      console.log($scope.resultado.nome)
      $scope.map.showInfoWindow('mostra', this);     
    }

    $scope.schedMeSoon = function(){
         console.log($rootScope.usuarioAtivo.$id)     
    };


//////////////////////////////////////////////////////////////////////
/*Não esquecer de injetar Utils, AgendarTreino, $location, $ionicModal, $ionicPopup, ngStorage, $location */

/* CONTROLES DO MODAL */
    $scope.acertaZero = function(minuts){
      if(minuts !== 0){
        return minuts
      }else{
        console.log("ops");
        return "00"
      }
    };  

    $scope.agendar01 = function(idd){
      $scope.acadio = {}
      $scope.acadio = idd;
      $scope.modal.show();
    };
    
    $scope.closeModal = function(){
      $scope.modal.hide();
    }

/* MODAL PARA ONE-CLICK CHRCK-IN */
  $ionicModal.fromTemplateUrl('templates/modal/umclique.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

/* VISUALIZANDO A HORA DO COMPROMISSO */
$scope.horeador = function(tictac){
          var selectedTime = new Date(tictac * 1000);
          console.log('Selected epoch is : ', tictac, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
          var toe = selectedTime.getUTCHours()+":"+$scope.acertaZero(selectedTime.getUTCMinutes());
          if(toe !== '0:00' || $scope.horaok === true){
            return toe;
        }else{
          return "";
        }
    };

/* ANOTANDO O COMPROMISSO */
  $scope.cliqueJa = function() {

        if($localStorage.marcacao){
          Utils.alertshow('Erro', 'Já existe uma marcação agendada.');
        }else{
          console.log("clique Djá!!!")
          var agora = new Date();
          var agoraReq = agora.getTime();
          var agora2 = new Date(agora);
          var novaHora = agora.getHours()+1
          agora2.setHours(novaHora);
          console.log(agora2)
          agora2 = 60*(agora2).getHours()*60+60*(agora2).getMinutes();
          console.log(agora2)
          console.log($scope.horeador(agora2))
          var marcacao = {
                usuario: $rootScope.usuarioAtivo.$id,
                academia: $scope.acadio.$id,
                dia: agoraReq,
                hora: agora2,
                obs: "",
                oneclick:true,
                data_requisicao: agoraReq,
                status: 0          
          }
          console.log(marcacao);
          appointment = {
            nome_acad: $scope.acadio.nome,
            logo_acad:$scope.acadio.logo.url,
            id_acad: $scope.acadio.$id,
            /* info aluno */
            nome_cliente: $rootScope.usuarioAtivo.displayName, 
            foto_cliente: $rootScope.usuarioAtivo.photoURL,
            id_cliente: $rootScope.usuarioAtivo.$id,
            /* info aluno */
            hora_agendada: agora2
          }
          AgendarTreino.saveAgenda(marcacao)
          $scope.closeModal();
    }
  };

/* BROADCASTS DO COMPROMISSO */
      $rootScope.$on('saved_Sched', function (event, idis) {
          appointment.id_geral = idis

        if($localStorage.marcacao){
 //         Utils.alertshow('Erro', 'Já existe uma marcação agendada.');
            console.log("escapou")
        }else{
          $localStorage.marcacao = appointment;        
          $location.path('app/passaporte');
        }      
      });
      $rootScope.$on('error_Sched', function (event) {
          Utils.alertshow('Erro', 'Por favor, tente novamente.');       
      });

  $scope.sendMark = function(){
      $location.path("app/agendar_treinos/"+$scope.acadio.$id);
      $scope.closeModal()
  } 
//////////////////////////////////////////////////////////////////////
};