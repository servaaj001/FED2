function Person (name) { //created an object with a constructor
	this.name = name;
}

Person.prototype.speak = function () {
	console.log("Hi, I'm "+ this.name + '. Nice to meet you!');
}

Person.prototype.eat = function () {
	console.log('Please do not disturb me, I am eating at the moment');
}

var Steve = new Person('Steve');

Steve.speak();
Steve.eat();