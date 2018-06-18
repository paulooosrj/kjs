export default function(){

  const listeners = {};

  const on = function(channel, callback){
    if(this.listeners[channel]) this.listeners[channel].push(callback);
    else this.listeners[channel] = [ callback ];
  };

  const emit = function(channel, data){
    if(this.listeners[channel]){
      this.listeners[channel].map(e => e(data));
    }
  };

  return {
    listeners,
    on,
    emit
  };

}