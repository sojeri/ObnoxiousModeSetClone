SetHint = function(boardObject) { // SetHint constructor
  this.board = boardObject;
  this.drawingMachine = this.board.drawingMachine;
  this.hintCount = 0;
  this.set;
}

SetHint.prototype.hint = function(arrayOfCards) {
  // first, check if there's no set & try to find one
  if (!this.set) { this.findSet(this.board.table); }
  // if there's still no set, return false
  if (!this.set) { return this.noSetsAvailable(); }

  // since we've passed the guards, return the appropriate hint response
  switch (this.hintCount) {
    case 0:
      this.displayMessages(0);
      break;
    case 1:
      this.displayMessages(1);
      break;
    case 2:
      this.displayMessages(2);
      break;
    case 3:
      this.displayMessages(3);
      break;
    case 4:
      this.selectAvailableSet(1);
      break;
    case 5:
      this.selectAvailableSet(2);
      break;
    default:
      this.selectAvailableSet(3);
      break;
  }

  // since we've made it this far, we've offered some kind of hint
  this.hintCount++;
}

SetHint.prototype.findSet = function(arrayOfCards) {
  // iterate through cards
  var limit = arrayOfCards.length;
  for (var i = 0; i < limit; i++) {
    for (var j = 1; j < limit; j++) {
      for (var k = 2; k < limit; k++) {
        if (i !== j && j !== k) { // a set has to be three distinct cards
          var possibleSetLocations = [arrayOfCards[i], arrayOfCards[j], arrayOfCards[k]];
          var that = this;

          var possibleSet = possibleSetLocations.map(function(deckPosition) {
            return that.board.selectCardFromDeck(deckPosition);
          });

          if (SetRules.isSet(possibleSet)) {
            this.set = possibleSet;
            return;
          };
        }
      }
    }
  }
}

SetHint.prototype.displayMessages = function(desiredMessage) {
  var message = "";
  var cardAttributes = ["shape", "color", "number", "fill"];
  var that = this;

  function craftHint(cardAttribute) {
    message += ("For this set, the " + cardAttribute + "s are all ");
    message += (that.set[0][cardAttribute] === that.set[1][cardAttribute]) ? "the same." : "different.";
  }

  craftHint(cardAttributes[desiredMessage]);

  this.drawingMachine.display(message);
}

SetHint.prototype.selectAvailableSet = function(desiredCardsSelected) {
  function choose(card) {
    var selected = $("#" + card.parentId).addClass("selected");
  }

  switch (desiredCardsSelected) {
    case 3:
      choose(this.set[2]);
    case 2:
      choose(this.set[1]);
    case 1:
      choose(this.set[0]);
      break;
  }
}


SetHint.prototype.noSetsAvailable = function() {
  var message = "I could not find a set on the board! Here are three new cards."
  this.drawingMachine.display(message);
  // draw three new cards
  if (this.board.table.length === 12) {
    this.board.drawNewCards([12, 13, 14]);
  } else {
    this.board.drawNewCards([15, 16, 17]);
  };

  this.board.display();
}

// this should get called whenever a set is successfully found in the game
SetHint.prototype.reset = function() {
  this.hintCount = 0;
  this.set = null;
  this.drawingMachine.display("");
}
