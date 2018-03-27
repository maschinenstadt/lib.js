#!/usr/bin/env node.js

const file = path.root + '/compress/zlib.js';

const z = include('compress/zlib');
const gzip = z.createGzip();
const input = nodejs('fs').createReadStream(file);
const output = console.stdio[1];

input.pipe(output);
input.pipe(gzip).pipe(output);

