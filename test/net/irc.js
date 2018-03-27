#!/usr/bin/env node.js

const HOST = /*'irc.de.euirc.net' ||*/ 'chat.freenode.net';

var irc = include('net/irc');
console.inspect(irc, 2);
console.EOL(6);

var server = new irc.server();
var client = new irc.client();

client.connect(false, HOST);//, null, 6, '::1', 12345);

var cb = client.callbacks;
var r = cb.unset('timeout');
console.EOL(3);
console.inspect(r);
console.EOL(3);
for(var idx in cb)
{
	if(! cb.hasOwnProperty(idx))
	{
		console.inspect(idx);
		continue;
	}

	cb[idx] = function() { console.log(' >> ' + idx + '(' + arguments.length + ')'); };
}

client.callbacks = cb;

