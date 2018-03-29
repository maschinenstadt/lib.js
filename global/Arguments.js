var Arguments = (function() { return arguments; })().__proto__; // 'function' is necessary for browser support

if(BROWSER)
{
	window.Arguments = Arguments;
}
else
{
	module.exports = Arguments;
}

/*
 * ... for there you don't have to specify ".prototype" every time.. it's the __proto__ itself! ;-)´ ..
 */
// arguments.callee	// reference to the currently executing function
// arguments.caller	// reference to the function that invoked the currently executing function

Arguments.clone = function()
{
	return this.valueOf();
}

Object.defineProperty(Arguments, 'toArray', {
	enumerable: false,
	value: function()
	{
		//return [].slice.call(this);
		return Array.from(this);
	}
});

//FEHLERHAFT noch..!
Object.defineProperty(Arguments, 'map', {
	enumerable: false,
	value: function()
	{
		//TODO/
		//see "doc/txt/virtual_polymorphy.txt"!
		//
		//TODO/ arbeitet noch nicht richtig!! überbessern!

		if(arguments.length === 0)
		{
			return 0;
		}
		else if(global.type(arguments[0], 'Array'))
		{
			arguments = arguments[0].toArray();
		}
		else
		{
			arguments = arguments.toArray();
		}

		arguments = arguments.unsetTypeInverse('String');

		// 'Number eins, String zwei, String|Object drei'
		// 'Boolean one'
	
		var result = -1;

		for(var i = 0; i < arguments.length; i++)
		{
			var elements = arguments[i].split(',').removeVoids(true);

			if(elements.length !== this.length)
			{
				continue;
			}

			for(var j = 0; j < elements.length; j++)
			{
				var item = elements[j].split(' ');
				var type, key;

				if(item.length === 1)
				{
					// arg without type
					type = undefined;
					key = item[0];
				}
				else
				{
					// arg with type
					type = item[0];
					key = item[1];
				}

				if(global.type(this[j]) !== type)
				{
					continue;
				}

				this[key] = this[j];
				result = j;

				break;
			}
		}

		//console.inspect(this);
		return result;
	}
});

// ÜBERPRÜFEN auch..!
Object.defineProperty(Arguments, 'check', {
	enumerable: false,
	value: function(_offset = 0, _type = [])
	{
		_offset = this.offset(_offset);

		//TODO/ _type as ARRAY for multiple type options!
		//OTHERWISE: WHAT!? exception if no match?
		//..
		//the QUESTION is: how to handle my own VIRTUAL POLYMORPHY!?
		//...
		//(maybe as parse-able string w/ automatic api generation extensions???!)
		//

		var result = this.index(_offset);

		if(_type)
		{
			if(global.type(_type, 'String'))
			{
				_type = [ _type ];
			}
		}
		else
		{
			return result;
		}

		var type = global.type(result);

		for(var i = 0; i < _type.length; i++)
		{
			if(_type[i] === type)
			{
				return result;
			}
		}

		return undefined;
	}
});

Object.defineProperty(Arguments, 'offset', {
	enumerable: false,
	value: function(_offset = this.length - 1)
	{
		_offset = _offset % this.length;

		while(_offset < 0)
		{
			_offset = this.length + _offset;
		}

		return ( _offset === -0 ? 0 : _offset );
	}
});

//index()?

