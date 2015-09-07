// deck code goes here!

function Deck() { // Deck constructor
  this.cards = Card.populateDeck();
  this.cardRefs = this.cards.map(function(card, cardIndex) {
    return cardIndex;
  });

  this.shuffle();
}

// draws a passed in number of cardRefs to a passed in board
Deck.prototype.draw = function(board, amount) {
  for (var i = 0; i < amount; ++i) {
    board.push(this.cardRefs.shift());
  }
}

Deck.prototype.shuffle = function() {
  var temp = this.cardRefs.slice();
  this.cardRefs = [];

  while (temp.length > 0) {
    var randomIndex = Math.floor(Math.random() * temp.length);
    var card = temp.splice(randomIndex, 1); // this returns an array of 1 item
    this.cardRefs.push(card[0]); // so here it gets grabbed with [0]
  }
}
