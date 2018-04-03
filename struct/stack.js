//maybe "extends list"?!?
class stack extends node
{
	constructor()
	{
		super();
		this.values = [];  // or rather "extends list"!??
	}

	push()
	{
		for(var i = 0; i < arguments.length; i++)
		{
			this.values[this.values.length] = arguments[i];
		}

		return Array.from(arguments);
	}

	pop(_amount = 1, _peek = false)
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

	peek(_amount = 1)
	{
		return this.pop(_amount, true);
	}
}

if(BROWSER)
{
	web.struct.stack = stack;
}
else
{
	module.exports = stack;
}

