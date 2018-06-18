import Render from './render';
import extendWatch from './extendWatch';

export default function bind(element, data, observer){

  kjs.$store = data;

  const attributes = e => {
    var attrs = new Object(e.attributes);
		var attrsn = {};
		Object.keys(attrs).map((k) => {
			attrsn[attrs[k]['name']] = attrs[k]['value'];
		});
		return attrsn;
  };

  const runAttrs = e => {
    let attrs = attributes(e);
    let l = Object.keys(attrs);
    if( l.length > 0 ){
      l.map(attr => {
        if( /\[(.*?)\]/gim.test(attr) === false ) return false;
        let value = attrs[attr];
        customEvents(attr, value, e);
      });
    }
  };

  const filtro = e => {
    runAttrs(e);
    let especs = ["each", "if"];
    let pat = makeRegx(especs);
    let search = e.outerHTML.match(pat);
    let eac = Array.isArray(search) && search.length > 0 ? search[0] : false;
    if(eac) return true;
    let pattern = /<(.*?)>(.*?)\{\{(.*?)\}\}(.*?)<\/(.*?)>/gim;
    if ( pattern.test(e.outerHTML) === false) return false;
    let find = e.outerHTML.match(pattern);
    if(find) return find[0] === e.outerHTML;
  };

  const makeRegx = (d) => {
    let o = Array.isArray(d) ? d : Object.keys(d);
    let pattern = o.toString().replace(/\,/g, "|");
    let pt = new RegExp(`(${pattern})`, 'gm');
    return pt;
  };

  const findBinds = e => {
    let pt = makeRegx(data);
    return e.match(pt);
  };

  const bindData = (key, e, k) => {
    let rendered = (value, re = false) => {
        let cache = kjs.$caches[k];
        let r = Render(cache, kjs.state || kjs.$store);
        e.innerHTML = r;
    };
    observer.on('$bind-data-' + key, rendered);
    rendered('', true);
  };

  const observerCustom = (evt, callback, node) => {
    observer.on('$bind-customEvent-' + callback, () => {
      customEvents(evt, callback, node, true);
    });
  };

  const customEvents = (eventName, callback, node, observer = false) => {
    let pattern = /\[\((.*?)\)\]/gim;
    let e = '';
    let fn = '';
    if(pattern.test(eventName)){
      e = eventName.replace(pattern, (ant, atual) => atual);
      fn = kjs.$store[callback] || '';
      node.setAttribute(e, fn);
    }else{
      e = eventName.replace(/\[(.*?)\]/gim, (st, event) => event);
      let $store = kjs.$store;
      fn = ($store[callback]) ? $store[callback] : function(){ console.log("Not existing callback to event"); };
      node.addEventListener(e, fn.bind(kjs));
    }
    if(node.getAttribute(eventName)) node.removeAttribute(eventName);
    if(observer === false){
      observerCustom(eventName, callback, node);
    }
	}

  const bindAttr = (key, e, attr, k) => {

    let rendered = (value, re = false) => {
        let cache = kjs.$caches[k];
        let r = Render(cache, kjs.state || kjs.$store);
        e.setAttribute(attr, r);
    };
    observer.on('$bind-attr-' + key, rendered);
    rendered('', true);
  };

  const list = (e, k) => {
    let find = findBinds(e.innerHTML);
    console.log(e);
    if(Array.isArray(find) && find.length > 0){
      kjs.$caches[k] = e.innerHTML;
      find.map(key => bindData(key, e, k));
    }
  };

  Array.from(element.querySelectorAll("*"))
       .filter(filtro)
       .map(list);

  return extendWatch(kjs.$store);

};