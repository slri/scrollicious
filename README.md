# Scrollicious

A little tool to make element manipulation sensitive to scrolling easier. It was originally made for my [portfolio project](https://github.com/slri/yet-another-portfolio) since no other tool had what I needed or included a lot of other functionality which I didn't need. jQuery is required for it to work, but I want to improve it further and get rid of the jQuery dependency.

## How to use

It takes opts object which can look like this (they're all optional):

Property | Type | Description | Default | Example
--- | --- | --- | --- | ---
animation | integer | animation duration in ms | 500 | 500
viewport | integer | being the visible area (viewport) of the page, where 0 is vertical topmost point, 50 is the middle, and 100 is the bottom | 50 | 50
target | query string | element which will be affected by the changes based on scroll progress | "#target" | "#target"
trigger | query string | element who's start and (by default) total height will determine the trigger area | "#trigger" | "#trigger"
duration | integer | where the trigger area will end in pixels | trigger.outerHeight() | 400

The callback function will get step/progress from 0 to 100 of how far the viewport point specified has gotten from the beginning to the end of the trigger and the target element itself as arguments. Example:

```js
scrollicious({trigger: "#contact", viewport: 90}, function(step, target) {

	var color = originalColor.toHsv();

	color.v += (transitionColor.v - color.v) * (step/100);
	
	target.css("color", tinycolor(color).toHexString());
});
```


If you'd prefer looking at the code itself, scrollicious is commented every step of the way.

There's a lot of room for improvement.