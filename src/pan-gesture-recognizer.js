function PanGestureRecognizer(target, action) {
  'use strict';

  this.startX = null;
  this.startY = null;
  this.action = action;
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
      this.recordTime();
      this.state = 'began';
    } else if (this.state == 'began') {
      this.recordTime();
      this.state = 'changed';
    } else if (
      this.state == 'changed' &&
      targetTouchesLength >= this.minimumNumberOfTouches &&
      targetTouchesLength <= this.maximumNumberOfTouches
    ) {
      this.recordTime();
    }

    this.action(this);
    event.preventDefault();
  }).bind(this);

  this.touchEnd = (function(event) {
    var targetTouchesLength;
    var lastTouch;

    targetTouchesLength = event.targetTouches.length;

    if (targetTouchesLength <= 0) {
      this.state = 'ended';
    } else {
      lastTouch = event.targetTouches[0];
      this.startX = lastTouch.clientX - this.translationX;
      this.startY = lastTouch.clientY - this.translationY;
    }

    this.action(this);
    event.preventDefault();
  }).bind(this);

  this.totalPixelsTranslatedGreaterThanMinumum = function(event) {
    return Math.abs(this.translationX) + Math.abs(this.translationY) >=
      this.minimumNumberOfPixelsTranslatedBeforeRecognized;
  };

  this.recordTime = function() {
    this.lastRecordedTime = Date.now();
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
