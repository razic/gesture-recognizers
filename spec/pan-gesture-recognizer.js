describe('PanGestureRecognizer', function() {
  'use strict';

  var target;
  var action;
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
    action = function() {};
  });

  it('should set touch event listeners on the specified target', function() {
    spyOn(target, 'addEventListener');

    recognizer = new PanGestureRecognizer(target, action);

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

      recognizer = new PanGestureRecognizer(target, action);
      touchA = { clientX: 10, clientY: 10 };
      touchB = { clientX: 15, clientY: 10 };
      touchListA = { 0: touchA, length: 1 };
      touchListB = { 0: touchB, length: 1 };
      touchEventA = createTouchEvent('touchstart', false, false, touchListA);
      touchEventB = createTouchEvent('touchmove', false, false, touchListB);

      spyOn(recognizer, 'action');
      target.dispatchEvent(touchEventA);
      target.dispatchEvent(touchEventB);
    });

    it('changes to the began state', function() {
      expect(recognizer.state).toBe('began');
    });

    it('should call the specified action', function() {
      expect(recognizer.action.mostRecentCall.args[0]).toBe(recognizer);
    });

    describe('when a finger moves while at least the minimum number of \
    fingers are pressed down', function() {
      beforeEach(function() {
        var touchC;
        var touchListC;
        var touchEventC;

        touchC = { clientX: 20, clientY: 10 };
        touchListC = { 0: touchC, length: 1 };
        touchEventC = createTouchEvent('touchmove', false, false, touchListC);

        target.dispatchEvent(touchEventC);
      });

      it('changes to the changed state', function() {
        expect(recognizer.state).toBe('changed');
      });

      it('should call the specified action', function() {
        expect(recognizer.action.mostRecentCall.args[0]).toBe(recognizer);
      });

      describe('when a finger moves again while at least the minimum number \
      of fingers are pressed down', function(){
        beforeEach(function() {
          var touch;
          var touchList;
          var touchEvent;

          touch = { clientX: 20, clientY: 20 };
          touchList = { 0: touch, length: 1 };
          touchEvent = createTouchEvent('touchmove', false, false, touchList);

          target.dispatchEvent(touchEvent);
        });

        it('should still be in the changed state', function() {
          expect(recognizer.state).toBe('changed');
        });

        it('should still call the specified action', function() {
          expect(recognizer.action.calls.length).toBeGreaterThan(2);
          expect(recognizer.action.mostRecentCall.args[0]).toBe(recognizer);
        });
      });
    });

    describe('when all fingers are lifted', function() {
      beforeEach(function() {
        var touchListD;
        var touchEventD;

        touchListD = { length: 0 };
        touchEventD = createTouchEvent('touchend', false, false, touchListD);

        target.dispatchEvent(touchEventD);
      });

      it('changes to the ended state', function() {
        expect(recognizer.state).toBe('ended');
      });

      it('should call the specified action', function() {
        expect(recognizer.action.mostRecentCall.args[0]).toBe(recognizer);
      });
    });
  });
});
