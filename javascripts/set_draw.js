// I decided to extract all the draw functions into one place, because it was
// tiresome to root through all the different objects every time I had to change
// something in the HTML. however, this is really just moving the dependencies
// from one place to another: this code is strongly coupled with all the objects
// it draws. any changes to those objects' properties may therefore break its
// associated SetDraw function.

// DEPENDENCIES SPOKEN OF IN LORE:
// - any object that it knows how to draw
//     - this object -- assumes it has a canvas, new & old location info, color, shape, fill, and number
//     - SetColors object -- assumes it has a canvas and three colors (color1, color2, color3)
//     - SetHint object -- FIXME: NOT YET IMPLEMENTED

// NOTE: all the card numbers are based on a 100x150px card size. a further
// refactor could adjust all the drawing code to account for a passed-in size or
// for the size of the associated canvas object.



SetDraw = function() { // SetDraw constructor
  //--- attributes for cards
  this.currentCard;
  //--- SHAPES FORMAS FORMEN ---
  this.shape1 = "rectangles";
  this.shape2 = "diamonds";
  this.shape3 = "semicircles";
  //--- SHAPE STARTING POINTS ---
  this.x = 10;
  this.y = 60;
  this.height = 30;
  this.width = 80;

  // attributes for color schemes
  this.colorSchemes = [
    "monochrome", "highContrast", "classic", "cool", "warm", "default"
  ];

  this.monochrome = new SetColors( // for monochrome colorblind
    "monochrome", SetColors.black, SetColors.darkGrey, SetColors.lightGrey
  );

  this.highContrast = new SetColors( // for tritan/deutan/protan colorblind
    "highContrast", SetColors.yellow, SetColors.blue, SetColors.black
  );

  this.classic = new SetColors( // pretty close to the color scheme from the original game
    "classic", SetColors.purple, SetColors.green, SetColors.red
  );

  this.cool = new SetColors(
    "cool", SetColors.purple, SetColors.darkBlue, SetColors.green
  );

  this.warm = new SetColors(
    "warm", SetColors.yellow, SetColors.orange, SetColors.brown
  );

  this.default = new SetColors( // NOTE: this is also set in SetColors color1, 2, & 3
    "default", SetColors.blue, SetColors.purple, SetColors.yellow
  );
}

SetDraw.prototype.display = function(possibleSetObject) {
  // faux duck typing but too lazy to check all the necessary attributes for now
  // FIXME: consider adding a SetCard validator to this.
  if (possibleSetObject.constructor == SetCard) {
    this.currentCard = possibleSetObject;
    this.card();
    this.currentCard = null;
    return true;
  } else {
    console.log("an unrecognized object was fed into SetDraw object");s
    return false;
  }
}

SetDraw.prototype.allColorSchemes = function() {
  var that = this;
  this.colorSchemes.forEach(function(scheme) {
    that.color(that[scheme]); /* calls the drawing function for each scheme */
  });
}

SetDraw.prototype.color = function(colorsObject) {
  var context = colorsObject.canvas.getContext('2d');
  context.fillStyle = colorsObject.color1;
  context.fillRect(5, 0, 25, 25);
  context.fillStyle = colorsObject.color2;
  context.fillRect(35, 0, 25, 25);
  context.fillStyle = colorsObject.color3;
  context.fillRect(65, 0, 25, 25);
}

SetDraw.prototype.card = function() {
  this.startDrawing();
  this.setShapeBackground(); // aka, set color & fill of shape
  this.drawShape(); // aka, draw x number of card's shape
}

SetDraw.prototype.startDrawing = function() {
  var parent = $("#" + this.currentCard.parentId); // grab the card's parent off the page
  var canvas = parent.children("canvas"); // grab the canvas element within
  this.currentCard.context = canvas.get(0).getContext('2d'); // prepare it for 2d drawing instructions
  this.currentCard.context.clearRect(0, 0, 100, 150);
}

// this sets both the fill & color for the drawing
SetDraw.prototype.setShapeBackground = function() {
  // NOTE: this will have to be updated if additional textures / fills are added
  // a future refactor could add a stroke vs fill option & maybe an additional
  // function needed attribute to the card. see SetDraw.prototype.stripes() for an
  // example of an additional function required by a texture / fill.
  if (this.currentCard.fill === "fill1") { // fill1 is currently solid
    this.currentCard.context.fillStyle = SetColors[this.currentCard.color];
  } else { // fill2 & fill3 are dashed & outlined, which both currently use stroke
    this.currentCard.context.strokeStyle = SetColors[this.currentCard.color];
    if (this.currentCard.fill === "fill2") { // fill2 is currently dashed / striped
      this.stripes(); // draw the stripes
    }
  }
}

SetDraw.prototype.drawShape = function() {
  var thisShape = this.currentCard.shape; // eg, shape1
  var shapeName = this[thisShape]; // eg, diamonds
  return this[shapeName](); // return and execute the function, eg this.diamonds();
}


SetDraw.prototype.rectangles = function() {
  if (this.currentCard.number === 1) {
    this.drawRectangle(this.x, this.y, this.width, this.height);
  } else if (this.currentCard.number === 2) {
    this.drawRectangle(this.x, this.y - 25, this.width, this.height);
    this.drawRectangle(this.x, this.y + 25, this.width, this.height);
  } else if (this.currentCard.number === 3) {
    this.drawRectangle(this.x, this.y - 50, this.width, this.height);
    this.drawRectangle(this.x, this.y, this.width, this.height);
    this.drawRectangle(this.x, this.y + 50, this.width, this.height);
  }
};

