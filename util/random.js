var random = {};

random.length = 1024;

//TODO/ also in BROWSER!???
random.encoding = [ 'binary', 'hex', 'base64', 'boolean', 'bits', 'decimal' ];

if(BROWSER)
{
	random.crypto = window.crypto || window.msCrypto;

	random.random = function(_length = random.length, _encoding = random.encoding[0])
	{
		if(not(random.crypto))
		{
			//TODO??/ if window.message doesn't exist.. what else, altert??
			//
			//NOW: using "return _error". better for now.. (check if worx in browser, maybe @ onload-catch?
			//
			//.. or should i GLOBALLY use the WEB.CONSOLE(S)!?!?!!?
			//
			var errMessage = '"crypto" not available (in your browser)!!';
			return new Error(errMessage);
		}

		if(! type(_length, 'Number'))
		{
			_length = random.length;
		}

		var encType = type(_encoding);

		if(encType === 'Number')
		{
			if(_encoding < 2 || _encoding > 36)
			{
				_encoding = random.encoding[0];
				encType = 'String';
			}
		}
		else if(encType !== 'String')
		{
			_encoding = random.encoding[0];
		}

		var result = '';
		var iterations = 0;

		while(result.length < _length)
		{
			iterations++;

			var str = '';
			var buffer = new Uint8Array(_length);

			crypto.getRandomValues(buffer);

			for(var i = 0; i < buffer.length; i++)
			{
				if(encType === 'Number')
				{
					// various systems (default js)
					str += buffer[i].toString(_encoding);
				}
				else if(encType === 'String')
				{
					// my own '_encoding's
					switch(_encoding)
					{
						case 'hex':
							str += buffer[i].toString(16);
							break;
						case 'base64':
						case 'binary':
							str += String.fromCharCode(buffer[i]);
					}
				}
			}

			if(_encoding === 'base64')
			{
				str = window.btoa(str);
			}

			result += str;
		}

		if(iterations !== 1)
		{
			var errMessage = '"util/random": random() iterations not equal (1)! CHECK THIS!';
			return new Error(errMessage); // or throw!?? must be catch'ed .. maybe @ window.onload..
		}

		result = result.substr(0, _length);

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
	/*
	 * THIS IS *LINUX* ONLY (using '/dev/urandom')!!!
	 *
	 * TODO is the implementation for WINDOWS etc. .. i think about using node.js' "crypto" module (getBytes() or so)!!
	 * determine os and think further..! ;-)´
	 * (also if it's really good to use /dev/urandom ... instead of node.js' "crypto" module? or use it globally, also for LINUX??!?
	 *
	 */
	random.crypto = '/dev/urandom';

	//TODO/ maybe also radix >=2 && <= 36? see BROWSER impl..
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

		// this 'while' is just to be sure... regularily it should work in once (see the "iterations" number variable..)
		var iterations = 0
		while(result.length < _length)
		{
			iterations++;

			switch(_encoding)
			{
				case 'hex':
					result += global.file.readBytes.hex(random.crypto, _length);
					break;
				case 'base64':
					result += global.file.readBytes.base64(random.crypto, _length);
					break;
				case 'binary':
				default:
					result += global.file.readBytes.binary(random.crypto, _length);
			}
		}

		if(iterations !== 1)
		{
			console.warning('"util/random": random() iterations not equal (1)! CHECK THIS!');
		}

		// SHOULD REGULARILY ALSO result in wished _length .. see "global.file.readBytes()" ;-)´
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

	module.exports = random;
}

