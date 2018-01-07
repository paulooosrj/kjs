window.$broadcast = (data = {}) => {
	return function(update = () => {}){
		return new Proxy(data, {
            get: (target, key) => (key in target) ? target[key] : null,
            set: (target, key, value) => {
				      target[key] = value;
				      update(target, key, value);
            }
    	});
    }
};

window.khanApp = {};

khanApp.db = {};


khanApp.$controller = function($view, $event){
    if(!window['khan_controller']) window['khan_controller'] = {};
    var view = document.querySelector(`[khan-controller="${$view}"]`);
    if(view){
        window['khan_controller'][$view] = {};
        let model = window['khan_controller'][$view];
        let $ctrl = "window.khan_controller." + $view;
        window['khan_controller'][$view] = $broadcast(model)(khanApp.updateView(view, $ctrl));
        $event(window['khan_controller'][$view]);
    }
};

khanApp.parse_template = (code, data, controller) => {
    var code_t = code;
    code_t.match(/{{(.*?)}}/g).map((m) => {
      var n = m.replace('{{', '')
               .replace('}}', '')
               .trim();
      Object.keys(data).map((k) => {
          if(n.includes(k)){
             n = n.replace(new RegExp(k, 'g'), controller + "." + k);
          }
      });
      code_t = code_t.replace(m, '${' + n + '}');
    });
  
    return new Function('return `'+code_t+'`;');
  
};

khanApp.data = (view, key = null, value = null) => {
    if(value === null && key !== null) return view.dataset[key];
    if(value !== null && key !== null) view.dataset[key] = value;
};

khanApp.render = function(view, data, controller){
    
    var code = 'false';
    if(!khanApp.render_buffer) khanApp.render_buffer = {};
    if(!khanApp.data(view, 'render')){
        khanApp.data(view, 'render', Math.floor(Math.random() * 10000));
    }
    if(!khanApp.render_buffer[view.dataset['render']]){
      khanApp.render_buffer[view.dataset['render']] = view.innerHTML;
    }
    
    code = khanApp.parse_template(
        khanApp.render_buffer[view.dataset['render']], 
        data,
        controller
    );
    
    view.innerHTML = code();
    
};

khanApp.updateView = (view, controller) => {
	  return function(data, key, value){
        console.log("Update View !!");
        khanApp.render(view, data, controller);
    };
};

module.exports = khanApp.$controller;