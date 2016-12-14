  'use_strict';

  angular.module('starter').controller('RegisterNextCtrl', RegisterNextCtrl);

  function RegisterNextCtrl($scope, $rootScope, $ionicModal, $location, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $filter, acadFactory, accessFactory, service_Register, Utils){

        $scope.$on("$ionicView.enter", function(event, data){
         // handle event
         $scope.$parent.showHeader();
         $scope.usuarioAtivo = $rootScope.usuarioAtivo;
         $scope.parceiro = service_Register.passingData.info;
         $scope.partnerKey = service_Register.passingData.key;
          console.log("academia chegou!")
          console.log($scope.partnerKey);
          console.log($scope.parceiro);
          $scope.theBasics();        
        });
        $scope.$on("$ionicView.leave", function(event){
          $scope.parceiro = null
        });

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

    $scope.vemPraCa = function(){
      Utils.show();
      var modsFinais = {
        pagante: true,
        academia: $scope.partnerKey
      };
      var dataRef = accessFactory.pegaUsuario($scope.usuarioAtivo.uid);
      dataRef.update(modsFinais).then(function(success){
          console.log("update done")
          $scope.massification();
      },function(error){
          Utils.hide();
      });
    };


    $scope.massification = function(){
        var adesao = Date.now();
        var objeIns = {
          data_de_adesao: adesao
        }
        var join = accessFactory.pegaAqueleAlunoEmAcademia($scope.partnerKey+"/"+$scope.usuarioAtivo.uid)
        join.update(objeIns);
        Utils.hide();
        $location.path("app/registro_final")      
    }

       // $scope.theBasics();
/////////////// modal

    $ionicModal.fromTemplateUrl('templates/registro/modal_window.html', {
          scope: $scope,
          animation: 'slide-in-up',
       }).then(function(modal) {
          $scope.modal = modal;
       });
      
       $scope.openModal = function() {
          $scope.modal.show();
       };
      
       $scope.closeModal = function() {
          $scope.modal.hide();
       };
      
       //Cleanup the modal when we're done with it!
       $scope.$on('$destroy', function() {
          $scope.modal.remove();
       });
      
       // Execute action on hide modal
       $scope.$on('modal.hidden', function() {
          // Execute action
       });
      
       // Execute action on remove modal
       $scope.$on('modal.removed', function() {
          // Execute action
       });

      $timeout(function() {
          ionicMaterialMotion.fadeSlideIn({
              selector: '.animate-fade-slide-in .item'
          });
      }, 600);

      // Activate ink for controller
      ionicMaterialInk.displayEffect();

  };

/*

/////////////// modal

$ionicModal.fromTemplateUrl('templates/modal_window.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
   });
  
   $scope.openModal = function() {
      $scope.modal.show();
   };
  
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
  
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
  
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
  
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });


    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 600);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

*/