function Person (name) {
	this.name = name; //this is a property

	this.speak = function() { //this is a method
		console.log('Hi, I am '+this.name+' and I rock!');
	}	
}

var Bob = new Person('Bob');
Bob.speak();