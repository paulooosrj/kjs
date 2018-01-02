"use strict";

const global = window;
const middleware = require('./modules/middleware');
const Router = require('./modules/router');

global.$khan = class {

	constructor(){
		const self = this;		
		this.$db_application = new Map();
		this.middleware = new middleware();
		return this;
	}

	set(name, fn){ this.$db_application.set(name, fn); }

	get(name){ this.$db_application.get(name); }

	use(fn){ 
		if(fn.name && fn.name === "Router"){
			this.routeAwait = fn;
		}
		if(!fn.name && fn.name !== "Router"){
			this.middleware.use(fn); 
		}
	}

	Router(){
		return Router;
	}

	listen(){
		var self = this;
		this.middleware.go(function(){
			delete this['go'];
			if(self.routeAwait){
				var run = self.routeAwait.dispatch();
				var [callback, pathh, params, active] = run;
				params = params || [];
				callback.bind(Object.assign({}, this, {
					"pathname": pathh,
					"uri": active
				}))(...params);
			}
		});
	}

};