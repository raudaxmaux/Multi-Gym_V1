'use strict';

angular.module('starter').controller('Agendar_treinosCtrl', Agendar_treinosCtrl);

function Agendar_treinosCtrl($scope, $rootScope, $timeout, $stateParams, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, ionicDatePicker, ionicTimePicker, outAcad, accessFactory, AgendarTreino, Utils){

    $scope.$on("$ionicView.enter", function(event, data){
       // handle event
       	
       	$scope.academia_ID = $stateParams.id
		$scope.$parent.showHeader();
		$scope.usuarioAtivo = $rootScope.usuarioAtivo;
		$scope.$parent.showHeader();
		$scope.dataDoTreino = "";
		$scope.horaDoTreino = "";
		$scope.horaok = false;
		console.log("O usuário é "+$scope.usuarioAtivo)
		$scope.observacoes = '';
		$scope.agora = new Date()
    });

        if(outAcad){
       		console.log("ok")
       		console.log(outAcad);
       		$scope.appointed_acad = outAcad;
       		$scope.acad_agend = $scope.appointed_acad.nome;
       }  

       $scope.buttonDisabled = false;

       $scope.calendObj = {
       		callback: function(val){
       			console.log (val)
       			$scope.dataDoTreino = val;
       		},
       		setLabel: 'OK',
       		todayLabel: 'Hoje',
       		closeLabel: 'Fechar',
       		weeksList: ["D", "S", "T", "Q", "Q", "S", "S"],
       		monthsList: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
       		templateType: 'popup',
			dateFormat: 'dd MMMM yyyy',
			closeOnSelect: false       		
       };
       
       $scope.fitnessTime = {
	    callback: function (val) {      //Mandatory
			console.log ("este é "+val);
	    	$scope.horaDoTreino = val;
	    	$scope.horaok = true
	      /*if (typeof (val) === 'undefined') {
	        console.log('Time not selected');
	      } else {
	        var selectedTime = new Date(val * 1000);
	        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
	        $scope.horaDoTreino = selectedTime.getUTCHours()+":"+$scope.acertaZero(selectedTime.getUTCMinutes());
	      }*/
	    },
	    inputTime: 50400,   //Optional
	    format: 24,         //Optional
	    step: 15,           //Optional
	    setLabel: 'Ok'    //Optional
	  };

       $scope.normDate = function(){
       	 ionicDatePicker.openDatePicker($scope.calendObj);	
       };

         $scope.normHour = function(){
       	 ionicTimePicker.openTimePicker($scope.fitnessTime);
       };

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


		$scope.vaiTreinar = function() {
			$scope.agora.setHours(0,0,0,0)
			$scope.buttonDisabled = true;
			if($scope.agora > $scope.dataDoTreino){
				console.log("já passou esta data")
				$rootScope.$broadcast("late_Sched");
			}else{
				var compromisso = {
					usuario: $rootScope.usuarioAtivo.$id,
					academia: $scope.academia_ID,
					dia: $scope.dataDoTreino,
					hora: $scope.horaDoTreino,
					obs: $scope.observacoes,
					oneclick:false,
					data_requisicao: Date.now(),
					status: 0
				};
	   			AgendarTreino.saveAgenda(compromisso)
	   			Utils.show();
   			}
 		};

      $rootScope.$on('saved_Sched', function (event) {
          Utils.hide();
          Utils.alertshow('Sucesso', 'Agendamento gravado com sucesso.');
	 		$scope.dataDoTreino = "";
			$scope.horaDoTreino = "";
			$scope.observacoes = '';
			$scope.horaok = false;      
      });
      $rootScope.$on('error_Sched', function (event) {
          Utils.hide();
          Utils.alertshow('Erro', 'Por favor, tente novamente.');
	 		$scope.dataDoTreino = "";
			$scope.horaDoTreino = "";
			$scope.observacoes = '';
			$scope.horaok = false;          
      });
       $rootScope.$on('late_Sched', function (event) {
          Utils.hide();
          Utils.alertshow('Erro', 'A data escolhida é anterior à data de hoje. Por favor, tente novamente.');
	 		$scope.dataDoTreino = "";
			$scope.horaDoTreino = "";
			$scope.observacoes = '';
			$scope.horaok = false;          
      });     

};