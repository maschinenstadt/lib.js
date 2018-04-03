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

	this.stack = [];  // or rather "extends list"!??

	//
	return this;
}

Object.defineProperty(stack.prototype, 'toString', {
	enumerable: false,
	configurable: true,
	value: function()
	{
		return this.stack.toString();
	}
});

Object.defineProperty(stack.prototype, 'length', {
	enumerable: false,
	get: function() { return this.stack.length; }
});

Object.defineProperty(stack.prototype, 'push', {
	enumerable: false,
	value: function()
	{
		var result = 0;

		for(var i = 0; i < arguments.length; i++)
		{
			if(this.stack.length < this.size)
			{
				this.stack[this.stack.length] = arguments[i];
				result++;
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
			if(_amount > this.stack.length)
			{
				_amount = this.stack.length;
			}
		}
		else
		{
			_amount = 1;
		}

		var result = [];

		for(var i = this.length - 1, j = 0; i >= 0, j < _amount; i--, j++)
		{
			result[j] = this.stack[i];

			if(! _peek)
			{
				this.stack.splice(this.stack.length - 1, 1);
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

