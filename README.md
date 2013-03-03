# gesture-recognizers

> Multitouch gesture recognition for WebKit inspired by iOS

Although this library was largely inspired by Apple's iOS gesture recognizers,
it remains impractical to implement the API exactly the same. However, most of
the functionality remains the same.

## Usage

In the most basic form, you can recognized a tap gesture like so:

```javascript
var recognizer;

tapRecognizer = gestureRecognizers.Tap(this, function(recognizer) {
  // Implement your gesture handling code here
});

gestureRecognizers.add(document.body, recognizer);
```

## Contributing

I look forward to all contributions.
