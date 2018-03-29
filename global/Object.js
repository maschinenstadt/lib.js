if(BROWSER)
{
	window.Object = Object;
}
else
{
	module.exports = global.Object = Object;
}

// this "TODO" array is meant for managing own TODO tasks in the objects ..
// ..
// e.g. if an sub-object is not yet available, but it will be in the future
// AND there's a task which is just partially done yet (as the missing obj.
// should be a part of this current task), .. we can "promise" (*g*) it for
// later ..
//
// we should let this automatically work, so we need more code w/ structure
//
Object.defineProperty(Object.prototype, 'TODO', {
	enumerable: false,
	value: []
});

// I THINK this worx wrong now.. TODO!
Object.defineProperty(Object.prototype, 'unset', {
	enumerable: false,
	value: function()
	{
		if(arguments.length === 0)
		{
			return this.valueOf();
		}
		else if(global.type(arguments[0], 'Array'))
		{
			arguments = arguments[0];
		}

		var foreign = false;
		// FRAGE: / evtl. eher "result = this.clone()"!? und dann in schleife "richtig"/direkt entfernen!??
		var result = {};

		for(var idx in this)
		{
			if(! (foreign || this.hasOwnProperty(idx)))
			{
				//???!!!
				//FRAGE: fehlen hier evtl. wichtige objekt-attribute im result!?
				//!!!???
				continue;
			}

			var take = true;

			for(var j = 0; j < arguments.length; j++)
			{
				if(idx === arguments[j])
				{
					take = false;
					break;
				}
			}

			if(! take)
			{
				continue;
			}

			result[idx] = this[idx];
		}

		return result;
	}
});

Object.defineProperty(Object.prototype, 'unsetInverse', {
	enumerable: false,
	value: function()
	{
		//TODO/ same as "unset()", but don't remove specified items,
		//rather remove the others that are *not* specified..!
	}
});

Object.defineProperty(Object.prototype, 'unsetType', {
	enumerable: false,
	value: function()
	{
		//TODO/ same as 'Object.prototype.unset()', but filter out by "type()" comparison
		//
		if(arguments.length === 0)
		{
			return this.valueOf();
		}
		else if(global.type(arguments[0], 'Array'))
		{
			arguments = arguments[0];
		}

		var foreign = false;
		var result = {};

		for(var idx in this)
		{
			if(! (foreign || this.hasOwnProperty(idx)))
			{
				continue;
			}
		
			var take = true;
			var type = global.type(this[idx]);

			for(var j = 0; j < arguments.length; j++)
			{
				if(type === arguments[j])
				{
					take = false;
					break;
				}
			}

			if(! take)
			{
				continue;
			}

			result[idx] = this[idx];
		}

		return result;
	}
});

Object.defineProperty(Object.prototype, 'unsetTypeInverse', {
	enumerable: false,
	value: function()
	{
		//see "Object.prototype.unsetInvert()" .. so don't remove the types specified,
		//rather remove those that are NOT explicitly specified! ..
	}
});

Object.defineProperty(Object.prototype, 'assign', {
	enumerable: false,
	value: function()
	{
		if(arguments.length === 0)
		{
			return 0;
		}

		var foreign = false;

		var result = 0;

		for(var i = 0; i < arguments.length; i++)
		{
			//TODO/ should i check for type 'Object'? bad idea, eh? ..

			for(var idx in arguments[i])
			{
				if(! (arguments[i].hasOwnProperty(idx) || foreign))
				{
					continue;
				}

				this[idx] = arguments[i][idx];
				result++;
			}
		}

		return result;
	}
});

//Object.prototype.keys = function(_foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
Object.defineProperty(Object.prototype, 'keys', {
	enumerable: false,
	value: function(_foreign = false)
	{
		//TODO/ mit allen args..
		//
	
		var result = [];

		for(var idx in this)
		{
			if(_foreign || this.hasOwnProperty(idx))
			{
				result[result.length] = idx;
			}
		}

		return result;
	}
});

//Object.prototype.values = function(_foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
Object.defineProperty(Object.prototype, 'values', {
	enumerable: false,
	value: function(_foreign = false)
	{
	}
});

//Object.prototype.types = function(_foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
Object.defineProperty(Object.prototype, 'types', {
	enumerable: false,
	value: function(_foreign = false)
	{
	}
});

//Object.prototype.forEach = function(_callback, _foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
Object.defineProperty(Object.prototype, 'forEach', {
	enumerable: false,
	value: function(_callback, _foreign = false)
	{
	}
});

Object.defineProperty(Object.prototype, 'glob', {
	enumerable: false,
	value: function()
	{
		// TODO / see "String.prototype.glob()" (and Array ;)
	}
});

Object.defineProperty(Object.prototype, 'clone', {
	enumerable: false,
	configurable: true,
	value: function(_depth = 1, _currentDepth = 1, _foreign = false)
	{
		// @ doc/txt/deep-copy.clone.txt
		//
		// The reason your deep copy is having problems is because you're ending up with circular object references.
		//
		// < https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript >
		// < https://davidwalsh.name/javascript-clone-array >
		//

		if(! global.type(_depth, 'Number'))
		{
			_depth = 1;
		}
		if(! global.type(_currentDepth, 'Number'))
		{
			_currentDepth = 1;
		}
		if(! global.type(_foreign, 'Boolean'))
		{
			_foreign = false;
		}

		var result = {};

		for(var idx in this)
		{
			if(! (_foreign || this.hasOwnProperty(idx)))
			{
				continue;
			}

			var item;

			if(this[idx] !== null && this[idx] !== undefined && this[idx].clone && (_depth === 0 || (_currentDepth < _depth)))
			{
				item = this[idx].clone(_depth, _currentDepth + 1, _foreign);
			}
			else
			{
				item = this[idx];
			}

			result[idx] = item;
		}

		return result;
	}
});

/*
Object.prototype.toString = function(_radix, _tag, _foreign)
*/

/*
Object.prototype.toDebug = function(_radix, _tag, _foreign, _colors)
*/

Object.defineProperty(Object.prototype, 'count', {
	enumerable: false,
	value: function(_foreign = false)
	{
		if(! global.type(_foreign, 'Boolean'))
		{
			_foreign = false;
		}

		var result = 0;

		for(var idx in this)
		{
			if(_foreign || this.hasOwnProperty(idx))
			{
				result++;
			}
		}

		return result;
	}
});

