

function test()
{
	var poly = arguments.map(
		'first, second',
		'String   uno,  String due,     Boolean  tres',
		'   String|Number one,  , String|Number two,  ,, Number three, Number four ',
		'String|Number eins, String|Number zwei, Number drei, Number vier, Boolean fuenf'
	);

	return poly;
}

console.inspect(test('eins', 'zwei', 3.4, 4.6, true));
console.inspect(test(1.1, 2.2, 3.4, 4.6));
console.inspect(test('eins', 'zwei', false));

//

