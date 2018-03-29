var base = {};

if(BROWSER)
{
	web = web || {};
	web.util = web.util || {};
	web.util.base = base;
}
else
{
	module.exports = base;
}

// < https://de.wikipedia.org/wiki/Base32 >
// < https://de.wikipedia.org/wiki/Base64 >

base.base32 = {};
base.base32hex = {};
base.base64 = {};

