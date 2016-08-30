(function(){
/**
*  factory salvamento de dados no Firebase
*
* Alexandre Brito
*/
angular.module('starter')
.factory('saveService', saveService);

saveService.$inject = ['$location', 'firebaseDataService', '$firebaseArray', '$firebaseObject'];

	function saveService($location, firebaseDataService, $firebaseArray, $firebaseObject){

	var baseDataUsers = firebase.database().ref("usuarios");
	var baseDataAcaedmia = firebase.database().ref("academias");
	var usuarioAtivo = ''; 
	var academiaParaTreino

	var doneData = {
		usuarioAtivo: 			usuarioAtivo,
		academiaParaTreino: 	academiaParaTreino,
		insertMailPass:			insertMailPass,		// insere mailPassword em user
		insertFacebooker:		insertFacebooker,	// insere Facebook em user
	};
	return doneData;

/////////////////////////////////////////////////////////////////////////

		function insertMailPass(obj){
				dataRef = $firebaseArray(firebaseDataService.usuarios);
				dataRef.$add(obj);
				guardaChave(obj.uid);
		};

		function insertFacebooker(obj){
			console.log(obj);
			var ref = baseDataUsers.orderByKey.equalTo(obj.uid);
			ref.once("value").then(function(userShot){
				var usura = userShot.val()
				console.log(usura.uid);				
				console.log(obj.uid);
				if(userShot.val().uid !== obj.uid){
					console.log("não existe e é novo");
				}else{
					console.log("existe");
				}
			}).catch(function(error){
					console.log(error.code);
			});


			/*

, function(userShot){
				if(bingo.uid !== obj.uid){
					console.log("não existe e é novo");
				}else{
					console.log("existe");
				}
			})



			var ref = baseDataUsers.orderByKey();
			ref.once("value").then(function(fb_Snappers){
				if(fb_Snappers.val().email !== obj.email){
						console.log("não tá gravado");
						dataRef = $firebaseArray(firebaseDataService.usuarios);
						dataRef.$add(obj);
						guardaChave(obj.uid);					
				}else{
						console.log("tá gravado");
						guardaChave(fb_Snappers.val().uid);
				};

			});
			*/

		}


		function guardaChave(uid){
			var keeper = baseDataUsers.orderByChild(uid);
			keeper.once("value").then(function(keySnapshot){
				keySnapshot.forEach(function(childSnap){
					if(childSnap.val().uid === uid){
						usuarioAtivo = childSnap.key;
						console.log(usuarioAtivo);
					}
				})
			})
			$location.path("app/perfil");
		};//esse ponto e vírgula fica na última função - ATENÇÃO!!!

	};// fim saveService - ATENÇÃO!!!
})();//fum da função geral JS - ATENÇÃO!!!