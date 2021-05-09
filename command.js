const CarManager = {
	requestInfo: function(model, id) {
		return `The information for ${model} with ID ${id} is foobar`
	},
	buyVehucle: function(model, id) {
		return `You have successfully purchased Item ${id}, a ${model}`
	},
	arrangeViewing: function(model, id) {
		console.log(this);
		return `You have successfully booked a viewing of ${model} ${id}`
	}
}

CarManager.execute = function (name){
	return CarManager[name] && CarManager[name].apply({a:1}, [].slice.call(arguments, 1))
}
