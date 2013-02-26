function TapGestureRecognizer(target, action) {
  this.touchStart = function() {
    console.log('touchStarted');
  }.bind(this);

  this.touchEnd = function() {
    console.log('touchEnded');
  }.bind(this);

  target.addEventListener('touchstart', this.touchStart, false);
  target.addEventListener('touchend', this.touchEnd, false);
}

TapGestureRecognizer.prototype = new GestureRecognizer();
