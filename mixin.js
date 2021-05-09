const Car = function (settings){
	this.model = settings.model || 'no model'
	this.color = settings.color || 'no color'
}

const Mixin = function (){}

Mixin.prototype = {
	driveForward: function(){
		console.log("drive forward");
	},
	driveBackward: function(){
		console.log("drive backword");
	},
	driveSideways: function(){
		console.log("drive sideways");
	}
}

function augment(receiveingClass, givingClass){
	if(arguments[2]){ // 特定のメソッドだけを提供
		for(let i = 2, len = arguments.length; i < len; i++){
			receiveingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]]
		}
	} else {
		for( let methodName in givingClass.prototype){
			if(!Object.hasOwnProperty(receiveingClass.prototype, methodName)){ // receiveingClassに継承しようとするメソッドがなければ継承する
				receiveingClass.prototype[methodName] = givingClass.prototype[methodName]
			}
		}
	}
}

augment(Car, Mixin, "driveForward", "driveBackward")

const myCar = new Car({
	model: "Ford Excort",
	color: "blue"
})

myCar.driveForward()
myCar.driveBackward()

augment(Car, Mixin )
const mySportsCar = new Car({
	model: "Porsche",
	color: "red"
})

mySportsCar.driveSideways()