function initHangmanUi(game, container){
  var id = '#' + container[0].id;
  
  $(id +' .hang-start').click(function(){
    startGame(game, id)
  });

  $(id +' .hang-letters span').click(function(){
    var state = game.getState();
    if(state.status !== 'Playing'){
      return;
    }else{
      playTurn(game, id);
      state = game.getState();
      if(state.status !== 'Playing'){
        endGame(game, id);
      }
    }
  });
}

//reinitialize all HTML elements to original status
function startGame(game, id){
  game.start();
  $(id +' .hang-output').html('');
  event.target.className +=' invisible';
  $(id +' .hang-tried-letters').html('');
  $(id +' .hang-picture img:nth-child(n+2)').addClass('invisible');
  $(id +' .hang-picture img:nth-child(n+2)').removeClass('visible');
  $(id +' .hang-start').addClass('invisible');
  $(id +' .hang-start').removeClass('visible');
  $(id +' .hang-letters span').addClass('visible');
  $(id +' .hang-letters span').removeClass('invisible');
  var state = game.getState();
  drawCrtRendering(state.word, id);
  drawWins(state, id);	
}

//makes the button visible again
function endGame(game, id){
  $(id +' .hang-start').addClass('visible');
  $(id +' .hang-start').html('NEXT WORD');
}


function playTurn(game, id){
  game.play(event.target.dataset.letter);
  var state = game.getState();
  drawCrtRendering(state.word, id);
  drawHungBodyParts(state.mistakes, id);
	drawTriedLetters(state.triedLetters, id);
  makeCurrentLetterInvisible(event.target, id);
	
}


function makeCurrentLetterInvisible(letter, id){
  letter.classList.remove('visible');
  letter.className += ' invisible';
}

function drawTriedLetters(triedLetters, id){
  $(id +' .hang-tried-letters').html('');
	for(var i = 1; i <= triedLetters.length; i++){
		$(id +' .hang-tried-letters').append(triedLetters[i-1]);
		if(i%4 === 0){
			$(id +' .hang-tried-letters').append('</br>');
		}
	}
}


function drawCrtRendering(word, id){
  $(id +' .hang-output').html(word);
}


function drawHungBodyParts(number, id){
  if(number === 0){
    return;
  }
  var bodyParts =$(id +' .hang-picture img:nth-child(n+2)');
  for(var i = 0; i< number; i++){
    bodyParts[i].className += ' visible';
    bodyParts[i].classList.remove('invisible')
    if(i=== 5){
      bodyParts[i+1].className += 'visible';
      bodyParts[i+1].classList.remove('invisible')
      bodyParts[i+2].className += 'visible';
      bodyParts[i+2].classList.remove('invisible')
    }
  }
}


function drawWins(state, id){
	$(id +' .hang-wins').html('W: ' + state.wins);
	$(id +' .hang-losses').html('L: ' + state.losses);
}