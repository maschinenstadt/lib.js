var radix = {};

if(BROWSER)
{
	web.util.radix = radix;
}
else
{
	module.exports = radix;
}

// zur daten-konversion zwischen zahlensystemen ..
//
//
//	WICHTIG: der ZAHLENSTRAHL o.ä. ist zu verwenden, nicht die js-limits von radix (2..36)!
//
//	.. limitierte version findet sich in "global/String.js". .. für's erste wenigstens. ...
//
//
// .. einer von vielen, vielen (!!) anwendungszwecken ist die datenbank-(carrier-)codierung;
// d.h. daten in kleineren systemen für perfekte anwendbarkeit @ kontroll-/trennzeichen/..?!
//
// wird aber noch viel weiter benutzt ("bald"), v.a. quantifizierung und neuronalität. ..

radix.convert = function(_data = '', _from = 256, _to = 2)
{
	if(global.not(_data))
	{
		return '';
	}

	if(! global.type(_data, 'String'))
	{
		return new Error(global.type(_data));
	}

	if(_from > 256 || _from < 2 || _to > 256 || _to < 2)
	{
		return new Error('2 .. 256');
	}

	//TODO/
	//
	//question: "String.alphabet" vs. pure codes ("\0" for any (0) etc..); or both?
	//

	return result;
}

