(function() {

angular
	.module('starter')
	.factory('FireAuth', FireAuth);

FireAuth.$inject = ['$rootScope', '$firebaseAuth', '$location', '$timeout', 'firebaseDataService', 'storageService', '$firebaseArray', 'Utils', 'ngFB'];


function FireAuth($rootScope, $firebaseAuth, $location, $timeout, firebaseDataService, storageService, $firebaseArray, Utils, ngFB){

	var auth = $firebaseAuth();
	var baseDataUsers = firebase.database().ref("usuarios");
	var userUid = '';

	var usuario = {
		register: register,
		login: login,
		logout: logout,
		signFB: signFB,
		insertFacebooker: insertFacebooker,
		insertMailPass: insertMailPass,
		isLoggedIn: isLoggedIn,
		userUid: userUid
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
				insertNewUserFaseUm(aluno);

	      	}).catch(function(error){
	      		Utils.hide();
	      		console.log(error);
	      		console.log("aqui que foi o erro 0?");

	      	});

	    }

	    function login(user) {
	      auth.$signInWithEmailAndPassword(user.email, user.password).then(function(firebaseUser){
	      		if(firebaseUser){
	      		console.log("está logado "+ firebaseUser.uid);
	      		guardaChave(firebaseUser.uid);    			
	      		}
	      }).catch(function(error){
	      		console.log(error);
				console.log("aqui que foi o erro -1?");

	      		// Não existe usuário
	      		if(error.code == "auth/user-not-found"){
	      			Utils.alertshow("Erro", "Não existe usuário cadastrado com esse e-mail")
	      		}
	      		// E-mail mal formatado
	      		if(error.code == "auth/invalid-email"){
	      			Utils.alertshow("Erro", "Verifique se é um e-mail válido")
	      		}	
	      		if(error.code == "auth/wrong-password"){
	      			Utils.alertshow("Erro", "Senha inválida ou o usuário não usa senha")
	      		}        		   		      		
	      })
	    }

	    function logout(){
	      auth.$signOut();
	    }

	    function isLoggedIn(){
			auth.$onAuthStateChanged(function(user){
				if(user){
					return true;
				}else{
					return false;
				};
	    	});
		}

	    function signFB(){
 			ngFB.login({scope: 'email, public_profile'}).then(function(response){
 				if(response.status === 'connected'){
 					var credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
					
 					firebase.auth().signInWithCredential(credential).then(function(authData){

						var fbaluno = {
							displayName: authData.displayName,
							photoURL: authData.photoURL,
							uid: authData.uid,
							email: authData.email,
							nivel: 6
						};

						insertNewUserFaseUm(fbaluno)

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
 				  		console.log("aqui que foi o erro 2?");
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

		function insertNewUserFaseUm(obj){
			var objeto = obj;
				console.log("fase Um.");
			  	var usersRef = baseDataUsers;
			  	usersRef.child(objeto.uid).once('value').then(function(snapshot) {
		    	var exists = (snapshot.val() !== null);
		   		insertNewUserFaseDois(objeto, exists);
		  		});			
		};

		function insertNewUserFaseDois(bje, exists){
			console.log("fase Dois")
			 if (exists) {
			    guardaChave(bje.uid)
			  } else {
			    insertMailPass(bje);
			  }			
		};

		function guardaChave(uid){
			var keeper = baseDataUsers.orderByChild(uid);
			
			keeper.once("value").then(function(keySnapshot){			
			keySnapshot.forEach(function(childSnap){			
			if(childSnap.val().uid === uid){
				userMe = childSnap.key;
				storageService.setUser(userMe);

			}
			return true;
				})
			}).catch(function(error){
				console.log(error);				
			})

      		$timeout(function() {
      			testaAssistencia();
      		}, 300);		
	
		}


	    function insertMailPass(obj){
			dataRef = firebaseDataService.usuarios;
			dataRef.child(obj.uid).set(obj);
			guardaChave(obj.uid);
		}		

		function testaAssistencia(){
			$location.path("app/perfil");
		};//esse ponto e vírgula fica na última função - ATENÇÃO!!!

	
	};// fim saveService - ATENÇÃO!!!
})();//fum da função geral JS - ATENÇÃO!!!