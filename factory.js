function Car(options){
	this.doors = options.doors || 4
	this.state = options.state || "brand new"
	this.color = options.color || "silver"
}

function Truck(options){
	this.state = options.state || 'used'
	this.wheelSize = options.wheelSize || "large"
	this.color = options.color || "blue"
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car

VehicleFactory.prototype.createVehicle = function(options){
	if(options.vehicleType === 'car'){
		this.vehicleClass = Car
	} else {
		this.vehicleClass = Truck
	}

	return new this.vehicleClass(options)
}

VehicleFactory.test = function(){ // 静的メソッドはインスタンスに追加されない
	return 1
}

const carFactory = new VehicleFactory()
const car = carFactory.createVehicle({
	vehicleType: 'car',
	color: "yellow",
	doors:6
})

const movingTruck = carFactory.createVehicle({
	vehicleType: 'truck',
	state: "like new",
	color:"red",
	wheelSize: "small"
})

function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory() // VehicleFactoryのprototypeはTruckFactory.prototype.__proto__に格納される
TruckFactory.prototype.vehicleClass = Truck

const truckFactory = new TruckFactory()
const myBigTruck = truckFactory.createVehicle({
	state: 'omg..so bad',
	color: "pink",
	wheelSize: "so big"
})

console.log(myBigTruck);