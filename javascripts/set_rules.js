function SetRules() { // worthless SetRules constructor; here only for equivalent of class methods
  this.hint;
}

SetRules.size = 3;

SetRules.isSet = function(threeCardArray) {
  var attributes = ["color", "number", "shape", "fill"];
  var one = threeCardArray[0];
  var two = threeCardArray[1];
  var three = threeCardArray[2];

  var threeEqual = function(attr) {
    if (one[attr] == two[attr] && two[attr] == three[attr]) {
      return true;
    } else if (one[attr] != two[attr] && two[attr] != three[attr] && three[attr] != one[attr]) {
      return true;
    };

    return false;
  }

  for (var i = 0; i < attributes.length; i++) {
    if (threeEqual(attributes[i]) === false)
      return false;
  }

  return true;
}

SetRules.hint = function(cardsArray) {
  // hint function here
}
