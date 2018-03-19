if(! BROWSER)
{
	module.exports = Symbol;
}

Symbol.prototype.clone = function()
{
	return this.valueOf();
}

//Symbol..