SetDraw.prototype.drawRectangle = function(x, y, width, height) {
  var context = this.currentCard.context;

  context.beginPath();

  context.moveTo(x, y); // top left
  context.lineTo(x + width, y); // top right
  context.lineTo(x + width, y + height); // bottom right
  context.lineTo(x, y + height); // bottom left
  context.lineTo(x, y); // top left again

  this.finishPath();
}

SetDraw.prototype.diamonds = function() {
  if (this.currentCard.number === 1) {
    this.drawDiamond(this.x, this.y, this.width, this.height);
  } else if (this.currentCard.number === 2) {
    this.drawDiamond(this.x, this.y - 25, this.width, this.height);
    this.drawDiamond(this.x, this.y + 25, this.width, this.height);
  } else if (this.currentCard.number === 3) {
    this.drawDiamond(this.x, this.y - 50, this.width, this.height);
    this.drawDiamond(this.x, this.y, this.width, this.height);
    this.drawDiamond(this.x, this.y + 50, this.width, this.height);
  }
};


//--- diamond ---

/** diamond() takes some location info, a card index, and a context and draws a
 *  diamond at the specified location and context. It unpacks the fill type from
 *  the card to verify what type of line to draw.
 */
SetDraw.prototype.drawDiamond = function(x, y, width, height) {
  var context = this.currentCard.context;

  context.beginPath();

  context.moveTo(x + 40, y); // top point
  context.lineTo(width + x, y + 15); // right point
  context.lineTo(x + 40, y + height); // bottom point
  context.lineTo(x, y + 15); // left point
  context.lineTo(x + 40, y); // back to top

  this.finishPath();
};


SetDraw.prototype.semicircles = function() {
  if (this.currentCard.number === 1) {
    this.drawSemicircle(this.x, this.y, this.width, this.height);
  } else if (this.currentCard.number === 2) {
    this.drawSemicircle(this.x, this.y - 25, this.width, this.height);
    this.drawSemicircle(this.x, this.y + 25, this.width, this.height);
  } else if (this.currentCard.number === 3) {
    this.drawSemicircle(this.x, this.y - 50, this.width, this.height);
    this.drawSemicircle(this.x, this.y, this.width, this.height);
    this.drawSemicircle(this.x, this.y + 50, this.width, this.height);
  }
}

SetDraw.prototype.drawSemicircle = function(x, y, width, height) {
  var context = this.currentCard.context;

  context.beginPath();

  context.moveTo(x, y + 15);
  context.arc(height, y + 15, height - x, 0, Math.PI, false);
  context.moveTo(width + x, y + 15);
  context.arc(width - x, y + 15, height - x, 0, Math.PI, true);
  context.lineTo(width + x,y + 15);

  this.finishPath();
}


SetDraw.prototype.finishPath = function() {
  if (this.currentCard.fill === "fill1")
    this.currentCard.context.fill();
  else
    this.currentCard.context.stroke();
}

//----------- Base shading options

SetDraw.prototype.stripes = function(card,context) {
  var context = this.currentCard.context;
  var x1 = 20;
  var y1 = 0;
  var x2 = 0;
  var y2 = 20;

  context.beginPath();

  while (x1 < 100) { // draw first 4 stripes until top right corner
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    x1 += 25;
    y2 += 25;
  }

  x1 = 100;
  y1 = 20;

  while (y1 < 150) { // begin rest of the stripes
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    y1 += 25;
    if (y2 < 150) { // when hit bottom left corner
      y2 += 25;
      if (y2 > 150) {
          y2 = 150;
          x2 = 20;
      }
    } else {
        x2 += 25;
    }
  }

  context.stroke();
}


//---------------- Adding cards and removing sets from the table ---------------
SetDraw.prototype.removeSet = function(threeCardArray) {
  var that = this;
  threeCardArray.forEach(function(card) {
    var cardDiv = $("#" + card.parentId);
    var cardRow = cardDiv.attr("card-row");
    var cardCol = cardDiv.attr("card-col");
    that.createEmptyCard(cardRow, cardCol, card.parentId);

    cardDiv.addClass("set").on("animationend",
      function() { $(this).remove(); }
    );
  });
}

// old: <div class="card" card-row="r2" card-col="c3" id="11"><canvas height="150" width="100"></canvas></div>
// new: <div class="card" card-row="r0" card-col="c0" id="0"><canvas height="150" width="100"></canvas></div>
SetDraw.prototype.createEmptyCard = function(row, col, location) {
  console.log("here")
  var board = $("#board")
  // make a card slot
  var canvasDiv = $("<div></div>");
  canvasDiv.addClass("card");
    var canvas = $("<canvas></canvas>");
    canvas.attr("height", 150);
    canvas.attr("width", 100);
  canvasDiv.append(canvas);

  // give it a unique identifier & position
  canvasDiv.attr("card-row", row);
  canvasDiv.attr("card-col", col);
  canvasDiv.attr("id", location);

  // throw it on the board
  board.append(canvasDiv);
}
