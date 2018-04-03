class list extends node
{
	constructor()
	{
		super();
	}
}

if(BROWSER)
{
	web.struct.list = list;
}
else
{
	module.exports = list;
}

