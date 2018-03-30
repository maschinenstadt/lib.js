# lib.js
My personal JavaScript w/ Node.js library (and interpreter) extension(s).

The library is actually growing, but not yet "finished" - there are big parts
missing yet (but in preparation) .. on big changes I'll write them down here!

BTW: At the moment I am using only SYNC functions (they're sometimes better),
but soon also the ASYNC(hronous) methods will be available (via suffix to all
the methods, like "file.mkdir.async()").


## What is it?
It is really handy! .. With some smart enhancements for many use cases .. and
you can extend it as you wish, using other library paths (defaults are listed
below) to implement your own API extensions as you want: just set them in the
"settings.js" file, or via the environment variable "JS_LIBRARY_PATH", or the
3rd possibility is to specify one or more paths as second include() argument,
which will also be the only directory, in that lib.js may search for modules!

	~/lib.js
	/usr/local/lib.js
	/usr/lib.js
	/lib.js

Just add your own API extensions in (for example) the above paths. Now again:

	include('/dir1/dir2/file1');
	include('dir1/dir2/file2.js');

This function will regularily search in the directories set in your settings,
and if it finds a module, it will not search further. So concern the order of
the paths (which will be automatically removed if not existing as directory).

Note: if you try to include a module by it's absolute file path name (so that
it begins with a slash '/'), your filesystem's root will be the first path to
search for the files; so if they exist, they're taken in the first attempt of
loading by "include()". If you specify "relative" modules, your fs' root will
be the last path to be looked up. ..

You can also include() Node.js own modules, just specify them without any '/'
(slash) like in paths. In this case my second parameter is (true) or (false),
whether you want to re-read them or just use the copies in the cache.

Last but not least: if you've got own extensions (@ 'settings.library.path'),
you can disable the lookup in there .. if you argue with (true) as the second
include() parameter, it will only search in the current lib.js' path (that is
"global.path.root")!


## News/Updates

#### Random number generation
"file.random(.*)()" and "file.readBytes(.*)()" added.. the first one uses the
second one internally, but refers to "settings.random.entropy" ("/dev/random"
or "/dev/urandom" (preferred)). Combined with sub-routines (and alternatively
as parameter) those are able to generate random numbers like Linux does! More
secure than "Math.random()", that is going to work based on this new element;
this is my current task: create my *own*, much more secure "Math.random()"...

As "/dev/urandom" (etc.) don't exist on Windows (or other) systems, I've also
added the same functionality (uses the same interface .. so it can be handled
exactly the same way. The changes are internally ;-)´ via the "crypto" module
of Node.js, so also Windows systems can have this better RNG (= random number
generator).

Additionally, I've created "util/random" as the REAL interface for all random
things. It uses all I've described above AND can also act (the same way etc.)
in your web browser! There it uses "window.crypto(.getRandomValues())"!! ;-D´

For now, just try:

	#!/usr/bin/env node.js
	//no need to include - 'util/random' is always integrated (as global)
	var length = 1024;

	var binary = random.binary(length);
	var base64 = random.base64(length);
	var radix = random.radix(length, 4); // would use the quaternary base
	//
	var hex = random.randomData(length, 'hex');	// alternative

	//alternatively: direct access to file functions ("main/020_file.js")
	var decimal = file.readBytes.decimal('/dev/urandom', length);
	var buffer = file.random(length);	// "Buffer": direct 'Number's
	var utf8 = file.random.utf8(length);	// direct argument, no sub'..
	var dual = file.random(length, 'dual');
	var base = file.random(length, 36);	// radix/base (36) used! :-)´

And in the browser you can do so:

	var length = 64;
	//
	var binary = web.util.random.binary(length);
	var hex = web.util.random.hex(length);
	var base64 = web.util.random.base64(length);
	var dec = util.random.decimal(length);
	//
	var dual = util.random.randomData(length, 'dual'||2);
	var arbitrary = util.random.radix(length, 36);	// (36) is JS' maxim.

