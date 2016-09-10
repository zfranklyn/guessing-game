var generateWinningNumber = function(){
	return Math.floor(Math.random()*100 + 1);
}

var shuffle = function(array){
	var remainingElements = array.length,
		randomIndex,
		temp;

	while (remainingElements) {

		randomIndex = Math.floor(Math.random() * remainingElements);

		remainingElements--;

		temp = array[remainingElements];
		array[remainingElements] = array[randomIndex];
		array[randomIndex] = temp;

		
	}

	return array;
}

var Game = function(){

	this.playersGuess = null;
	this.pastGuesses = [];

	this.winningNumber = generateWinningNumber();

}

Game.prototype.difference = function(){
	return Math.abs(this.winningNumber  - this.playersGuess);
}

Game.prototype.isLower = function(){
	if (this.playersGuess < this.winningNumber){
		return true;
	} else {
		return false;
	}
}

Game.prototype.playersGuessSubmission = function(guess){
	if (isNaN(guess) || guess > 100 || guess <= 0){
		throw "That is an invalid guess.";
	} else {
		return this.checkGuess(guess);
	}
}

Game.prototype.checkGuess = function(guess){
	// console.log("length", this.pastGuesses.length);
	if (guess == this.winningNumber){
		this.playersGuess = guess;
		this.pastGuesses.push(guess);
		return "You Win!";
	} else if (this.pastGuesses.includes(guess)){
		return "You have already guessed that number.";
	} else {
		if (this.pastGuesses.length >= 4){
			this.playersGuess = guess;
			this.pastGuesses.push(guess);
			return "You Lose.";
		} else {
			// give some feedback
			this.playersGuess = guess;
			this.pastGuesses.push(guess);
			var diff = this.difference();

			if (diff < 10){
				return "You\'re burning up!";
			} else if (diff < 25){
				return "You\'re lukewarm.";
			} else if (diff < 50){
				return "You\'re a bit chilly.";
			} else {
				return "You\'re ice cold!";
			}
			

		}
	}
}

var newGame = function(){
	return new Game;
}

Game.prototype.provideHint = function(){
	var hintArray = new Array(3);
	hintArray[0] = this.winningNumber;
	hintArray[1] = generateWinningNumber();
	hintArray[2] = generateWinningNumber();
	return shuffle(hintArray);
}
