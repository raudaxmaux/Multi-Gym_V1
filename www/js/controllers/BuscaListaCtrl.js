(function(){
	'use_strict';

angular.module('starter').controller('BuscaListaCtrl', BuscaListaCtrl);

	BuscaListaCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout', '$stateParams', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject', '$filter', 'acadFactory'];

	function BuscaListaCtrl($scope, $rootScope, $location, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $filter, acadFactory){

	    $scope.$on("$ionicView.enter", function(event, data){
	       // handle event
	       $scope.$parent.showHeader();
	       $scope.usuarioAtivo = $rootScope.usuarioAtivo;
	       console.log("aqui");
	       console.log(acadFactory.pegaAcademias());
	    });

	    $scope.fillCities = function(){
		    $timeout(function() {
		   		$scope.listagem = acadFactory.pegaAcademias();
		   		console.log($scope.listagem)
		   	}, 600);
	    };
	    


	    $scope.sendCity = function(lugar){
	    	console.log(lugar);
	    	$rootScope.citysearch = lugar;
	    	$location.path("app/busca_cidades"); 
	    };


	    $scope.fillCities();


 		$timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


	};	
})();