$(document).ready(function() {
  // hide options & info panels
  var options = $("#options");
  var info = $("#info");
  var board = $("#board");
  options.hide();
  info.hide();
  board.show();

  // set up click handlers for options & info glyphs
  $(".glyph").click(function(event) {
    var clicked = event.target.id;
    console.log(event.target.id);
    if (clicked == "info-glyph") {
      console.log("info screen desired");
      info.show();
      options.hide();
      board.hide();
    } else if (clicked == "options-glyph") {
      console.log("options screen desired");
      options.show();
      info.hide();
      board.hide();
    } else {
      console.log("board screen desired");
      board.show();
      info.hide();
      options.hide();
    }
  });

  // let's make space for 18 cards in case there aren't sets in the original 12
  var cardsVertical = 3;
  var cardsHorizontal = 6;
  var defaultCardsDisplayed = 12;
  var game = new Board();

  // set up all the card slots
  createCardSlots(cardsVertical, cardsHorizontal, defaultCardsDisplayed);

  // set up click handlers for cards
  $(".card").click(function(event) {
    game.clickCard(event.target.id);
  });

  // set up click handlers for buttons

  // make a keydown event for users who prefer keyboard play

  // start the game

});

function createCardSlots(rows, columns, displayLimit) {
  var board = $("#board");
  var displayedCards = 0;
  for (var col = 0; col < columns; col++) {
    for (var row = 0; row < rows; row++) {
      displayedCards++;
      var card = createCard(row, col);
      card.attr("id", displayedCards); // TODO: test if this is necessary
      board.append(card);

      // hide all card slots over the display limit
      if (displayedCards > displayLimit) { card.hide(); }
    }
  }
}

function createCard(row, col) {
  // make a card slot
  var card = $("<div></div>");
  card.addClass("card");
  var canvas = $("<canvas></canvas>");
  card.append(canvas);

  // give it a unique position marker
  card.attr('card-row', "r" + row);
  card.attr('card-col', "c" + col);

  return card;
}
