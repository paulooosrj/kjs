"use strict";

const v_dom = require('./use/virtual-dom');

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

window.$broadcast = (data = {}, ctrl) => {
	return function(update = () => {}){
		return new Proxy(data, {
            get: (target, key) => (key in target) ? target[key] : null,
            set: (target, key, value) => {
              if(!ctrl['$proxy']) ctrl['$proxy'] = this;
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

khanApp.createStream = function(model, controller, update){
    return $broadcast( model, controller )( update );
};

khanApp.$controller = function($view, $event){
    if(!window['khan_controller']) window['khan_controller'] = {};
    var view = document.querySelector(`[khan-controller="${$view}"]`);
    khanApp.virtualDom = v_dom(view);
    if(view){
        window['khan_controller'][$view] = {};
        let model = window['khan_controller'][$view];
        let $ctrl = "window.khan_controller." + $view;
        // Watch
        $event.bind(new class {
            render(){
                model = Object.assign({
                    render: () => {},
                    computed: {},
                    $view: view
                }, model, this);

                Object.keys(model).map((k) => {
                    if(typeof model[k] === "function" && k !== "render"){
                        model['computed'][k] = model[k];
                    }
                });

                window['khan_controller'][$view] = model;
                khanApp.render(`[khan-controller="${$view}"]`, model, $ctrl);
                /* let proxy = $broadcast(
                    model, 
                    window['khan_controller'][$view])(
                        khanApp.updateView(
                            `[khan-controller="${$view}"]`,
                             $ctrl
                        )
                    ); */
                let controllerr = window['khan_controller'][$view];
                let proxy = khanApp.createStream(model, controllerr, khanApp.updateView(
                    `[khan-controller="${$view}"]`,
                     $ctrl
                ));
                window['khan_controller'][$view]['$proxy'] = proxy;
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

khanApp.parse_template = (view, data, controller) => {

    for(var [key, value] of Object.entries(data)){

        var keyd = "$" + key + "\\$";

        khanApp.virtualDom
        .filter(e => {
            // console.log(keyd);
            //console.log(e.scope, e.scope.includes(keyd) || Object.values(e.bind_in).includes(keyd));
            var kd = '$' + key + '$';
            return e.scope.includes(kd) || Object.values(e.bind_in).includes(kd);
        })
        .map(function(e){

            // console.log(e);

            if(Object.keys(e.bind_in).length > 0){
                Object.keys(e.bind_in).map((k) => { 
                    var gen = e.bind_in[k].replace(new RegExp('\\'+ keyd, 'gim'), (match) => {
                        return controller + '.' + key + '(event, this)'
                        // console.log('achei: '+ match);
                    });
                    gen = gen.replace(/\{\{/gim, '${').replace(/\}\}/gim, '}');
                    // console.log(gen);
                    e.bind_in[k] = gen;
                    e.elem.setAttribute(k, gen);
                });
            } /* */

            const interpolates = (code) => {
                return   code.replace(new RegExp('&gt;', 'gim'), '>')
                            .replace(new RegExp('&lt;', 'gim'), '<')
                            .replace(new RegExp('\\<\\(', 'gim'), "'")
                            .replace(new RegExp('\\)\\>', 'gim'), "'")
                            .replace(new RegExp('\\<\\=\\(', 'gim'), "+ '")
                            .replace(new RegExp('\\)\\=\\>', 'gim'), "' +");
            };

            var gt = e.value.replace(new RegExp('\\'+ keyd, 'gim'), function(match){
                var is_fn = (k) => eval(`${controller}.computed.${k}`);
                return is_fn(key) ? `'${controller}.computed.${key}.bind(${controller}.$proxy)(event, this)'` : (() => {
                    var tmp = controller + '.' + key;
                    if(/\$(.*?)\$/gim.test(e.value)){
                        var tp = e.value; 
                        tp = tp.replace(/\$(.*?)\$/gim, (match) => {
                            match = match.replace(/\$/gim, '');
                            //console.log(match);
                            return controller + '.' + match;
                        });
                        e.value = tp;
                    }
                    return tmp;
                })();
            });

            gt = gt.replace(/\{\{/gim, '${').replace(/\}\}/gim, '}');
            gt = interpolates(gt);
            //console.log(gt);

            try {
                e.elem.innerHTML = new Function('return `'+ gt +'`;')();
            } catch(e){}

        });

        khanApp.virtualDom
        .filter((n) => n.elem.textContent.includes('{{') && n.elem.textContent.includes('}}'))
        .map((n) => {

            // console.log(n);
            var gen = n.elem.textContent;
            

            gen = gen
                    .replace(/\$(.*?)\$/gim, function(match){
                        return controller + '.' + match.replace(/\$/g, '');
                    })
                    .replace(/\{\{/gim, '')
                    .replace(/\}\}/gim, '');

            gen = '${'+ gen +'}';

            const interpolates = (code) => {
                return   code.replace(new RegExp('&gt;', 'gim'), '>')
                            .replace(new RegExp('&lt;', 'gim'), '<')
                            .replace(new RegExp('\\<\\(', 'gim'), "'")
                            .replace(new RegExp('\\)\\>', 'gim'), "'")
                            .replace(new RegExp('\\<\\=\\(', 'gim'), "+ '")
                            .replace(new RegExp('\\)\\=\\>', 'gim'), "' +");
            };

            //console.log(interpolates(gen));

            n.elem.innerHTML = new Function('return `'+ interpolates(gen) +'`;')();

        }); /* */


    }

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
      code = khanApp.parse_template( view,  data, controller );
    }else{
      code = khanApp.parse_template(
                khanApp.render_buffer[view.dataset['render']], 
                data,
                controller
             );
    }

};

khanApp.updateView = (view, controller) => {
    //console.log('update!!')
	return function(data, key, value){
        //console.log('update: ' + key);
        view = (typeof view === "object") ? view : document.querySelector(view);
        khanApp.parse_template(view, {[key]: value}, controller);
    }; 
};

module.exports = khanApp.create().$controller;