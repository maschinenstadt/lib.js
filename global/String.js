if(BROWSER)
{
	window.String = String;
}
else
{
	module.exports = global.String = String;
}

Object.defineProperty(String.prototype, 'last', {
	get: function() { return this[this.length - 1]; },
	set: function(_v) { return this[this.length - 1] = _v; } });
Object.defineProperty(String.prototype, 'first', {
	get: function() { return this[0]; },
	set: function(_v) { return this[0] = _v; } });

// QUESTION: _length -> wiederholungen ab 0 oder wie substr(len) abschneiden!?
// selbiges bei "toArray()" ..
String.prototype.toCharCodes = function(_from = 0, _length = this.length - _from)
{
	var result = [];

	for(var i = _from, j = 0; j < _length; j++)
	{
		i = this.offset(i);

		result[j] = this.charCodeAt(i);

		if(_length < 0)
		{
			i--;
		}
		else
		{
			i++;
		}
	}

	return result;
}

String.prototype.toArray = function(_charCodes = false, _from = 0, _length = this.length - _from)
{
	if(_charCodes)
	{
		return this.toCharCodes(_from, _length);
	}

	var result = [];

	for(var i = _from, j = 0; j < _length; j++)
	{
		i = this.offset(i);

		result[j] = this[i];

		if(_length < 0)
		{
			i--;
		}
		else
		{
			i++;
		}
	}

	return result;
}

String.prototype.rotate = function(_diff = 1)
{
	var result = '';

	//
	
	return result;
}

String.prototype.rotateValues = function(_diff = 13)
{
	var result = '';
	
	//

	return result;
}

String.prototype.capitalize = function(_all = true, _char = ' ')
{
	var result = '';

	//
	
	return result;
}

String.prototype.reverse = function()
{
	var result = '';

	for(var i = this.length - 1; i >= 0; i--)
	{
		result += this[i];
	}

	return result;
}

String.prototype.count = function(_search = '', _caseSensitive = true)
{
	//see also in global.file..

	if(_search.length === 0)
	{
		return this.length;
	}

	if(global.type(_search, 'String'))
	{
		_search = [ _search ];
	}
	else if(global.type(_search, 'Number'))
	{
		_search = [ String.fromCharCode(_search) ];
	}

	for(var i = 0; i < _search.length; i++)
	{
		if(global.type(_search[i], 'Number'))
		{
			_search[i] = String.fromCharCode(_search[i]);
		}

		if(! _caseSensitive)
		{
			_search[i] = _search[i].toLowerCase();
		}
	}

	var self;

	if(_caseSensitive)
	{
		self = this.valueOf();
	}
	else
	{
		self = this.valueOf().toLowerCase();
	}

	var result = 0;

	for(var i = 0; i < _search.length; i++)
	{
		var pos = -1;

		//and what about just ".split(_delim)"?? nope/yes?!?
		//
		do
		{
			pos = self.indexOf(_search[i], pos + 1);

			if(pos === -1)
			{
				break;
			}
			else
			{
				result++;
			}
		}
		while(true);
	}

	return result;
}

String.prototype.bytes = function()
{
	return this.length;
}

String.prototype.bits = function()
{
	return this.length * 8;
}

String.prototype.lines = function(_delim = global.EOL)
{
	return this.count(_delim);
}

String.prototype.words = function(_delim = [32, global.EOL])
{
	return this.count(_delim) + 1;
}

String.prototype.hasFunction = function()
{
	//if the string "contains"(..) "function" or so? to look at....
}

String.prototype.toFunction = function()
{
	//see 'Function.from(.string);
}

String.prototype.removeVoids = function()
{
	var result = this.valueOf();

	while(result.indexOf('\t') > -1 || result.indexOf('  ') > -1)
	{
		result = result.split('\t').join(' ');
		result = result.split('  ').join(' ');
	}

	return ( result = result.trim() );
}

//
String.prototype.replaceAt = function(_start = 0, _length = this.length - _start, _value)
{
	//TODO/
	//(see also "insert()" and "cut()" ;)-
}

String.prototype.insert = function(_index = this.length - 1, _value)
{
	return this.replaceAt(_index, 0, _value);
}

String.prototype.cut = function(_start = 0, _length = this.length - _start)
{
	return this.replaceAt(_start, _length, '');
}

