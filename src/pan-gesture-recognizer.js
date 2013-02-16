function PanGestureRecognizer(target) {
  'use strict';

  this.startX = null;
  this.startY = null;
  this.translationX = null;
  this.translationY = null;
  this.minimumNumberOfTouches = 1;
  this.maximumNumberOfTouches = 10;
  this.minimumNumberOfPixelsTranslatedBeforeRecognized = 5;

  this.touchStart = (function(event) {
    var lastTouch;

    lastTouch = event.targetTouches[0];

    this.startX = this.startX || lastTouch.clientX;
    this.startY = this.startY || lastTouch.clientY;

    event.preventDefault();
  }).bind(this);

  this.touchMove = (function(event) {
    var lastTouch;
    var targetTouchesLength;

    lastTouch = event.targetTouches[0];
    targetTouchesLength = event.targetTouches.length;

    this.translationX = lastTouch.clientX - this.startX;
    this.translationY = lastTouch.clientY - this.startY;

    if (
      this.state == 'possible' &&
      targetTouchesLength >= this.minimumNumberOfTouches &&
      targetTouchesLength <= this.maximumNumberOfTouches &&
      this.totalPixelsTranslatedGreaterThanMinumum()
    ) {
      this.state = 'began';
    } else if (
      this.state == 'began'
    ) {
      this.state = 'changed';
    }

    event.preventDefault();
  }).bind(this);

  this.touchEnd = (function(event) {
    var targetTouchesLength;

    targetTouchesLength = event.targetTouches.length;

    if (targetTouchesLength <= 0) { this.state = 'ended'; }
  }).bind(this);

  this.totalPixelsTranslatedGreaterThanMinumum = function(event) {
    return this.translationX + this.translationY >=
      this.minimumNumberOfPixelsTranslatedBeforeRecognized;
  };

  this.reset = function() {
    this.state = 'possible';
    this.startX = null;
    this.startY = null;
    this.translationX = null;
    this.translationY = null;
  };

  target.addEventListener('touchstart', this.touchStart, false);
  target.addEventListener('touchmove', this.touchMove, false);
  target.addEventListener('touchend', this.touchEnd, false);
}

PanGestureRecognizer.prototype = new GestureRecognizer();
