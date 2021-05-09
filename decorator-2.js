function MacBook(){
	this.cost = function(){return 997}
	this.screenSize = function(){return 11.6}
}

// デコレータ１
function Memory(macbook){
	const v = macbook.cost()
	macbook.cost = function(){
		return v + 75
	}
}

// デコレータ2
function Engraving(macbook){
	const v = macbook.cost()
	macbook.cost = function(){
		return v + 200
	}
}

// デコレータ3
function Insurance(macbook){
	const v = macbook.cost()
	macbook.cost = function(){
		return v + 250
	}
}

const mb = new MacBook()
Memory(mb)
Engraving(mb)
Insurance(mb)

console.log(mb.cost());

console.log(mb.screenSize());
