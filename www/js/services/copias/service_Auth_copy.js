(function() {

angular
	.module('starter')
	.factory('FireAuth', FireAuth);

FireAuth.$inject = ['$rootScope', '$firebaseAuth', '$location', '$timeout', 'firebaseDataService', '$firebaseArray', 'Utils', 'ngFB'];


function FireAuth($rootScope, $firebaseAuth, $location, $timeout, firebaseDataService, $firebaseArray, Utils, ngFB){

	var auth = $firebaseAuth();
	var baseDataUsers = firebase.database().ref("usuarios");


	var usuario = {
		register: register,
		login: login,
		logout: logout,
		signFB: signFB,
		insertFacebooker: insertFacebooker,
		insertMailPass: insertMailPass,
		isLoggedIn: isLoggedIn
	}
	return usuario;

	////////////////////////////////////////////////////////


	function register(user) {
			Utils.show();
	      	auth.$createUserWithEmailAndPassword(user.email, user.password).then(function(firebaseUser){
				console.log(firebaseUser);

				var aluno = {
					displayName:'',
					photoURL:'',
					uid: firebaseUser.uid,
					email: firebaseUser.email,
					nivel: 6
				}; 
				Utils.hide();
				insertMailPass(aluno);

	      	}).catch(function(error){
	      		Utils.hide();
	      		console.log(error);
	      	});

	    }

	    function login(user) {
	      auth.$signInWithEmailAndPassword(user.email, user.password);
	      this.insertMailPass(obj)
	    }

	    function logout() {
	      auth.$signOut();
	    }

	    function isLoggedIn() {
	      auth.$getAuth();
	    }

	    function signFB(){
 			ngFB.login({scope: 'email, public_profile'}).then(function(response){
 				if(response.status === 'connected'){
// 					console.log('Token de acesso: ' + response.authResponse.accessToken);
 					var credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
					
 					firebase.auth().signInWithCredential(credential).then(function(authData){

						var fbaluno = {
							displayName: authData.displayName,
							photoURL: authData.photoURL,
							uid: authData.uid,
							email: authData.email,
							nivel: 6
						};

				    	var refer = baseDataUsers.orderByChild("uid");
				    	refer.once("value").then(function(FBsnapshot){
				    		//FBsnapshot.orderByChild("uid").equalTo(fbaluno.uid).on("value", function(subShot){
				    			console.log(FBsnapshot)
				    		//});
				    	}).catch(function(error){
				    			console.log("error.code")

				    	});

 					}).catch(function(error){
 						console.log("erro");
 						console.log(error.code);
 						if(error.code === "auth/account-exists-with-different-credential"){
 							Utils.alertshow("Usuário já existente", "Você já se cadastrou com email/senha");
 						}else{
							Utils.alertshow("Falha no cadastro", "Ocorreu um erro. Tente Novamente.");

 						};
 					});

 				}else{
 						console.log(error.code);
 				}
 			}).catch(function(error){
 					error.code;
 			});

	    }


	    function insertFacebooker(object){
	    	console.log(object);
	    	var refer = baseDataUsers.orderByChild("uid");
	    	refer.once("value").then(function(FBsnapshot){
	    		FBsnapshot.orderByChild("uid").equalTo(object.uid, function(subShot){
	    			console.log(console.log(subShot))
	    		});
	    	}).catch(function(error){

	    	});
	    }
	   

	    function insertMailPass(obj){
			dataRef = $firebaseArray(firebaseDataService.usuarios);
			dataRef.$add(obj);
			guardaChave(obj.uid);
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