if(BROWSER)
{
	window.RegExp = RegExp;
}
else
{
	module.exports = global.RegExp = RegExp;
}

RegExp.clone = function()
{
	return this.valueOf();
}

