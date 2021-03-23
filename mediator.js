const mediator = (function () {

	const topics = {}

	const subscribe = function(topic, fn){

		if(!topics[topic]){
			topics[topic] = []
		}
		
		topics[topic].push({context: this, callback: fn})
		console.log(this.Publish);
		return this
	}

	const publish = function (topic) {
		let args

		if(!topics[topic]){
			return false
		}

		args = Array.prototype.slice.call(arguments, 1)
		for(let i = 0, l = topics[topic].length; i < l ; i++){
			const subscription = topics[topic][i]
			subscription.callback.apply(subscription.context, args)
		}

		return this
	}

	return {
		Publish: publish,
		Subscribe: subscribe,
		installTo: function (obj) {
			obj.subscribe = subscribe,
			obj.publish = publish
		}
	}
})()

mediator.Subscribe('aa', function () {
	return 1 + 10
})
mediator.Publish('aa')