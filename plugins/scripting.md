# soundworks | plugin scripting

[![npm version](https://badge.fury.io/js/@soundworks%2Fplugin-scripting.svg)](https://badge.fury.io/js/@soundworks%2Fplugin-scripting)

[`soundworks`](https://soundworks.dev) plugin for runtime distributed scripting.

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Server](#server)
  * [Client](#client)
  * [Notes](#notes)
- [API](#api)
  * [Classes](#classes)
  * [PluginScriptingServer](#pluginscriptingserver)
  * [SharedScript](#sharedscript)
- [Development Notes](#development-notes)
- [Credits](#credits)
- [License](#license)

<!-- tocstop -->

## Installation

```sh
npm install @soundworks/plugin-scripting --save
```

## Usage

### Server

```js
// src/server/index.js
import { Server } from '@soundworks/core/server.js';
import pluginScripting from '@soundworks/plugin-scripting/server.js';

const server = new Server(config);
// register the plugin with an optionnal dirname
server.pluginManager.register('scripting', pluginScripting, {
  dirname: 'my-script',
});
await server.start();
// use the plugin once the server is started
const scripting = await server.pluginManager.get('scripting');
```

Given that there is a file `my-constants.js` in the watched `my-script` directory:

```js
// my-script/my-constants.js
export const answer = 42;
```

### Client

```js
// src/client/**/index.js
import { Client } from '@soundworks/core/client.js';
import pluginScripting from '@soundworks/plugin-scripting/client.js';

const client = new Client(config);
// register the plugin
client.pluginManager.register('scripting', pluginScripting);
await client.start();
// use the plugin once the client is started
const scripting = await client.pluginManager.get('scripting');
const script = await scripting.attach('my-constants');
const mod = await script.import();
console.log(mod.answer);
// > 42
```

### Notes

#### Where do the scripts live

The shared scripts are stored in the file system as raw Javascript files located in the directory defined on the server side configuration of the plugin (cf. `dirname` option).

This is the responsibility of the code consuming the shared scripts to define the API that the scripts should expose.

#### Limitations

The scripts are simple JavaScript modules that are re-bundled using `esbuild` each time their content is modified. As such, they can import installed dependencies (i.e. `node_modules`) or import other scripts. However, using such bundle leads to a restriction in Node.js clients, that can't import native addons directly (in such case you should inject the dependency into the script at runtime). This might change in the future as dynamic `import`/`require` of ES modules is more stable (cf. <https://github.com/nodejs/help/issues/2751>).

#### Creating / updating / deleting scripts

Internally the `scripting` plugin relies on the [`@soundworks/plugin-filesystem`](https://soundworks.dev/plugins/filesystem.html) plugin, which should be use to make any modifications in the script directory:

```js
// register and get the scripting plugin
server.pluginManager.register('scripting', pluginScripting, { dirname: 'my-script' });
await server.start();
const scripting = await server.pluginManager.get('scripting');
// create a new script in the 'my-script' directory using the scripting reltated filesystem
const code = `export function add(a, b) { return a + b }`;
await scripting.filesystem.writeFile('add.js', code);
```

## API

<!-- api -->

### Classes

<dl>
<dt><a href="#PluginScriptingServer">PluginScriptingServer</a></dt>
<dd><p>Server-side representation of the soundworks&#39; scripting plugin.</p>
</dd>
<dt><a href="#SharedScript">SharedScript</a></dt>
<dd><p>A SharedScript can be distributed amongst different clients and modified
at runtime. The script source is stored directly in the filestem, see
<code>dirname</code> option of the server-side plugin.</p>
<p>A Shared script cannot be instatiated manually, it is retrieved by calling
the client&#39;s or  server <code>PluginScripting.attach</code> method.</p>
</dd>
</dl>

<a name="PluginScriptingServer"></a>

### PluginScriptingServer
Server-side representation of the soundworks' scripting plugin.

**Kind**: global class  

* [PluginScriptingServer](#PluginScriptingServer)
    * [new PluginScriptingServer()](#new_PluginScriptingServer_new)
    * [.filesystem](#PluginScriptingServer+filesystem)
    * [.getList()](#PluginScriptingServer+getList) ⇒ <code>Array</code>
    * [.getCollection()](#PluginScriptingServer+getCollection) ⇒ <code>Promise.&lt;SharedStateCollection&gt;</code>
    * [.setGlobalScriptingContext(ctx)](#PluginScriptingServer+setGlobalScriptingContext)
    * [.onUpdate(callback, [executeListener])](#PluginScriptingServer+onUpdate) ⇒ <code>function</code>
    * [.switch(dirname)](#PluginScriptingServer+switch)
    * [.attach(name)](#PluginScriptingServer+attach) ⇒ <code>Promise</code>

<a name="new_PluginScriptingServer_new"></a>

#### new PluginScriptingServer()
The constructor should never be called manually. The plugin will be
instantiated by soundworks when registered in the `pluginManager`

Available options:
- `dirname` {String} - directory in which the script files are located

If no option is given, for example before a user selects a project, the plugin
will stay idle until `switch` is called.

**Example**  
```js
server.pluginManager.register('scripting', scriptingPlugin, { dirname })
```
<a name="PluginScriptingServer+filesystem"></a>

#### pluginScriptingServer.filesystem
Instance of the underlying filesystem plugin.

**Kind**: instance property of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  
<a name="PluginScriptingServer+getList"></a>

#### pluginScriptingServer.getList() ⇒ <code>Array</code>
Returns the list of all available scripts.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  
<a name="PluginScriptingServer+getCollection"></a>

#### pluginScriptingServer.getCollection() ⇒ <code>Promise.&lt;SharedStateCollection&gt;</code>
Return the SharedStateCollection of all the scripts underlying share states.
Provided for build and error monitoring purposes.
If you want a full featured Script instance, see `attach` instead.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  
<a name="PluginScriptingServer+setGlobalScriptingContext"></a>

#### pluginScriptingServer.setGlobalScriptingContext(ctx)
Registers a global context object to be used in scripts. Note that the
context is store globally, so several scripting plugins running in parallel
will share the same underlying object. The global `getGlobalScriptingContext`
function will allow to retrieve the given object from within scripts.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>Object</code> | Object to store in global context |

<a name="PluginScriptingServer+onUpdate"></a>

#### pluginScriptingServer.onUpdate(callback, [executeListener]) ⇒ <code>function</code>
Register callback to execute when a script is created or deleted.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  
**Returns**: <code>function</code> - Function that unregister the listener when executed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Callback function to execute |
| [executeListener] | <code>boolean</code> | <code>false</code> | If true, execute the given  callback immediately. |

<a name="PluginScriptingServer+switch"></a>

#### pluginScriptingServer.switch(dirname)
Switch the plugin to watch and use another directory

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  

| Param | Type | Description |
| --- | --- | --- |
| dirname | <code>String</code> \| <code>Object</code> | Path to the new directory. As a convenience  to match the plugin filesystem API, an object containing the 'dirname' key  can also be passed |

<a name="PluginScriptingServer+attach"></a>

#### pluginScriptingServer.attach(name) ⇒ <code>Promise</code>
Attach to a script.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  
**Returns**: <code>Promise</code> - Promise that resolves on a new Script instance.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the script |

<a name="SharedScript"></a>

### SharedScript
A SharedScript can be distributed amongst different clients and modified
at runtime. The script source is stored directly in the filestem, see
`dirname` option of the server-side plugin.

A Shared script cannot be instatiated manually, it is retrieved by calling
the client's or  server `PluginScripting.attach` method.

**Kind**: global class  

* [SharedScript](#SharedScript)
    * [.name](#SharedScript+name) : <code>string</code>
    * [.filename](#SharedScript+filename) : <code>string</code>
    * [.buildError](#SharedScript+buildError) : <code>string</code>
    * [.runtimeError](#SharedScript+runtimeError) : <code>string</code>
    * [.import()](#SharedScript+import) ⇒ <code>Promise</code>
    * [.reportRuntimeError(err)](#SharedScript+reportRuntimeError)
    * [.detach()](#SharedScript+detach)
    * [.onUpdate(callback, [executeListener])](#SharedScript+onUpdate) ⇒ <code>function</code>
    * [.onDetach(callback)](#SharedScript+onDetach)

<a name="SharedScript+name"></a>

#### sharedScript.name : <code>string</code>
Name of the script (i.e. sanitized relative path)

**Kind**: instance property of [<code>SharedScript</code>](#SharedScript)  
<a name="SharedScript+filename"></a>

#### sharedScript.filename : <code>string</code>
Filename from which the script is created.

**Kind**: instance property of [<code>SharedScript</code>](#SharedScript)  
<a name="SharedScript+buildError"></a>

#### sharedScript.buildError : <code>string</code>
Error that may have occured during the transpilation of the script.
If no error occured during transpilation, the attribute is set to null.

**Kind**: instance property of [<code>SharedScript</code>](#SharedScript)  
<a name="SharedScript+runtimeError"></a>

#### sharedScript.runtimeError : <code>string</code>
Runtime error that may have occured during the execution of the script.
Runtime errors must be reported by the consumer code (cf. reportRuntimeError).

**Kind**: instance property of [<code>SharedScript</code>](#SharedScript)  
<a name="SharedScript+import"></a>

#### sharedScript.import() ⇒ <code>Promise</code>
Dynamically import the bundled module.
[https://caniuse.com/?search=import()](https://caniuse.com/?search=import())

**Kind**: instance method of [<code>SharedScript</code>](#SharedScript)  
**Returns**: <code>Promise</code> - Promise which fulfills to the JS module.  
<a name="SharedScript+reportRuntimeError"></a>

#### sharedScript.reportRuntimeError(err)
Manually report an error catched in try / catch block. While there are global
'error', 'uncaughtExceptionhandler' that catch errors throws by scripts, this
can be usefull in situations where you want your code to continue after the error:
```
script.onUpdate(async updates => {
  if (updates.browserBuild) {
    if (mod) {
      // we want to manually catch error that might be thrown in `exit()`
      // because otherwise `mod`` would never be updated
      try {
        mod.exit();
      } catch (err) {
        script.reportRuntimeError(err);
      }
    }

    mod = await script.import();
    mod.enter();
  }
}, true);
```

**Kind**: instance method of [<code>SharedScript</code>](#SharedScript)  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 

<a name="SharedScript+detach"></a>

#### sharedScript.detach()
Detach the script.

**Kind**: instance method of [<code>SharedScript</code>](#SharedScript)  
<a name="SharedScript+onUpdate"></a>

#### sharedScript.onUpdate(callback, [executeListener]) ⇒ <code>function</code>
Register a callback to be executed when the script is updated.

**Kind**: instance method of [<code>SharedScript</code>](#SharedScript)  
**Returns**: <code>function</code> - Function that unregister the callback when executed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Callback function |
| [executeListener] | <code>boolean</code> | <code>false</code> | If true, execute the given  callback immediately. |

<a name="SharedScript+onDetach"></a>

#### sharedScript.onDetach(callback)
Register a callback to be executed when the script is detached, i.e. when
`detach` as been called, or when the script has been deleted

**Kind**: instance method of [<code>SharedScript</code>](#SharedScript)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback function |


<!-- apistop -->

## Development Notes

## Credits

[https://soundworks.dev/credits.html](https://soundworks.dev/credits.html)

## License

[BSD-3-Clause](./LICENSE)
