function SetCard(object) { // SetCard constructor / initializer
  // example: new SetCard({ color: "color1", fill: "fill1", shape: "shape1", number: 1})
  // uses generic values like color1 for customization reasons. (color1 could
  // be set to blue or red without changing the rest of the drawing functions.
  // see SetCard.color1 to understand how this customization works.)

  //--- base attributes ---
  this.color = object.color;
  this.shape = object.shape;
  this.fill = object.fill;
  this.number = object.number;

  //--- display attributes ---
  this.parentId; // this should be set when a card is added to a display surface.
  // it should be a canvas element & currently only an element of size 100x150px is supported.
  this.context; // this is used by the draw() function

  //--- animation attributes ---
  // these should be set when a card is added to a display surface and
  // should be updated when a card is moved on or removed from that surface.
  this.lastPosition;
  this.currentPosition;

  //--- gameplay attributes ---
  this.inSet = false;
  this.inHint = false;
  // this.playerId; // for associating w/ a player after player gets a set
}

// this function creates a set of unique cards for a deck
SetCard.populateDeck = function() {
  var deck = [];
  var colors = ["color1", "color2", "color3"];
  var shapes = ["shape1", "shape2", "shape3"];
  var numbers = [1, 2, 3];
  var fills = ["fill1", "fill2", "fill3"];

  colors.forEach(function(color) {
    shapes.forEach(function(shape) {
      numbers.forEach(function(number) {
        fills.forEach(function(fill) {
          deck.push(
            new SetCard(
              {
                color: color,
                shape: shape,
                fill: fill,
                number: number
              }
            )
          );
        });
      });
    });
  });

  return deck;
}
