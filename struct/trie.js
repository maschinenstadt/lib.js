class trie extends node
{
	constructor()
	{
		super();
	}
}

if(BROWSER)
{
	web.struct.trie = trie;
}
else
{
	module.exports = trie;
}

