if(! BROWSER)
{
	module.exports = Array;
}

Object.defineProperty(Array.prototype, 'last', {
	get: function() { return this[this.length - 1]; },
	set: function(_v) { return this[this.length - 1] = _v; } });
Object.defineProperty(Array.prototype, 'first', {
	get: function() { return this[0]; },
	set: function(_v) { return this[0] = _v; } });

Array.prototype.toCharString = function(_from = 0, _length = this.length - _from)
{
	var result = '';
	//
	//TODO/ fehlen noch NEGATIVE _length ..!!
	//und natürlich ncoh zu testen.. erste version ohne test ist das bloß..
	//
	for(var i = 0, j = _from; i < _length; i++, j = (j+1) % this.length)
	{
		result += String.fromCharCode(this[j]);
	}

	return result;
}

Array.prototype.replaceAt = function(_start = 0, _length = this.length - _start, _value)
{
	//TODO/
}

Array.prototype.insert = function(_index = this.length - 1, _value)
{
	return this.replaceAt(_index, 0, _value);
}

Array.prototype.cut = function(_start = 0, _length = this.length - _start)
{
	return this.replaceAt(_start, _length, '');
}

/*Array.prototype.reverse = function(_from = 0, _length = this.length - _from)
{
	//TODO/ again (see somewhere else in here..):
	//negative _lengths! (in this case here: double reverse => regular ;-)´

	var result = [];

	//TODO/

	return result;
}*/

Array.prototype.rotate = function(_diff = 1)
{
	var result = [];

	//TODO/

	return result;
}

Array.prototype.none = function()
{
	var types = [];

	if(arguments.length === 0)
	{
		return new Error();
	}
	else if(arguments.length === 1)
	{
		if(global.type(arguments[0], 'Array'))
		{
			types = arguments[0];
		}
		else if(global.type(arguments[0], 'String'))
		{
			types = [ arguments[0] ];
		}
		else
		{
			return new Error();
		}
	}
	else
	{
		types = Array.from(arguments);
	}

	for(var i = 0; i < this.length; i++)
	{
		if(global.type(this[i], types))
		{
			return false;
		}
	}

	return true;
}

Array.prototype.only = function()
{
	var types = [];

	if(arguments.length === 0)
	{
		return new Error();
	}
	else if(arguments.length === 1)
	{
		if(global.type(arguments[0], 'Array'))
		{
			types = arguments[0];
		}
		else if(global.type(arguments[0], 'String'))
		{
			types = [ arguments[0] ];
		}
		else
		{
			return new Error();
		}
	}
	else
	{
		types = Array.from(arguments);
	}

	for(var i = 0; i < this.length; i++)
	{
		if(! global.type(this[i], types))
		{
			return false;
		}
	}

	return true;
}

Array.prototype.countValues = function()
{
	if(arguments.length === 0)
	{
		return new Error();
	}

	var values = Array.from(arguments);

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		for(var j = 0; j < values.length; j++)
		{
			if(this[i] === values[j])
			{
				result[result.length] = i;
			}
		}
	}

	return result;
}

Array.prototype.countTypes = function()
{
	var types;

	if(arguments.length === 0)
	{
		return new Error();
	}
	else if(arguments.length === 1)
	{
		if(global.type(arguments[0], 'Array'))
		{
			types = arguments[0];
		}
		else if(global.type(arguments[0], 'String'))
		{
			types = [ arguments[0] ];
		}
		else
		{
			return new Error();
		}
	}
	else
	{
		types = Array.from(arguments);
	}

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		if(global.type(this[i], types))
		{
			result[result.length] = i;
		}
	}

	return result;
}

Array.prototype.apply = function(_function, _context)
{
	if(! global.type(_function, 'Function'))
	{
		return new Error();
	}

	_context = _context || arguments.caller;
	return _function.apply(_context, this);
}

Array.prototype.toFunction = function()
{
	//see Function.from(.array)
}

Array.prototype.removeVoids = function(_removeEmpty)
{
	_removeEmpty = _removeEmpty !== false;

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		if(! global.type(this[i], 'String'))
		{
			continue;
		}

		if(this[i].length === 0)
		{
			if(_removeEmpty)
			{
				continue;
			}
		}

		if(this[i].removeVoids)
		{
			var clean = this[i].removeVoids(_removeEmpty);

			if(clean.length === 0)
			{
				continue;
			}

			result[result.length] = clean;
		}
		else
		{
			if(this[i].trim)
			{
				result[result.length] = this[i].trim();
			}
			else
			{
				result[result.length] = this[i];
			}
		}
	}

	return result;
}

