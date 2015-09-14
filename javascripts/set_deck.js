// deck code goes here!
function SetDeck() { // SetDeck constructor
  this.cards = SetCard.populateDeck();
  this.cardRefs = this.cards.map(function(card, cardIndex) {
    return cardIndex;
  });

  this.shuffle();
}

// draws a passed in number of cardRefs to a passed in board
SetDeck.prototype.draw = function(amount) {
  var cardsDrawn = [];

  for (var i = 0; i < amount; ++i) {
    cardsDrawn.push(this.cardRefs.shift());
  }

  return cardsDrawn;
}

SetDeck.prototype.shuffle = function() {
  var temp = this.cardRefs.slice(); // make a copy of the original cardRefs
  this.cardRefs = []; // delete the originals

  while (temp.length > 0) {
    var randomIndex = Math.floor(Math.random() * temp.length);
    var card = temp.splice(randomIndex, 1); // this returns an array of 1 item
    this.cardRefs.push(card[0]); // so here it gets grabbed with [0]
  }
}
