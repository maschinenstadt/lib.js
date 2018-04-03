class tree extends node
{
	constructor()
	{
		super();
	}
}

if(BROWSER)
{
	web.struct.tree = tree;
}
else
{
	module.exports = tree;
}