OR you can see my examples, ready to use (my second is preferred, as said..)!

	./example/random/file-interface.js
	./example/random/real-interface.js


#### "nodejs()". "libjs()"! .. "include()"?
Below (in this "News/Updates" section) you can find infos to "nodejs()". This
time I've integrated "libjs()". It doesn't have a cache (like "nodejs()") now
but helps to work with APIs in this way: .. if you want to "include()" all of
the available API elements, that can be distributed all over your system (the
"settings.library.path" array will show you all paths to search for modules),
you should use "include()".

If you'd like to work with API elements only by me, respectively the "lib.js"
installation/root path ("/lib.js" should be chosed) as only directory to look
for the modules, you should use "libjs()"!

"libjs()" is the same as "include(_module, path.root)". But it is easy going.

And again: "require()" is still possible. But please don't use it. It doesn't
have any support for all of our API modules etc... it still works, but .. hm!


#### Browser support
Integrated (the 2nd time) browser support/area. See "browser/". For this I've
got a special Git repository @ github: a basic web project skeleton. See also
the "browser/settings.js". You need to install THIS in "/lib.js" (see below),
then clone the "www" repository, directly into your web root (or your sub's).

	git clone https://github.com/maschinenstadt/www

Alternatively you can also adjust your symlink "www/js", so it points to your
real "lib.js" installation path (respectively to the "browser/" sub directory
there..).


#### ANSI
Just finished "console/ansi"! See the .. "example/console/ansi.js". Important
feature for me - as it goes to own `dialog` styles (or something similar), w/
`tmux` (like `screen`) etc. .. :-D´

It also supports RGB colors.. you can define RGB or HEX. Both is convertible,
see "util/color". ..


#### "fuse-bindings"
Added this dependency (at the moment the only one) for some own filesystem(s)
which I'll integrate later. It is for various reasons. I wanted to completely
stay away from foreign dependencies, but this one will be appropriate. JFYI..


#### Node.js original modules
Now you won't need to "include()" your original Node.js modules.. you have to
address them as usual by "[global.]nodejs" - but instead of using it like any
object.. now you can call it as function, with it's module name as parameter.

If it has been loaded before, you get a cached copy of the object. Otherweise
the function will load it, store it in the cache (for later use) and then you
get the object itself. ;-)´

	var http = nodejs('http');	// not necessary, really..
	var server = nodejs('http').createServer();	// new, better way.
	console.inspect(nodejs.http);	// possible .. but this won't load!

As "include()" supports a second parameter, "nodejs()" also supports a "bool"
to decide, whether to RE-load the module (into the cache, again) - even if it
already has been loaded. Just to be sure; maybe you've made changes there? ;)


#### Re-new
Most elements of this library have gone these days - I thought they were very
unstructured and not finished anyway. They'll come again. When they're really
finished (each). But my basic structure of this library extensions stayed the
same (so the news below are still valid).

I'm working on it. And you can do this, too.. Either you send your own things
to me (or this repository), or you structure your API elements in your search
paths or your home directory - this piece of code was ment to support further
extensions etc. by all the user's etc.! ;-)´


#### [global.]not()
The best replacement for code like "if(! result) {}" - think for yourself! ..

	0			false
				/true	[by (true) as 2nd "not()" argument..]
	false			true
	new [*]Error()		true
	''			true
	[]			true
	null			true
	undefined		true

This makes it really much easier to check return values and anything like it!
You can find that example in "example/not.js".


#### More File functions
"[global.]file" contains all the magic.

Following both seem to be [nearly] done; at least. The others will work, too,
but with one big issue: "ASYNC" is not yet supported. I'm working on it. Stay
tuned. (^_^)´ ..


