var trie = function()
{
	//
	return this;
}

if(BROWSER)
{
	web.struct.trie = trie;
}
else
{
	module.exports = trie;
}

