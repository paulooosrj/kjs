import Mustache from 'mustache';

export function interpolate(tpl, d){

	let data = kjs._states || d;
	return Mustache.render(tpl, data);

}

export function interpolateAttr(tpl, d){

	let data = kjs._states || d;
	let pattern = /\[\{\s?(.*)\s?\}\]/gim;
	let ntpl = tpl.replace(pattern, (repl, arg) => {
		Object.keys(data).map((k) => {
			if(arg.includes('data.' + k)) return;
			arg = arg.replace(new RegExp(k, 'gim'), 'data.' + k);
		});
		return '${' + arg + '}';
	});

	return new Function('data', 'return `'+ntpl+'`;')(data);

}
