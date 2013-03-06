exports.add = function(node, recognizer) {
  node.addEventListener('touchstart', recognizer.touchStart.bind(recognizer));
  node.addEventListener('touchmove', recognizer.touchMove.bind(recognizer));
  node.addEventListener('touchend', recognizer.touchEnd.bind(recognizer));
};
