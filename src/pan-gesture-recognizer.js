function PanGestureRecognizer(target, action) {
  var actionLastCalledAt;

  this.velocity = 1;
  this.minimumNumberOfTouches = 1;
  this.maximumNumberOfTouches = 10;
  this.minimumNumberOfPixelsTranslatedBeforeRecognized = 5;

  this.touchStart = function(event) {
    var firstTouch;

    firstTouch = event.targetTouches[0];

    this.startX = firstTouch.clientX;
    this.startY = firstTouch.clientY;

    event.preventDefault();
  }.bind(this);

  this.touchMove = function(event) {
    var firstTouch;
    var translationX;
    var translationY;
    var targetTouchesLength;
    var startX;
    var startY;
    var clientX;
    var clientY;
    var previousClientX;
    var previousClientY;

    firstTouch = event.targetTouches[0];
    targetTouchesLength = event.targetTouches.length;
    startX = this.startX;
    startY = this.startY;
    clientX = firstTouch.clientX;
    clientY = firstTouch.clientY;
    previousClientX = startX + (this.translationX || 0);
    previousClientY = startY + (this.translationY || 0);

    this.translationX = clientX - startX;
    this.translationY = clientY - startY;

    if(this.state == 'changed') {
      this.calculateVelocity(
        clientX, previousClientX, clientY, previousClientY
      );

      this.callAction();
    } else if(this.state == 'began') {
      this.state = 'changed';

      this.callAction();
    } else if(this.canBegin(targetTouchesLength)) {
      this.state = 'began';
      this.translationX = 0;
      this.translationY = 0;

      this.callAction();

      this.startX = clientX;
      this.startY = clientY;
    }

    event.preventDefault();
  }.bind(this);

  this.touchEnd = function(event) {
    var firstTouch;
    var targetTouchesLength;

    firstTouch = event.targetTouches[0];
    targetTouchesLength = event.targetTouches.length;

    if (targetTouchesLength <= 0) {
      this.state = 'ended';
      this.callAction(this);
    } else {
      this.startX = firstTouch.clientX - this.translationX;
      this.startY = firstTouch.clientY - this.translationY;
    }

    event.preventDefault();
  }.bind(this);

  this.totalPixelsTranslatedGreaterThanMinumum = function(event) {
    return Math.abs(this.translationX) + Math.abs(this.translationY) >=
      this.minimumNumberOfPixelsTranslatedBeforeRecognized;
  };

  this.calculateVelocity = function(x2, x1, y2, y1) {
    var timeDelta;

    if(x1 >= 0 && x2 >= 0 && y1 >= 0  && y2 >= 0) {
      timeDelta = new Date().getTime() - (actionLastCalledAt || 0);

      this.velocity = this.distance(x2, x1, y2, y1) / timeDelta;
    } else {
      this.velocity = 1;
    }
  };

  this.distance = function(x2, x1, y2, y1) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  this.reset = function() {
    this.state = 'possible';
    this.startX = 0;
    this.startY = 0;
    this.translationX = 0;
    this.translationY = 0;
  };

  this.setTranslation = function(x, y) {
    this.startX += this.translationX;
    this.startY += this.translationY;
    this.translationX = x;
    this.translationY = y;
  };

  this.callAction = function() {
    actionLastCalledAt = new Date().getTime();
    action(this);
  };

  this.canBegin = function(targetTouchesLength) {
    return this.state == 'possible' &&
      targetTouchesLength >= this.minimumNumberOfTouches &&
        targetTouchesLength <= this.maximumNumberOfTouches &&
          this.totalPixelsTranslatedGreaterThanMinumum();
  };

  target.addEventListener('touchstart', this.touchStart, false);
  target.addEventListener('touchmove', this.touchMove, false);
  target.addEventListener('touchend', this.touchEnd, false);
}

PanGestureRecognizer.prototype = new GestureRecognizer();
