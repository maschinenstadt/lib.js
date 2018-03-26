if(! BROWSER)
{
	module.exports = Object;
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
Object.prototype.TODO = [];

/*Object.prototype.toString = function(_single_line, _foreign, _depth)
{
}*/

Object.prototype.unset = function()
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

Object.prototype.unsetInvert = function()
{
	//TODO/ same as "unset()", but don't remove specified items,
	//rather remove the others that are *not* specified..!
}

Object.prototype.unsetType = function()
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

Object.prototype.unsetTypeInvert = function()
{
	//see "Object.prototype.unsetInvert()" .. so don't remove the types specified,
	//rather remove those that are NOT explicitly specified! ..
}

Object.prototype.assign = function()
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

Object.prototype.keys = function(_foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
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

Object.prototype.values = function(_foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
{
}

Object.prototype.types = function(_foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
{
}

Object.prototype.forEach = function(_callback, _foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
{
}

/*Object.prototype.count = function(_foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
{
	//TODO/ anpassen an die anderen hier (wie "Object.prototype.keys()" etc. ..)
	//momentan nur ganz einfach
	//
	//TODO!!!!!!!

	_foreign = _foreign === true;

	var result = 0;

	for(var idx in this)
	{
		if(_foreign || this.hasOwnProperty(idx))
		{
			result++;
		}
	}

	return result;
}*/

Object.prototype.glob = function()
{
	// TODO / see "String.prototype.glob()" (and Array ;)
}

Object.prototype.copy = function(_foreign = false, _suffix, _prefix, _maximum, _remove, _filter)
{
}

Object.prototype.clone = function(_depth, _currentDepth, _foreign) //(foreign?? only!?? TODO!!TODO!
{
	// @ doc/txt/deep-copy.clone.txt
	//
	// The reason your deep copy is having problems is because you're ending up with circular object references.
	//
	// < https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript >
	// < https://davidwalsh.name/javascript-clone-array >
	//

	if(_depth !== 0)
	{
		_depth = _depth || 1;
	}
	_currentDepth = _currentDepth || 1;
	_foreign = _foreign === true;

	var result = {};

	for(var idx in this)
	{
		if(! this.hasOwnProperty(idx))
		{
			if(! _foreign)
			{
				continue;
			}
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

/*

Object.prototype.toString = function(_radix, _tag, _foreign)
{
	// TODO /

	return this.toDebug(_radix, _tag, _foreign);
}

*/

/*
Object.prototype.toDebug = function(_radix, _tag, _foreign, _colors)
{
	// TODO / .. anpassen an radix etc. pp..
	
	//ACHTUNG/ "global" nicht im BROWSER mode da!
	var result = global.console.inspect(this, {}, false, (_colors === true));
	return result;
}
*/

Object.prototype.count = function(_foreign = false)
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

