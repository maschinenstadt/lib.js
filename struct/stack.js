var stack = function(_size = undefined)
{
	if(global.type(_size, 'Number'))
	{
		this.size = _size;
	}
	else
	{
		this.size = undefined;
	}

	this.values = [];  // or rather "extends list"!??

	//
	return this;
}

Object.defineProperty(stack.prototype, 'push', {
	enumerable: false,
	value: function()
	{
		var result = [];

		for(var i = 0; i < arguments.length; i++)
		{
			if(this.values.length <= this.size)
			{
				result[result.length] = this.values[this.values.length] = arguments[i];
			}
			else
			{
				return result;
			}
		}

		return result;
	}
});

Object.defineProperty(stack.prototype, 'pop', {
	enumerable: false,
	value: function(_amount = 1, _peek = false)
	{
		if(! global.type(_peek, 'Boolean'))
		{
			_peek = false;
		}
		if(global.type(_amount, 'Number'))
		{
			_amount = _amount % this.length;
		}
		else
		{
			_amount = 1 % this.length;
		}

		var result = [];

		for(var i = this.length - 1, j = 0; i >= 0; i--, j++)
		{
			result[j] = this.values[i];

			if(! _peek)
			{
				this.values.splice(this.values.length - 1, 1);
			}
		}

		return result;
	}
});

Object.defineProperty(stack.prototype, 'peek', {
	enumerable: false,
	value: function(_amount = 1)
	{
		return this.pop(_amount, true);
	}
});

if(BROWSER)
{
	web.struct.stack = stack;
}
else
{
	module.exports = stack;
}