Array.prototype.unsetType = function()
{
	// see "String.prototype..."
}

Array.prototype.unsetTypeInverse = function()
{
	if(arguments.length === 0)
	{
		return this.valueOf();
	}
	else if(global.type(arguments[0], 'Array'))
	{
		arguments = arguments[0];
	}

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		var type = global.type(this[i]);
		var take = false;

		for(var j = 0; j < arguments.length; j++)
		{
			if(arguments[j] === type)
			{
				take = true;
				break;
			}
		}

		if(take)
		{
			result[result.length] = this[i];
		}
	}

	return result;
}

Array.prototype.unset = function()
{
	// String.js
}

Array.prototype.unsetInverse = function()
{
	// String.js
}

Array.prototype.replaceAt = function(_start = 0, _length = this.length - _start, _replace)
{
	//TODO/!
	//btw. _replace just one item .. not multiple (because of regular array items)
	//(whereas string can replace  by bigger substrings ;) - same function, see there.
}

Array.prototype.indexOf = function(_search, _start, _end, _case_sensitive)
{
	if(! _search)
	{
		return undefined;
	}

	_start = this.offset(_start || 0);
	if(_end !== 0)
	{
		_end = this.offset(_end || this.length - 1);
	}
	_case_sensitive = _case_sensitive !== false;

	for(var i = _start; i <= _end; i++)
	{
		if(_case_sensitive)
		{
			if(this[i] === _search)
			{
				return i;
			}
		}
		else
		{
			if(type(this[i], 'String') && type(_search, 'String'))
			{
				if(this[i].toLowerCase() === _search.toLowerCase())
				{
					return i;
				}
			}
			else
			{
				if(this[i] === _search)
				{
					return i;
				}
			}
		}
	}

	return -1;
}

Array.prototype.indexOfAll = function(_search, _start, _end, _case_sensitive)
{
	if(! _search)
	{
		return undefined;
	}

	_start = this.offset(_start || 0);
	if(_end !== 0)
	{
		_end = this.offset(_end || this.length - 1);
	}
	_case_sensitive = _case_sensitive !== false;

	var idx = _start;
	var result = [];

	for(var i = _start; i <= _end; i++)
	{
		var idx = this.indexOf(_search, i, i, _case_sensitive);

		if(idx > -1)
		{
			result[result.length] = idx;
		}
	}

	return result;
}

Array.prototype.indexOfAny = function()
{
	if(arguments.length === 0)
	{
		return undefined;
	}

	var search = [].slice.call(arguments);


	//TODO/ suche nach allen in search .. 
	//TODO/ (a) als eine liste wie indexOfAll()
	//TODO/ (b) als nur ein ergebnis-element ..
}

Array.prototype.indexOfType = function(_types, _start, _end)
{
	if(! _types)
	{
		return undefined;
	}
	else if(! type(_types, 'Array'))
	{
		_types = [ _types ];
	}

	//TODO/ ..
	//!!
}

Array.prototype.removeDuplicates = function()
{
	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		if(result.indexOf(this[i]) === -1)
		{
			result[result.length] = this[i];
		}
	}

	return result;
}

Array.prototype.clone = function(_depth = 1, _currentDepth = 1)
{
	// @ doc/txt/deep-copy.clone.txt
	//
	// The reason your deep copy is having problems is because you're ending up with circular object references.
	//
	// < https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript >
	// < https://davidwalsh.name/javascript-clone-array >
	//

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		var item;

		if(this[i] !== undefined && this[i] !== null && this[i].clone && (_depth === 0 || (_currentDepth < _depth)))
		{
			item = this[i].clone(_depth, _currentDepth + 1);
		}
		else
		{
			item = this[i];
		}

		result[result.length] = item;
	}

	return result;
}

Array.prototype.push = function()
{
	for(var i = 0; i < arguments.length; i++)
	{
		this[this.length] = arguments[i];
	}

	return arguments.length;
}

Array.prototype.pop = function(_amount = 1, _reverse = false, _peek = false)
{
	if(_amount > this.length)
	{
		_amount = this.length;
	}

	var result = [];

	for(var i = 0; i < _amount; i++)
	{
		var idx = this.offset(this.length - 1 - i);
		result[i] = this[idx];
	}

	if(! _peek)
	{
		this.splice(this.length - _amount, _amount);
	}

	if(_reverse)
	{
		return result.reverse();
	}

	if(_amount === 1)
	{
		return result[0];
	}

	return result;
}

