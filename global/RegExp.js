if(BROWSER)
{
	window.RegExp = RegExp;
}
else
{
	module.exports = global.RegExp = RegExp;
}

Object.defineProperty(RegExp.prototype, 'clone', {
	enumerable: false,
	configurable: true,
	value: function()
	{
		return this.valueOf();
	}
});

Object.defineProperty(RegExp.prototype, 'toString', {
	enumerable: false,
	configurable: true,
	value: function()
	{
		//TODO/
	}
});

