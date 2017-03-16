function createHangmanGame(wordSupplier, maxMistakes){

	var wordToGuess;
	var crtRendering = [];
	var crtMistakes= 0;
	var sessionLosses = 0;
	var sessionWins = 0;
	var triedLetters = [];
  var gameStatus;
	
  //reinitalize all the variables
  //Input & Output: none
  function start(){
  
      wordToGuess = wordSupplier.getNewWord();
      initializeCrtRendering();
      triedLetters = [];
      crtMistakes = 0;
      gameStatus = 'Playing';    
  }

  function initializeCrtRendering(){
		crtRendering = [];
    for(var i = 0; i < wordToGuess.length; i++){
      crtRendering[i] = '_';
    }
  }

  //gets a char as a argument and if it exists inside the word we have to guess it adds it to the current rendering
  //Input: letter(1 Char)
  //Output: true
  function play(letter){
   
    if(crtMistakes === maxMistakes){
      return;
    }

    triedLetters.push(letter);
    if(wordToGuess.indexOf(letter) === -1){
      crtMistakes++;
		
     
    }else{
      for(var i = 0; i < wordToGuess.length; i++){
        if(wordToGuess[i] === letter){
          crtRendering[i] = letter;
        }
      }  
    }
    setStatus();
  }

  //sets the status depending on weather there are any more underscores left and if the current rendering is equal to the word
  //Input & Output: none
  function setStatus(){
    if(crtMistakes === maxMistakes){
      for(var i = 0; i < wordToGuess.length; i++){
        if(crtRendering[i] === '_'){
          gameStatus = 'Lost';
					sessionLosses++;
					renderWord();
					console.log(crtMistakes,gameStatus);
          return;
        }
      }
	  }
	
		if(wordToGuess === crtRendering.join('')){
			gameStatus = 'Won';
			console.log(crtMistakes,gameStatus);
			sessionWins++;
      return;
		}
    
  }

  //gives the rendering the word that had to be guessed so that it can be displayed in case you lose
  //Input & Outpu: none
	function renderWord(){
		for(var i = 0 ; i < wordToGuess.length; i++){
			crtRendering[i] = wordToGuess[i];
		}
	}
	
  //returns an object that stores some of the public variables of the gameStatus
  //Input: none
  //Output: object
  function getState(){
    return {
      word: crtRendering.join(''),
      triedLetters: triedLetters,
      status: gameStatus,
      mistakes: crtMistakes,
			wins: sessionWins,
			losses: sessionLosses
    }
  }

	return {
		start: start,
		play: play,
		getState: getState
	}
}