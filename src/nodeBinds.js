import * as Template from './render';

class nodeBinds {

	constructor(){}

	attributes(node){
		var attrs = new Object(node.attributes);
		var attrsn = {};
		Object.keys(attrs).map((k) => {
			attrsn[attrs[k]['name']] = attrs[k]['value'];
		});
		return attrsn;
	}

	dataExists(template, data, key = null){
		template = template.trim();
		let vd = [];
		let g = Object.keys(data).map((v) => {
			if(template.includes(v)){
				if(key !== null){
					vd.push([key, v]);
				}else{ 
					vd.push(v); 
				}
			}
		});
		return vd;
	}

	clear(node, data){
		let new_node = node.cloneNode(true);
		let pattern = /<(.*?)>(.*?)<\/(.*?)>/g;
		new_node.innerHTML = new_node.innerHTML.replace(pattern, (...a) => {
			let [,, context] = a;
			new_node.innerText = new_node.innerText
			.replace(new RegExp(context, 'gi'), '');
			return '';
		});	
		this.binds(new_node, data, node);
	}

	binds(node, data, nodeOrigin){

		let observerAttr = (attr, key, oldValue) => {

			let fn = function(value){
				let render = oldValue.includes("[{") && oldValue.includes("}]") ?
					Template.interpolateAttr : Template.interpolate;
					let r = render(oldValue, {
						[attr]: value
					});
					nodeOrigin.setAttribute(key, r);
			}.bind(this);

			fn(data[attr]);
			window.PubSub.on("attr-" + attr, fn);

		};

		let observerBind = (bind) => {

			let fn = function(value){
				let render = node.innerText.includes("[{") && node.innerText.includes("}]") ?
					Template.interpolateAttr : Template.interpolate;
					nodeOrigin.innerText = render(node.innerText, {
						[bind]: value
					});
			}.bind(this);

			fn(data[bind]);
			window.PubSub.on("bind-" + bind, fn);

		};

		let bnds = [];
		let values = this.dataExists(node.innerText, data);
		let attrs = this.attributes(node);

		Object.keys(attrs).map(function(key){
			let att = attrs[key];
			let find = this.dataExists(att, data, key);
			if(Array.isArray(find) && find.length > 0){
				find.map((a) => observerAttr(a[1], a[0], att));
			}
		}.bind(this));

		values.map((v) => observerBind(v));

	}

};

export default new nodeBinds;