String.prototype.upperCaseAt = function(_index)
{
	if(arguments.length === 0)
	{
		return this.valueOf();
	}
	else if(arguments.length > 1)
	{
		_index = [].slice.call(arguments);
	}
	else if(! type(_index, 'Array'))
	{
		_index = [ _index ];
	}

	//TODO/
}

String.prototype.lowerCaseAt = function(_index)
{
	if(arguments.length === 0)
	{
		return this.valueOf();
	}
	else if(arguments.length > 1)
	{
		_index = [].slice.call(arguments);
	}
	else if(! type(_index, 'Array'))
	{
		_index = [ _index ];
	}

	//TODO/
}

//var _startsWith = String.prototype.startsWith;
//var _endsWith = String.prototype.endsWith;
/*
 * TODO: maybe 'prefix()' and 'suffix()' are enought [to extend those both?]?!?
 *
 * String.prototype.startsWith = function(_string, _position, _case_sensitive)
{
	//same as w/ 'endsWith()'
	//
	//we return one of the [_string]-array, this which could be found.
	//if none found, we return an empty string
	//
	//jedenffalls i wished this func to extend the regular func by multiple strings to find!
}

String.prototype.endsWith = function(_string, _position, _case_sensitive)
{
	// see 'startsWith()'
}
*/

/*
 * TODO: momentan falsch! ich suche wie im array, aber das hier ist ein string! TODO!
 *
 *
 * String.prototype.indexOf = function(_search, _start, _end, _case_sensitive)
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

String.prototype.indexOfAll = function(_search, _start, _end, _case_sensitive)
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
*/

String.prototype.glob = function(_glob, _caseSensitive = true)
{
	// using 'Array' to produce pattern match logics .. ;-)
	//
	// similar '(s)scanf()' .. the '*' or '**' matches will be stored in an array,
	// which will be in the order of _glob string containing that strings the glob
	// '*'-ed ..
	//
	// we use '*' AND '**' .. one w/ "indexOf()", the other w/ "lastIndexOf()" for
	// maximum amount of characters, means it will try to catch chars till the end
	// of the strings - if in between one first and one last needle are others, we
	// will take them into a single sub-string-result .. know what i mean?

	var result = [];

	//
	
	//
	return result;
}

String.prototype.globs = function(_size = 1)
{
	_size = _size % this.length;

	var result = '';

	for(var i = 0; i < this.length; i += _size)
	{
		result += '*';

		for(var j = 0; j < _size; j++)
		{
			if(i + j >= this.length)
			{
				break;
			}

			var now = this[i+j];

			/* needed? not HERE, right? but where, if!??
			if(now === '*')
			{
				now = '\\*';
			}*/

			result += now;
		}
	}

	return result += '*';
}

String.alphabet = {};

String.alphabet[1] = '0';
String.alphabet[2] = '01';
String.alphabet[3] = '012';
String.alphabet[4] = '0123';
String.alphabet[5] = '01234';
String.alphabet[6] = '012345';
String.alphabet[7] = '0123456';
String.alphabet[8] = '01234567';
String.alphabet[9] = '012345678';
String.alphabet[10] = '0123456789';
String.alphabet[11] = '0123456789a';
String.alphabet[12] = '0123456789ab';
String.alphabet[13] = '0123456789abc';
String.alphabet[14] = '0123456789abcd';
String.alphabet[15] = '0123456789abcde';
String.alphabet[16] = '0123456789abcdef';
//
String.alphabet[26] = 'abcdefghijklmnopqrstuvwxyz';
//
String.alphabet[36] = '0123456789abcdefghijklmnopqrstuvwxyz';
//
String.alphabet[52] = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//
String.alphabet[62] = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// WICHTIG TODO /
// w/ _radix, ..
Object.defineProperty(String.prototype, 'toString', {
	enumerable: false,
	configurable: true,
	value: function(_quotationMarks = '"')
	{
		if(global.type(_quotationMarks, 'Boolean'))
		{
			if(_quotationMarks)
			{
				_quotationsMarks = '"';
			}
		}
		else if(! global.type(_quotationMarks, 'String'))
		{
			_quotationMarks = '"';
		}

		if(_quotationMarks)
		{
			return _quotationMarks + this.valueOf() + _quotationMarks;
		}

		return this.valueOf();
	}
});

/*String.prototype.toDebug = function(_radix, _tag)
{
	return this.toString(_radix, _tag);
	//
	_radix = _radix || 0;
	_tag = _tag || '';
}*/

