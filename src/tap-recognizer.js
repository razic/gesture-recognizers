function TapRecognizer(node) {
  var self;

  self = this;

  function touchStart(event) {
    TapRecognizer.prototype.touchStart(self, event);
    self.onStart(self);
  }

  function touchMove(event) {
    event.preventDefault();
  }

  function touchEnd(event) {
    TapRecognizer.prototype.touchEnd(self, event);
    self.onEnd(self);
  }

  node.addEventListener('touchstart', touchStart, false);
  node.addEventListener('touchmove', touchMove, false);
  node.addEventListener('touchend', touchEnd, false);
}

TapRecognizer.prototype = new GestureRecognizer();
