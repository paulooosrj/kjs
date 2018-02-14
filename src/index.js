import axios from 'axios';
import tesseract from 'tesseract.js'
const _ = require('lodash');

Object.prototype.service = function(serviceName, serviceCall = false){
	if(!serviceCall){
		return this['service' + serviceName];
	}else{
		this['service' + serviceName] = serviceCall;
	}
};

const App = new Object();

App.$ = document.querySelector.bind(document);
App.$$ = document.querySelectorAll.bind(document);

App.liveObj = function(data, update){
	return new Proxy(data, {
		set: function(target, attr, valor){
			target[attr] = valor;
			update();
			return true;
		},
		get: function(target, name) {
	        return name in target ? target[name] : new Error("Not : " + name);
	    }
	});	
};

App.live = function(data, update){
	data['dataSet'] = function(...args){
		App.dataSet(this, ...args);
	};
	App.$proxy = new Proxy(data, {
		set: function(target, attr, valor){
			target[attr] = valor;
			App.data = target;
			update();
			return true;
		},
		get: function(target, name) {
	        return name in target ? target[name] : new Error("Not : " + name);
	    }
	});
};

App.sanitaze = function(str){
	return str.replace(new RegExp('&lt;', 'gim'), '<')
			  .replace(new RegExp('&gt;', 'gim'), '>');
};

App.render = function(){
	let tpl = _.template(App.sanitaze(App.$esEngine(App.buffer)));
	let render = tpl(App.data);
	App.$(App.view).innerHTML = render;
};

App.update = function(){
	App.render();
}

App.dataSet = function($scope, prop, valor){
	$scope[prop] = valor;
};

App.$injectorService = function(receive = {}){
	receive.$http = axios;
	receive.tesseract = tesseract;
	receive.selector = App.$;
	receive.selectorAll = App.$$;
	receive._ = _;
	receive.extends = (...args) => Object.assign(...args);
	receive.arrExtend = (...args) => {
		let novo = [];
		args.map((a) => novo = [...novo, ...a]);
		return novo;
	};
	receive.crawler = (url) => {
		return new Promise((resolve, reject) => {
			let proxy = `https://cors-anywhere.herokuapp.com/${url}`;
			receive.$http.get(proxy, {
							    headers: {'Access-Control-Allow-Origin': '*'}
							})
						  .then(function (response) {
						  	var string = response.data;
							var doc = new DOMParser().parseFromString(string, 'text/html');
						    resolve(doc, response);
						  })
						  .catch(function (error) {
						    reject(error);
						  });
		});
	};
	return receive;
};

App.$esEngine = function(tpl){
	return new Function('data', 'return `' + tpl.replace(/\$/gim, 'data.').replace(/\{\{/gim, '${').replace(/\}\}/gim, '}') + '`;')(App.data);	
};

App.initialize = function(view, data){

	App.view = view;
	App.data = data;
	App.buffer = App.$(view).innerHTML;

	_.forIn(App.data, function(value, key){
		if(typeof value === "object") App.data[key] = App.liveObj(value, App.update);
		if(typeof value === "function" && key !== "service"){
			let random = (key = 100000) => Math.floor(Math.random() * key);
			let gen = random();
			global['khan_' + gen + '_' + key] = function(...args){
				value.bind(this)(...args, App.$proxy);
			}.bind(((/service/i.test(key)) ? App.$injectorService(data) : data));
			App.data[key] = `window.khan_${gen}_${key}`;
		}
	});

	App.template = _.template(App.sanitaze(App.$esEngine(App.buffer)));

	/* SET UPDATE */
	return (update) => {
		App.model = update;
		App.live(data, App.update);
		App.render();
		App.model.bind(App.$proxy)(App.$proxy);
		return App;
	};

}

global.Khan = App;
