function PanGestureRecognizer(node) {
  var minimumNumberOfTouches;
  var maximumNumberOfTouches;
  var minimumNumberOfPixelsTranslatedBeforeRecognized;

  minumumNumberOfTouches = 1;
  maximumNumberOfTouches = 10;
  minimumNumberOfPixelsTranslatedBeforeRecognized = 5;

  function touchStart(event) {
    var targetTouchesLength;

    targetTouchesLength = event.targetTouches.length;

      if (this.state == 'possible' && targetTouchesLength >= minimumNumberOfTouches && targetTouchesLength <= maximumNumberOfTouches) {
      this.state = 'began';
    }
  }

  function touchMove(event) {
    event.preventDefault();
  }

  function touchEnd(event) {
    event.preventDefault();
  }

  node.addEventListener('touchstart', touchStart, false);
  node.addEventListener('touchmove', touchMove, false);
  node.addEventListener('touchend', touchEnd, false);
}

PanGestureRecognizer.prototype = new GestureRecognizer();
