$(document).ready(function(){
	// initiate Game;
	var game = newGame();
	var messageBoard = $('#message_board');
	var pastGuesses = $('.past-guesses').children()[0];

	// important elements
	var bg = $('#bg');
	var userGuessBox = $('#user_guess')
	var allCaptions = $('.caption');


	allCaptions.delay(1000).fadeOut();

	selectInput();

	$(window).on("keydown", function(e){
		var key = e.keyCode;

		// enable typing even if not selected textarea
		if (!userGuessBox.is(":focus")){
			selectInput();
		}

		// either a number or 
		if (key == 72 || key == 82 || key == 13){
			switch(key){
				case 72:// H
					if (e.altKey){
						e.preventDefault();
						hint();
					}
					break;
				case 82:// R
					if (e.altKey){
						e.preventDefault();
						resetGame();
					}
					break;
				case 13:// ENTER
					submitInput();
					break;
				default:
					e.preventDefault();
					break;
			}
		}
	})

	$('button').on("click", function(e){
		switch (e.target.id){
			case "hint_btn":
				hint();
				break;
			case "submit_btn":
				submitInput();
				break;
			case "reset_btn":
				resetGame();
		}
	})

	$('.control-panel').mouseenter(function(){
		allCaptions.show();
	}).mouseleave(function(){
		allCaptions.fadeOut(300);
	})

	function hint(){
		changeMessage("The correct number is between: " + game.provideHint().join(", "));
	}



	// bg color flasher
	function bgColor(color){
		switch(color){
			case "green":
				// console.log("going green")
				bg.removeClass();
				bg.addClass("bg-green", 1000, "easein");
				break;
			case "orange":
				break;
			case "white":
				bg.removeClass();
				bg.addClass("bg-white", 1000, "easeine");
				break;
			case "red":
				bg.removeClass();
				bg.addClass("bg-red", 1000, "easein");
				break;
			default:
				break;
		}
	}

	// reset game
	function resetGame(){
		game = newGame();
		changeMessage("go on, take your guess.");
		bgColor("white");
		var guessArray = $(pastGuesses).children();
		$(guessArray).each(function(elem){
			$(this).text("●");
		})

	}


	// actions
	function changeMessage(message){
		messageBoard.text(message);
	}


	// main submit function
	function submitInput(){
		var currentGuess = userGuessBox.val();
		clearInput();
		selectInput();

		try {
			var result = game.playersGuessSubmission(currentGuess);		
		} catch(error) {
			var result = "That is an invalid guess.";
		}
		

		switch (result){
			case "You have already guessed that number.":
				console.log("guessed!")
				break;
			case "You Lose.":
				bgColor("red");
				addGuess(currentGuess);
				console.log("lost")
				break;
			case "You\'re burning up!":
				addGuess(currentGuess);
				console.log("You\'re burning up!");
				break;
			case "You\'re lukewarm.":
				addGuess(currentGuess);
				console.log("You\'re lukewarm.");
				break;
			case "You\'re a bit chilly.":
				addGuess(currentGuess);
				console.log("You\'re a bit chilly.");
				break;
			case "You\'re ice cold!":
				addGuess(currentGuess);
				console.log("You\'re ice cold!");
				break;
			case "You Win!":
				bgColor("green");
				addGuess(currentGuess);
				break;
			default:
				console.log("invalid")
		}

		changeMessage(result);
	}

		// helper: highlight input
		function selectInput(){
			userGuessBox.select();
		}

		// helper: clear input
		function clearInput(){
			userGuessBox.val("");
		}

	// add to 'past guesses'
	function addGuess(guess){
		var guessArray = $(pastGuesses).children();

		var currentGuessNum = game.pastGuesses.length - 1;
		console.log("current index", currentGuessNum);
		console.log(guessArray[currentGuessNum]);
		$(guessArray[currentGuessNum]).text(guess);
	}



})

