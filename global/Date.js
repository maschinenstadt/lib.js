if(BROWSER)
{
	window.Date = Date;
}
else
{
	module.exports = global.Date = Date;
}

Object.defineProperty(Date, 'second', {
	enumerable: true,
	get: function() { return 1000; }
});

Object.defineProperty(Date, 'minute', {
	enumerable: true,
	get: function() { return (1000 * 60); }
});

Object.defineProperty(Date, 'hour', {
	enumerable: true,
	get: function() { return (1000 * 60 * 60); }
});

Object.defineProperty(Date, 'day', {
	enumerable: true,
	get: function() { return (1000 * 60 * 60 * 24); }
});

Object.defineProperty(Date, 'week', {
	enumerable: true,
	get: function() { return (1000 * 60 * 60 * 24 * 7); }
});

Object.defineProperty(Date.prototype, 'clone', {
	enumerable: false,
	configurable: true,
	value: function()
	{
		return this.valueOf();
	}
});

Object.defineProperty(Date.prototype, 'toString', {
	enumerable: false,
	configurable: true,
	value: function(_format = '')
	{
		if(! global.type(_format, 'String'))
		{
			_format = '';
		}

		//
	}
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
