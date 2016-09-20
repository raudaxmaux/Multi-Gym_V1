(function(){
	'use_strict';

angular.module('starter').controller('BuscaListaCidadesCtrl', BuscaListaCidadesCtrl);

	BuscaListaCidadesCtrl.$inject = ['$scope', '$rootScope', '$location', '$timeout', '$stateParams', 'ionicMaterialMotion', 'ionicMaterialInk', '$firebaseObject', '$filter', 'acadFactory'];

	function BuscaListaCidadesCtrl($scope, $rootScope, $location, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $filter, acadFactory){

	    $scope.$on("$ionicView.enter", function(event, data){
	       // handle event
	       $scope.$parent.showHeader();
	       $scope.usuarioAtivo = $rootScope.usuarioAtivo;
	       
	       $scope.citysearch = $rootScope.citysearch;	
			console.log("Lista de academias em " + $scope.citysearch);
			$scope.fillFitness();
	    });
	    $scope.$on("$ionicView.beforeLeave", function(event){
	    	$scope.listaum = [];  	
	    })

	    $scope.fillFitness = function(){
	    	$scope.listaum = []
		    $timeout(function() {
		   		$scope.listaum = acadFactory.fitByCity($rootScope.citysearch);
		   		console.log("COMEÇOU!!!");
	//	   		acadFactory.fitByCity($rootScope.citysearch);
		   		console.log($scope.listaum);
		   		//$scope.logo = acadFactory.acadPhotos($scope.listaum.logo, $scope.listaum.$id);
		   		//console.log($scope.logo);
		   	}, 600);
	    };	    

	    $scope.pickAcademy = function(ela){
	    	$rootScope.chosenAcad = ela;
//	    	console.log(ela)
	    	$location.path("app/resultado_academia");
	    }

 $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();


	};	
})();