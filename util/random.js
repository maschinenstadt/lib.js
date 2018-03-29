var random = {};

random.length = 1024;

//TODO/ also in BROWSER!???
random.encoding = [ 'binary', 'hex', 'base64' ];

//ONLY LINUX NOW.. TODO (windows etc)!!
random.file = '/dev/urandom';

if(BROWSER)
{
	random.random = function(_length = random.length, _encoding = random.encoding[0])
	{
		if(! type(_length, 'Number'))
		{
			_length = random.length;
		}
		if(! type(_encoding, 'String'))
		{
			_encoding = random.encoding[0];
		}

		var result = '';

		switch(_encoding)
		{
			case 'hex':
				break;
			case 'base64':
				break;
			case 'binary':
			default:
				break;
		}

		if(result.length > _length)
		{
			result = result.substr(0, _length);
		}

		return result;
	}

	random.binary = function(_length = random.length)
	{
		return random.random(_length, 'binary');
	}

	random.hex = function(_length = random.length)
	{
		return random.random(_length, 'hex');
	}

	random.base64 = function(_length = random.length)
	{
		return random.random(_length, 'base64');
	}

	// browser impl. ..
	web.util.random = random;
}
else
{
	random.random = function(_length = random.length, _encoding = random.encoding[0])
	{
		if(! global.type(_length, 'Number'))
		{
			_length = random.length;
		}
		if(! global.type(_encoding, 'String'))
		{
			_encoding = random.encoding[0];
		}

		// Don't forget to shorten/pad result, by _encoding (producing various lengths)
		var result = '';

		switch(_encoding)
		{
			case 'hex':
				result = global.file.readBytes.hex(random.file, _length);
				break;
			case 'base64':
				result = global.file.readBytes.base64(random.file, _length);
				break;
			case 'binary':
			default:
				result = global.file.readBytes.binary(random.file, _length);
		}

/*		if(result.length > _length)
		{
			result = result.substr(0, _length);
		}
*/
		return result;
	}

	random.binary = function(_length = random.length)
	{
		return random.random(_length, 'binary');
	}

	random.hex = function(_length = random.length)
	{
		return random.random(_length, 'hex');
	}

	random.base64 = function(_length = random.length)
	{
		return random.random(_length, 'base64');
	}

	// linux impl.
	// //TODO/ windows!?!?
	module.exports = random;
}

