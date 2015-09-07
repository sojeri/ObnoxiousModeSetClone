// code for the board object!

function Board() { // Board constructor
  this.deck = new Deck();
  this.cardRefs = this.deck.draw(12);

  // initialize scores etc to zero
  this.hint = 0;
  this.playerScore = 0;
  this.computerScore = 0;
}

Board.prototype.hint = function() {
  // hint function here
}

Board.prototype.clickCard = function(id) {
  // should this be here? or in deck or card?
  // need to better sketch out responsibility
  console.log("you clicked card #" + id);
}

Board.prototype.display = function() {
  this.cardRefs.forEach(function(cardRef) {
    deck.cards[cardRef].draw();
  })
}


/*

what does board need to do?
- keep track of cards
- keep track of hint status
- keep track of color options

what does deck need to do?
- be a collection of cards

what do cards need to do?
- store the card info
- draw themselves

*/
