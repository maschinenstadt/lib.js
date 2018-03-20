#!/usr/bin/env node.js

var path = '/opt/node.js';

var res = file.find(path, 0);
console.inspect(res.length);
file.write('./all.txt', console.inspect(res, 0, {}, false, false));

process.exit(111);

var directories = file.find.directory(path, 0);
var files = file.find.file(path, 0);
var symlinks = file.find.symlink(path, 0);
var reste = file.find(path, 0, ['directory','file','symlink'], '*', true,true);

console.debug(0, '[directory] (%d)\n[file] (%d)\n[symlink] (%d)\n[rest] (%d)\n\n\n\n',
	directories.length, files.length, symlinks.length, reste.length);

var d = console.inspect(directories, 0, {}, null, false);
var f = console.inspect(files, 0, {}, null, false);
var s = console.inspect(symlinks, 0, {}, null, false);
var r = console.inspect(reste, 0, {}, null, false);

file.write('./directories.txt', d);
file.write('./files.txt', f);
file.write('./symlinks.txt', s);
file.write('./reste.txt', r);

