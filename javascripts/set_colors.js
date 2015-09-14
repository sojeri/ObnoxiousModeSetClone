// dependencies:
// - the SetCard object
// - a canvas element inside something else with a unique identifier
//     - canvas element is currently inside a button

function SetColors(id, color1, color2, color3) { // SetColors constructor
  this.canvas = $("#" + id).children('canvas')[0];
  this.color1 = color1;
  this.color2 = color2;
  this.color3 = color3;
}

// setting a bunch of default color options for color schemes
SetColors.brown = "rgb(150, 50, 0)";
SetColors.red = "rgb(200, 0, 0)";
SetColors.orange = "rgb(255, 120, 0)";
SetColors.yellow = "rgb(220, 200, 0)";
SetColors.green = "rgb(0, 200, 0)";
SetColors.blue = "rgb(0, 150, 255)";
SetColors.darkBlue = "rgb(0, 100, 200)";
SetColors.pink = "rgb(200, 0, 255)";
SetColors.purple = "rgb(150, 0, 150)";
SetColors.black = "rgb(0, 0, 0)";
SetColors.lightGrey = "rgb(180, 180, 180)";
SetColors.darkGrey = "rgb(100, 100, 100)";
SetColors.white = "rgb(255, 255, 255)";

// has the default colors for the board, too
SetColors.color1 = SetColors.purple;
SetColors.color2 = SetColors.blue;
SetColors.color3 = SetColors.yellow;

SetColors.prototype.setColorScheme = function() {
  SetColors.color1 = this.color1;
  SetColors.color2 = this.color2;
  SetColors.color3 = this.color3;
}
