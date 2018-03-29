module.exports = class stream extends node
{
	constructor(_type = 'none')
	{
		if(! global.type(_type, 'String'))
		{
			_type = 'none';
		}

		if(! this.setType(_type))
		{
			if(_type !== 'none')
			{
				this.setType('none');
			}
		}

		//
		super();
	}

	static get dir() { return path.root + '/crypto'; }
	static get file() { return 'stream.js'; }

	setType(_type = 'none')
	{
		if(! global.type(_type, 'String'))
		{
			_type = 'none';
		}

		var p = stream.dir + '/' + _type + '/' + stream.file;

		if(! global.file.exists(p))
		{
			return false;
		}

		if(this.type !== _type)
		{
			this[this.type] = undefined;
			delete this[this.type];
		}

		this.type = _type;
		this._type = include(p);
		this[_type] = new this._type();

		//
		return true;
	}
}

