var Tap = function(target, action) {
  if(!(this instanceof Tap)) return new Tap(target, action);

  this.target = target;
  this.action = action;
};

Tap.prototype = {
  touches: [],

  touchStart: function(event) {
  },

  touchMove: function(event) {
  },

  touchEnd: function(event) {
    this.action(this);
  }
};

exports.Tap = Tap;
