describe('PanGestureRecognizer', function() {
  'use strict';

  var target; // The element to recognize gestures on
  var action; // The action called when gesture changes state
  var recognizer; // The recognizer object
  var getTime; // The function that Date.now() becomes stubbed with
  var startTime; // The time the gesture was recognized (Epoch format)
  var currentTime; // The current time (Epoch format)
  var intervalTime; // The Interval time between touch events (Epoch format)
  var touchEventA; // Finger(s) touched the screen
  var touchEventB; // The gesture was recognized
  var touchEventC; // The gesture is continuing
  var touchEventD; // The gesture is still continuing
  var touchEventE; // The gesture ended

  function createTouchEvent(type, canBubble, cancelable, targetTouches) {
    var event;

    event = document.createEvent('UIEvents');
    event.targetTouches = targetTouches;

    event.initUIEvent(type, canBubble, cancelable);

    return event;
  }

  beforeEach(function() {
    var touchA;
    var touchB;
    var touchC;
    var touchD;
    var touchE;
    var touchListA;
    var touchListB;
    var touchListC;
    var touchListD;
    var touchListE;

    target = document.body;
    action = function() {};
    startTime = 1000000000;
    currentTime = 1000000000;
    intervalTime = 2;
    touchA = { clientX: 20, clientY: 10 };
    touchB = { clientX: 14, clientY: 10 };
    touchC = { clientX: 10, clientY: 10 };
    touchD = { clientX: 5, clientY: 20 };
    touchListA = { 0: touchA, length: 1 };
    touchListB = { 0: touchB, length: 1 };
    touchListC = { 0: touchC, length: 1 };
    touchListD = { 0: touchD, length: 1 };
    touchListE = { length: 0 };
    touchEventA = createTouchEvent('touchstart', false, false, touchListA);
    touchEventB = createTouchEvent('touchmove', false, false, touchListB);
    touchEventC = createTouchEvent('touchmove', false, false, touchListC);
    touchEventD = createTouchEvent('touchmove', false, false, touchListD);
    touchEventE = createTouchEvent('touchend', false, false, touchListE);
    getTime = function(){ return currentTime += intervalTime; };
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
      recognizer = new PanGestureRecognizer(target, action);

      spyOn(recognizer, 'action');
      spyOn(Date, 'now').andCallFake(getTime);

      console.log('calling before each');
    });

    it('should change to the began state', function() {
      target.dispatchEvent(touchEventA);
      target.dispatchEvent(touchEventB);

      expect(recognizer.state).toBe('began');
    });

    it('should record the time', function() {
      target.dispatchEvent(touchEventA);
      target.dispatchEvent(touchEventB);

      expect(Date.now.calls.length).toEqual(1);
      expect(recognizer.lastRecordedTime).toBe(startTime + intervalTime);
    });

    it('should call the specified action', function() {
      target.dispatchEvent(touchEventA);
      target.dispatchEvent(touchEventB);

      expect(recognizer.action.calls.length).toBeGreaterThan(0);
      expect(recognizer.action.mostRecentCall.args[0]).toBe(recognizer);
    });

    describe('when a finger moves while at least the minimum number of \
    fingers are pressed down', function() {
      it('should change to the changed state', function() {
        target.dispatchEvent(touchEventA);
        target.dispatchEvent(touchEventB);
        target.dispatchEvent(touchEventC);

        expect(recognizer.state).toBe('changed');
      });

      it('should rerecord the time', function() {
        target.dispatchEvent(touchEventA);
        target.dispatchEvent(touchEventB);
        target.dispatchEvent(touchEventC);

        expect(Date.now.calls.length).toEqual(2);
        expect(recognizer.lastRecordedTime).toBe(startTime + (intervalTime * 2));
      });

      it('should call the specified action', function() {
        target.dispatchEvent(touchEventA);
        target.dispatchEvent(touchEventB);
        target.dispatchEvent(touchEventC);

        expect(recognizer.action.calls.length).toBeGreaterThan(1);
        expect(recognizer.action.mostRecentCall.args[0]).toBe(recognizer);
      });

      describe('when a finger moves again while at least the minimum number \
      of fingers are pressed down', function(){
        it('should still be in the changed state', function() {
          target.dispatchEvent(touchEventA);
          target.dispatchEvent(touchEventB);
          target.dispatchEvent(touchEventC);
          target.dispatchEvent(touchEventD);

          expect(recognizer.state).toBe('changed');
        });

        it('should rerecord the time again', function() {
          console.log('in 24');
          target.dispatchEvent(touchEventA);
          target.dispatchEvent(touchEventB);
          target.dispatchEvent(touchEventC);
          target.dispatchEvent(touchEventD);

          expect(Date.now.calls.length).toEqual(3);
          expect(recognizer.lastRecordedTime).toBe(startTime + (intervalTime * 3));
        });

        it('should still call the specified action', function() {
          target.dispatchEvent(touchEventA);
          target.dispatchEvent(touchEventB);
          target.dispatchEvent(touchEventC);
          target.dispatchEvent(touchEventD);

          expect(recognizer.action.calls.length).toBeGreaterThan(2);
          expect(recognizer.action.mostRecentCall.args[0]).toBe(recognizer);
        });
      });
    });

    describe('when all fingers are lifted', function() {
      it('changes to the ended state', function() {
        target.dispatchEvent(touchEventA);
        target.dispatchEvent(touchEventB);
        target.dispatchEvent(touchEventC);
        target.dispatchEvent(touchEventD);
        target.dispatchEvent(touchEventE);

        expect(recognizer.state).toBe('ended');
      });

      it('should call the specified action', function() {
        target.dispatchEvent(touchEventA);
        target.dispatchEvent(touchEventB);
        target.dispatchEvent(touchEventC);
        target.dispatchEvent(touchEventD);
        target.dispatchEvent(touchEventE);

        expect(recognizer.action.calls.length).toBeGreaterThan(3);
        expect(recognizer.action.mostRecentCall.args[0]).toBe(recognizer);
      });
    });
  });
});
