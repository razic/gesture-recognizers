describe('pan gesture', function() {
  var element, // The element the gesture recognizer is receiving touches from
    panRecognizer, // The gesture recognizer object
    currentTime, // The current time
    startTime, // Time the touch events began
    intervalMilliseconds, // The interval time between `action` calls
    touchStartA, // A finger touched the screen
    touchMoveA, // The finger is moving
    touchMoveB, // The finger is still moving
    touchMoveC, // The finger is still moving
    touchStartB, // Another finger touched down
    touchEndA, // A finger was lifted
    touchEndB; // All fingers are lifted

  startTime = 0; // Thu Jan 01 1970 07:00:00 GMT+0700 (ICT)
  intervalMilliseconds = 60000; // 1 minute
  touchStartA = document.createEvent('UIEvents');
  touchMoveA = document.createEvent('UIEvents');
  touchMoveB = document.createEvent('UIEvents');
  touchMoveC = document.createEvent('UIEvents');
  touchStartB = document.createEvent('UIEvents');
  touchEndA = document.createEvent('UIEvents');
  touchEndB = document.createEvent('UIEvents');

  touchStartA.targetTouches = {
    0: { identifier: 1, clientX: 20, clientY: 10 },
    length: 1
  };

  touchMoveA.targetTouches = {
    0: { identifier: 1, clientX: 14, clientY: 10 },
    length: 1
  };

  touchMoveB.targetTouches = {
    0: { identifier: 1, clientX: 10, clientY: 10 },
    length: 1
  };

  touchMoveC.targetTouches = {
    0: { identifier: 1, clientX: 5, clientY: 20 },
    length: 1
  };

  touchStartB.targetTouches = {
    0: { identifier: 1, clientX: 5, clientY: 20 },
    1: { identifier: 2, clientX: 20, clientY: 35 },
    length: 2
  };

  touchEndA.targetTouches = {
    0: { identifier: 2, clientX: 20, clientY: 35 },
    length: 1
  };

  touchEndA.changedTouches = {
    0: { identifier: 1, clientX: 5, clientY: 20 },
    length: 1
  };

  touchEndB.targetTouches = { length: 0 };

  touchEndB.changedTouches = {
    0: { identifier: 2, clientX: 20, clientY: 35 },
    length: 1
  };

  touchStartA.initUIEvent('touchstart');
  touchMoveA.initUIEvent('touchmove');
  touchMoveB.initUIEvent('touchmove');
  touchMoveC.initUIEvent('touchmove');
  touchStartB.initUIEvent('touchstart');
  touchEndA.initUIEvent('touchend');
  touchEndB.initUIEvent('touchend');

  describe('the minimum number of fingers required has moved enough to be \
  considered a pan', function () {
    beforeEach(function () {
      currentTime = 0; // Thu Jan 01 1970 07:00:00 GMT+0700 (ICT)
      element = document.createElement();
      panRecognizer = gestureRecognizers.Pan(this);
      panRecognizer.action = jasmine.createSpy('action');

      gestureRecognizers.add(element, panRecognizer);
      Timecop.install();
      Timecop.freeze(new Date(startTime));
      element.dispatchEvent(touchStartA);
      Timecop.freeze(new Date(currentTime += intervalMilliseconds));
      element.dispatchEvent(touchMoveA);
    });

    afterEach(function() {
      Timecop.uninstall();
    });

    it('sets the translation coordinates', function() {
      expect(panRecognizer.translationX).toEqual(0);
      expect(panRecognizer.translationY).toEqual(0);
    });

    it("enters the began state", function() {
      expect(panRecognizer.state).toBe(gestureRecognizers.states.began);
    });

    it('calls the action', function() {
      expect(panRecognizer.action.calls.length).toEqual(1);
    });

    describe("a finger moves while at least the minimum number of fingers are \
    pressed down", function() {
      beforeEach(function () {
        panRecognizer.action.reset();
        Timecop.freeze(new Date(currentTime += intervalMilliseconds));
        element.dispatchEvent(touchMoveB);
      });

      it('sets the translation coordinates', function() {
        expect(panRecognizer.translationX).toEqual(-4);
        expect(panRecognizer.translationY).toEqual(0);
      });

      it('enters the changed state', function() {
        expect(panRecognizer.state).toBe(gestureRecognizers.states.changed);
      });

      it('calls the action', function() {
        expect(panRecognizer.action.calls.length).toEqual(1);
      });

      describe('a finger moves again while the minimum number of fingers are \
      pressed down', function () {
        beforeEach(function () {
          panRecognizer.action.reset();
          Timecop.freeze(new Date(currentTime += intervalMilliseconds));
          element.dispatchEvent(touchMoveC);
        });

        it('sets the translation coordinates', function() {
          expect(panRecognizer.translationX).toEqual(-9);
          expect(panRecognizer.translationY).toEqual(10);
        });

        it('remains in the changed state', function() {
          expect(panRecognizer.state).toBe(gestureRecognizers.states.changed);
        });

        it('calls the action', function() {
          expect(panRecognizer.action.calls.length).toEqual(1);
        });

        describe("a new finger presses down on the screen and the oldest \
        finger lifts", function() {
          beforeEach(function() {
            panRecognizer.action.reset();
            Timecop.freeze(new Date(currentTime += intervalMilliseconds));
            element.dispatchEvent(touchStartB);
            Timecop.freeze(new Date(currentTime += intervalMilliseconds));
            element.dispatchEvent(touchEndA);
          });

          it('current translation coordinates are calculated from a new \
          starting point equal to the current coordinates of the oldest touch \
          minus the current translation', function() {
            // This prevents the translation values from being calculated
            // from the original startX and startY which was recorded the first
            // time a finger touched down

            expect(panRecognizer.startX).toEqual(29);
            expect(panRecognizer.startY).toEqual(25);
          });

          it('remains in the changed state', function() {
            expect(panRecognizer.state).toBe(gestureRecognizers.states.changed);
          });

          it("doesn't call the action", function() {
            expect(panRecognizer.action.calls.length).toEqual(0);
          });

          describe('the minimum number of fingers are no longer pressed down',
          function() {
            beforeEach(function() {
              panRecognizer.action.reset();
              Timecop.freeze(new Date(currentTime += intervalMilliseconds));
              element.dispatchEvent(touchEndB);
            });

            it('enters the ended state', function() {
              expect(panRecognizer.state).toBe(gestureRecognizers.states.ended);
            });

            it('calls the action', function() {
              expect(panRecognizer.action.calls.length).toEqual(1);
            });
          });
        });
      });
    });
  });
});
