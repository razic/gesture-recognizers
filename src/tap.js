exports.Tap = function Tap (target, action) {
  if(!(this instanceof Tap)) return new Tap(target, action);

  this.target = target;
  this.action = action;
};

exports.Tap.prototype = {
  numberOfTaps: 0,
  numberOfTouchesRequired: 1,
  numberOfTapsRequired: 1,
  touches: {},

  touchStart: function(event) {
    event.preventDefault();

    var targetTouches;

    targetTouches = event.targetTouches;

    if (this.hasNumberOfTouchesRequired(targetTouches.length))
      this.numberOfTaps += 1;
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
    return length == this.numberOfTouchesRequired;
  },

  hasNumberOfTapsRequired: function() {
    return this.numberOfTaps == this.numberOfTapsRequired;
  }
};
