var fuzzy = {};

// < https://glench.github.io/fuzzyset.js/ >

if(BROWSER)
{
	web.util.fuzzy = fuzzy;
}
else
{
	module.exports = fuzzy;
}

fuzzy.levenshtein = function(_source, _target)
{
	// 
	// < https://www.codementor.io/tips/6243778211/javascript-algorithms-levenshtein-s-distance-for-string-conversion >
	// < https://dzone.com/articles/javascript-implementation >
	//
	// < https://gist.github.com/andrei-m/982927 >
	// < https://github.com/hiddentao/fast-levenshtein >
	//
}

