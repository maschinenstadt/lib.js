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
	get: function() { return true; } });

Error.prototype.clone = function()
{
	return this.valueOf();
}

Error.prototype.throw = function()
{
	throw this;
}

Error.prototype.toString = function()
{
	return    '[' + ('.name').pad(-10) + ']  ' + this.name.pad(40) + global.EOL
		+ '[' + ('.code').pad(-10) + ']  ' + this.code.pad(40) + global.EOL
		+ '[' + ('.message').pad(-10) + ']  ' + this.message.pad(40) + global.EOL;
}

