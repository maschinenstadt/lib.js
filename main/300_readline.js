var main = module.exports = include('readline');

// < https://nodejs.org/api/readline.html >

global.readline = function(_input = global.process.stdin, _output = global.process.stdout)
{
	var rl = main.createInterface({
		input: _input,
		output: _output,
		terminal: true,
		prompt: '> '
	});

	//rl.on('close', 
	//rl.on('line', (_input) => { /* */ });
	//rl.on('pause', () => { /* */ });
	//rl.on('resume', () => { /* */ });
	//rl.on('SIGCONT', () => { /* */ });
	//rl.on('SIGINT', () => {
	//	rl.question('Really exit? ', (_answer) => {
	// 		if(_answer.match(/^y(es)?$/i)) rl.pause();
	// 	})
	// });
	//rl.on('SIGTSTP', () => {});
	//
	//rl.close();
	//rl.pause();
	//rl.prompt(_preserveCursor);
	//rl.question(_query, _callback);
	//rl.resume();
	//rl.setPrompt(_prompt);
	//rl.write(_data, _key);

	//
	return ( global.readline = rl );
}

//
console.debug(2, "Loaded 'readline'");

