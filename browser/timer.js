var timer = window.timer = {};

timer.sleep = function(_delay)
{
	var end = Date.now() + _delay;
	while(Date.now() < end) {};
	return Date.now();
}

timer.immediate = {};
timer.interval = {};
timer.timeout = {};

timer.immediate.set = window.setImmediate;
timer.immediate.clear = window.clearImmediate;

timer.interval.set = window.setInterval;
timer.interval.clear = window.clearInterval;

timer.timeout.set = window.setTimeout;
timer.timeout.clear = window.clearTimeout;

timer.set = {};
timer.clear = {};

timer.set.immediate = window.setImmediate;
timer.set.interval = window.setInterval;
timer.set.timeout = window.setTimeout;

timer.clear.immediate = window.clearImmediate;
timer.clear.interval = window.clearInterval;
timer.clear.timeout = window.clearTimeout;

if(false)	// node requires the original ones..
{		// BUT WHAT ABOUT YOUR WEB BROWSER!? //TODO/ test..
	delete window.clearImmediate;
	delete window.clearInterval;
	delete window.clearTimeout;

	delete window.setImmediate;
	delete window.setInterval;
	delete window.setTimeout;
}

