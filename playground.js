function a (v) {
	return function b(){
		return v + 10
	}
}


console.log(a(1)());