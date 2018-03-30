var base = {};

// < https://de.wikipedia.org/wiki/Base32 >
// < https://de.wikipedia.org/wiki/Base64 >

if(BROWSER)
{
	web.util.base = base;

	if(not(window.atob) || not(window.btoa))
	{
		var err = new Error('"window.(atob|btoa)()" missing in your browser!! :-(´');
		throw err;
		return err;
	}

	base.atob = window.atob;
	base.btoa = window.btoa;

	// let's begin with "base64", just for now. ..
	base.from64 = function(_string)
	{
		return base.atob(_string);
	}

	base.from64hex = base.from64.hex = function(_string)
	{
		// brings das? nicht-existentens "base64hex" evetl..
	}

	base.to64 = function(_string)
	{
		return base.btoa(_string);
	}

	base.to64hex = base.to64.hex = function(_string)
	{
		//want it?
	}

	base.from32 = function(_string)
	{
		//TODO/
	}

	base.from32hex = base.from32.hex = function(_string)
	{
		//does also "base64hex" exist? no?? or yes!??
		//i could do my own version.. right? *g* (brings das denn???)
	}

	base.to32 = function(_string)
	{
		//btw. .. what about ...
		//
		//	base.to64(base.to32("string"));
		//	base.to32(base.to64("string"));
		// or even ...
		// 	base.to64(base.from32(..));
		// 	base.from32(base.to64(..));
		// etc.!? lol.. lil things.. just wanna have phun.
	}

	base.to32hex = base.to32.hex = function(_string)
	{
	}
}
else
{
	module.exports = base;
}

