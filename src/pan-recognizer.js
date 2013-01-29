function PanRecognizer(node) {
  var self;
  var minimumNumberOfTouches;
  var maximumNumberOfTouches;
  var minimumNumberOfPixelsTranslatedBeforeRecognized;

  minumumNumberOfTouches = 1;
  maximumNumberOfTouches = 10;
  minimumNumberOfPixelsTranslatedBeforeRecognized = 5;

  self = this;

  function touchStart(event) {
    var key;
    var currentNumberOfTouches;

    TapRecognizer.prototype.touchStart(self, event);

    currentNumberOfTouches = Object.keys(self.touches).length;

    if (self.state == 'possible' && currentNumberOfTouches >= minimumNumberOfTouches && currentNumberOfTouches <= maximumNumberOfTouches) {
      self.state = 'began';
    }
  }

  function touchMove(event) {
    event.preventDefault();
  }

  function touchEnd(event) {
    TapRecognizer.prototype.touchEnd(self, event);
  }

  node.addEventListener('touchstart', touchStart, false);
  node.addEventListener('touchmove', touchMove, false);
  node.addEventListener('touchend', touchEnd, false);
}

PanRecognizer.prototype = new GestureRecognizer();
