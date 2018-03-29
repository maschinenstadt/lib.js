var size = {};

if(BROWSER)
{
	web = web || {};
	web.util = web.util || {};
	web.util.size = size;
}
else
{
	module.exports = size;
}

size.toString = function(_bytes, _unit)
{
	// so lange über 1000/1024 ..
	// beachte auch unterschied zw. 1000 und 1024! etc.
}

size.toBytes = function(_string, _unit)
{
}

// maybe i want some kind of "matrix" here for this?
// from -> to .. as w/ arrays to specify the wished result..!?
//
// additionally we want to specify the factor.. by (1000) or (1024)!?!
// BUT: think about 'mega' vs. 'mibi' or so.. also possible solution..
//
// THIS IS JUST A FIRST PREVIEW/EXAMPLE..!!!
size.bytesToMegabytes = function(_bytes)
{
	return _bytes / 1000000.0;
}

size.factor = 1024 || 1000;

