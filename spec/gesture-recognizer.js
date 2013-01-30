'use strict';

describe('GestureRecognizer', function() {
  var gestureRecognizer;

  beforeEach(function() {
    gestureRecognizer = new GestureRecognizer();
  });

  it('should set some defaults', function() {
    var state;
    var touches;

    state = gestureRecognizer.state;
    touches = gestureRecognizer.touches;

    expect(state).toBe('possible');
  });
});
