(function(){
	'use_strict';

	angular.module('starter').filter('unique', function(){
	return function(arry){
	        Array.prototype.getUnique = function(){
	        var u = {}, a = [];
	        for(var i = 0, l = this.length; i < l; ++i){
	           if(u.hasOwnProperty(this[i])) {
	              continue;
	           }
	           a.push(this[i]);
	           u[this[i]] = 1;
	        }
	        return a;
	    };
	    if(arry === undefined || arry.length === 0){
	          return '';
	    }
	    else {
	         return arry.getUnique(); 
	    }

	  };
	});


})();