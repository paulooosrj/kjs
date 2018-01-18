"use strict";

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const obj_diff = (one, two) => {
	return (() => {
		
		var diffKeys = {};
		Object.keys(two).map((o) => {
			if((o in one)){
				if(one[o] !== two[o]){
					diffKeys[o] = two[o];
                }
            }else{
				diffKeys[o] = two[o];
            }
        });

		return diffKeys;

    })();
};

window.$broadcast = (data = {}, ctrl) => {
	return function(update = () => {}){
		return new Proxy(data, {
            get: (target, key) => (key in target) ? target[key] : null,
            set: (target, key, value) => {
              ctrl[key] = value;
			  target[key] = value;
              update(target, key, value);
            }
    	});
    }
};

window.khanApp = {};

khanApp.db = {};
khanApp.last_render_buffer = {};
khanApp.last_data = {};

khanApp.create = function(){
    return this;
};

khanApp.$controller = function($view, $event){
    if(!window['khan_controller']) window['khan_controller'] = {};
    var view = document.querySelector(`[khan-controller="${$view}"]`);
    if(view){
        window['khan_controller'][$view] = {};
        let model = window['khan_controller'][$view];
        let $ctrl = "window.khan_controller." + $view;
        // Watch
        $event.bind(new class {
            render(){
                model = Object.assign({
                    render: () => {},
                    $view: view
                }, model, this);
                window['khan_controller'][$view] = model;
                khanApp.render(`[khan-controller="${$view}"]`, model, $ctrl);
                let proxy = $broadcast(
                    model, 
                    window['khan_controller'][$view])(
                        khanApp.updateView(
                            `[khan-controller="${$view}"]`,
                             $ctrl
                        )
                    );
                $event.bind(proxy)(proxy);
            }
        })();
        // cria uma nova instância de observador
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(/\{\{(.*?)\}\}/gim.test(view.innerHTML)){
                    var buffer = khanApp.last_render_buffer[view.dataset['render']];
                    var code = view.innerHTML.replace(buffer, '');
                    if(/\{\{(.*?)\}\}/gim.test(code)){
                        khanApp.render_buffer[view.dataset['render']] += code;
                        khanApp.updateView(`[khan-controller="${$view}"]`,$ctrl)(model);
                    }
                }
            });    
        });
        // configuração do observador:
        var config = { 
            attributes: true, 
            childList: true, 
            characterData: true 
        };
        // passar o nó alvo, bem como as opções de observação
        observer.observe(view, config);
    }
};

khanApp.parse_template = (code, data, controller) => {

    let receive = Object.keys(data)
                        .filter((k) => k !== "render")
                        .map((k) => `\\$${k}`).join('|');
    receive = new RegExp(receive, 'gim');

    code = code.replace(receive, (match) => {
        var m = match.replace('$', '');
        if(data[m]){
            var $d = `'<data value="${m}">'+${controller}.${m}+'</data>'`;
            if(typeof data[m] === "function"){
               if(!data.computed) data.computed = {};
               data["computed"][m] = data[m];
               $d = `${controller}.computed.${m}`;
            }
            return $d;
        }
    }).replace(/\{\{/gim, '${').replace(/\}\}/gim, '}');

    const interpolates = (code) => {
        return   code.replace(new RegExp('&gt;', 'gim'), '>')
                     .replace(new RegExp('&lt;', 'gim'), '<')
                     .replace(new RegExp('\\<\\(', 'gim'), "'")
                     .replace(new RegExp('\\)\\>', 'gim'), "'")
                     .replace(new RegExp('\\<\\=\\(', 'gim'), "+ '")
                     .replace(new RegExp('\\)\\=\\>', 'gim'), "' +");
    };

    code = interpolates(code);
    
    return new Function('return `'+code+'`;');

};

khanApp.data = (view, key = null, value = null) => {
    if(value === null && key !== null) return view.dataset[key];
    if(value !== null && key !== null) view.dataset[key] = value;
};

khanApp.render = function(view, data, controller){
    var code = 'false';
    view = document.querySelector(view);
    if(!khanApp.data(view, 'render')){
        khanApp.data(view, 'render', Math.floor(Math.random() * 10000));
    }
    if(!khanApp.render_buffer) khanApp.render_buffer = {};
    if(!khanApp.render_buffer[view.dataset['render']]){
      khanApp.render_buffer[view.dataset['render']] = view.innerHTML;
      khanApp.last_data = Object.assign({}, data);
      code = khanApp.parse_template(
                view.innerHTML, 
                data,
                controller
             );
    }else{
      code = khanApp.parse_template(
                khanApp.render_buffer[view.dataset['render']], 
                data,
                controller
             );
    }
    
    try{ 
        view.innerHTML = code();
        khanApp.last_render_buffer[view.dataset['render']] = code();
    }catch(e){}

};

khanApp.$update = () => {



};

khanApp.updateView = (view, controller) => {
    console.log('update!!')
	return function(data, key, value){
        delete data['computed'];
        for(let [key, value] of Object.entries(obj_diff(khanApp.last_data, data))){
            if(document.querySelector('data[value="'+ key + '"]')){
                var e = document.querySelector('data[value="'+ key + '"]');
                e.innerHTML = value;
            }
        }
    }; 
};

module.exports = khanApp.create().$controller;