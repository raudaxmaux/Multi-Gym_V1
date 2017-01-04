'use strict';

angular.module('starter').controller('Treinos_agendadosCtrl', Treinos_agendadosCtrl);

function Treinos_agendadosCtrl($scope, $rootScope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, Utils, AgendarTreino, accessFactory){

$scope.misacads = [];

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


   $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.diadehoje = new Date();
       $scope.$parent.showHeader();
       console.log ("aqui");
       console.log($scope.$parent.agendaDeTreinos)
       Utils.show()
    });
      $scope.$on("$ionicView.leave", function(event){
        $scope.misacads = null;
      });

    $scope.mastermix = function(){
       Utils.hide(); 
        angular.forEach($scope.treinosAgora, function(value, key){
              console.log(value.academia)
              var mineAcad = accessFactory.pegaAcademiaUnica(value.academia)
              mineAcad.once("value").then(function(snapshot){
               var objSingle =  snapshot.val();
               objSingle.id = snapshot.key             
              $scope.misacads.push(objSingle);
          })
        });
    };

        $timeout(function(){
       //$rootScope.agendaDeTreinos = agendaMinha;
        $scope.treinosAgora = $scope.$parent.agendaDeTreinos;
        $scope.treinosAgora.reverse();
        console.log($scope.treinosAgora);
        $scope.mastermix();          
       }, 3000);

    $scope.acadDetails = function(tipo, idAcad){
        var targetAcad = {}
        var ditto = '';
        angular.forEach($scope.misacads, function(value, key){
            if(value.id === idAcad){
                targetAcad = value;
                //console.log(targetAcad)
            }
        });


        if(tipo === "imagem"){
            ditto = targetAcad.logo.url;
            console.log(ditto)
        }
        if(tipo ==="nome"){
            ditto = targetAcad.nome;
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
        return ditto
    };




















    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();    


};