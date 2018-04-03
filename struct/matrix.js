class matrix extends node
{
	constructor()
	{
		super();
	}
}

if(BROWSER)
{
	web.struct.matrix = matrix;
}
else
{
	module.exports = matrix;
}

