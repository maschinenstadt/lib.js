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

	this.values = []; // TODO / see above .. maybe extending 'list'?!?

	//
	return this;
}

queue.prototype.enqueue = function()
{
	var result = [];

	for(var i = 0; i < arguments.length; i++)
	{
		if(this.values.length <= this.size)
		{
			this.values[this.values.length] = result[result.length] = arguments[i];
		}
		else
		{
			return result;
		}
	}

	return result;
}

queue.prototype.dequeue = function(_amount = 1, _peek = false)
{
	if(! global.type(_peek, 'Boolean'))
	{
		_peek = false;
	}
	if(! global.type(_amount, 'Number'))
	{
		_amount = 1;
	}

	_amount = _amount % this.values.length;

	var result = [];

	for(var i = 0; i < _amount; i++)
	{
		if(_peek)
		{
			result[i] = this.values[i];
		}
		else
		{
			result[i] = this.values[0];
			this.values.splice(0, 1);
		}
	}

	return result;
}

queue.prototype.peek = function(_amount = 1)
{
	return this.dequeue(_amount, true);
}

if(BROWSER)
{
	web.struct.queue = queue;
}
else
{
	module.exports = queue;
}
