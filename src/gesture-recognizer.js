function GestureRecognizer() {}

GestureRecognizer.initWithTarget = function(target, options) {
  var recognizer;

  if(arguments.length != 2) {
    throw new Error('You must supply a target and action');
  } else if(!(target instanceof Object)) {
    throw new Error(target + ' is not an Object');
  } else if(!(options instanceof Object)) {
    throw new Error(options + ' is not an Object');
  } else if(!('action' in options)) {
    throw new Error(options + ' does not contain a property of name `action`');
  } else if(typeof options.action != 'string') {
    throw new Error(options + '\'s `action` property is not a string');
  }

  recognizer = new this();

  recognizer.targetsAndActions.push([target, options.action]);

  return recognizer;
};

GestureRecognizer.prototype.state = 'possible';
GestureRecognizer.prototype.targetsAndActions = [];

exports.GestureRecognizer = GestureRecognizer;
