window.$broadcast = (data = {}, ctrl) => {
	return function(update = () => {}){
		return new Proxy(data, {
            get: (target, key) => (key in target) ? target[key] : null,
            set: (target, key, value) => {
              if(!target["$_updates"]) target["$_updates"] = true;
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

khanApp.create = function(){
    return this;
};

khanApp.$controller = function($view, $event){
    if(!window['khan_controller']) window['khan_controller'] = {};
    var view = document.querySelector(`[khan-controller="${$view}"]`);
    view.setAttribute('visibility', 'hidden');
    if(view){
        window['khan_controller'][$view] = {};
        let model = window['khan_controller'][$view];
        let $ctrl = "window.khan_controller." + $view;
        //$event.bind(proxy)(proxy);
        $event.bind(new class {
            render(){
                model = Object.assign({render: () => {} }, model, this);
                window['khan_controller'][$view] = model;
                khanApp.render(`[khan-controller="${$view}"]`, model, $ctrl);
                let proxy = $broadcast(model, window['khan_controller'][$view])(khanApp.updateView(`[khan-controller="${$view}"]`, $ctrl));
                $event.bind(proxy)(proxy);
            }
        })();
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
            var $d = controller + "." + m;
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
    
    try{ view.innerHTML = code(); }catch(e){}

};

khanApp.updateView = (view, controller) => {
    // console.log('Update!!');
	  return function(data, key, value){
        khanApp.render(view, data, controller);
    };
};

module.exports = khanApp.create().$controller;