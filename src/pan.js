exports.Pan = function Pan (target, action) {
  if(!(this instanceof Pan)) return new Pan(target, action);

  this.target = target;
  this.action = action;
  this.state = exports.states.possible;
};

exports.Pan.prototype = {
  startX: 0,
  startY: 0,
  velocityX: 1,
  velocityY: 1,
  translationX: 0,
  translationY: 0,
  minimumNumberOfTouches: 1,
  maximumNumberOfTouches: 10,
  minimumNumberOfPixelsTranslatedBeforeRecognized: 5,

  touchStart: function(event) {
    var oldestTouch;

    event.preventDefault();

    oldestTouch = event.targetTouches[0];

    this.startX = oldestTouch.clientX;
    this.startY = oldestTouch.clientY;
  },

  touchMove: function(event) {
    var oldestTouch, targetTouches, clientX, clientY, lastClientX, lastClientY;

    event.preventDefault();

    targetTouches = event.targetTouches;
    oldestTouch = targetTouches[0];
    clientX = oldestTouch.clientX;
    clientY = oldestTouch.clientY;
    lastClientX = this.startX + this.translationX;
    lastClientY = this.startY + this.translationY;
    this.translationX = clientX - this.startX;
    this.translationY = clientY - this.startY;

    if (this.state == exports.states.changed) {
      this.calculateVelocity(clientX, lastClientX, clientY, lastClientY);
      this.callAction();
    } else if (this.state == exports.states.began) {
      this.state = exports.states.changed;

      this.callAction();
    } else if (this.canBegin(targetTouches.length)) {
      this.state = exports.states.began;
      this.translationX = 0;
      this.translationY = 0;

      this.callAction(this);

      this.startX = oldestTouch.clientX;
      this.startY = oldestTouch.clientY;
    }
  },

  touchEnd: function(event) {
    var oldestTouch, targetTouches;

    event.preventDefault();

    targetTouches = event.targetTouches;
    oldestTouch = targetTouches[0];

    if (targetTouches.length < 1) {
      this.state = exports.states.ended;

      this.callAction(this.reset);
    } else {
      this.startX = oldestTouch.clientX - this.translationX;
      this.startY = oldestTouch.clientY - this.translationY;
    }
  },

  callAction: function(callBack) {
    this.action(this);

    this.actionLastCalledAt = new Date().getTime();

    if (typeof callBack == 'function') callBack.call(this);
  },

  canBegin: function(targetTouchesLength) {
    return this.state == exports.states.possible &&
      targetTouchesLength >= this.minimumNumberOfTouches &&
        targetTouchesLength <= this.maximumNumberOfTouches &&
          this.totalPixelsTranslatedGreaterThanMinumum();
  },

  totalPixelsTranslatedGreaterThanMinumum: function() {
    return Math.abs(this.translationX) + Math.abs(this.translationY) >=
      this.minimumNumberOfPixelsTranslatedBeforeRecognized;
  },

  calculateVelocity: function(x2, x1, y2, y1) {
    var deltaX, deltaY, deltaTime;

    deltaX = Math.abs(x2 - x1);
    deltaY = Math.abs(y2 - y1);
    deltaTime = new Date().getTime() - this.actionLastCalledAt;

    this.velocityX = deltaX / deltaTime;
    this.velocityY = deltaY / deltaTime;
  },

  setTranslation: function(x, y) {
    this.startX += this.translationX;
    this.startY += this.translationY;
    this.translationX = x;
    this.translationY = y;
  },

  reset: function() {
    this.startX = 0;
    this.startY = 0;
    this.velocityX = 1;
    this.velocityY = 1;
    this.translationX = 0;
    this.translationY = 0;
    this.state = exports.states.possible;
  }
};
