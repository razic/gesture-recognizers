exports.Tap = function Tap (target, action) {
  if(!(this instanceof Tap)) return new Tap(target, action);

  this.target = target;
  this.action = action;
};

exports.Tap.prototype = {
  tapCount: 0,
  numberOfTapsRequired: 1,
  touches: {},

  touchStart: function(event) {
    event.preventDefault();

    var touches;

    touches = event.targetTouches;
  },

  touchMove: function(event) {
    event.preventDefault();
  },

  touchEnd: function(event) {
    event.preventDefault();

    this.tapCount += 1;

    if (this.tapCount == this.numberOfTapsRequired) {
      this.action(this);
      this.tapCount = 0;
    }
  }
};
