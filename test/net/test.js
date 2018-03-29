#!/usr/bin/env node.js

var net = nodejs('net');
var socket = net.Socket;
socket = new socket();

for(var idx in socket)
{
	if(socket.hasOwnProperty(idx))
	{
		console.debug(0, '(OWN)     socket[%s] => (%s)', idx, type(socket[idx]));
	}
	else
	{
		console.debug(0, '(FOREIGN) socket[%s] => (%s)', idx, type(socket[idx]));
	}
}