String.prototype.toText = function(_width, _startPos)
{
	if(_width)
	{
		if(_width !== 0)
		{
			_width = _width;
		}
	}
	else
	{
		if(BROWSER)
		{
			_width = 80;
		}
		else
		{
			_width = global.console.size.width();
		}
	}

	//TODO/
	//
	//siehe "doc/txt/console.input-output.txt"
	//

	return result;
}

String.prototype.toTable = function()
{
	//(siehe obiges "String.prototype.toText()"??!)
}

String.prototype.pad = function(_len = this.length, _str = '')
{
	if(_len === 0) return '';
	_str = _str || ' ';

	var abs = Math.abs(_len);
	var result = this.valueOf();

	if(this.length === abs)
		return result;

	while(result.length < abs)
	{
		if(_len < 0)
		{
			result = _str + result;
		}
		else
		{
			result += _str;
		}
	}

	if(result.length > abs)
	{
		if(_len < 0)
		{
			result = result.substr(result.length - abs);
		}
		else
		{
			result = result.substr(0, abs);
		}
	}

	return result;
}

String.prototype.padLeft = function(_len = this.length, _str = '')
{
	return this.pad(0 - _len, _str);
}

String.prototype.padRight = function(_len = this.length, _str = '')
{
	return this.pad(_len, _str);
}

String.fill = function(_padStr = String.fill.padStr, _width = _padStr.length, _prefix = '', _suffix = '')
{
	var result = _prefix;
	var end_for_suffix = _width - _suffix.length;

	for(var i = result.length, j = 0; i < end_for_suffix; i++, j = (j+1) % _padStr.length)
	{
		result += _padStr[j];
	}

	return (result += _suffix);
}

String.fill.padStr = '-';

String.prototype.prefix = function(_prefix, _maximum, _remove, _filter)
{
	if(arguments.length === 0)
	{
		return this.valueOf();
	}

	if(arguments.length >= 1)
	{
		if(type(_prefix, 'String'))
		{
			_prefix = [ _prefix ];
		}
	}

	if((! _prefix) || arguments.length === 0 || _prefix.length === 0)
	{
		return this.valueOf();
	}

	_maximum = _maximum === true;

	var result = this.valueOf();

	for(var i = 0; i < _prefix.length; i++)
	{
		while(result.startsWith(_prefix[i]))
		{
			result = result.substr(_prefix[i].length);

			if(! _maximum)
			{
				break;
			}
		}
	}

	return result;
}

String.prototype.suffix = function(_suffix, _maximum, _remove, _filter)
{
	if(arguments.length === 0)
	{
		return this.valueOf();
	}

	if(arguments.length >= 1)
	{
		if(type(_suffix, 'String'))
		{
			_suffix = [ _suffix ];
		}
	}
	
	if((! _suffix) || arguments.length === 0 || _suffix.length === 0)
	{
		return this.valueOf();
	}

	_maximum = _maximum === true;

	var result = this.valueOf();

	for(var i = 0; i < _suffix.length; i++)
	{
		while(result.endsWith(_suffix[i]))
		{
			result = result.substr(0, (result.length - _suffix[i].length));

			if(! _maximum)
			{
				break;
			}
		}
	}

	return result;
}

String.prototype.sum = function(_modulo, _init_value)
{
	_modulo = _modulo || undefined;
	var result = _init_value || 0;

	for(var i = 0; i < this.length; i++)
		result += this.charCodeAt(i);

	if(_modulo)
		return ( result % _modulo );
	return result;
}

String.prototype.hash = function(_radix = 16, _length = 16)
{
	//TODO/
}

//PROBLEM/ should be a module under "crypto/" ..?!
String.prototype.hash.sha3 = function(_bits)
{
	var defaultBits = 256;

	switch(_bits)
	{
		case 224:
			break;
		case 256:
			break;
		case 384:
			break;
		case 512:
			break;
		default:
			_bits = defaultBits;
			break;
	}

	var result = '';

	//TODO/
	//

	return result;
}

String.random = function(_length = 1, _max = 255, _min = 0)
{
	var result = '';

	for(var i = 0; i < _length; i++)
		result += String.fromCharCode(
			Math.floor(
				Math.random()
				* (_max - _min + 1)
			) + _min
		);
	
	return result;
}

