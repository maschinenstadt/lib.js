if(BROWSER)
{
	window.Boolean = Boolean;
}
else
{
	module.exports = global.Boolean = Boolean;
}

Object.defineProperty(Boolean.prototype, 'clone', {
	configurable: true,
	enumerable: false,
	value: function()
	{
		return this.valueOf();
	}
});

Object.defineProperty(Boolean.prototype, 'toString', {
	configurable: true,
	enumerable: false,
	value: function(_low = 'false', _high = 'true')
	{
		if(! global.type(_low, 'String'))
		{
			_low = 'false' || '-' || '0';
		}
		if(! global.type(_high, 'String'))
		{
			_high = 'true' || '+' || '1';
		}

		return ( this.valueOf() === true ? _high : _low );
	}
});