##### "readlink()"
Mainly "readlink()" (with all sub's) has been finished again. It will be used
for different purposes .. if you'd like to find out more, change into the sub
dir 'example/' and run `./readlink.sh` (not working in other directories - as
'process.cwd()' is considered there). You'd like to look to area 'Process'..!


##### "find()"
First version of this function (and it's sub functions - to choose types) has
began .. it's a really important feature for me! But .. (a) it's not complete
right now: there's missing my "glob()" to search for names - at the moment we
can just search for different file TYPE (directory, file, symlink, character,
block, socket, fifo). .. and (b) IT IS REALLY SLOW - compared to `find`! BAD!

And I'll extend my "file.find()" functionality to some nice things (including
`xargs` or other "filter" functionality for arrays w/ paths; with conversions
from path lists to real "new File()" structures (which will be used by my own
database, too).


#### 'Node.js' VERSION CHECK
A (first) Node.js version check is done!

You can set the delay between every query (directly to Node.js main server ;)
in the "settings.js" (in minutes). This is not a bug, it's a feature that the
server(s) don't get flooded by us.

It is worth to say here: we just check for the really latest/current version,
NOT the LTS version (would that be a wished feature or it is good as it is?).
Additionally I've made the version warning STAY - even if delay time prevents
a new (HTTP) query. It will automatically disappear when running new version.

And now w/ support for 'http:' AND 'https:'. Change the URL in 'settings.js'!


#### User's (home directory) library extensions: automatically start scripts.
For more information see the point "Administrators and Users" (below, in this
section). I implemented a very easy "autorun" function ("./main/900_auto.js")
for your home directories. EVERY FILE WHICH IS NOT IN A SUB DIRECTORY (in the
default home library path "~/lib.js") will be loaded automatically - so it is
possible for your scripts to run without code for the usual "require()" calls
you need for your applications/scripts.

So the rest of your own API extensions should be in your directory structures
to provide them for "include()" calls. And they are as easy as "900_auto.js",
so just extend the basic global Objects ('Object', 'Array', 'String' .. etc.)
as I did it in a directory like 'global/'; then just this script code results
in including the whole bunch of (your potential) files:

	include('global/');

And yes: at least one slash ('/') is necessary: without these my system would
try to regularily "require()" original "Node.js" or "npm.js" modules.

If these files export something ("module.exports = {}"), it will be available
by file name w/o extension as key and w/ UPPER CASE keys, if the file had the
'.json' extension. @"[global.]home": there are all of your "/home/*" exports!


#### Administrators and Users
From now on, administrators can install this and regular users can extend and
use all this in their home directories (if installation is done as in section
"Interpreter" of this README). You can structure *your* API like it's already
described, but all in "~/lib.js" (@ "/home" ;-).

If you'd like to see the order of the library paths, just start my example in
"./example/PATHs.js". And maybe you'll realize that it results in a different
output. This is based on the current working directory - which will always be
the first directory to search in ;-)´ .. and the other point is, that in case
a directory (specified in "settings.js") does not exist, it shall be filtered
out. Last but not least duplicates are removed, too (first occurence counts).

Have fun! ;-D´


## A bit more to read. ..

### API and include()

This includes my (important) `include()` version. See the directory structure
in this repository (or soon my upcoming API documentation) for more. If you'd
like to require() common node/npm modules, they'll be cached (but you can use
the 2nd include()-argument also(!) for a Boolean value to FORCE reload) - and
they'll be available in the (global) "nodejs"-Object (so you do not need here
to assign the result every time to a new variable). ... Example is following:

	include('net');	// will return 'net' and cache it in "global.nodejs";
	var server = nodejs('net', true).createServer();  // => RE-LOAD 'net'

If you assign this example to 'net', you can access it regularily - otherwise
access "(global.)nodejs[module]" as described here.. some default modules are
being automatically loaded during initialization - look into "./settings.js".

Last but not least it's also possible to include() whole directories: this is
going to return a regular Object, with key names set by file name - w/ UPPER-
CASE name in case it was a '.json' file .. this is because otherwise it would
result in a conflict, if two files ('.js' and '.json') have the same name! ..

