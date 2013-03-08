describe('pan gesture', function() {
  var element, // The element the gesture recognizer is receiving touches from
    panRecognizer, // The gesture recognizer object
    recognized, // A flag that will be set true when the gesture is recognized
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

  recognized = false;
  startTime = 0; // Thu Jan 01 1970 07:00:00 GMT+0700 (ICT)
  currentTime = 0; // Thu Jan 01 1970 07:00:00 GMT+0700 (ICT)
  intervalMilliseconds = 60000; // 1 minute
  element = document.createElement();
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

  panRecognizer = gestureRecognizers.Pan(this);
  panRecognizer.action = jasmine.createSpy('action');

  Timecop.install();
  Timecop.freeze(new Date(startTime));
  gestureRecognizers.add(element, panRecognizer);
  touchStartA.initUIEvent('touchstart');
  touchMoveA.initUIEvent('touchmove');
  touchMoveB.initUIEvent('touchmove');
  touchMoveC.initUIEvent('touchmove');
  touchStartB.initUIEvent('touchstart');
  touchEndA.initUIEvent('touchend');
  touchEndB.initUIEvent('touchend');


  describe('the minimum number of fingers required has moved enough to be \
  considered a pan', function () {
    element.dispatchEvent(touchStartA);
    Timecop.freeze(new Date(currentTime += intervalMilliseconds));
    element.dispatchEvent(touchMoveA);

    it("enters the began state", function() {
      expect(panRecognizer.state).toBe(gestureRecognizers.states.began);
    });

    it('calls the action', function() {
      expect(panRecognizer.action.calls.length).toEqual(1);
    });

    it('starts translation coordinates at XY(0,0)', function() {
      expect(panRecognizer.translationX).toEqual(0);
      expect(panRecognizer.translationY).toEqual(0);
    });
  });

  Timecop.uninstall();
});
