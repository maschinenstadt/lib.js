const sock = include('net').Socket;
const node = include('core/node');

module.exports = class socket extends node
{
	constructor(_socket = new sock())
	{
		super();
		//
		this.setSocket(_socket);
		//
		this.setProtocol();
		this.setEncoding();
		this.setTimeout();
	}

	static get protocol() { return 'tcp'; }
	static get encoding() { return global.settings.encoding || 'utf8'; }
	static get timeout() { return global.settings.net.timeout || 0; }

	write(_data, _encoding = global.settings.encoding)
	{
		//this.socket.write(_data
	}

	setSocket(_socket = new sock())
	{
		this.socket = _socket;
	}

	setTimeout(_timeout = socket.timeout)
	{
		if(global.not(_timeout) || (! global.type(_timeout, 'Number')))
		{
			_timeout = socket.timeout;
		}

		this.timeout = _timeout;
		super.setTimeout(_timeout);

		return this;
	}

	setEncoding(_encoding = socket.encoding)
	{
		//TODO/ do this also for the socket, if any
		if(global.not(_encoding) || (! global.type(_encoding, 'String')))
		{
			_encoding = socket.encoding;
		}

		this.encoding = _encoding;
		super.setEncoding(_encoding);

		return this;
	}

	setProtocol(_protocol = socket.protocol)
	{
		if(global.not(_protocol) || (! global.type(_protocol, 'String')))
		{
			_protocol = socket.protocol;
		}

		this.protocol = _protocol;

		return this;
	}
}

