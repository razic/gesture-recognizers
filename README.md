# gesture-recognizers

> Multitouch gesture recognition for WebKit inspired by iOS

## Usage

Here is the most basic example for recognizing a tap:

```javascript
var target, handler, recognizer, view;

target = this;

handler = function(recognizer) {
  // What you want to happen when a tap is recognized
}

recognizer = gestureRecognizers.TapGestureRecognizer.initWithTarget(target, {
  action: 'handler'
});

view = new gestureRecognizers.View(document.getElementById('myElement'));

view.addGestureRecognizer(recognizer);
```

### Implementing your own Gesture Recognizers

```javascript
// Returns the original MyRecognizer function expression... with some sugar
new GestureRecognizer(function MyRecognizer() {
  // Implementation
});
```

## Contributing

I look forward to all contributions.
