let Router = {};

Router.routes = [];

Router.any = (route, fn) => {
	if(route.includes('{') && route.includes('}')){
		route = route.replace(/\{(.*?)}/g, '(.*)');
	}else{
		route = route + '?';
	}
	Router.routes.push({ path: route, callback: fn });
};

Router.name = "Router";	

Router.not_found = {
	"path": 'not_found',
	"callback": function(){ 
		document.body.innerHTML += `<h1>Router: "${this.uri}" not found!!</h1>`;
	}
};

Router.path_active = (location.hash) ? location.hash.slice(1) : location.pathname;

Router.dispatch = () => {
	let splited = (str) => str.split('/').length;
	var params = [],
		args = [];
	var router = Router.routes.filter((route) => {
		var pattern = new RegExp('^'+ route.path );
		args = Router.path_active.match(pattern);
		if(Array.isArray(args) && args !== null){
			args = args.slice(1);
		}
		return pattern.test(Router.path_active)
			   && splited(route.path) == splited(Router.path_active);
	});
	router = router.length > 0 ? router[0] : Router.not_found; 
	return [ router.callback, router.path, args, Router.path_active];
};

module.exports = Router;