(function(){
	'use_strict';

	angular.module('starter').controller('resultadoBuscaAcademiaCtrl', resultadoBuscaAcademiaCtrl);

	function resultadoBuscaAcademiaCtrl($scope, $rootScope, $ionicModal, $location, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $filter, acadFactory, accessFactory, unicaAcad){
	    $scope.$on("$ionicView.enter", function(event, data){
	       // handle event
	       $scope.$parent.showHeader();
	       $scope.usuarioAtivo = $rootScope.usuarioAtivo;
	       
	    	});
	    $scope.$on("$ionicView.leave", function(event){
	    	$scope.parceiro = null;
        $scope.partId = null;
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

	};
})();