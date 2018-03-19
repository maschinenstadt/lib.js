var main = module.exports = {};

global.timer = {};

global.timer.sleep = function(_delay)
{
	var end = Date.now() + _delay;
	while(Date.now() < end) {};
	return _delay;
}

global.timer.immediate = {};
global.timer.interval = {};
global.timer.timeout = {};

global.timer.immediate.set = global.setImmediate;
global.timer.immediate.clear = global.clearImmediate;

global.timer.interval.set = global.setInterval;
global.timer.interval.clear = global.clearInterval;

global.timer.timeout.set = global.setTimeout;
global.timer.timeout.clear = global.clearTimeout;

global.timer.set = {};
global.timer.clear = {};

global.timer.set.immediate = global.setImmediate;
global.timer.set.interval = global.setInterval;
global.timer.set.timeout = global.setTimeout;

global.timer.clear.immediate = global.clearImmediate;
global.timer.clear.interval = global.clearInterval;
global.timer.clear.timeout = global.clearTimeout;

if(false) // node seems to require them..!
{
	delete global.clearImmediate;
	delete global.clearInterval;
	delete global.clearTimeout;

	delete global.setImmediate;
	delete global.setInterval;
	delete global.setTimeout;
}

console.debug(2, "Loaded 'timer'");

