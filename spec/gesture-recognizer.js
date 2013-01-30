'use strict';

describe('GestureRecognizer', function() {
  var gestureRecognizer;

  beforeEach(function() {
    gestureRecognizer = new GestureRecognizer();
  });

  it('should be in the possible state upon initialization', function() {
    var state;

    state = gestureRecognizer.state;

    expect(state).toBe('possible');
  });
});
