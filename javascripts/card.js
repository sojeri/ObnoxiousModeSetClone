// code for the card object!

function Card(object) { // Card constructor
  // base attributes
  this.color = object.color;
  this.shape = object.shape;
  this.fill = object.fill;
  this.number = object.number;

  // display & animation attributes
  this.context;
  this.lastPosition;
  this.currentPosition;

  // gameplay attributes
  this.inSet = false;
  this.inHint = false;
  this.playerId; // for associating w/ a player after player gets a set
}

// this function creates a set of unique cards for a deck
Card.populateDeck = function() {
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
            new Card(
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

Card.prototype.draw = function(elementId) {
  // code to draw the card on a canvas element here
  var canvas = document.getElementById(id);
  var context = canvas.getContext('2d');
  if (this.shape === "shape1") {
    this.drawRectangle(card, context);
  } else if (this.shape === "shape2") {
    this.drawDiamond(card, context);
  } else if (this.shape === "shape3") {
    this.drawSemicircles(card, context);
  } else {
    errorMessage("card.shape not recognized");
  }
}

Card.prototype.solid = function(context) {
    if (card.color === "color1") {
        context.fillStyle = color1;
    } else if (card.color === "color2") {
        context.fillStyle = color2;
    } else if (card.color === "color3") {
        context.fillStyle = color3;
    } else {
        errorMessage("solid() else");
    }
};
