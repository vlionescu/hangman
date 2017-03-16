(function(){
  var tplElem = $('#template');
  var containers = $('.hang-instance')
  gameContainer1 = containers.eq(0);
  gameContainer2 = containers.eq(1);
  
  gameContainer1.html(tplElem.html());
  gameContainer2.html(tplElem.html());
  var ws1 = createWordSupplier();
  var ws2 = createWordSupplier();
  var game1 = createHangmanGame(ws1, 6);
  var game2 = createHangmanGame(ws2, 6);


  initHangmanUi(game1, gameContainer1);
  initHangmanUi(game2, gameContainer2);

})()