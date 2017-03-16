function createWordSupplier(){
  var words = [ "relationship", "interview", "bookstore", "attempt", "editor", "carnage", "computer", "neighborhood", "independent", "relationship", "advertisement", "connection", "experience", "knowledge", "government"];
  var numOfWords = 15;
  return{
    getNewWord: function(){
      var randomIndex = Math.floor(Math.random()*numOfWords)
      numOfWords--;
      var crtWord = words[randomIndex]
      words.splice(randomIndex, 1);
      return crtWord;

    }
  }
}