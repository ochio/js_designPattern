function Car(options){
	this.doors = options.doors || 4
	this.state = options.state || "brand new"
	this.color = options.color || "silver"
}

Car.prototype.drive = function(options){
	this.drive = options.drive || "100km"
}
Car.prototype.breakDown = function(options){
	this.breakDown = options.breakDown || "-10km"
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

const AbstractVehicleFactory = (function(){
	const types = {}
	return {
		getVehicle: function(type, customizations){
			const Vehicle = types[type]

			return (Vehicle) ? new Vehicle(customizations) : null
		},

		registerVehicle: function(type, Vehicle){
			const proto = Vehicle.prototype

			if(proto.drive && proto.breakDown){
				types[type] = Vehicle
			}

			return AbstractVehicleFactory
		}
	}
})()

AbstractVehicleFactory.registerVehicle('car', Car)
const car2 = AbstractVehicleFactory.getVehicle("car", {
	color: "lime",
	state: "line new",
	doors: 1
})
car2.drive({})
car2.breakDown({})
console.log(car2);