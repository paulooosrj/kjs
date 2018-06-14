import PubSub from "./pubsub";
import nodeBinds from "./nodeBinds";

window.PubSub = PubSub;
window.$kjsStore = (model) => {
	kjs._states = model;
	return new Proxy(model, {
		get(target, prop){
			if(target[prop]) return target[prop];
		},
		set(target, prop, value){
			kjs._states = target;
			target[prop] = typeof(value) === "function" 
							? function(){
								return value.bind(kjs._states)();
							}
							: value;
			window.PubSub.publish("attr-" + prop, value);
			window.PubSub.publish("bind-" + prop, value);
			return true;
		}
	})
};

export default class kjs {

  constructor() {
    // this._name = getLibName();
    return this;
  }

  get state(){
  	return kjs._states;
  }

  setState(prop, value){
  	this.$store[prop] = value;
  }

  normalize(view, data){

  	const $ = document.querySelector.bind(document);
  	const $$ = document.querySelectorAll.bind(document);
  	let clear = (node) => nodeBinds.clear(node, data);

  	Array.from($(view).querySelectorAll("*")).map((node) => clear(node));

  }

  emitProps(){
  	Object.keys(this.$store).map((key) => {
  		let prop = key;
  		let value = this.$store[key];
  		window.PubSub.publish("attr-" + prop, value);
		window.PubSub.publish("bind-" + prop, value);
  	});
  }

  render(view = "#app", data = {}){

  	this.normalize(view, data);
  	this.$store = window.$kjsStore(data);
  	this.emitProps();
  	this.$store.id = Math.floor(Math.random() * 10000);

  	return this;

  }

}
