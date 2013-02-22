function PanGestureRecognizer(target, action) {
  'use strict';

  this.velocity = 1;
  this.action = action;
  this.minimumNumberOfTouches = 1;
  this.maximumNumberOfTouches = 10;
  this.minimumNumberOfPixelsTranslatedBeforeRecognized = 5;

  this.touchStart = (function(event) {
    var firstTouch;

    firstTouch = event.targetTouches[0];

    this.startX = firstTouch.clientX;
    this.startY = firstTouch.clientY;

    event.preventDefault();
  }).bind(this);

  this.touchMove = (function(event) {
    var firstTouch;
    var translationX;
    var translationY;
    var targetTouchesLength;
    var startY;
    var startX;
    var clientX;
    var clientY;

    firstTouch = event.targetTouches[0];
    targetTouchesLength = event.targetTouches.length;
    startX = this.startX;
    startY = this.startY;
    clientX = firstTouch.clientX;
    clientY = firstTouch.clientY;

    this.translationX = clientX - startX;
    this.translationY = clientY - startY;

    if(this.state == 'changed') {
      this.action(this);
    } else if(this.state == 'began') {
      this.state = 'changed';

      this.action(this);
    } else if(this.canBegin(targetTouchesLength)) {
      this.state = 'began';
      this.timeBegan = Date.now();
      this.translationX = 0;
      this.translationY = 0;

      this.action(this);

      this.startX = clientX;
      this.startY = clientY;
    }

    event.preventDefault();
  }).bind(this);

  this.touchEnd = (function(event) {
    var firstTouch;
    var targetTouchesLength;

    firstTouch = event.targetTouches[0];
    targetTouchesLength = event.targetTouches.length;

    if (targetTouchesLength <= 0) {
      this.state = 'ended';
      this.action(this);
    } else {
      this.startX = firstTouch.clientX - this.translationX;
      this.startY = firstTouch.clientY - this.translationY;
    }

    event.preventDefault();
  }).bind(this);

  this.totalPixelsTranslatedGreaterThanMinumum = function(event) {
    return Math.abs(this.translationX) + Math.abs(this.translationY) >=
      this.minimumNumberOfPixelsTranslatedBeforeRecognized;
  };

  this.calculateVelocity = function() {
    var x;
    var y;

    x = this.translationX;
    y = this.translationY;

    if(x > 0  && y > 0) {
      this.velocity = this.distance(x, y) / (Date.now() - this.timeBegan);
    } else {
      this.velocity = 1;
    }
  };

  this.distance = function(x, y) {
    return Math.sqrt(Math.pow(x, 2) / Math.pow(y, 2));
  };

  this.reset = function() {
    this.state = 'possible';
    this.startX = 0;
    this.startY = 0;
    this.translationX = 0;
    this.translationY = 0;
  };

  this.setTranslation = function(x, y) {
    this.startX += this.translationX;
    this.startY += this.translationY;
    this.translationX = x;
    this.translationY = y;
  };

  this.canBegin = function(targetTouchesLength) {
    return this.state == 'possible' &&
      targetTouchesLength >= this.minimumNumberOfTouches &&
        targetTouchesLength <= this.maximumNumberOfTouches &&
          this.totalPixelsTranslatedGreaterThanMinumum();
  };

  target.addEventListener('touchstart', this.touchStart, false);
  target.addEventListener('touchmove', this.touchMove, false);
  target.addEventListener('touchend', this.touchEnd, false);
}

PanGestureRecognizer.prototype = new GestureRecognizer();
