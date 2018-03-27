#!/usr/bin/env node.js

var node = include('core/node');
node = new node();

node.event.on('log', console.log);
node.event.on('error', console.error);

node.event.emit('log', 'console.log');
node.event.emit('error', 'console.error');

