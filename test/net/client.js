#!/usr/bin/env node.js

var tcp = include('net/tcp');

var server = new tcp.server();
server.start(12345, '127.0.0.1');

