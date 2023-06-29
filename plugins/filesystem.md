# soundworks | plugin filesystem

[![npm version](https://badge.fury.io/js/@soundworks%2Fplugin-filesystem.svg)](https://badge.fury.io/js/@soundworks%2Fplugin-filesystem)

[`soundworks`](https://soundworks.dev) plugin to watch directories and update their contents from any node.

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Server](#server)
  * [Client](#client)
- [Notes](#notes)
  * [Reading files](#reading-files)
  * [Security](#security)
- [API](#api)
  * [Classes](#classes)
  * [PluginFilesystemClient](#pluginfilesystemclient)
  * [PluginFilesystemServer](#pluginfilesystemserver)
- [Credits](#credits)
- [License](#license)

<!-- tocstop -->

## Installation

```sh
npm install @soundworks/plugin-filesystem --save
```

## Usage

### Server

```js
// index.js
import { Server } from '@soundworks/core/server';
import pluginFilesystemFactory from '@soundworks/plugin-filesystem/server';

const server = new Server();
server.pluginManager.register('filesystem', pluginFilesystemFactory, {
  // path to the watched directory, can be relative to process.cwd()
  // or absolute, in all cases file paths in the tree will be normalized
  // to be relative to `process.cwd()`
  dirname: 'path/to/directory',
  // if defined, add an `url` to each tree node, that defines the
  // route at which the files are publicly accessible.
  publicPath: '',
});

await server.start();

const filesystem = await servre.pluginManager.get('filesystem');
await filesystem.writeFile('my-file.txt', 'Hello Server');
```

### Client

#### Registering the plugin

```js
// index.js
import { Client } from '@soundworks/core/client';
import pluginFilesystem from '@soundworks/plugin-filesystem/client';

const client = new Client();
client.pluginManager.register('filesystem', pluginFilesystem, {});

await client.start();

const filesystem = await client.pluginManager.get('filesystem');
await filesystem.writeFile('my-file.txt', 'Hello Client');
```

## Notes

### Reading files

For now, the filesystem plugin does not provide any way to read files due to the impossibility to have consistent file representation between node and the browser, and to the large type of files that would require different handling or processing (e.g. image, sound, text).

According to your specific needs you can rely on other plugins (e.g. audio-buffer-loader) or on the state manager (e.g. for text files) to read and share the files.

### Security

Being able to write and delete files from any connected client poses evident security questions, moreover if your application aims at running online. To prevent such issues, all sensible operations (i.e. other than listing the files) of the  plugin are blocked if the `env.type` config option passed to the soundworks server is set to `production`. 

In such case, only trusted clients that authentified by a login and password will be able to perform these operations.

See the `config/env-**.js` files to configure your application (@todo - tutorial).

## API

<!-- api -->

### Classes

<dl>
<dt><a href="#PluginFilesystemClient">PluginFilesystemClient</a></dt>
<dd><p>Client-side representation of the soundworks&#39; filesystem plugin.</p>
</dd>
<dt><a href="#PluginFilesystemServer">PluginFilesystemServer</a></dt>
<dd><p>Server-side representation of the soundworks&#39; filesystem plugin.</p>
</dd>
</dl>

<a name="PluginFilesystemClient"></a>

### PluginFilesystemClient
Client-side representation of the soundworks' filesystem plugin.

**Kind**: global class  

* [PluginFilesystemClient](#PluginFilesystemClient)
    * [.getTree()](#PluginFilesystemClient+getTree) ⇒ <code>Object</code>
    * [.onUpdate(callback, [executeListener])](#PluginFilesystemClient+onUpdate) ⇒ <code>function</code>
    * [.getTreeAsUrlMap(filterExt, [keepExtension])](#PluginFilesystemClient+getTreeAsUrlMap) ⇒ <code>Object</code>
    * [.findInTree(path)](#PluginFilesystemClient+findInTree) ⇒ <code>Object</code>
    * [.writeFile(filename, data)](#PluginFilesystemClient+writeFile) ⇒ <code>Promise</code>
    * [.mkdir(pathname)](#PluginFilesystemClient+mkdir) ⇒ <code>Promise</code>
    * [.rename(oldPath, newPath)](#PluginFilesystemClient+rename) ⇒ <code>Promise</code>
    * [.rm(oldPath, newPath)](#PluginFilesystemClient+rm) ⇒ <code>Promise</code>

<a name="PluginFilesystemClient+getTree"></a>

#### pluginFilesystemClient.getTree() ⇒ <code>Object</code>
Return the current filesystem tree.

**Kind**: instance method of [<code>PluginFilesystemClient</code>](#PluginFilesystemClient)  
<a name="PluginFilesystemClient+onUpdate"></a>

#### pluginFilesystemClient.onUpdate(callback, [executeListener]) ⇒ <code>function</code>
Register a callback to execute when a file is created, modified or deleted
on the underlying directory. The callback will receive the updated `tree`
and the list of `events` describing the modifications made on the tree.

**Kind**: instance method of [<code>PluginFilesystemClient</code>](#PluginFilesystemClient)  
**Returns**: <code>function</code> - Function that unregister the listener when executed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Callback function to execute |
| [executeListener] | <code>boolean</code> | <code>false</code> | If true, execute the given  callback immediately. |

<a name="PluginFilesystemClient+getTreeAsUrlMap"></a>

#### pluginFilesystemClient.getTreeAsUrlMap(filterExt, [keepExtension]) ⇒ <code>Object</code>
Return the tree as flat map of `<filename, url>`

**Kind**: instance method of [<code>PluginFilesystemClient</code>](#PluginFilesystemClient)  
**Returns**: <code>Object</code> - Map of `<filename, url>`  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filterExt | <code>String</code> |  | File extension to retrieve in the list |
| [keepExtension] | <code>Boolean</code> | <code>false</code> | Keep or remove the file extension  from the keys |

<a name="PluginFilesystemClient+findInTree"></a>

#### pluginFilesystemClient.findInTree(path) ⇒ <code>Object</code>
Return a node from the tree matching the given path.

**Kind**: instance method of [<code>PluginFilesystemClient</code>](#PluginFilesystemClient)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path of the node to be retrieved. |

<a name="PluginFilesystemClient+writeFile"></a>

#### pluginFilesystemClient.writeFile(filename, data) ⇒ <code>Promise</code>
Write a file

**Kind**: instance method of [<code>PluginFilesystemClient</code>](#PluginFilesystemClient)  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the file. |
| data | <code>String</code> \| <code>Blob</code> | Content of the file. |

<a name="PluginFilesystemClient+mkdir"></a>

#### pluginFilesystemClient.mkdir(pathname) ⇒ <code>Promise</code>
Create a directory

**Kind**: instance method of [<code>PluginFilesystemClient</code>](#PluginFilesystemClient)  

| Param | Type | Description |
| --- | --- | --- |
| pathname | <code>String</code> | Path of the directory. |

<a name="PluginFilesystemClient+rename"></a>

#### pluginFilesystemClient.rename(oldPath, newPath) ⇒ <code>Promise</code>
Rename a file or directory

**Kind**: instance method of [<code>PluginFilesystemClient</code>](#PluginFilesystemClient)  

| Param | Type | Description |
| --- | --- | --- |
| oldPath | <code>String</code> | Current pathname. |
| newPath | <code>String</code> | New pathname. |

<a name="PluginFilesystemClient+rm"></a>

#### pluginFilesystemClient.rm(oldPath, newPath) ⇒ <code>Promise</code>
Delete a file or directory

**Kind**: instance method of [<code>PluginFilesystemClient</code>](#PluginFilesystemClient)  

| Param | Type | Description |
| --- | --- | --- |
| oldPath | <code>String</code> | Current pathname. |
| newPath | <code>String</code> | New pathname. |

<a name="PluginFilesystemServer"></a>

### PluginFilesystemServer
Server-side representation of the soundworks' filesystem plugin.

**Kind**: global class  

* [PluginFilesystemServer](#PluginFilesystemServer)
    * [new PluginFilesystemServer()](#new_PluginFilesystemServer_new)
    * [.switch(options)](#PluginFilesystemServer+switch)
    * [.getTree()](#PluginFilesystemServer+getTree) ⇒ <code>Object</code>
    * [.onUpdate(callback, [executeListener])](#PluginFilesystemServer+onUpdate) ⇒ <code>function</code>
    * [.findInTree(path)](#PluginFilesystemServer+findInTree) ⇒ <code>Object</code>
    * [.writeFile(filename, data)](#PluginFilesystemServer+writeFile) ⇒ <code>Promise</code>
    * [.mkdir(pathname)](#PluginFilesystemServer+mkdir) ⇒ <code>Promise</code>
    * [.rename(oldPath, newPath)](#PluginFilesystemServer+rename) ⇒ <code>Promise</code>
    * [.rm(oldPath, newPath)](#PluginFilesystemServer+rm) ⇒ <code>Promise</code>

<a name="new_PluginFilesystemServer_new"></a>

#### new PluginFilesystemServer()
The constructor should never be called manually. The plugin will be
instantiated by soundworks when registered in the `pluginManager`

Available options:
- `dirname` {String} - directory to watch into
- `publicPath` {String} - (optionnal) optionnal public path for the assets.
 If set, a route will be added to the router to serve the assets and an
 `url` entry will be added to each node of the tree.
- `depth` {String} - (optionnal) Maximum depth to watch in the file structure.

If no option is given, for example before a user selects a project, the plugin
will stay idle until `switch` is called.

**Example**  
```js
server.pluginManager.register('filesystem', filesystemPlugin, {
  dirname: 'my-dir',
  publicPath: 'assets'
});
```
<a name="PluginFilesystemServer+switch"></a>

#### pluginFilesystemServer.switch(options)
Switch the filesystem to a new directory, e.g. to change project while
keeping the same plugin and related logic at hand.

**Kind**: instance method of [<code>PluginFilesystemServer</code>](#PluginFilesystemServer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.dirname] | <code>String</code> | <code></code> | directory to watch, plugin is idle  if null |
| [options.publicPath] | <code>String</code> | <code></code> | optionnal public path for the  assets. If set, a route will be added to the router to serve the assets and  an `url` entry will be added to each node of the tree. |

<a name="PluginFilesystemServer+getTree"></a>

#### pluginFilesystemServer.getTree() ⇒ <code>Object</code>
Return the current filesystem tree.

**Kind**: instance method of [<code>PluginFilesystemServer</code>](#PluginFilesystemServer)  
<a name="PluginFilesystemServer+onUpdate"></a>

#### pluginFilesystemServer.onUpdate(callback, [executeListener]) ⇒ <code>function</code>
Register a callback to execute when a file is created, modified or deleted
on the underlying directory. The callback will receive the updated `tree`
and the list of `events` describing the modifications made on the tree.

**Kind**: instance method of [<code>PluginFilesystemServer</code>](#PluginFilesystemServer)  
**Returns**: <code>function</code> - Function that unregister the listener when executed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Callback function to execute |
| [executeListener] | <code>boolean</code> | <code>false</code> | If true, execute the given  callback immediately. |

<a name="PluginFilesystemServer+findInTree"></a>

#### pluginFilesystemServer.findInTree(path) ⇒ <code>Object</code>
Return a node from the tree matching the given path.

**Kind**: instance method of [<code>PluginFilesystemServer</code>](#PluginFilesystemServer)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | path of the node to be retrieved |

<a name="PluginFilesystemServer+writeFile"></a>

#### pluginFilesystemServer.writeFile(filename, data) ⇒ <code>Promise</code>
Write a file

**Kind**: instance method of [<code>PluginFilesystemServer</code>](#PluginFilesystemServer)  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>String</code> | Name of the file. |
| data | <code>String</code> \| <code>Blob</code> | Content of the file. |

<a name="PluginFilesystemServer+mkdir"></a>

#### pluginFilesystemServer.mkdir(pathname) ⇒ <code>Promise</code>
Create a directory

**Kind**: instance method of [<code>PluginFilesystemServer</code>](#PluginFilesystemServer)  

| Param | Type | Description |
| --- | --- | --- |
| pathname | <code>String</code> | Path of the directory. |

<a name="PluginFilesystemServer+rename"></a>

#### pluginFilesystemServer.rename(oldPath, newPath) ⇒ <code>Promise</code>
Rename a file or directory

**Kind**: instance method of [<code>PluginFilesystemServer</code>](#PluginFilesystemServer)  

| Param | Type | Description |
| --- | --- | --- |
| oldPath | <code>String</code> | Current pathname. |
| newPath | <code>String</code> | New pathname. |

<a name="PluginFilesystemServer+rm"></a>

#### pluginFilesystemServer.rm(oldPath, newPath) ⇒ <code>Promise</code>
Delete a file or directory

**Kind**: instance method of [<code>PluginFilesystemServer</code>](#PluginFilesystemServer)  

| Param | Type | Description |
| --- | --- | --- |
| oldPath | <code>String</code> | Current pathname. |
| newPath | <code>String</code> | New pathname. |


<!-- apistop -->

## Credits

[https://soundworks.dev/credits.html](https://soundworks.dev/credits.html)

## License

[BSD-3-Clause](./LICENSE)
