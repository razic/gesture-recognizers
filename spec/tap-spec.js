describe('recognizing a tap', function() {
  var tapCount, tapRecognizer, element;

  beforeEach(function() {
    tapCount = 0;
    element = document.createElement();
    tapRecognizer = gestureRecognizers.Tap(this, function() { tapCount += 1; });

    gestureRecognizers.add(element, tapRecognizer);
  });

  describe('a finger taps the element', function() {
    beforeEach(function() {
      var touchStart, touchEnd;

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
      element.dispatchEvent(touchStart);
      element.dispatchEvent(touchEnd);
    });

    it('recognizes the gesture', function() {
      expect(tapCount).toEqual(1);
    });
  });
});
