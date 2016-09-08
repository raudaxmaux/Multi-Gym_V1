(function(){
	'use strict';

	angular.module("starter").value("LocalDB",{
			db:null,
			initLogin: function(){
				this.db = window.openDatabase('Localdb', '1,0', 'Banco Local de permissões', 2000);
				this.db.transaction(function(result){
					result.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(displayName TEXT, uid TEXT, email TEXT, fbSign BOOL, fb_UserId TEXT, nivel INTEGER, pagante BOOL);', []);
				});
			}
	});
})();