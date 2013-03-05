describe('tap gesture', function() {
  var tapCount, element, tapRecognizer;

  beforeEach(function() {
    tapCount = 0;
    element = document.createElement();
    tapRecognizer = gestureRecognizers.Tap(this, function() { tapCount += 1; });

    gestureRecognizers.add(element, tapRecognizer);
  });

  describe("unmet required number of touches, single tap", function() {
    var touchStart, touchEnd;

    beforeEach(function() {
      tapRecognizer.numberOfTouchesRequired = 1;
      tapRecognizer.numberOfTapsRequired = 1;

      touchStart = document.createEvent('UIEvents');
      touchEnd = document.createEvent('UIEvents');

      touchStart.targetTouches = {
        0: { identifier: 1, clientX: 20, clientY: 10 },
        1: { identifier: 2, clientX: 25, clientY: 10 },
        length: 2
      };

      touchEnd.changedTouches = {
        0: { identifier: 1, clientX: 20, clientY: 10 },
        1: { identifier: 2, clientX: 25, clientY: 10 },
        length: 2
      };

      touchStart.initUIEvent('touchstart', false, false);
      touchEnd.initUIEvent('touchend', false, false);
    });

    it("does not recognize the gesture", function() {
      expect(tapCount).toEqual(0);

      element.dispatchEvent(touchStart);
      element.dispatchEvent(touchEnd);

      expect(tapCount).toEqual(0);
      expect(tapRecognizer.numberOfTaps).toEqual(0);
    });
  });

  describe('single touch, single tap', function() {
    var touchStart, touchEnd;

    beforeEach(function() {
      touchStart = document.createEvent('UIEvents');
      touchEnd = document.createEvent('UIEvents');

      touchStart.targetTouches = {
        0: { clientX: 20, clientY: 10 },
        length: 1
      };

      touchEnd.changedTouches = {
        0: { clientX: 20, clientY: 10 },
        length: 1
      };

      touchStart.initUIEvent('touchstart', false, false);
      touchEnd.initUIEvent('touchend', false, false);
    });

    it('recognizes the gesture', function() {
      expect(tapCount).toEqual(0);

      element.dispatchEvent(touchStart);
      element.dispatchEvent(touchEnd);

      expect(tapCount).toEqual(1);
      expect(tapRecognizer.numberOfTaps).toEqual(0);
    });
  });

  describe('single touch, multiple taps', function() {
    var touchStartA, touchEndA, touchStartB, touchEndB;

    beforeEach(function() {
      tapRecognizer.numberOfTapsRequired = 2;

      touchStartA = document.createEvent('UIEvents');
      touchEndA = document.createEvent('UIEvents');
      touchStartB = document.createEvent('UIEvents');
      touchEndB = document.createEvent('UIEvents');

      touchStartA.targetTouches = {
        0: { identifier: 1, clientX: 20, clientY: 10 },
        length: 1
      };

      touchEndA.changedTouches = {
        0: { identifier: 1, clientX: 20, clientY: 10 },
        length: 1
      };

      touchStartB.targetTouches = {
        0: { identifier: 2, clientX: 20, clientY: 10 },
        length: 1
      };

      touchEndB.changedTouches = {
        0: { identifier: 2, clientX: 20, clientY: 10 },
        length: 1
      };

      touchStartA.initUIEvent('touchstart', false, false);
      touchEndA.initUIEvent('touchend', false, false);
      touchStartB.initUIEvent('touchstart', false, false);
      touchEndB.initUIEvent('touchend', false, false);
    });

    it('recognizes the gesture', function() {
      expect(tapCount).toEqual(0);

      element.dispatchEvent(touchStartA);
      element.dispatchEvent(touchEndA);

      expect(tapCount).toEqual(0);

      element.dispatchEvent(touchStartB);
      element.dispatchEvent(touchEndB);

      expect(tapCount).toEqual(1);
      expect(tapRecognizer.numberOfTaps).toEqual(0);
    });
  });

  describe("met number of touches required, single tap", function() {
    var touchStart, touchEnd;

    beforeEach(function() {
      tapRecognizer.numberOfTouchesRequired = 2;

      touchStart = document.createEvent('UIEvents');
      touchEnd = document.createEvent('UIEvents');

      touchStart.targetTouches = {
        0: { clientX: 20, clientY: 10 },
        1: { clientX: 20, clientY: 10 },
        length: 2
      };

      touchEnd.changedTouches = {
        0: { clientX: 20, clientY: 10 },
        1: { clientX: 20, clientY: 10 },
        length: 2
      };

      touchStart.initUIEvent('touchstart', false, false);
      touchEnd.initUIEvent('touchend', false, false);
    });

    it('recognizes the gesture', function() {
      expect(tapCount).toEqual(0);

      element.dispatchEvent(touchStart);
      element.dispatchEvent(touchEnd);

      expect(tapCount).toEqual(1);
      expect(tapRecognizer.numberOfTaps).toEqual(0);
    });
  });
});
