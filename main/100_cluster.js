// < http://www.codingdefined.com/2014/07/use-of-cluster-in-nodejs.html >
// < https://nodejs.org/dist/latest-v9.x/docs/api/cluster.html >

var main = module.exports = {};

include('cluster');

main.createCluster = function(_threads = global.cpu.length)
{
	return new cluster(_threads);
}

main.cluster = class cluster //extends node
{
	constructor(_threads = global.cpu.length)
	{
		//super(); // removed 'extends node' (temporarily? wasn't found...)

		this.threads = _threads;
		this.create();
	}

	static cluster()
	{
		return global.nodejs('cluster');
	}

	static isMaster()
	{
		this.cluster.isMaster;
	}

	static isWorker()
	{
		this.cluster.isWorker;
	}

	create()
	{
		if(cluster.isMaster)
		{
			for(var i = 0; i < this.threads; i++)
			{
				cluster.cluster.fork();
			}
		}
		else
		{
			// TODO /
			// the code(s) itself ...
			//
			// .. how to manage my whole process with everything additional code?!?
			// MAYBE .. (IP-)IPC or so? using 'core/STREAM' to communicate and/or SYNC;
			//
			// NOTE: Some time ago I also wanted a special MASTER w/ server and own process protocol (etc)..
			//

			//
			// http.createServer((_request, _response) => {
			// 	_response.writeHead(200);
			// 	_response.end('Hello World!\n');
			// }).listen(8080);
		}

		var self = this;

		cluster.cluster.on('exit', function(_worker, _code, _signal) {
			cluster.onExit(self, _worker, _code, _signal); });
	}

	static onExit(_cluster, _worker, _code, _signal)
	{
		console.debug('cluster.onExit(%d) Worker w/ PID (%d) DIED', arguments.length, _worker.process.pid);

		//TODO/ should i re-fork() as long as all cpu cores are busy? ...
		//.. BUT: handle this exit() .. je nachdem diverse funktionalität auszuführen, eh? ;-)´
	}
}

console.debug(2, "Loaded 'cluster'");

