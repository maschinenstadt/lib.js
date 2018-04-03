//
//    [code]  "MODULE_NOT_FOUND"
//    [name]  "Error"
// [message]  "Cannot find module '(..)'"
//

if(BROWSER)
{
	window.Error = Error;
}
else
{
	module.exports = global.Error = Error;
}

Object.defineProperty(Error.prototype, 'clone', {
	configurable: true,
	enumerable: false,
	value: function()
	{
		return this.valueOf();
	}
});

Object.defineProperty(Error.prototype, 'throw', {
	enumerable: false,
	value: function() { throw this; }
});

Object.defineProperty(Error.prototype, 'toString', {
	enumerable: false,
	configurable: true,
	get: function()
	{
		var text = global.EOL + '( Exception / Error )' + global.EOL
			 + '[    .code ]  "' + this.code + '"' + global.EOL
			 + '[    .name ]  "' + this.name + '"' + global.EOL
			 + '[ .message ]  "' + this.message + '"' + global.EOL
			 + global.EOL + this.stack + global.EOL;
		return text;
	}
});

Object.defineProperty(Error.prototype, 'title', {
	enumerable: false,
	get: function()
	{
		return this.name;
	}
});

Object.defineProperty(Error.prototype, 'isError', {
	enumerable: false,
	get: function() { return true; }
})

