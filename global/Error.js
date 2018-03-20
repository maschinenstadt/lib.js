//
//    [code]  "MODULE_NOT_FOUND"
//    [name]  "Error"
// [message]  "Cannot find module '(..)'"
//

if(! BROWSER)
{
	module.exports = Error;
}

Object.defineProperty(Error.prototype, 'isError', {
	get: function() { return true; }
});

Error.prototype.clone = function()
{
	return this.valueOf();
}

Error.prototype.throw = function()
{
	throw this;
}

Object.defineProperty(Error.prototype, 'text', {
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

