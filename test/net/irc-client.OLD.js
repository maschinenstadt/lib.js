#!/usr/bin/env node.js


// this is just a PRE-view. ..
//
// most of events and processes will occur in "net/irc/*".
// this is only for testing reasons - now where i begin..!
//



const HOST = /*'irc.de.euirc.net' ||*/ 'chat.freenode.net';

var irc = include('net/irc');
console.inspect(irc, 2);
console.EOL();

var server = new irc.server();
var client = new irc.client();

var bufferTEMP = '';

client.connect(false, HOST);//, null, 6, '::1', 12345);

var cb = client.callbacks;

cb.data = function(_chunk)
{
	bufferTEMP += _chunk;

	var sizes = ('(' + _chunk.length.toString() + ' / ' + bufferTEMP.length.toString() + ')').pad(20);
	console.log('(%s)\n\n"%s"', sizes, _chunk);
}

client.callbacks = cb;

client.setTimeout(5000);

/*
 * TODO: following will be the task of any protocol @ net/*
 *
timer.set.timeout(function() { client.write('NICK ' + 'a' + String.random.alphabet(16, 8)
	+ '\r\nUSER ' + 'b' + String.random.alphabet(16, 8) + ' ' + 'c' + String.random.alphabet(16, 8)
	+ ' ' + 'd' + String.random.alphabet(16, 8) + ' :' + 'e' + String.random.alphabet(16, 8) + "\r\n"); }, 2000);

timer.set.timeout(function() { client.close(); }, 5000);
*/

