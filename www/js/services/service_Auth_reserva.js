(function() {
	'use strict';

angular
	.module('starter')
	.factory('FireAuth', FireAuth);

FireAuth.$inject = ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', '$timeout', 'accessFactory', 'Utils', 'ngFB'];

function FireAuth($rootScope, $firebaseAuth, $firebaseObject, $location, $timeout, accessFactory, Utils, ngFB){
	var auth = $firebaseAuth();
	var data_de_Adesao = Date.now();
	var FB_data = {};

	var usuario = {
		register: register,
		login: login,
		logout: logout,
		signFB: signFB,
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
					inscricao: data_de_Adesao,
					fbSign:false,
					fb_UserId: '',
					nivel: 6,
					pagante: false
				}; 
				Utils.hide();
				insertNewUserFaseUm(aluno);

	      	}).catch(function(error){
	      		Utils.hide();
	      		console.log("Erro em Registro");
	      		console.log(error);
	      		if(error.code == "auth/email-already-in-use"){
	      			Utils.alertshow("Erro", "Já existe um usuário com este email")
					Utils.hide();
	      		}      		

	      	});

	    }

	    function login(user) {
	      auth.$signInWithEmailAndPassword(user.email, user.password).then(function(firebaseUser){
	      		if(firebaseUser){
	      		console.log("está logado "+ firebaseUser.uid);
	      		beyondMailPass(firebaseUser.uid);
	      		}
	      }).catch(function(error){
				console.log("Erro em Login");
	      		console.log(error);
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
	    	console.log("upalala!")
 			ngFB.login({scope: 'email, public_profile'}).then(function(response){
 				if(response.status === 'connected'){
 					var credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
					
 					firebase.auth().signInWithCredential(credential).then(function(authData){

						var fbaluno = {
							displayName: authData.displayName,
							photoURL: authData.photoURL,
							uid: authData.uid,
							email: authData.email,
							inscricao: data_de_Adesao,
							fbSign:true,
							fb_UserId: authData.providerData[0].uid,		
							nivel: 6,
							pagante: false
						};
						FB_data = authData;

						console.log("///////////////////////////");
						console.log(authData.providerData[0].uid);
						console.log("///////////////////////////");

						insertNewUserFaseUm(fbaluno)

 					}).catch(function(error){
 						console.log("Erro em Registro com Facebook");
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
 						console.log("Erro Genérico em Registro com Facebook");
 			});

	    }

		function insertNewUserFaseUm(obj){
			var objeto = obj;
				console.log("fase Um.");
				/// fazer o update do usuário aqui.	
				///
			  	var usersRef = accessFactory.pegaUsuario(objeto.uid);
			  	usersRef.once('value').then(function(snapshot) {
		    	var exists = (snapshot.val() !== null);
		    	if(exists){
		    		var fb_track = snapshot.val();
		    	}
		    	$timeout(function() {
		   		insertNewUserFaseDois(objeto, FB_data, exists);
		   		}, 300);
		  		});			
		};

		function insertNewUserFaseDois(bje, fb_track, exists){
			console.log("fase Dois")
			console.log(fb_track.photoURL);
			 if (exists) {
			 	console.log("existe");

		    	$timeout(function() {
				 	if(bje.fbSign !== false)
				 	{
				 		if(fb_track.photoURL !== bje.photoURL){
				 			console.log("a imagem não é igual")
				 			changePhotoURL(bje.photoURL);
				 			console.log("traoca a imagem")

				 		}else{
					 		console.log("a imagem é igual")				 			
				 			segue_o_seco();
				 		};
				 	}else{
				 		console.log("nenhuma imagem");
				 		segue_o_seco();
				 	};				
				}, 300);
	
			  } else {
			    console.log("ainda não está registrado no Firebase");			  	
			    insertMailPass(bje);
			  }			
		};

	    function beyondMailPass(uid){
			segue_o_seco();
		}

	    function insertMailPass(obj){
			console.log(obj.uid)
			var dataRef = accessFactory.pegaUsuario(obj.uid);
			dataRef.set(obj);
			segue_o_seco();
		}

	    function changePhotoURL(img){
			console.log("Chegou aqui")
			var dataRef = accessFactory.pegaUsuario(obj.uid);
			dataRef.set({photoURL: img});
			segue_o_seco()
		}		

		function segue_o_seco(){
      		$timeout(function() {
      			$location.path("app/perfil");
      		}, 300);				
		};	
	
	};// fim service_Auth - ATENÇÃO!!!
})();//fum da função geral JS - ATENÇÃO!!!