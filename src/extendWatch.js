export default function extendWatch(target) {
  
  var validator = {
    get(target, key) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        return new Proxy(target[key], validator)
      } else {
        return target[key];
      }
    },
    set (target, key, value) {
      target[key] = value;
      window.observer.emit("$bind-data-" + key, value);
      window.observer.emit("$bind-attr-" + key, value);
      window.observer.emit('$bind-customEvent-' + key, value)
      return true;
    }
  };

  kjs.$store = new Proxy(target, validator);

  return kjs.$store;

};