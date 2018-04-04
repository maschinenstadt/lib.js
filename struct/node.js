var node = function()
{
	//
	return this;
}

if(BROWSER)
{
	web.struct.node = node;
}
else
{
	module.exports = node;
}

