function GestureRecognizer() {}

GestureRecognizer.initWithTarget = function(target, options) {
  if(arguments.length != 2) {
    throw new Error('You must supply a target and action');
  } else if(!(target instanceof Object)) {
    throw new Error(target + ' is not an instance of Object');
  } else if(!(options instanceof Object)) {
    throw new Error(options + ' is not an instance of Object');
  } else if(!('action' in options)) {
    throw new Error(options + ' does not contain a property of name `action`');
  } else if(!(options.action instanceof Function)) {
    throw new Error(options + '\'s `action` property is not a function');
  }

};

GestureRecognizer.prototype.state = 'possible';

exports.GestureRecognizer = GestureRecognizer;
