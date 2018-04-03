var tree = function()
{
	//
	return this;
}

if(BROWSER)
{
	web.struct.tree = tree;
}
else
{
	module.exports = tree;
}

