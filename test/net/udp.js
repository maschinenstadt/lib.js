#!/usr/bin/env node.js
var udp = include('net/udp');
udp = udp.socket;
udp = new udp(6);
console.inspect(udp, 2);

