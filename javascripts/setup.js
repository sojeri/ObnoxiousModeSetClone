$(document).ready(function() {
  // set up click handlers for color schemes
  var board = $("#board");
  var info = $("#info");
  var options = $("#options");

  $(".colors").click(function(event) {
    var id = $(this).attr("id");
    game.drawingMachine[id].setColorScheme();
    game.display();
    options.hide();
    board.show();
  });

  // hide options & info panels
  options.hide();
  info.hide();

  // but definitely show the board
  // at least until there's a splash / start game screen >_>
  board.show();

  // var splash = $("#splash");
  // splash.show();

  // set up click handlers for options & info glyphs
  $(".glyph").click(function(event) {
    var clicked = $(this).attr("id");
    // using $(this).attr("id") instead of event.target.id because it's safer.
    // $(this) is the element that triggered the event, while event.target could
    // be something inside that (like a p tag) -- whatever was actually clicked.
    // if I decide to put images or spans inside the glyphs later, $(this) will
    // still refer to the element the event listener is for -- the containing
    // div.glyph. :)
    if (clicked == "info-glyph") {
      info.show(); options.hide(); board.hide();
    } else if (clicked == "options-glyph") {
      options.show(); info.hide(); board.hide();
    } else {
      board.show(); info.hide(); options.hide();
    }
  });

  var game = new SetBoard();

  // set up the board
  setupBoard();

  // set up click handlers for cards
  $(".card").click(function() {
    var id = $(this).attr("id"); // this should be the div
    game.clickCard(id);
  });

  // set up click handlers for buttons
  $("#set").click(function() {
    game.set();
  })

  // make a keydown event for users who prefer keyboard play

  // start the game
  game.drawingMachine.allColorSchemes();
  game.display();
});

function setupBoard() {
  // let's make space for 18 cards in case there aren't sets in the original 12
  var cardsVertical = 3;
  var cardsHorizontal = 6;
  var defaultCardsDisplayed = 12;

  // add card spaces to the table
  createCardSpaces(cardsVertical, cardsHorizontal, defaultCardsDisplayed);

  // add the set button
  createSetButton();
}

function createCardSpaces(rows, columns, displayLimit) {
  var board = $("#board"); // grab the board
  var displayedCards = 0;
  for (var col = 0; col < columns; col++) {
    for (var row = 0; row < rows; row++) {
      var cardDiv = createCard(row, col);
      cardDiv.attr("id", displayedCards);
      board.append(cardDiv);
      displayedCards++;

      // hide all card slots over the display limit
      if (displayedCards > displayLimit) { cardDiv.hide(); }
    }
  }
}

function createCard(row, col) {
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

function createSetButton() {
  var board = $("#board"); // grab the board
  var button = $("<button></button>");
  button.attr("id", "set");
  button.text("Set!");
  board.append(button);
}
