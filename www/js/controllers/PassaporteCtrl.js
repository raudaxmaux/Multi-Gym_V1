'use strict';

angular.module('starter').controller('PassaporteCtrl', PassaporteCtrl);

function PassaporteCtrl($scope,$rootScope, $localStorage, $location, $ionicPopup, AgendarTreino, $ionicSideMenuDelegate, $interval) {

	$scope.$on("$ionicView.enter", function(event, data){
       // handle event
       $scope.$parent.hideHeader();

	});
	$scope.isExpanded = false;

	console.log("Passaporte, câmbio!!");


	$scope.$on('$ionicView.afterEnter', function(event) {
            $ionicSideMenuDelegate.canDragContent(false);
    });
        //enable side menu drag before moving to next view
    $scope.$on('$ionicView.beforeLeave', function (event) {
            $ionicSideMenuDelegate.canDragContent(true);
    })

	var agora = new Date(Date.now());
	$scope.inSamara = "";
	$scope.encontro = $localStorage.marcacao;
	console.log($scope.encontro.hora_agendada);
	// hora de entrada
	var chegada = new Date($scope.encontro.hora_agendada*1000);
	var hora = chegada.getUTCHours();
	var minutos = chegada.getUTCMinutes()
	var segundos = chegada.getUTCSeconds()
	$scope.entrada = new Date(Date.now());
	$scope.entrada.setHours(hora);
	$scope.entrada.setMinutes(minutos);
	$scope.entrada.setSeconds(segundos);
	console.log(hora+":"+minutos+":"+segundos)

	function setClock(){
		var remaining = (Date.parse($scope.entrada) - Date.parse(new Date()));
		var minutim = Math.floor((remaining / 1000 / 60) % 60);
		if(minutim < 10){
			minutim = "0"+minutim;
		}
		else{
			minutim = minutim
		}

		var segundim = Math.floor((remaining / 1000) % 60);
		if(segundim < 10){
			segundim = "0"+segundim;
		}
		else{
			segundim = segundim
		}	

		console.log($scope.entrada +" é quando devo chegar")
		console.log( remaining +' : '+ minutim+':'+segundim+' restantes' )
		$scope.inSamara = minutim+':'+segundim;

		if(Date.parse($scope.entrada) > Date.parse(new Date())){
			if(minutim <= 0 && segundim <= 0 ){
				console.log("O tempo acabou")
				$interval.cancel(timeinterval);
				$scope.vaiMudar = true;
				$localStorage.$reset();
				$location.path('app/inicio')
			}
		}else{
				console.log("Perdeu, playboy!")
				$interval.cancel(timeinterval);
				$scope.vaiMudar = true;
				$localStorage.$reset();
				$location.path('app/inicio');			
		}
	};


	var vigil = $rootScope.$on('mudaAgenda', function(ev){

		if($localStorage.marcacao.id_geral !== undefined){
			var corrente = $localStorage.marcacao.id_geral;
			console.log(corrente +" é o id_geral")
			console.log($rootScope.agendamentos[corrente])
			var escopo = {}	
			escopo = $rootScope.agendamentos[corrente]


			console.log(escopo)
			if(escopo.status === 1 || escopo.status === 4){
				console.log("Michael, eles não ligam pra gente!!!")
				$interval.cancel(timeinterval);

				$scope.vaiMudar = true;
				$localStorage.$reset();
				$location.path('app/inicio');		
			}
		}

	});

	$scope.$on('$destroy', function() {
		vigil();
		console.log("estou indo embora")
	});

/////////////////////////////////////////

/* CONFIRMAÇÕES */

$scope.cancelaIda = function() {

   var confirmPopup = $ionicPopup.confirm({
     title: 'Cancelar Treino',
     cssClass: 'popme',
     template: 'Você tem certeza ?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
       $scope.vaiMudar = true;
       AgendarTreino.changeAppStatus($scope.encontro.id_geral);
		$interval.cancel(timeinterval);
       	$localStorage.$reset();
		$location.path('app/inicio')
     } else {
       console.log('You are not sure');
     }
   });
 };

	setClock() 

	var timeinterval = $interval(setClock, 1000);



};//fim do PassaporteCtrl