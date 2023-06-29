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
  * [PluginScriptingClient](#pluginscriptingclient)
  * [PluginScriptingServer](#pluginscriptingserver)
  * [SharedScript](#sharedscript)
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
scripting.createScript('my-constants', 'export const answer = 42;')
```

### Client

```js
// src/client/**/index.js
import { Client } from '@soundworks/core/client.js';
import pluginScripting from '@soundworks/plugin-scripting/client.js';

const client = new Client(config);
// register the plugin
client.pluginManager.register('scripting', pluginScriptingClient);
await client.start();
// use the plugin once the client is started
const scripting = await client.pluginManager.get('scripting');
const script = await scripting.attach('my-constants');
const mod = await script.import();
console.log(mod.answer);
```

### Notes

The shared scripts are stored in the file system as raw Javascript files located in the directory defined on the server side (cf. `dirname` option).

The scripts are simple JavaScript modules that are re-bundled using `esbuild` each time their content is modified. As such, they can import installed dependencies (i.e. `node_modules`) or import other scripts.

For now, only named exports are supported. This is the responsibility of the code consuming the shared scripts to define the API that the scripts should expose.

Internally the `scripting` plugin relies on the `@soundworks/plugin-filesystem` plugin. As such, it provide the same security restrictions, i.e. in `production` mode only authentified and trusted clients are allowed to modify the scripts.

## API

<!-- api -->

### Classes

<dl>
<dt><a href="#PluginScriptingClient">PluginScriptingClient</a></dt>
<dd><p>Client-side representation of the soundworks&#39; scripting plugin.</p>
</dd>
<dt><a href="#PluginScriptingServer">PluginScriptingServer</a></dt>
<dd><p>Server-side representation of the soundworks&#39; scripting plugin.</p>
</dd>
<dt><a href="#SharedScript">SharedScript</a></dt>
<dd><p>A SharedScript can be distributed amongst different clients and modified
at runtime. The script source is stored directly in the filestem, see
<code>dirname</code> option of the server-side plugin.
A Shared script cannot be instatiated manually, it is retrieved by calling
the client&#39;s or  server <code>PluScritping.attach</code> method.</p>
</dd>
</dl>

<a name="PluginScriptingClient"></a>

### PluginScriptingClient
Client-side representation of the soundworks' scripting plugin.

**Kind**: global class  

* [PluginScriptingClient](#PluginScriptingClient)
    * [.setGlobalScriptingContext(ctx)](#PluginScriptingClient+setGlobalScriptingContext)
    * [.getList()](#PluginScriptingClient+getList) ⇒ <code>Array</code>
    * [.getTree()](#PluginScriptingClient+getTree) ⇒ <code>Object</code>
    * [.createScript(name, [value])](#PluginScriptingClient+createScript) ⇒ <code>Promise</code>
    * [.updateScript(name, value)](#PluginScriptingClient+updateScript) ⇒ <code>Promise</code>
    * [.deleteScript(name)](#PluginScriptingClient+deleteScript) ⇒ <code>Promise</code>
    * [.attach(name)](#PluginScriptingClient+attach) ⇒ <code>Promise</code>

<a name="PluginScriptingClient+setGlobalScriptingContext"></a>

#### pluginScriptingClient.setGlobalScriptingContext(ctx)
Registers a global context object to be used in scripts. Note that the
context is store globally, so several scripting plugins running in parallel
will share the same underlying object. The global `getGlobalScriptingContext`
function will allow to retrieve the given object from within scripts.

**Kind**: instance method of [<code>PluginScriptingClient</code>](#PluginScriptingClient)  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>Object</code> | Object to store in global context |

<a name="PluginScriptingClient+getList"></a>

#### pluginScriptingClient.getList() ⇒ <code>Array</code>
Returns the list of all available scripts.

**Kind**: instance method of [<code>PluginScriptingClient</code>](#PluginScriptingClient)  
<a name="PluginScriptingClient+getTree"></a>

#### pluginScriptingClient.getTree() ⇒ <code>Object</code>
Convenience method that return the underlying filesystem tree. Can be
usefull to reuse components created for the filesystem (e.g. sc-filesystem)

**Kind**: instance method of [<code>PluginScriptingClient</code>](#PluginScriptingClient)  
<a name="PluginScriptingClient+createScript"></a>

#### pluginScriptingClient.createScript(name, [value]) ⇒ <code>Promise</code>
Create a new script. The returned promise resolves when all underlyings
states, files and script instances are up-to-date.

**Kind**: instance method of [<code>PluginScriptingClient</code>](#PluginScriptingClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Name of the script, will be used as the actual filename |
| [value] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Initial value of the script |

<a name="PluginScriptingClient+updateScript"></a>

#### pluginScriptingClient.updateScript(name, value) ⇒ <code>Promise</code>
Update an existing script. The returned promise resolves when all underlyings
states, files and script instances are up-to-date.

**Kind**: instance method of [<code>PluginScriptingClient</code>](#PluginScriptingClient)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the script |
| value | <code>string</code> | New value of the script |

<a name="PluginScriptingClient+deleteScript"></a>

#### pluginScriptingClient.deleteScript(name) ⇒ <code>Promise</code>
Delete a script. The returned promise resolves when all underlyings
states, files and script instances are up-to-date.

**Kind**: instance method of [<code>PluginScriptingClient</code>](#PluginScriptingClient)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the script |

<a name="PluginScriptingClient+attach"></a>

#### pluginScriptingClient.attach(name) ⇒ <code>Promise</code>
Attach to a script.

**Kind**: instance method of [<code>PluginScriptingClient</code>](#PluginScriptingClient)  
**Returns**: <code>Promise</code> - Promise that resolves on a new Script instance.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the script |

<a name="PluginScriptingServer"></a>

### PluginScriptingServer
Server-side representation of the soundworks' scripting plugin.

**Kind**: global class  

* [PluginScriptingServer](#PluginScriptingServer)
    * [new PluginScriptingServer()](#new_PluginScriptingServer_new)
    * [.setGlobalScriptingContext(ctx)](#PluginScriptingServer+setGlobalScriptingContext)
    * [.getList()](#PluginScriptingServer+getList) ⇒ <code>Array</code>
    * [.getTree()](#PluginScriptingServer+getTree) ⇒ <code>Object</code>
    * [.onUpdate(callback, [executeListener])](#PluginScriptingServer+onUpdate) ⇒ <code>function</code>
    * [.switch(dirname)](#PluginScriptingServer+switch)
    * [.createScript(name, [value])](#PluginScriptingServer+createScript) ⇒ <code>Promise</code>
    * [.updateScript(name, value)](#PluginScriptingServer+updateScript) ⇒ <code>Promise</code>
    * [.deleteScript(name)](#PluginScriptingServer+deleteScript) ⇒ <code>Promise</code>
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

<a name="PluginScriptingServer+getList"></a>

#### pluginScriptingServer.getList() ⇒ <code>Array</code>
Returns the list of all available scripts.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  
<a name="PluginScriptingServer+getTree"></a>

#### pluginScriptingServer.getTree() ⇒ <code>Object</code>
Convenience method that return the underlying filesystem tree. Can be
usefull to reuse components created for the filesystem (e.g. sc-filesystem)

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  
<a name="PluginScriptingServer+onUpdate"></a>

#### pluginScriptingServer.onUpdate(callback, [executeListener]) ⇒ <code>function</code>
Register callback to execute when a script is created or deleted. The
callback will receive the updated list of script names and the updated
file tree.

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

<a name="PluginScriptingServer+createScript"></a>

#### pluginScriptingServer.createScript(name, [value]) ⇒ <code>Promise</code>
Create a new script. The returned promise resolves when all underlyings
states, files and script instances are up-to-date.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Name of the script, will be used as the actual filename |
| [value] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Initial value of the script |

<a name="PluginScriptingServer+updateScript"></a>

#### pluginScriptingServer.updateScript(name, value) ⇒ <code>Promise</code>
Update an existing script. The returned promise resolves when all underlyings
states, files and script instances are up-to-date.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the script |
| value | <code>string</code> | New value of the script |

<a name="PluginScriptingServer+deleteScript"></a>

#### pluginScriptingServer.deleteScript(name) ⇒ <code>Promise</code>
Delete a script. The returned promise resolves when all underlyings
states, files and script instances are up-to-date.

**Kind**: instance method of [<code>PluginScriptingServer</code>](#PluginScriptingServer)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the script |

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
the client's or  server `PluScritping.attach` method.

**Kind**: global class  

* [SharedScript](#SharedScript)
    * [.source](#SharedScript+source) : <code>string</code>
    * [.error](#SharedScript+error) : <code>string</code>
    * [.transpiled](#SharedScript+transpiled) : <code>string</code>
    * [.import()](#SharedScript+import) ⇒ <code>Promise</code>
    * [.detach()](#SharedScript+detach)
    * [.onUpdate(callback, [executeListener])](#SharedScript+onUpdate) ⇒ <code>function</code>
    * [.onDetach(callback)](#SharedScript+onDetach)
    * [.update(value)](#SharedScript+update)
    * [.delete()](#SharedScript+delete)

<a name="SharedScript+source"></a>

#### sharedScript.source : <code>string</code>
**Kind**: instance property of [<code>SharedScript</code>](#SharedScript)  
**Read only**: true  
<a name="SharedScript+error"></a>

#### sharedScript.error : <code>string</code>
**Kind**: instance property of [<code>SharedScript</code>](#SharedScript)  
**Read only**: true  
<a name="SharedScript+transpiled"></a>

#### sharedScript.transpiled : <code>string</code>
**Kind**: instance property of [<code>SharedScript</code>](#SharedScript)  
**Read only**: true  
<a name="SharedScript+import"></a>

#### sharedScript.import() ⇒ <code>Promise</code>
Dynamically import the transpiled module.
[https://caniuse.com/?search=import()](https://caniuse.com/?search=import())

**Kind**: instance method of [<code>SharedScript</code>](#SharedScript)  
**Returns**: <code>Promise</code> - Promise which fulfills to an object containing all exports
 the script.  
<a name="SharedScript+detach"></a>

#### sharedScript.detach()
Stop listening for updates

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

<a name="SharedScript+update"></a>

#### sharedScript.update(value)
Alias for `plugin.updateScript(name, value)`, calling this method will update
the source of the script. The update will be propagated to all attached scripts

**Kind**: instance method of [<code>SharedScript</code>](#SharedScript)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | New source code for the script. |

<a name="SharedScript+delete"></a>

#### sharedScript.delete()
Alias for `plugin.deleteScript(name)`, calling this method will entirely delete
the script: the file and all associated scripts. If you just want to stop
using the current script without deleting it, call detach instead

**Kind**: instance method of [<code>SharedScript</code>](#SharedScript)  

<!-- apistop -->

## Credits

[https://soundworks.dev/credits.html](https://soundworks.dev/credits.html)

## License

[BSD-3-Clause](./LICENSE)
