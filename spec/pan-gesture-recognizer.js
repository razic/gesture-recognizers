describe('PanGestureRecognizer', function() {
  'use strict';

  var target;
  var recognizer;

  function createTouchEvent(type, canBubble, cancelable, targetTouches) {
    var event;

    event = document.createEvent('UIEvents');
    event.targetTouches = targetTouches;

    event.initUIEvent(type, canBubble, cancelable);

    return event;
  }

  beforeEach(function() {
    target = document.body;
  });

  it('should set touch event listeners on the specified target', function(){
    spyOn(target, 'addEventListener');

    recognizer = new PanGestureRecognizer(target);

    expect(target.addEventListener).
    toHaveBeenCalledWith('touchstart', recognizer.touchStart, false);
    expect(target.addEventListener).
    toHaveBeenCalledWith('touchmove', recognizer.touchMove, false);
  });

  describe('when the minimum number of fingers allowed has moved enough to be \
  considered a pan', function() {
    beforeEach(function() {
      var touchA;
      var touchB;
      var touchListA;
      var touchListB;
      var touchEventA;
      var touchEventB;

      recognizer = new PanGestureRecognizer(target);
      touchA = { clientX: 10, clientY: 10 };
      touchB = { clientX: 15, clientY: 10 };
      touchListA = { 0: touchA, length: 1 };
      touchListB = { 0: touchB, length: 1 };
      touchEventA = createTouchEvent('touchstart', false, false, touchListA);
      touchEventB = createTouchEvent('touchmove', false, false, touchListB);

      target.dispatchEvent(touchEventA);
      target.dispatchEvent(touchEventB);
    });

    it('changes to the began state', function() {
      expect(recognizer.state).toBe('began');
    });
  });
});
