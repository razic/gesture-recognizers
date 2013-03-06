exports.Tap = function Tap (target, action) {
  if(!(this instanceof Tap)) return new Tap(target, action);

  this.target = target;
  this.action = action;
};

exports.Tap.prototype = {
  numberOfTaps: 0,
  numberOfTouches: 0,
  numberOfTouchesRequired: 1,
  numberOfTapsRequired: 1,
  touches: {},

  touchStart: function(event) {
    event.preventDefault();

    this.numberOfTouches = event.targetTouches.length;

    if (this.hasNumberOfTouchesRequired()) {
      this.numberOfTaps += 1;
    } else {
      this.numberOfTaps = 0;
    }
  },

  touchMove: function(event) {
    event.preventDefault();
  },

  touchEnd: function(event) {
    event.preventDefault();

    if (this.hasNumberOfTapsRequired()) {
      this.action(this);
      this.numberOfTaps = 0;
    }
  },

  hasNumberOfTouchesRequired: function(length) {
    return this.numberOfTouches == this.numberOfTouchesRequired;
  },

  hasNumberOfTapsRequired: function() {
    return this.numberOfTaps == this.numberOfTapsRequired;
  }
};
