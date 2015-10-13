var outConsole = document.getElementById("console-window");

function println(string) {
	outConsole.innerHTML += string + "<br>";
	outConsole.scrollTop = outConsole.scrollHeight;
}

function print(string) {
	outConsole.innerHTML += string;
	outConsole.scrollTop = outConsole.scrollHeight;
}

function Bot() {
	this.randomPosition();
	println("<br/>New bot, position: " + this.position);
}

// Moves forward 1 square
Bot.prototype.forward = function() {
	++this.position;
	if(this.position >=11) {
		this.position = 1;
	}
	this.positionHistory.push(this.position);
}

// Moves backwards 1 square
Bot.prototype.back = function() {
	--this.position;
	if(this.position <= 0) {
		this.position = 10;
	}
	this.positionHistory.push(this.position);
}

// Moves forward until the bot is on stopPosition
Bot.prototype.forwardUntil = function(stopPosition) {
	while(this.position != stopPosition) {
		println("Bot is on position " + this.position + ", moving clockwise.");
		this.forward();
	}

	println("Bot ended on position " + this.position + ".");
}

// Moves back until the bot is on stopPosition
Bot.prototype.backUntil = function(stopPosition) {
	while(this.position != stopPosition) {
		println("Bot is on position " + this.position + ", moving clockwise.");
		this.back();
	}

	println("Bot ended on position " + this.position + ".");
}

// Finds the shortest path to stopPosition and takes it
Bot.prototype.shortestPath = function(stopPosition) {
	// +10 %10 is to normalize the numbers 
	var backDistance = (this.position - stopPosition + 10) % 10;
	var forwardDistance = (stopPosition - this.position + 10) % 10;

	if(backDistance < forwardDistance) {
		println("The backwards path is shorter than the forwards path.");
		this.backUntil(stopPosition);
	} else {
		println("The forwards path is shorter than the backwards path.");
		this.forwardUntil(stopPosition);
	}
}

// Prints the way back by printing printHistory backwards.
Bot.prototype.printHistoryBackwards = function() {
	println("Directions back to beginning:");

	for(var i=this.positionHistory.length-1; i>= 0; --i) {
		print(this.positionHistory[i] + ", ");
	}
	println("");
}

// Randomizes the bot's position.
Bot.prototype.randomPosition = function() {
	this.position = Math.floor(Math.random() * 10) + 1;
	this.positionHistory = new Array();
	this.positionHistory.push(this.position);
}

var bot = new Bot();

function partA() {
	println("");

	if(bot.position == 8) {
		println("Bot started on position 8, stopping.")
		return;
	}

	bot.forwardUntil(10);
}

function partB() {
	if(bot.position == 5) {
		println("");
		println("Bot started on position 5, moving back until position is 10.")
		bot.backUntil(10)
		return;
	} else {
		partA();
	}
}

function partC() {
	partB();
	bot.printHistoryBackwards();
}

function partD() {
	println("");
	bot.shortestPath(10);
}
