function PanGestureRecognizer(target) {
  'use strict';

  this.minumumNumberOfTouches = 1;
  this.maximumNumberOfTouches = 10;
  this.minimumNumberOfPixelsTranslatedBeforeRecognized = 5;

  this.touchStart = function(event) {
    var targetTouchesLength;

    targetTouchesLength = event.targetTouches.length;

    if (this.state == 'possible' && targetTouchesLength >= this.minimumNumberOfTouches && targetTouchesLength <= this.maximumNumberOfTouches) {
      this.state = 'began';
    }
  };

  target.addEventListener('touchstart', this.touchStart, false);
}

PanGestureRecognizer.prototype = new GestureRecognizer();
