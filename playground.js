function a (v) {
	return function b(){
		return v + 10
	}
}


const b = a(1)
console.log(b);