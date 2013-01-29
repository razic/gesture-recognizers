function GestureRecognizer(node) {
  this.touches = {};
  this.state = 'possible';

  this.touchStart = function(self, event) {
    var length;
    var touch;

    event.preventDefault();

    length = event.targetTouches.length;
    touch = event.targetTouches[length - 1];

    self.touches[touch.identifier] = touch;

    return touch;
  };

  this.touchMove = function(self, event) {
    event.preventDefault();
  };

  this.touchEnd = function(self, event) {
    var key;
    var length;

    event.preventDefault();

    for (key in event.changedTouches) {
      delete self.touches[event.changedTouches[key].identifier];
    }

    length = Object.keys(self.touches).length;
  };
}