Array.prototype.peek = function(_amount = 1, _reverse = false)
{
	return this.pop(_amount, _reverse, true);
}

/*
Array.prototype.removeAt = function(_index, _count, _real)
{
	_real = _real === true;

	if(arguments.length === 0)
	{
		if(_real)
		{
			return this.valueOf();
		}
		else
		{
			return [];
		}
	}
	else if(! type(_index, 'Array'))
	{
		_index = [ _index ];
	}
	else
	{
		_index = _index || 0;
	}

	_index = this.offset(_index || 0);
	_count = (_count || 1);
	
	//
	var result = [];
	
	for(var i = 0; i < _index.length; i++)
	{
		_index[i] = this.offset(_index[i]);
	}

	//
	//TODO/! w/ 'diff' as of splice() ;-)

	//
	return result;
}

Array.prototype.realRemoveAt = function(_index, _count)
{
	return this.removeAt(_index, _count, true);



Array.prototype.remove = function(_index, _amount, _real)
{
	//TODO/ still to be extended...
	
	var result = [];

	if(! _index)
	{
		return result;
	}

	_index = this.offset(_index);
	_amount = _amount || 1;
	_real = _real === true;

	var result;
	var copy = this.valueOf();
	
	if(_real)
	{
		result = this.valueOf();
	}
	else
	{
		result = [];
	}

	for(var i = 0; i < this.length; i++)
	{
		if(i >= _index && i <= (_index+_amount))
		{
			continue;
		}

		result[result.length] = this.index(i);
	}

	return result;
}

Array.prototype.removeReal = function(_index, _amount)
{
	return this.remove(_index, _amount, true);
}
*/

/*
Array.prototype.append = function()
{
	// TODO /
	//
	// im gegensatz zu "Array.prototype.push()" sollte "append()" vielmehr *auflösen*,
	// und zwar rekursiv, schätze ich, wenn man array übergibt oder multiple arguments
	//
	// frage nur, zu was denn die rekursive auflösung führt? oder lieber nur 1 dimens?
}
*/

Array.prototype.glob = function(_glob, _caseSensitive = true, _onlyStrings = false)
{
	// see 'String...glob()'
	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		if(! global.type(this[i], 'String'))
		{
			if(! _onlyStrings)
			{
				result[i] = this[i];
			}

			continue;
		}

		result[i] = this[i].glob(_glob, _caseSensitive);
	}

	return result;
}

Array.prototype.globs = function(_size = 1, _onlyStrings = false)
{
	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		if(! global.type(this[i], 'String'))
		{
			if(! _onlyStrings)
			{
				result[i] = this[i];
			}

			continue;
		}

		result[i] = this[i].globs(_size);
	}

	return result;
}

//TODO/ _radix
Array.prototype.toString = function()
{
	//TODO/..!
	//.. maybe the "outer limit" of every (sub-)array? to extend by multiple arrays..
	//... would be the consequent continuation of my quantum fields w/ radix limits!!
	//
        // überlege hin zur universellen "toString()" anwendung, auch für andere klassen!
        // sowie eine so ähnliche anwendung mit "depth" (in _current_depth & _max_depth)!
        //
	//
	//
	//// neu: evtl. *ist* "_radix" sogar die "depth"-angabe oder so!??!
	//
        // so jedenfalls kann z.b. "Array.prototype.toString.long(_radix)" in dem _radix
        // argument die array-verschachtelungs-ebene angeben .. (um *erstmal nur* <tab>)

	if(this.length === 0)
	{
		return '[]';
	}

	var result = '[ ';

	for(var i = 0; i < this.length; i++)
	{
		result += this[i].toString() + ', ';
	}

	result = result.substr(0, result.length - 2);
	return ( result += ' ]' );
}

/*
Array.prototype.toDebug = function(_radix, _tag)
{
	const padAdd = 4;

	_tag = _tag || "'";
	_radix = _radix || 0;

	var padLen = _radix;
	var rightSpace = padAdd;

	var padStr = String.fill(' ', padLen);
	var spaceStr = String.fill(' ', rightSpace);

	var result = '';

	for(var i = 0; i < this.length; i++)
	{
		result += '[ ' + i.toString().pad(padLen) + ' ]' + spaceStr;

		var t = type(this[i]);
		if(t === 'undefined' || t === 'null')
		{
			result += '(' + t + ')';
			continue;
		}

		result += this[i].toDebug(_radix + padAdd, _tag);
		result += EOL;
	}

	return ( result = result.substr(0, result.length - 1 ) );
}
*/

