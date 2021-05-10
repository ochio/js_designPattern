Function.prototype.implementsFor = function(parentClassOrObject){
	if(parentClassOrObject.constructor === Function){
		this.prototype = new parentClassOrObject()
		this.prototype.constructor = this
		this.prototype.parent = parentClassOrObject.prototype
	}else{
		this.prototype = parentClassOrObject
		this.prototype.constructor = this
		this.prototype.parent = parentClassOrObject
	}
	return this
}

// フライトウェイトオブジェクト
const CoffeeOrder = {

	// インターフェイス
	serveCoffee: function(context){},
	getFlavor: function(){}
}


//具象フライトウェイトオブジェクト
function CoffeeFlavor(newFlavor){
	const flavor = newFlavor

	if(typeof this.getFlavor === "function"){
		this.getFlavor = function(){
			return flavor
		}
	}

	if(typeof this.serveCoffee === "function"){
		this.serveCoffee = function(context){
			console.log("Serving Coffee flavor" + flavor + "to table number" + context.getTable());
		}
	}
}

CoffeeFlavor.implementsFor(CoffeeOrder)

function CoffeeOrderContext(tableNumber){
	return {
		getTable: function(){
			return tableNumber
		}
	}
}

function CoffeeFlavorFactory(){
	const flavors = []

	return {
		getCoffeeFlavor: function(flavorName){
			let flavor = flavors[flavorName]
			if(flavor === undefined){
				flavor = new CoffeeFlavor(flavorName)
				flavors.push([flavorName, flavor])
			}
			return flavor
		},
		getTotalCoffeeFlavorsMade: function(){
			return flavors.length
		}
	}
}

testFlyweight()
function testFlyweight(){
	let flavors = new CoffeeFlavor(),
	tables = new CoffeeOrderContext(),
	ordersMade = 0,
	flavorFactory;

	function takeOrders(flavorIn, table){
		flavors[ordersMade] = flavorFactory.getCoffeeFlavor(flavorIn)
		table[ordersMade++] = new CoffeeOrderContext(table)
	}

	flavorFactory = new CoffeeFlavorFactory()

	takeOrders('カプチーノ', 2)
	takeOrders('フラッペ', 1)
	takeOrders('カプチーノ', 2)
	takeOrders('エスプレッソ', 3)

	for(let i = 0; i < ordersMade; i++){
		flavors[i].serveCoffee(tables[i])
	}
	console.log(" ");
	console.log("total coffeeFlavor object made:" + flavorFactory.getTotalCoffeeFlavorsMade());
}