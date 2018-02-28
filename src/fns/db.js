"use strict";

module.exports = {
	session(name = '',valor = false){
		if(!valor){
			sessionStorage.setItem(name, valor);
			return true;
		}
		return sessionStorage.getItem(name);
	},
	local(name = '',valor = false){
		if(!valor){
			localStorage.setItem(name, valor);
			return true;
		}
		return localStorage.getItem(name);
	}
};
