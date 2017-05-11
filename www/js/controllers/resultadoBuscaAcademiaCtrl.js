(function(){
	'use_strict';

	angular.module('starter').controller('resultadoBuscaAcademiaCtrl', resultadoBuscaAcademiaCtrl);

	function resultadoBuscaAcademiaCtrl($scope, $rootScope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $filter, acadFactory, accessFactory, unicaAcad, Utils, AgendarTreino, $location, $ionicModal, $ionicPopup, $localStorage){
	    $scope.$on("$ionicView.enter", function(event, data){
	       // handle event
	       $scope.$parent.showHeader();
	       $scope.usuarioAtivo = $rootScope.usuarioAtivo;
	       
	    	});
	    $scope.$on("$ionicView.leave", function(event){
	    	$scope.parceiro = null;
        $scope.partId = null;
        console.log("saí daqui"); 
	    });
      
      console.log("academia chegou!")

      //console.log($stateParams.id)
      //console.log(unicaAcad)
        $scope.partId = $stateParams.id;
   		  $scope.parceiro = unicaAcad;
        console.log("parceiro abaixo com id "+$scope.partId)
   		  console.log($scope.parceiro);


	    $scope.theBasics = function(){
	    	$scope.endereco_completo = $scope.parceiro.endereco.endereco+" "+$scope.parceiro.endereco.numero;
			if($scope.parceiro.endereco.complemento){
				$scope.endereco_completo = $scope.endereco_completo+"/"+$scope.parceiro.endereco.complemento;
			}
			$scope.endereco_completo = $scope.endereco_completo+" - "+$scope.parceiro.endereco.bairro;
			$scope.modalidades = $scope.parceiro.modalidades;
			$scope.beneficios = $scope.parceiro.beneficios;
			$scope.fotos = $scope.parceiro.fotos;

		}

      $scope.schedMe = function(){
        console.log($rootScope.usuarioAtivo.$id)
      };


        $scope.theBasics();

//////////////////////////////////////////////////////////////////////
/*Não esquecer de injetar Utils, AgendarTreino, $location, $ionicModal, $ionicPopup, ngStorage, $location */
    $scope.acadio = {};
    var appointment = {};

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
      console.log(idd);
      console.log("////////////////////////////////////")
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
          console.log("clique Djá!!!");
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
                // mudei por causa do resultado
                //academia: $scope.acadio.$id,
                academia: $scope.partId,
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
        if($localStorage.marcacao){
          Utils.alertshow('Erro', 'Já existe uma marcação agendada.');
        }else{
          appointment.id_geral = idis
          $localStorage.marcacao = appointment;
          $location.path('app/passaporte');
          //Utils.alertshow('Sucesso', 'Agendamento gravado com sucesso. Você tem até 1 hora para chegar à academia.');
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

//////////////////////////////////////////////////////////////////////



 		$timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 600);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

	};
})();