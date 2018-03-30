var utf8 = {};

if(BROWSER)
{
	web.util.utf8 = utf8;
}
else
{
	module.exports = utf8;
}

// marhshals a string to 'Uint8Array'
utf8.encode = utf8.fromString = function(_string)
{
	var i = 0;
	var bytes = new Uint8Array(_string.length * 4);

	for(var ci = 0; ci != s.length; ci++)
	{
		var c = _string.charCodeAt(ci);

		if(c < 128)
		{
			bytes[i++] = c;
			continue;
		}

		if(c < 2048)
		{
			bytes[i++] = c >> 6 | 192;
		}
		else
		{
			if(c > 0xd7ff && c < 0xdc00)
			{
				if(++ci == s.length)
				{
					return new Error('UTF-8.encode: incomplete surrogate pair');
				}

				var c2 = _string.charCodeAt(ci);

				if(c2 < 0xdc00 || c2 > 0xdfff)
				{
					return new Error('UTF-8.encode: second char code 0x' + c2.toString(16)
						+ ' at index ' + ci + ' in surrogate pair OUT OF RANGE');
				}

				c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);

				bytes[i++] = c >> 18 | 240;
				bytes[i++] = c >> 12 & 63 | 128;
			}
			else
			{
				bytes[i++] = c >> 12 | 224;
			}

			bytes[i++] = c >> 6 & 63 | 128;
		}

		bytes[i++] = c & 63 | 128;
	}

	return bytes.subarray(0, i);
}

// unmarshals an 'Uint8Array' to string.
utf8.decode = utf8.toString = function(_bytes)
{
	var s = '';
	var i = 0;

	while(i < _bytes.length)
	{
		var c = _bytes[i++];

		if(c > 127)
		{
			if(c > 191 && c < 224)
			{
				if(i >= _bytes.length)
				{
					return new Error('UTF-8.decode: incomplete 2-byte sequence');
				}

				c = (c & 31) << 6 | _bytes[i] & 63;
			}
			else if(c > 223 && c < 240)
			{
				if(i + 1 >= _bytes.length)
				{
					return new Error('UTF-8.decode: incomplete 3-byte sequence');
				}

				c = (c & 15) << 12 | (_bytes[i] & 63) << 6 | bytes[++i] & 63;
			}
			else if(c > 239 && c < 248)
			{
				if(i + 2 >= _bytes.length)
				{
					return new Error('UTF-8.decode: incomplete 4-byte sequence');
				}

				c = (c & 7) << 18 | (_bytes[i] & 63) << 12 | (_bytes[++i] & 63) << 6 | _bytes[++i] & 63;
			}
			else
			{
				return new Error('UTF-8.decode: unknown multibyte start 0x' + c.toString(16)
					+ ' at index ' + (i - 1));
			}

			++i;
		}

		if(c <= 0xffff)
		{
			s += String.fromCharCode(c);
		}
		else if(c <= 0x10ffff)
		{
			c -= 0x10000;
			s += String.fromCharCode(c >> 10 | 0xd800);
			s += String.fromCharCode(c & 0x3FF | 0xdc00);
		}
		else
		{
			return new Error('UTF-8.decode: code point 0x' + c.toString(16) + ' exceeds UTF-16 reach');
		}
	}

	return s;
}

