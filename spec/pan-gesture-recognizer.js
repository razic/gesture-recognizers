describe('PanGestureRecognizer', function() {
  'use strict';

  var target;
  var recognizer;

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
});
