function TapRecognizer(node) {
  var self;

  self = this;

  function touchStart(event) {
    TapRecognizer.prototype.touchStart(self, event);

    if (self.state == 'started' || self.state == 'ended') {
      self.handler(self);
    }
  }

  function touchMove(event) {
    event.preventDefault();
  }

  function touchEnd(event) {
    TapRecognizer.prototype.touchEnd(self, event);
  }

  node.addEventListener('touchstart', touchStart, false);
  node.addEventListener('touchmove', touchMove, false);
  node.addEventListener('touchend', touchEnd, false);
}

TapRecognizer.prototype = new GestureRecognizer;
