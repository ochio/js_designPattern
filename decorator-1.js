function vehicle(vehicleType){
	this.vehicleType = vehicleType || "car"
	this.model = "default"
	this.license = "0000-00"
}

const testInstance = new vehicle("car")
console.log(testInstance);

const truck = new vehicle('truck')

truck.setModel = function(modelName){
	this.model = modelName
}

truck.setColor = function(color){
	this.color = color
}

truck.setModel("CAT")
truck.setColor("blue")
console.log(truck);

const secondInstance = new vehicle("car")
console.log(secondInstance);