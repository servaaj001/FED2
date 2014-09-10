var Steve = {
	name: 'Steve',

	speak: function () {
		console.log("Hi, I'm " + this.name + ". Nice to meet you!");
	},

	eat: function () {
		console.log('I am currently eating, om nom nom nom...');
	}
}

Steve.speak();
Steve.eat();