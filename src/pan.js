exports.Pan = function Pan (target, action) {
  if(!(this instanceof Pan)) return new Pan(target, action);

  this.target = target;
  this.action = action;
  this.state = exports.states.possible;
};

exports.Pan.prototype = {
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
    var oldestTouch, targetTouches;

    event.preventDefault();

    targetTouches = event.targetTouches;
    oldestTouch = targetTouches[0];
    this.translationX = oldestTouch.clientX - this.startX;
    this.translationY = oldestTouch.clientY - this.startY;

    if (this.state == exports.states.changed) {
      this.action(this);
    } else if (this.state == exports.states.began) {
      this.state = exports.states.changed;


      this.action(this);
    } else if (this.canBegin(targetTouches.length)) {
      this.state = exports.states.began;
      this.translationX = 0;
      this.translationY = 0;

      this.action(this);

      this.startX = oldestTouch.clientX;
      this.startY = oldestTouch.clientY;
    }
  },

  touchEnd: function(event) {
    var oldestTouch, targetTouches;

    event.preventDefault();

    targetTouches = event.targetTouches;
    oldestTouch = targetTouches[0];

    if (targetTouches.length < this.minimumNumberOfTouches) {
      this.state = exports.states.ended;
      this.action(this);
    } else {
      this.startX = oldestTouch.clientX - this.translationX;
      this.startY = oldestTouch.clientY - this.translationY;
    }
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
  }
};