String.random.alphabet = function(_radix = 16, _length = 16, _upperCase = false)
{
	var characters = String.alphabet[_radix];
	if(_upperCase)
	{
		characters = characters.toUpperCase();
	}
	characters = characters.split('');

	var result = '';

	for(var i = 0; i < _length; i++)
	{
		result += characters[Math.floor(Math.random() * characters.length)];
	}

	return result;

}

String.prototype.replaceAll = function(_from, _to, _repeat = true)
{
	if(! (type(_from, 'String') && type(_to, 'String')))
	{
		return null;
	}

	var idx;
	var result = this.valueOf();

	do
	{
		result = result.split(_from).join(_to);

		if(_repeat)
		{
			idx = result.indexOf(_from);
		}
		else
		{
			idx = -1;
		}
	}
	while(idx > -1);

	return result;
}

/*
var _trim = String.prototype.trim;

String.prototype.trim = function(_full)
{
	// (1) mehrere leerzeichen anfang/ende durch reguläre "trim()"-funktion entfernen schonmal
	var result = _trim.call(this, this.valueOf());

	// (2) "".EOL() -> je nach os das richtige eol-/nl-zeichen ..
	result = result.EOL();

	// (3) something UNTER ANDEREM 4 quellcode(s).. mal sehen.
	if(_full = _full === true)
	{
		while(result.indexOf('\t') > -1
			|| result.indexOf(String.EOL+String.EOL) > -1
			|| result.indexOf('  ') > -1
		) {
			result = result.split(String.EOL+String.EOL).join(String.EOL);
			result = result.split('\t').join(' ');
			result = result.split('  ').join(' ');
		}
	}

	//
	return result;
}

String.prototype.clean = function()
{
	var result = this.valueOf().trim(true);
	//
	return result;
}

String.prototype.secure = function()
{
	var result = this.valueOf()
		.split('[').join('')
		.split(']').join('')
		.split('(').join('')
		.split(')').join('')
		.split('<').join('')
		.split('>').join('')
		.split('{').join('')
		.split('}').join('')
		//.split('$').join('')	// really? here!??
		//.split('=').join('')	// ...
		//.split('"').join('')
		//.split("'").join('')
		//.split('&').join('')
		.split('/').join('')	// wichtig wg. path-manipulation..
	;
	return result;

}
*/
/*
String.prototype.filter = function(_max, _min)
{
	var result = '';
	var self = this.valueOf();

	for(var i = 0; i < this.length; i++)
	{
		var code = this.charCodeAt(i);
		if(code >= _min && code <= _max)
			result += self[i];
	}

	return result;
}

String.prototype.count = function()
{
	var args = [].slice.call(this, arguments);
	var result = {};

	for(var i = 0; i < args.length; i++)
	{
		result[args[i]] = 0;

		for(var j = 0; j < this.length; j++)
		{
			if(this[i].substr(j, args[i].length) === args[i])
				result[args[i]]++;
		}
	}

	return result;
}

var str = "a b  cde abc  ab a";
var c = str.count('a', 'b', 'c', 'd', 'e', ' ');

console.log(c.toString());
*/


/*
String.prototype.get = function()
{
}

String.prototype.set = function()
{
}
*/

/*
 * %d	integer
 * %f	float
 * %s	string
 * %S	string of line
 * %x	hex
 * %o	octal
 */

String.sprintf = function()
{
	//TODO/
	//
	// < https://github.com/Lellansin/node-scanf >
	// < https://github.com/ChauMing/nodejs-scanf >
	//
	// .. just two examples... i'll better do this on my own (better idea(s) for it)
}

String.prototype.sscanf = function()
{
	//TODO/
	//
	// < https://github.com/Lellansin/node-scanf >
	// < https://github.com/ChauMing/nodejs-scanf >
	//
	// .. just two examples... i'll better do this on my own (better idea(s) for it)
}

String.prototype.pattern = function(_format)
{
	var result = ( [] || {} ); //!???
	// (nearly..) "BNF"!??? ... i don't want regexp, here, am i right?
	// //TODO//
}

Object.defineProperty(String.prototype, 'clone', {
	enumerable: false,
	value: function()
	{
		return this.valueOf();
	}
});

Object.defineProperty(String.prototype, 'offset', {
	enumerable: false,
	value: function(_offset = this.length - 1)
	{
		//TODO/ *TESTEN*!!!

		if(! global.type(_offset, 'Number'))
		{
			_offset = this.length - 1;
		}

		_offset = _offset % this.length;

		if(_offset < 0)
		{
			_offset = 0 - _offset;
		}

		return _offset;
	}
});

