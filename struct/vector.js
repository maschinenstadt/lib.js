class vector extends node
{
	constructor()
	{
		super();
	}
}

if(BROWSER)
{
	web.struct.vector = vector;
}
else
{
	module.exports = vector;
}

