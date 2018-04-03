var queue = function(_size = undefined)
{
	if(global.type(_size, 'Number'))
	{
		this.size = _size;
	}
	else
	{
		this.size = undefined;
	}

	this.queue = []; // TODO / see above .. maybe extending 'list'?!?

	//
	return this;
}

Object.defineProperty(queue.prototype, 'toString', {
	enumerable: false,
	configurable: true,
	value: function()
	{
		return this.queue.toString();
	}
});

Object.defineProperty(queue.prototype, 'length', {
	enumerable: false,
	get: function() { return this.queue.length; }
});

Object.defineProperty(queue.prototype, 'enqueue', {
	enumerable: false,
	value: function()
	{
		var result = [];

		for(var i = 0; i < arguments.length; i++)
		{
			if(this.queue.length <= this.size)
			{
				this.queue[this.queue.length] = result[result.length] = arguments[i];
			}
			else
			{
				return result;
			}
		}

		return result;
	}
});

Object.defineProperty(queue.prototype, 'dequeue', {
	enumerable: false,
	value: function(_amount = 1, _peek = false)
	{
		if(! global.type(_peek, 'Boolean'))
		{
			_peek = false;
		}
		if(! global.type(_amount, 'Number'))
		{
			_amount = 1;
		}

		_amount = _amount % this.queue.length;

		var result = [];

		for(var i = 0; i < _amount; i++)
		{
			if(_peek)
			{
				result[i] = this.queue[i];
			}
			else
			{
				result[i] = this.queue[0];
				this.queue.splice(0, 1);
			}
		}

		return result;
	}
});

Object.defineProperty(queue.prototype, 'peek', {
	enumerable: false,
	value: function(_amount = 1)
	{
		return this.dequeue(_amount, true);
	}
});

if(BROWSER)
{
	web.struct.queue = queue;
}
else
{
	module.exports = queue;
}

