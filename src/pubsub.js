class PubSub {

	constructor(){
		this.topics = {};
	}

	on(topic, listener) {

      if(!this.topics[topic]) this.topics[topic] = { queue: [] };
      var index = this.topics[topic].queue.push(listener) - 1;
      return (function(topic, index) {
      	const context = {
          remove: function() {
            delete this.topics[topic].queue[index];
          }
        };
        return Object.assign(this, context);
      }).bind(this)(topic, index);

    }

    publish(topic, info) {
      if(!this.topics[topic] || !this.topics[topic].queue.length) return;
      let items = this.topics[topic].queue;
      for(let i = 0, len = items.length; i < len; i++) {
        if(typeof items[i] === 'function') items[i](info || {});
      }
    }

};

export default new PubSub();
