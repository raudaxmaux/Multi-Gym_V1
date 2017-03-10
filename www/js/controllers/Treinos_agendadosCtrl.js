'use strict';

angular.module('starter').controller('Treinos_agendadosCtrl', Treinos_agendadosCtrl);

function Treinos_agendadosCtrl($scope, $rootScope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, Utils, AgendarTreino, accessFactory, $ionicPopup){


 $scope.$on("$ionicView.enter", function(event, data){
         // handle event

        $scope.$parent.showHeader();
        $scope.diadehoje = new Date();
        $scope.vaiMudar = false;
        $scope.showBut = false;
  });

$rootScope.$on("mudaAgenda", function(ev){
  if($scope.vaiMudar){
      $scope.vaiMudar = false;
      $scope.masterplan()
  }
});

/////////////////////////////////////////

$scope.masterplan = function(){
        console.log("em masterplan")
        var Olaf = 0;
        $scope.misacads = [];
        var middle = []
        var acadNotes = accessFactory.pegaAgendamento();
        meuAcadNotes = acadNotes.orderByChild("usuario").equalTo($scope.userUid);
        meuAcadNotes.on("child_added", function(snapshot){
          middle.push(snapshot.val())
          middle[Olaf].agendaId = snapshot.key;
          Olaf++;
        })
        $timeout(function(){
          arranja(middle)
        }, 500);
}


function arranja(arr) {
  // body...
  console.log("em arranja")  
  var passodoble = []
  passodoble = arr;
  angular.forEach(passodoble, function(valor, chave){
      //console.log(valor.academia)
      var mineAcad = accessFactory.pegaAcademiaUnica(valor.academia)
      mineAcad.once("value").then(function(snapshot){ 
        valor.datos = snapshot.val();
        $scope.misacads.push(valor)
        console.log(valor)
        $scope.$apply();  
      });
        
  }); 
}

///////////////////////////////////////////////////////////////////

/* DETALHES DA ACADEMIA */
    $scope.acadDetails = function(tipo, idAcad){
      console.log("em acadDetails") 
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

/////////////////////////////////////////

/* ACERTO DE DATA */

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
       $scope.vaiMudar = true;
       AgendarTreino.changeAppStatus(ves.agendaId);
     } else {
       console.log('You are not sure');
     }
   });
 };

/////////////////////////////////////////

/* STATUS DAS MARCAÇÕES */

    $scope.judgeDredd = function(tolo){
      var compromisso = tolo;
      var status = "indefinido";
      var day_o = new Date();
      day_o.setHours(0,0,0,0);
      var day_d = compromisso.dia ;
      if(compromisso.status === 0){
        status = "Aguardando";
       $scope.showBut = true;         
      }
      if(compromisso.status === 0 && day_d < day_o){
        status = "Faltou";
        $scope.showBut = false;
      }      
      if(compromisso.status === 1){
       status = "liberado"
       $scope.showBut = false; 
      }
      if(compromisso.status === 3){
       status = "usuário cancelou"
       $scope.showBut = false; 
      }
      if(compromisso.status === 4){
       status = "Cancelado pela academia";
       $scope.showBut = false;        
      }
      if(compromisso.status === 4 && day_d < day_o){
        status = "Cancelado pela academia";
        $scope.showBut = false;       
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
          labe = "balanced"
        }
         if(compro.status === 0 && day_d < day_o){
          labe = "assertive"
        }       
        if(compro.status === 1){
         labe = "label label-info" 
        }
        if(compro.status === 3){
         labe = "balanced" 
        }
        if(compro.status === 4){
         labe = "energized" 
        }
        return labe;
      };


/////////////////////////////////////////


  $timeout(function(){
       $scope.userUid = $scope.$parent.userUid;
       console.log("O uid do usuário é "+$scope.userUid)
       $scope.masterplan();
  }, 2000);



    // Activate ink for controller
    ionicMaterialInk.displayEffect();     
};