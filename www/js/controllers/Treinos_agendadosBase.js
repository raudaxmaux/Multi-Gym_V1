'use strict';

angular.module('starter').controller('Treinos_agendadosCtrl', Treinos_agendadosCtrl);

function Treinos_agendadosCtrl($scope, $rootScope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, Utils, AgendarTreino, accessFactory, $ionicPopup){


/////////////////////////////////////////

/* CONFIRMAÇÕES */

$scope.showConfirm01 = function(ves) {
    console.log(ves)
   var confirmPopup = $ionicPopup.confirm({
     title: 'Cancelar Treino',
     cssClass: 'popme',
     template: 'Você tem certeza ?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
       AgendarTreino.changeAppStatus(ves.$id)
     } else {
       console.log('You are not sure');
     }
   });
 };

/////////////////////////////////////////

  $scope.$on("$ionicView.enter", function(event, data){
         // handle event

       $scope.$parent.showHeader();
         Utils.show()
        $scope.misacads = [];
        $scope.diadehoje = new Date();
  });

  $scope.$on("$ionicView.leave", function(event){
    $scope.misacads = [];
  });

/////////////////////////////////////////




      $scope.masterplan = function(){
        console.log("masterplan")              
        $scope.misacads = [];
        var middle = AgendarTreino.arrAgenda($scope.$parent.userUid);
        console.log(middle)
        console.log("/////////////////////////////////////") 
        angular.forEach(middle, function(value, key){

            console.log(value.academia)
            var mineAcad = accessFactory.pegaAcademiaUnica(value.academia)
            mineAcad.once("value").then(function(snapshot){      
                value.datos = snapshot.val();
                $scope.misacads.push(value)
                console.log(value)

            });
            $timeout(function(){
                    $scope.misacads.reverse();
                    Utils.hide();
             }, 2000);  

        });

  
    }

///////////////////////////////////////////////////////////////////

/* DETALHES DA ACADEMIA */
    $scope.acadDetails = function(tipo, idAcad){
      var ditto = "";
      var targetAcad = {}
      angular.forEach($scope.misacads, function(value, key){
        if(value.academia === idAcad){
          targetAcad = value.datos
        }
        
      });

      if(tipo === "nome"){
          ditto = targetAcad.nome;
          console.log(ditto)
      }
      if(tipo === "imagem"){
          ditto = targetAcad.logo.url;
          console.log(ditto)
      }
      if(tipo === "endereco"){
            var complex = targetAcad.endereco.endereco+" "+targetAcad.endereco.numero;
            if(targetAcad.endereco.complemento){
              complex = complex+"/"+targetAcad.endereco.complemento;
            }
            ditto = complex;
            console.log(complex)
      }
     if(tipo === "bairro"){
          ditto = targetAcad.endereco.bairro;
          console.log(ditto)
    }     

      return ditto;
    }


    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    $scope.acertaZero = function(minuts){
      if(minuts !== 0){
        return minuts
      }else{
        console.log("ops");
        return "00"
      }
    };      

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

    $scope.judgeDredd = function(tolo){
      var compromisso = tolo;
      var status = "indefinido";
      var day_o = new Date();
      day_o.setHours(0,0,0,0);
      var day_d = compromisso.dia ;
      if(compromisso.status === 0){
        status = "Aguardando";
       $scope.hideBut = false;         
      }
      if(compromisso.status === 0 && day_d < day_o){
        status = "Faltou";
        $scope.hideBut = true;
      }      
      if(compromisso.status === 1){
       status = "liberado"
       $scope.hideBut = false; 
      }
      if(compromisso.status === 3){
       status = "usuário cancelou"
       $scope.hideBut = true; 
      }
      if(compromisso.status === 4){
       status = "academia cancelou";
       $scope.hideBut = false;        
      }
      if(compromisso.status === 4 && day_d < day_o){
        status = "Faltou";
        $scope.hideBut = true;       
      }

      return status;
    };

      $scope.stateClass = function(tolo){
        var compro = tolo;
        var labe = "label label-default";
        // DIA
        var day_o = new Date();
        day_o.setHours(0,0,0,0);
        var day_d = compro.dia ;

        ///////
        var hora_o = new Date(compro.hora * 1000)
        console.log()

        if(compro.status === 0){
          labe = "label label-success"
        }
         if(compro.status === 0 && day_d < day_o){
          labe = "label label-danger"
        }       
        if(compro.status === 1){
         labe = "label label-info" 
        }
        if(compro.status === 3){
         labe = "label label-danger" 
        }
        if(compro.status === 4){
         labe = "label label-warning" 
        }
        return labe;
      };


    $timeout(function(){
        $scope.masterplan()
        Utils.hide();
     }, 2000);


    // Activate ink for controller
    ionicMaterialInk.displayEffect();     
};