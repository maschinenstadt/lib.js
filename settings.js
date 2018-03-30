var settings = module.exports = {};

settings.default = 'sync' || 'async';

settings.encoding = 'utf8';
settings.charset = 'utf-8';

settings.random = {};
settings.random.entropy = '/dev/urandom';
settings.random.encodings = [ 'binary', 'hex', 'base64', 'dual', 'decimal' ];
settings.random.encoding = 0;
settings.random.radix = 2;
settings.random.length = 64;

settings.version = {};
settings.version.check = true;	// throw a message if newer version is available ..
settings.version.url = 'https://nodejs.org/dist/latest/';
settings.version.needle = 'node-*.tar.';
settings.version.delay = 30;	// in minutes .. will be converted to milliseconds on runtime, jyfi.

settings.net = {};
settings.net.timeout = 0;	// <1(ms) disables default timeout (which can be set in their net-classes, too)
settings.net.version = 6;
settings.net.encoding = settings.encoding;
settings.net.host = '0.0.0.0' || '127.0.0.1';

settings.DEBUG = 0; // param '--debug=8' is also possible
settings.START = true;	// general start of processes - and use this like an interpreter
settings.START_ONLY = false;	// set to 'false' if using this as regular npm.js module! IMPORTANT!!

settings.defaultLanguage = 'en' || 'de'; // will be set by env. var. as in 'settings.variable.lang(uage)'

settings.variable = {};
settings.variable.libraryPath = 'JS_LIBRARY_PATH'; // use `JS_LIBRARY_PATH ./script.js` or `export JS_LIBRARY_PATH=..`
settings.variable.lang = 'LANG'; // for extraction of user's language to use here (later.. w/ text-db for localization)
settings.variable.language = 'LANGUAGE'; // alternative: "own" lang var (will use first two chars here, too)

settings.library = {};
settings.library.extensions = [ '.js', '.json', '' ];
settings.library.path = [ '/usr/local/lib.js', '/usr/lib.js', '/lib.js', '/' ]; // most important ones ... the rest will be inserted automatically!
settings.library.main = 'main'; // this library's core files..
settings.library.global = 'global'; // all global and most important items for this library (extension(s))
settings.library.init = global.path.root + '/' + settings.library.main + '/main.js'; // the base item of all the globals (this will include the others!)

//still/TODO/TODO/TODO/TODO/!!!!!!!
settings.library.include = {};
settings.library.include.external = true;
settings.library.include.internal = true;
settings.library.include.nodejs = true;
settings.library.include.workdir = true;

//still/TODO/TODO/TODO/TODO/!!!!!
settings.service = {};
settings.service.dyndns = true;	// whether to use my dyndns service
settings.service.hosting = true; // all via TLS ONLY!! (web, ftp, git, mail, ..)
settings.service.account = {};	// maybe move this to somewhere else? like the uuid!?
settings.service.account.mail = '';	// mail address of user (the login)
settings.service.account.pass = '';	// password for this account
settings.service.account.hash = '';	// gnupg fingerprint/hash (cipher)

