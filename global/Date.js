if(BROWSER)
{
	window.Date = Date;
}
else
{
	module.exports = global.Date = Date;
}

Object.defineProperty(Date, 'second', {
	get: function() { return 1000; }
});

Object.defineProperty(Date, 'minute', {
	get: function() { return (1000 * 60); }
});

Object.defineProperty(Date, 'hour', {
	get: function() { return (1000 * 60 * 60); }
});

Object.defineProperty(Date, 'day', {
	get: function() { return (1000 * 60 * 60 * 24); }
});

Object.defineProperty(Date, 'week', {
	get: function() { return (1000 * 60 * 60 * 24 * 7); }
});

// TODO /
//
// # add()
// # sub()
//
// # start()
// # stop()
//
// # diff|delta()
//
// # format() / toString(_format)
//
