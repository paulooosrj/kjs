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
							? value.bind(target)
							: value;
			window.PubSub.publish("attr-" + prop, value);
			window.PubSub.publish("bind-" + prop, value);
			return true;
		}
	})
};

export default class kjs {

  constructor() {
    return this;
  }

  get state(){
  	return kjs._states;
  }

  setState(prop, value){
  	if(this.$store[prop] !== value) this.$store[prop] = value;
  }

  normalize(view, data){

  	const $ = document.querySelector.bind(document);
  	const $$ = document.querySelectorAll.bind(document);
  	let clear = (node) => nodeBinds.clear(node, data);
  	Array.from($(view).querySelectorAll("*")).map((node) => clear(node));

  }

  emitAttrs(){
    let scope = this;
  	Array.from(document.querySelectorAll('[event]')).map(node => {
        let eventos = node.getAttribute('event');
        eventos = eventos.includes(',') ? eventos.split(',') : [eventos];
        eventos.map((e) => {
          let [ev, fn] = e.split(':').map(v => v.trim());
          fn = (kjs._states[fn]) ? kjs._states[fn] : function(){ console.log("Not existing callback to event"); };
          node.addEventListener(ev, fn.bind(scope));
        });
    });
  }

  render(view = "#app", data = {}){

    var t0 = performance.now();

    data.$app_id = Math.floor(Math.random() * 10000);
    this.$store = window.$kjsStore(data);

  	this.normalize(view, data);

    var t1 = performance.now();
    this.$store.$app_time_render = parseInt((t1 - t0)) + " ms";

    this.emitAttrs();

  	return this;

  }

}
