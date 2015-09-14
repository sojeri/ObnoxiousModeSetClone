SetHint = function() { // SetHint constructor
  this.hintCount = 0;
  this.set;
  this.messages = [];
}

SetHint.prototype.hint = function(arrayOfCards) {
  // first, check if there's no set & try to find one
  if (!this.set) { this.findSet(); }
  // if there's still no set, return false
  if (!this.set) { return this.noSetsAvailable(); }

  // since we've passed the guards, return the appropriate hint response
  switch (this.hintCount) {
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
      this.displayMessages(4);
      break;
    case 5:
      this.selectAvailableSet(1);
      break;
    case 6:
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
          var set = [
            arrayOfCards[i], arrayOfCards[j], arrayOfCards[k]
          ];
          if (SetRules.isSet(set)) {
            this.set = set;
            return;
          };
        }
      }
    }
  }
}

// this should get called whenever a set is successfully found in the game
SetHint.prototype.reset = function() {
  console.log("resetting yo hint object to empty")
  this.hintCount = 0;
  this.set = null;
  this.messages = [];
}
