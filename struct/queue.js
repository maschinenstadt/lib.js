//TODO/ maybe "extends list"!?!?
class queue extends node
{
	constructor()
	{
		super();
		this.values = []; // TODO / see above .. maybe extending 'list'?!?
	}

	enqueue(_item)
	{
		for(var i = 0; i < arguments.length; i++)
		{
			this.values.splice(0, 0, arguments[i]);
		}

		return Array.from(arguments);
	}

	dequeue(_amount = 1, _peek = false)
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

		for(var i = 0; i < _amount; i++)
		{
			result[i] = this.values[0];

			if(! _peek)
			{
				this.values.splice(0, 1);
			}
		}

		if(_amount === 1)
		{
			return result[0];
		}

		return result;
	}

	peek(_amount = 1)
	{
		return this.dequeue(_amount, true);
	}
}

if(BROWSER)
{
	web.struct.queue = queue;
}
else
{
	module.exports = queue;
}

