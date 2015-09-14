// code for the board object!

function SetBoard() { // SetBoard constructor
  // has a deck of cards
  this.deck = new SetDeck();
  this.table = this.deck.draw(12);

  // has a drawing machine
  this.drawingMachine = new SetDraw();

  // and a hint machine
  this.hint = new SetHint();

  // initialize score to zero
  this.playerScore = 0;
}

SetBoard.prototype.createEmptyCard = function(row, col) {
  // make a card slot
  var canvasDiv = $("<div></div>");
  canvasDiv.addClass("card");

  var canvas = $("<canvas></canvas>");
  canvas.attr("height", 150);
  canvas.attr("width", 100);
  canvasDiv.append(canvas);

  // give it a unique position marker
  canvasDiv.attr("card-row", "r" + row);
  canvasDiv.attr("card-col", "c" + col);

  return canvasDiv;
}

SetBoard.prototype.clickCard = function(id) {
  // change the class's selection type when clicked
  var cardDiv = $("#" + id);
  cardDiv.toggleClass("selected");
}

SetBoard.prototype.set = function() {
  var possible = $(".selected");
  if (possible.length !== SetRules.size) {
    console.log("wrong no. cards");
  } else {
    that = this;

    function grabCards(tablePosition) {
      var cardRef = that.table[tablePosition]; // grab the deck's cardRef from the board
      var card = that.deck.cards[cardRef]; // grab the card from the deck
      return card;
    }

    function grabTablePositions(div) {
      // grab the board's cardRef from the div element
      var tablePosition = div.id;
      tablePosition = tablePosition.replace("#", "");
      tablePosition = Number(tablePosition);
      return tablePosition;
    }

    var possibleSetDivs = [possible[0], possible[1], possible[2]];
    var tablePositions = possibleSetDivs.map(grabTablePositions);
    var possibleSet = tablePositions.map(grabCards);

    if (SetRules.isSet(possibleSet)) {
      // this is a super cool pattern StackOverflow suggested for mimicking
      // sleep / pause functionality. this is necessary, because removeSet
      // triggers some animations that last 0.08 seconds. but code continues
      // executing here despite that. so before this pattern was implemented,
      // the display() function would try to display cards that weren't yet
      // added to the DOM in drawNewCards().
      function animateChanges() {
        that.drawingMachine.removeSet(possibleSet);
        that.drawNewCards(tablePositions);

        // wait for spin animations to complete before continuing
        setTimeout(continueExecution, 80);
      }

      // finish doing things after the pause
      function continueExecution() {
        that.display();
      }

      animateChanges();

    } else {
      console.log("not a set");
    }
  }
}

SetBoard.prototype.drawNewCards = function(oldSetLocations) {
  if (this.deck.cardRefs.length > 0) {
    var newCards = this.deck.draw(oldSetLocations.length);
    var that = this;

    oldSetLocations.forEach(function(location, index) {
      that.table.splice(location, 1, newCards[index]); // draw a new card
    });

    console.log("now w/ new cards: " + this.table);
  };
}

SetBoard.prototype.display = function() {
  var deck = this.deck;
  var that = this;
  this.table.forEach(function(cardRef, index) {
    var card = deck.cards[cardRef];
    card.parentId = card.parentId || index;
    that.drawingMachine.display(card);
  });
}
