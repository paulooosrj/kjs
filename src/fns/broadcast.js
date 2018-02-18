'use strict';

global.$broadcast = {
	db: [],
	channels: {},
	clusters: () => {
		return Object.keys($broadcast.channels).length;
	},
	cache(){
		return JSON.stringify(this.db);
	},
	allChannels(){
		return JSON.stringify(this.channels);
	},
	channel(name){
		if(this.channels[name]) return JSON.stringify(this.channels[name]);
	},
	onbind(name){
		if(this.channels[name]) delete this.channels[name];
	},
	bind(name, ev){
		var self = this;
		this.channels[name] = {
			gen_id: Math.floor(Math.random() * 100000),
			bind_hour: new Date(),
			attach: true,
			callback: function(data){
				self.db.push(data);
				ev(data);
			},
		};
	},
	emit(name, data){
		if(this.channels[name]) this.channels[name].callback(data);
	},
	emitAll(data){
		Object.values($broadcast.channels).map((channel) => channel.callback(data));
	}
};

module.exports = $broadcast;
