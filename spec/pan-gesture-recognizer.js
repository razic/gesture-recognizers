describe('PanGestureRecognizer', function() {
  var view;
  var target; // The element to recognize gestures on
  var action; // The action called when gesture changes state
  var recognizer; // The recognizer object
  var recognizerClass; // The recognizer class
  var startTime; // Time the gestures events began
  var intervalMilliseconds; // The interval time between `action` calls
  var touchEventA; // Finger(s) touched the screen
  var touchEventB; // The gesture was recognized
  var touchEventC; // The gesture is continuing
  var touchEventD; // The gesture is still continuing
  var touchEventE; // Another finger touched down
  var touchEventF; // A finger was lifted
  var touchEventG; // All fingers are lifted

  recognizerClass = gestureRecognizers.PanGestureRecognizer;

  function createTouchEvent(type, canBubble, cancelable, targetTouches) {
    var event;

    event = document.createEvent('UIEvents');
    event.targetTouches = targetTouches;

    event.initUIEvent(type, canBubble, cancelable);

    return event;
  }

  function Controller() {}
  Controller.prototype.action = function() {};

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
    var touchListF;
    var touchListG;

    view = document.body;
    startTime = 0; // Thu Jan 01 1970 07:00:00 GMT+0700 (ICT)
    intervalMilliseconds = 60000; // 1 minute
    target = new Controller();
    action = 'action';
    touchA = { clientX: 20, clientY: 10 };
    touchB = { clientX: 14, clientY: 10 };
    touchC = { clientX: 10, clientY: 10 };
    touchD = { clientX: 5, clientY: 20 };
    touchE = { clientX: 20, clientY: 35 };
    touchListA = { 0: touchA, length: 1 };
    touchListB = { 0: touchB, length: 1 };
    touchListC = { 0: touchC, length: 1 };
    touchListD = { 0: touchD, length: 1 };
    touchListE = { 0: touchD, 1: touchE, length: 1 };
    touchListF = { 0: touchE, length: 1 };
    touchListG = { length: 0 };
    touchEventA = createTouchEvent('touchstart', false, false, touchListA);
    touchEventB = createTouchEvent('touchmove', false, false, touchListB);
    touchEventC = createTouchEvent('touchmove', false, false, touchListC);
    touchEventD = createTouchEvent('touchmove', false, false, touchListD);
    touchEventE = createTouchEvent('touchstart', false, false, touchListE);
    touchEventF = createTouchEvent('touchend', false, false, touchListF);
    touchEventG = createTouchEvent('touchend', false, false, touchListG);

    Timecop.install();
    Timecop.freeze(new Date(startTime));

    recognizer = recognizerClass.initWithTarget(target, { action: action });

    spyOn(recognizer, 'callAction').andCallThrough();
    spyOn(recognizer, 'calculateVelocity').andCallThrough();
  });

  afterEach(function() {
    Timecop.uninstall();
  });

  describe('when the minimum number of fingers allowed has moved enough to be \
  considered a pan', function() {
    beforeEach(function(){
      var currentTime;

      currentTime = startTime + intervalMilliseconds;

      view.dispatchEvent(touchEventA);
      Timecop.freeze(new Date(currentTime));
      view.dispatchEvent(touchEventB);
    });

    it('should change to the began state', function() {
      expect(recognizer.state).toBe('began');
    });

    it('should call the specified action', function() {
      expect(recognizer.callAction.calls.length).toBeGreaterThan(0);
    });

    it('should report translation coordinates of xy(0, 0)', function() {
      expect(recognizer.translationX).toEqual(0);
      expect(recognizer.translationY).toEqual(0);
    });

    describe('when a finger moves while at least the minimum number of \
    fingers are pressed down', function() {
      beforeEach(function(){
        var currentTime;

        currentTime = startTime + (intervalMilliseconds * 2);

        Timecop.freeze(new Date(currentTime));
        view.dispatchEvent(touchEventC);
      });

      it('should change to the changed state', function() {
        expect(recognizer.state).toBe('changed');
      });

      it('should call the specified action', function() {
        expect(recognizer.callAction.calls.length).toBeGreaterThan(1);
      });

      describe('when a finger moves again while at least the minimum number \
      of fingers are pressed down', function(){
        beforeEach(function() {
          var currentTime;

          currentTime = startTime + (intervalMilliseconds * 3);

          Timecop.freeze(new Date(currentTime));
          view.dispatchEvent(touchEventD);
        });

        it('should report velocity', function() {
          var x1;
          var y1;
          var x2;
          var y2;
          var distance;
          var velocity;

          x1 = touchEventC.targetTouches[0].clientX;
          y1 = touchEventC.targetTouches[0].clientY;
          x2 = touchEventD.targetTouches[0].clientX;
          y2 = touchEventD.targetTouches[0].clientY;
          distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          velocity = distance / intervalMilliseconds;

          expect(recognizer.calculateVelocity.calls.length).toEqual(1);
          expect(recognizer.calculateVelocity.calls[0].args[0]).toEqual(x2);
          expect(recognizer.calculateVelocity.calls[0].args[1]).toEqual(x1);
          expect(recognizer.calculateVelocity.calls[0].args[2]).toEqual(y2);
          expect(recognizer.calculateVelocity.calls[0].args[3]).toEqual(y1);
          expect(recognizer.velocity).toEqual(velocity);
        });

        it('should still be in the changed state', function() {
          expect(recognizer.state).toBe('changed');
        });

        it('should still call the specified action', function() {
          expect(recognizer.callAction.calls.length).toBeGreaterThan(2);
        });

        describe('when a finger is lifted but the minimum number of fingers \
        are still pressed down', function(){
          beforeEach(function() {
            var currentTime;

            currentTime = startTime + (intervalMilliseconds * 4);

            Timecop.freeze(new Date(currentTime));
            view.dispatchEvent(touchEventE);

            currentTime += intervalMilliseconds;

            Timecop.freeze(new Date(currentTime));
            view.dispatchEvent(touchEventF);
          });

          it('the current translation coordinates should be calculated from a \
          new starting point equal to the current coordinates of the oldest \
          touch minus the current translation', function() {
            // This prevents the translation values from being calculated
            // from the original startX and startY which is recorded the first
            // time a finger touched down

            expect(recognizer.startX).toEqual(29);
            expect(recognizer.startY).toEqual(25);
          });
        });

        describe('when all fingers are lifted', function() {
          beforeEach(function() {
            view.dispatchEvent(touchEventG);
          });

          it('changes to the ended state', function() {
            expect(recognizer.state).toBe('ended');
          });

          it('should call the specified action', function() {
            expect(recognizer.callAction.calls.length).toBeGreaterThan(3);
          });
        });
      });
    });
  });
});
