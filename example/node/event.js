#!/usr/bin/env node.js

node = new node();

node.event.on('log', console.log);
node.event.once('error', console.error);

node.event.emit('log', 'console.log');
node.event.emit('error', 'console.error');

timer.sleep(2000);

node.event.emit('log', 'console.log#2');
node.event.emit('error', 'console.error#2');

