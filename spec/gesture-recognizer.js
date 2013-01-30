describe('GestureRecognizer', function() {
  'use strict';

  var recognizer;

  beforeEach(function() {
    recognizer = new GestureRecognizer(document.body);
  });

  it('should be in the possible state upon initialization', function() {
    expect(recognizer.state).toBe('possible');
  });
});