Array.prototype.prefix = function(_prefix, _maximum, _remove, _filter)
{
	if(arguments.length === 0)
		return this.valueOf();

	if(type(_prefix, 'String'))
		_prefix = [ _prefix ];
	else if(type(_prefix, 'Array'))
		_prefix = _prefix;

	if(_prefix.length === 0)
		return this.valueOf();

	_maximum = ( _maximum === true );
	_filter = ( _filter === true );
	_remove = ( _remove !== false );

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		var one = this[i];
		var original = one;

		for(var j = 0; j < _prefix.length; j++)
		{
			if(one.prefix)
			{
				one = one.prefix(_prefix[j], _maximum, _remove, _filter);
			}
		}

		if(_filter)
		{
			if(one === this[i])
			{
				continue;
			}
		}

		if(! _remove)
		{
			one = original;
		}

		result[result.length] = one;
	}

	return result;
}

Array.prototype.suffix = function(_suffix, _maximum, _remove, _filter)
{
	if(arguments.length === 0)
		return this.valueOf();

	if(type(_suffix, 'String'))
		_suffix = [ _suffix ];
	else if(type(_suffix, 'Array'))
		_suffix = _suffix;

	if(_suffix.length === 0)
		return this.valueOf();

	_maximum = ( _maximum === true );
	_filter = ( _filter === true );
	_remove = ( _remove !== false );

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		var one = this[i];
		var original = one;

		for(var j = 0; j < _suffix.length; j++)
		{
			if(one.prefix)
			{
				one = one.suffix(_suffix[j], _maximum, _remove, _filter);
			}
		}

		if(_filter)
		{
			if(one === this[i])
			{
				continue;
			}
		}

		if(! _remove)
		{
			one = original;
		}

		result[result.length] = one;
	}

	return result;
}

Array.prototype.trim = function(_remove_empty)
{
	_remove_empty = ( _remove_empty !== false );

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		var one = this[i];

		if(! one)
		{
			continue;
		}
		
		if(_remove_empty)
		{
			if(one.length && one.length === 0)
			{
				continue;
			}
		}

		if(one.trim)
		{
			one = one.trim(_remove_empty);
		}

		result[result.length] = one;
	}

	return result;
}

Array.prototype.offset = function(_offset)
{
	_offset = (_offset||0) % this.length;

	while(_offset < 0)
	{
		_offset = this.length + _offset;
	}

	return Math.abs(_offset);
}

Array.prototype.index = function(_offset)	//TODO: _amount arg here? or otherewhere?
{
	return this[this.offset((_offset||0))];
}

Array.prototype.types = function(_types, _inverse = false, _index = false)
{
	if(arguments.length === 0)
	{
		var result = [];

		for(var i = 0; i < this.length; i++)
		{
			result[i] = global.type(this[i]);
		}

		return result;
	}
	else
	{
		if(global.type(_types, 'String'))
		{
			_types = [ _types ];
		}
	}

	var result = [];

	for(var i = 0; i < this.length; i++)
	{
		var ok;

		if(_inverse)
		{
			ok = true;
		}
		else
		{
			ok = false;
		}

		for(var j = 0; j < _types.length; j++)
		{
			if(global.type(this[i], _types[j]))
			{
				if(_inverse)
				{
					ok = false;
				}
				else
				{
					ok = true;
				}

				break;
			}
		}

		if(ok)
		{
			if(_index)
			{
				result[result.length] = i;
			}
			else
			{
				result[result.length] = this[i];
			}
		}
	}

	return result;
}

Array.prototype.get = function(_from = 0, _length = (_from < 0 ? Math.abs(_from) : this.length - _from), _radix = 1)
{
	if(! global.type(_from, 'Number'))
	{
		_from = 0;
	}

	if(_from < 0)
	{
		_from = (this.length + _from) % this.length;
	}

	if(! global.type(_length, 'Number'))
	{
		if(_from < 0)
		{
			_length = Math.abs(_from);
		}
		else
		{
			_length = this.length - _from;
		}
	}

	if(global.type(_radix, 'Number'))
	{
		if(_radix === 0)
		{
			_radix = 1;
		}
	}
	else
	{
		_radix = 1;
	}

	var result = [];

	var reverse = ( _length < 0 ? true : false );
	_length = Math.abs(_length);

	for(var i = 0, j = _from; i < _length; i++)
	{
		result[i] = this[j];

		j += ( reverse ? -_radix : _radix );
		j = j % this.length;
		j = ( j < 0 ? this.length + j : j );
	}

	return result;
}

Array.prototype.set = function(_index = 0, _value)
{
	//TODO/
}

