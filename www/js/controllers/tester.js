'use strict';

angular.module('starter').controller('Agendar_treinosCtrl', Agendar_treinosCtrl);

function Agendar_treinosCtrl($scope, $rootScope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, ionicDatePicker, ionicTimePicker, outAcad){

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
		$scope.$parent.showHeader();
		$scope.usuarioAtivo = $rootScope.usuarioAtivo;
		$scope.$parent.showHeader();
		$scope.dataDoTreino = new Date();
		$scope.initTime = new Date(val * 1000);
		$scope.horaDoTreino = $scope.initTime.getUTCHours()+":"$scope.initTime.getUTCMinutes();
    });

        if(outAcad){
       		console.log("ok")
       		console.log(outAcad);
       		$scope.appointed_acad = outAcad;
       		$scope.acad_agend = $scope.appointed_acad.nome;
       }  

       $scope.calendObj = {
       		callback: function(val){
       			console.log (val)
       			$scope.dataDoTreino = val;
       		},
       		setLabel: 'OK',
       		todayLabel: 'Hoje',
       		closeLabel: 'Fechar',
       		weeksList: ["S", "T", "Q", "Q", "S", "S", "D"],
       		monthsList: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
       		templateType: 'popup',
			dateFormat: 'dd MMMM yyyy',
			closeOnSelect: false       		
       };

       //////////////////////////////////////////////////////////////////////////////////////////////////////
       
       $scope.fitnessTime = {
	    callback: function (val) {
			//Mandatory
	      if (typeof (val) === 'undefined') {
	        console.log('Time not selected');
	      } else {
	        var selectedTime = new Date(val * 1000);
	        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
	        $scope.horaDoTreino = selectedTime.getUTCHours()+":"selectedTime.getUTCMinutes();
	      }
	    },
	    inputTime: 50400,   //Optional
	    format: 24,         //Optional
	    step: 15,           //Optional
	    setLabel: 'Marcar'    //Optional
	  };

       $scope.normDate = function(){
       	 ionicDatePicker.openDatePicker($scope.calendObj);	
       };

         $scope.normHour = function(){
       	 ionicTimePicker.openTimePicker($scope.fitnessTime);
       };     

$scope.tipPopUp = function() {

   var alertPopup = $ionicPopup.alert({
     title: 'Escolha via Listagem',
     template: 'Área em desenvolvimento.'
   });
 };


};