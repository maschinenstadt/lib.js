var trie = {};

if(BROWSER)
{
	web.struct.trie = trie;
}
else
{
	module.exports = trie;
}