Sub directories won't be included in this application. We *really* don't want
it recursive right here! But your directories do result in EMPTY sub objects.

Notice: there's a difference between using the original 'net' module and your
library's directory './net/': read the first line below to include *original*
Node.js 'net' module, while the second, following line describes my inclusion
of this library's 'net/' directory (w/ sub files, resulting in an object with
the keys/indices by file names).

	require('net');
	require('net/');

Of course you can use the original 'require()' for original modules and paths
in the file system - but it would be better to use my new 'include()' - every
time (as already said: it provides Node's modules in "(global.)nodejs" and it
caches them - if you don't force reloading).

Another argument to use my new "include()" is that I'm planning to .. (a) LOG
such accesses .. (b) cache *every* module access .. (c) and much more.. Let's
say: if we consequently use my "include()", we'll have the maximum power when
it's about 'process control' etc. .. and it is only logical to use the better
version (that has no disadvantages over the original one).

PS: Look at the point "Node.js original modules" in section "News/Updates"..!


### Usage

#### Interpreter
I've decided to create a new "interpreter" script to be started via "shebang"
line - so it's never necessary to require() this whole thing every time (even
if that is possible, too - therefore see the next paragraph of this README)..

It also got a pretty name: just clone this repository to "/lib.js" and create
a symlink in "/usr/local/bin" by executing the following command (you may use
`sudo` if you are not logged in as "root"):

	`sudo ln -s /lib.js/node.js /usr/local/bin`

Of course you can also use "/bin" or "/usr/bin" .. but "/usr/local/" is meant
especially for such custom "modifications". After this you should have to add
the following line at every script's file beginning (respectively the scripts
you really wish to execute):

	`#!/usr/bin/env node.js`
	`#!/usr/local/bin/node.js`

Both of these are valid (even if `env` would be the better decision).


#### Regular 'npm.js' usage
You can also do without the 'interpreter' thing! .. Use it like every regular
'npm.js' module. It's tested right now and really seems to work (completely)!

	< https://www.npmjs.com/~maschinenstadt >
	< https://www.npmjs.com/package/maschinenstadt >
	< https://npm.runkit.com/maschinenstadt >

So just execute the following line to install this as npm.js module; and then
you can require() it (like every module) by typing the following line in your
scripts:

	`npm install maschinenstadt`
	`require('maschinenstadt');`

You do not really have to assign this to a variable, as most code is exported
to the 'global' object .. so everything necessary may be accessed "directly".


### Installation

#### Script
I'd like to create an installation script. TODO (should it be BASH or NODE?)!


#### Manual
Just clone the repository into "/lib.js" and link "/usr/local/bin/node.js" to
"/lib.js/node.js". The rest is up to you (so please read more of the README).


### Et cetera.

#### Library/API Documentation
Sooner or later I'd like to automatically generate my API documentation; this
will get to work in more or less steps. .. if it works as planned, everything
in the 'lib.js' directory will be automatically translated into a "describing
language or format" - so we'll get .. (a) as well ".pdf" as ".html" documents
plus .. (b) some syntactical code for "auto completion" etc. .. (here I think
about the 'Node.js' API as '.json' file .. see the following link).

	< https://nodejs.org/dist/latest/docs/api/index.json >


#### My TODO .. and other documents ...
Risk a look into "doc/txt/TODO.txt" or my other (text/plain) documents there.
It's a little mess .. but that's all I am planing to implement in the future!


### About

#### Copyright
Copyright (c) maschinenstadt (Sebastian Kucharczyk <geleeschaumgummi @ gmail.com>)


#### Homepage && Contact

	< https://kekse.biz/ >
	< geleeschaumgummi @ gmail.com >


#### License
Will be published later. But for now you may now: use it as you would like to
use it (even commercial use is allowed) - but you may not create a fork! Your
wishes to change the code(s) should be send me via mail e.g.; or you also may
try to commit them to this repository (would it be too much to ask you to use
a new branch here? Please do so..).

