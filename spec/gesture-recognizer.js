describe('GestureRecognizer', function() {
  var abstractParent;

  abstractParent = gestureRecognizers.GestureRecognizer;

  describe('initialization', function() {
    describe('the number of arguments is not equal to two', function() {
      it('throws an error', function() {
        var errorMessage;

        errorMessage = 'You must supply a target and action';

        expect(abstractParent.initWithTarget).toThrow(errorMessage);
      });
    });

    describe('the first argument is not an instance of Object', function() {
      it('throws an error', function() {
        var errorMessage;

        errorMessage = '1 is not an Object';

        expect(function() {
          abstractParent.initWithTarget(1, 2);
        }).toThrow(errorMessage);
      });
    });

    describe('the first argument is an instance of Object', function() {
      describe('the second argument is not an instance of Object',
      function() {
        it('throws an error', function() {
          var errorMessage;

          errorMessage = '2 is not an Object';

          expect(function() {
            abstractParent.initWithTarget({}, 2);
          }).toThrow(errorMessage);
        });
      });

      describe('the second argument is an instance of Object',
      function() {
        describe('the second argument does not have a property named \
        `action`', function() {
          it('throws an error', function() {
            var errorMessage;

            errorMessage = '[object Object] does not contain a property of';
            errorMessage += ' name `action`';

            expect(function() {
              abstractParent.initWithTarget({}, {});
            }).toThrow(errorMessage);
          });
        });

        describe('the second argument does have a property named \
        `action`', function() {
          describe('the `action` property is not a string', function() {
            it('throws an error', function() {
              var errorMessage;

              errorMessage = '[object Object]\'s `action` property is not a';
              errorMessage += ' string';

              expect(function() {
                abstractParent.initWithTarget({}, { action: 1 });
              }).toThrow(errorMessage);
            });
          });

          describe('the `action` property is a string', function() {
            var target;
            var recognizer;

            beforeEach(function() {
              function Controller() {}

              Controller.prototype.action = function() {};

              target = new Controller();
              recognizer = abstractParent.initWithTarget(target, {
                action: 'action'
              });
            });

            describe('the initialized recognizer object', function() {
              it('will be in the `possible` state', function() {
                expect(recognizer.state).toBe('possible');
              });

              it('adds the target and action pair', function() {
                expect(recognizer.targetsAndActions).toContain(
                  [target, 'action']
                );
              });
            });
          });
        });
      });
    });
  });
});
