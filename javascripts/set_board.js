// code for the board object!

function SetBoard() { // SetBoard constructor
  // has a deck of cards
  this.deck = new SetDeck();
  this.cardRefs = this.deck.draw(12);

  // has a drawing machine
  this.drawingMachine = new SetDraw(); // SetDraw(this) broke everything

  // and a hint machine
  this.hint = new SetHint();

  // initialize score to zero
  this.playerScore = 0;
}

SetBoard.prototype.hint = function() {
  // hint function here
}

SetBoard.prototype.clickCard = function(id) {
  // var cardRef = this.cardRefs[Number(id)];
  // var card = this.deck.cards[cardRef];
  var cardDiv = $("#" + id);
  cardDiv.toggleClass("selected");


  // var cardAttrs = [card.color, card.shape, card.fill, card.number];
  // console.log("check out de card: " + cardAttrs.join(" "));
}

SetBoard.prototype.set = function() {
  var possible = $(".selected");
  if (possible.length !== Set.size) {
    console.log(false);
  } else {
    var possibleSet = [possible[0], possible[1], possible[2]];
    console.log(Set.isSet(possibleSet));
  }
}

SetBoard.prototype.display = function() {
  var deck = this.deck;
  var that = this;
  this.cardRefs.forEach(function(cardRef, index) {
    var card = deck.cards[cardRef];
    card.parentId = card.parentId || index;
    that.drawingMachine.display(card);
  });
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
