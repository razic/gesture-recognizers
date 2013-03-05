# gesture-recognizers

> Multitouch gesture recognition for WebKit inspired by iOS

Although this library was largely inspired by Apple's iOS gesture recognizers,
it remains impractical to implement the API exactly the same. However, most of
the functionality remains the same.

## Gestures

You can use this library to create your own custom gestures or use one of the
following gestures that are provided:

* Tap

### Tap

The `Tap` gesture looks for single or multiple taps. For the gesture to be
recognized, the specified number of fingers must tap the specified DOM element
a specified number of times.

#### Configuring the gesture

`numberOfTapsRequired` *property*
`numberOfTouchesRequired` *property*

#### Properties

##### numberOfTapsRequired

The number of taps required for the gesture to be recognized. The default value
is 1.

##### numberOfTouchesRequired

The number of fingers required to tap for the gesture to be recognized. The
default value is 1.

## Contributing

I look forward to all contributions.
