describe('recognizing taps', function() {
  var tapCount, element, tapRecognizer;

  beforeEach(function() {
    tapCount = 0;
    element = document.createElement();
    tapRecognizer = gestureRecognizers.Tap(this, function() { tapCount += 1; });

    gestureRecognizers.add(element, tapRecognizer);
  });

  describe('single finger, single tap', function() {
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
      expect(tapRecognizer.tapCount).toEqual(0);
    });
  });

  describe('single finger, multiple taps', function() {
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
      expect(tapRecognizer.tapCount).toEqual(0);
    });
  });
});
