# `gestureRecognizers.Pan` Class Reference

## Overview

The `gestureRecognizers.Pan` gesture looks for panning (dragging) gestures. The
user must be pressing one or more fingers on the specified DOM element while
they pan it. Clients implementing the action method for this gesture recognizer
can ask it for the current translation and velocity of the gesture.

A panning gesture is continuous. It begins (`gestureRecognizers.states.began`)
when the minimum number of fingers allowed
([`minimumNumberOfTouches`](#minimumNumberOfTouches)) has moved enough to be
considered a pan
([`minimumNumberOfPixelsTranslatedBeforeRecognized`](#minimumNumberOfPixelsTranslatedBeforeRecognized)).
It changes (`gestureRecognizers.states.changed`) when a finger moves while at
least the minimum number of fingers are pressed down. It ends
(`gestureRecognizers.states.ended`) when all fingers are lifted.

Clients of this class can, in their action method callbacks, query the
`gestureRecognizers.Pan` instance for the current translation of the gesture
with the [`translationX`](#translationx) and [`translationY`](#translationy)
properties. You may also query the velocity of the translation with the
[`velocityX`](#velocityx) and [`velocityY`](#velocityy) properties.
Clients may also reset the translation to a desired value with the
[`setTranslation`](#settranslationx-y) instance method.

## Tasks

### Configuring the gesture

[`minimumNumberOfTouches`](#minimumnumberoftouches) *property*

[`maximumNumberOfTouches`](#maximumnumberoftouches) *property*

[`minimumNumberOfPixelsTranslatedBeforeRecognized`](#minimumnumberofpixelstranslatedbeforerecognized)
*property*

### Tracking the location and velocity of the gesture

[`translationX`](#translationx) *property*

[`translationY`](#translationy) *property*

[`velocityX`](#velocityx) *property*

[`velocityY`](#velocityy) *property*

[`velocityY`](#velocityy) *property*

[`setTranslation`](#settranslationx-y) *instance method*

## Properties

### `minimumNumberOfTouches`

The minimum number of fingers that can be touching the view for this gesture to
be recognized. The default value is 1.

### `maximumNumberOfTouches`

The maximum number of fingers that can be touching the view for this gesture to
be recognized. The default value is 10.

### `translationX`

Returns a number. The value is reported as the total translation over time. It
is **not** a delta value from the last time that the translation was reported.

### `translationY`

Returns a number. The value is reported as the total translation over time. It
is **not** a delta value from the last time that the translation was reported.

### `velocityX`

Returns a number representing the velocity along the X axis, which is expressed
in pixels per millisecond.

### `velocityY`

Returns a number representing the velocity along the Y axis, which is expressed
in pixels per millisecond.

## Instance Methods

### `setTranslation(x, y)`

Sets the translation coordinates. This method is commonly used to obtain delta
values by resetting the translation to xy(0,0) in the action method callback
during the `gestureRecognizers.states.began` and
`gestureRecognizers.states.changed` states.
