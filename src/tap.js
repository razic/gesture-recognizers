exports.Tap = function(target, action) {
  if(!(this instanceof Tap)) return new Tap(target, action);

  this.target = target;
  this.action = action;
};

Tap.prototype = {
  touches: [],

  touchStart: function(event) {
    event.preventDefault();
  },

  touchMove: function(event) {
    event.preventDefault();
  },

  touchEnd: function(event) {
    event.preventDefault();
    this.action(this);
  }
};
