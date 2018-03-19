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

