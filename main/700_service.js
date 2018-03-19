#!/usr/bin/env node.js
var main = module.exports = {};

var service = main.service = global.service = {};

try
{
	// maybe even older ..
	global.file.remove(global.path.root + '/.zahl', true);
	global.file.remove(global.path.root + '/.ZAHL', true);
	global.file.remove(global.path.root + '/.live', true);
	global.file.remove(global.path.root + '/.LIVE', true);
	global.file.remove(global.path.root + '/.service', true);
	//
	global.file.remove(global.path.maschinenstadt + '/version', true);
	global.file.remove(global.path.maschinenstadt + '/service', true);

	//
	global.file.mkdir(global.path.maschinenstadt);
	//global.file.mkdir(global.path.version);
	//global.file.mkdir(global.path.service);
	//global.file.mkdir(global.path.library);
}
catch(_error)
{
	//
}




	// ( IP )
//
	// uuid
	// settings.account
//
	// process.version
	// global.hostname
	// global.uptime
	// global.load
	// global.cpu
	// global.eth
	// global.user()
	// global.memory
	// global.os
	// global.nodejs.os.endianness()
//
//
//	indem ich die eingehende ip-adresse vergleiche, ob sie in "global.eth" beim user
//	verfügbar ist, weiß ich, ob er hinter router sitzt oder direkte verbindung hat..
//
//	.. also ob er z.b. ein echter server im netz ist oder nur ein endkunde.. ;-)´ ..
//
// ...
// (TODO). ..


const HOST = 'service.kekse.biz';
const PORT = 8080;
//const PATH = '/';

/* this is ...
 *
 * 	(a) collecting (anonymous) data for statistics, graphs, .. etc. pp.
 *
 * 	(b) soon using my own (server) database for automatical version updates. ..
 *
 * 	(c) counting used functions etc. .. neural network w/ vector space and time etc. ...
 *
 * 	(d) dyndns and other hosting services ...
 *
 * 	(e) etc. .. pp. ...
 */



//









console.debug(2, "Loaded 'service'");













/*
 *
return;



const URL = 'https://nodejs.org/dist/latest/';



const https = require('https');

https.get(URL, (_response) => {

	_response.setEncoding(global.settings.encoding);

	var data = '';

	// chunk has been received
	_response.on('data', (_chunk) => {
		data += _chunk;
	});

	// whole response has been received.
	_response.on('end', () => {
		ready(data);
	});

}).on('error', (_error) => {
	error(_error);
});





return;


const http = require('http');

//
var queryString = '?format=application/json';
var data = json;

//
var options = {
	protocol: 'http:',
	hostname: HOST,
	port: PORT,
	path: PATH + queryString,
	method: 'POST',
	timeout: 5000,
	headers:
	{
	}
};

//
var buffer = '';
var length = 0;

var on = {};

on.data = function(_chunk)
{
	buffer += _chunk;
	length += _chunk.length;
}

on.end = function()
{
	var result = fromJSON(buffer);

	buffer = '';
	length = 0;

	console.inspect(result);
}

on.response = function(_response)
{
	_response.setEncoding(settings.encoding);

	console.debug('(%d)', _response.statusCode);
	console.inspect(_response.headers);

	_response.on('data', on.data);
	_response.on('end', on.end);
};

var request = http.request(options, on.response);

request.end(data);

*/

