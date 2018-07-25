;(function($) {

	/**
	 * Calls a callback function every time the scroll event is inside of the trigger area with progress.
	 * @param  {Object}   opts     Settings for scrollicious' behaviour (check it out below)
	 * @param  {Function} callback Function that will be called every time there's a scroll event while inside of the trigger area. Gets scrolling progress and target element for manipulation
	 * @return {void}
	 */
	function scrollicious(opts, callback) {

		opts = opts || {};

		if (!(this instanceof scrollicious)) {
			return new scrollicious(opts, callback);
		}

		var _globalResizeTimer 	= null, //timer instance
		_globalAnimationTime 	= opts.animation || 500, //how long should the animation go for

		_viewport 				= opts.viewport || "", //viewport height that will activate the trigger area
		_computedViewport 		= Math.round($(window).height() * ((_viewport || 50) / 100)), //real viewport position

		_target 				= $(opts.target || "#target"), //the element being affected by changes while the trigger area is active

		_trigger 				= $(opts.trigger || "#trigger"), //element that will mark the area which will stream scroll events

		_duration 				= opts.duration || "", //custom trigger height that will be taken into consideration

		_triggerStart 			= _trigger.offset().top, //where the trigger area should start
		_triggerEnd 			= _duration || _trigger.outerHeight(), //if the custom height isn't set, we'll just take the element's height, where the trigger area should end
		_triggerOffset 			= _triggerStart - _computedViewport, //where trigger area really starts
		_triggerDuration 		= _triggerOffset + _triggerEnd; //where trigger area really ends



		$(window).scroll(function() { //questionable decision making on my part, need to review this
			var weReAt = $(window).scrollTop();

			if(weReAt >= _triggerOffset && weReAt <= _triggerDuration) { //if we're inside of the trigger area

				callback(((weReAt - _triggerOffset) / _triggerEnd) * 100, _target); //give the progress of the scroll and the target element to manipulate
			}
		});

		$(window).resize(function() { //pointless, but if the window is resized for whichever reason and the elements are viewport sensitive, update the position of the trigger area and the viewport
			clearTimeout(_globalResizeTimer);

			_globalResizeTimer = setTimeout(function() {

				_computedViewport 	= Math.round($(window).height() * ((_viewport || 50) / 100));

				_triggerStart 		= _trigger.offset().top;
				_triggerEnd 		= _duration || _trigger.outerHeight();
				_triggerOffset 		= _triggerStart - _computedViewport;
				_triggerDuration 	= _triggerOffset + _triggerEnd;
			}, _globalAnimationTime);
		});
	}

	window.scrollicious = scrollicious; //expose to window object

})(jQuery);