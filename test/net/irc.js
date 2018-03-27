#!/usr/bin/env node.js

const HOST = 'chat.freenode.net';

var irc = include('net/irc');
console.inspect(irc, 2);
console.EOL(6);

var server = new irc.server();
var client = new irc.client();

client.connect(false, HOST);//, null, 6, '::1', 12345);

var on = client.callbacks;

for(var idx in on)
{
	if(! on.hasOwnProperty(idx))
	{
		continue;
	}

	on[idx] = function() { console.inspect('on(%s) => (%d)', idx, arguments.length); };
}

