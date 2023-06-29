# soundworks | plugin position

[![npm version](https://badge.fury.io/js/@soundworks%2Fplugin-position.svg)](https://badge.fury.io/js/@soundworks%2Fplugin-position)

[`soundworks`](https://soundworks.dev) plugin for locating people in an area. 

When registered the soundworks launcher will automatically provide an interface so that people can give give their approximate position on a map or area.

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Server](#server)
  * [Client](#client)
- [API](#api)
  * [Classes](#classes)
  * [PluginPositionClient](#pluginpositionclient)
  * [PluginPositionServer](#pluginpositionserver)
- [Credits](#credits)
- [License](#license)

<!-- tocstop -->

## Installation

```sh
npm install @soundworks/plugin-position --save
```

## Usage

### Server

```js
// index.js
import { Server } from '@soundworks/core/server.js';
import pluginPosition from '@soundworks/plugin-position/server.js';

const server = new Server();
server.pluginManager.register('position', pluginPosition, {
  // these values define the coordinates system of the area, they have
  // no special meaning and could be in any unit you find useful for
  // your application, defaults to [0, 1]
  xRange: [0, 2],
  yRange: [-1, 1],
  // define a background image that will be displayed by the launcher view
  backgroundImage: 'public/path/to/map.png'
}, []);

await server.start();
```

### Client

```js
// index.js
import { Client } from '@soundworks/core/client.js';
import pluginPosition from '@soundworks/plugin-position/client.js';

const client = new Client();
client.pluginManager.register('position', pluginPosition, {}, []);

await client.start();

const position = await client.pluginManager.get('position');
const clientPosition = position.getPosition();
```

## API

<!-- api -->

### Classes

<dl>
<dt><a href="#PluginPositionClient">PluginPositionClient</a></dt>
<dd><p>Client-side representation of the soundworks&#39; position plugin.</p>
</dd>
<dt><a href="#PluginPositionServer">PluginPositionServer</a></dt>
<dd><p>Server-side representation of the soundworks&#39; position plugin.</p>
</dd>
</dl>

<a name="PluginPositionClient"></a>

### PluginPositionClient
Client-side representation of the soundworks' position plugin.

**Kind**: global class  

* [PluginPositionClient](#PluginPositionClient)
    * [new PluginPositionClient()](#new_PluginPositionClient_new)
    * [.setPosition(x, y)](#PluginPositionClient+setPosition)
    * [.getPosition()](#PluginPositionClient+getPosition) ⇒ <code>Object</code>
    * [.setNormalizedPosition(x, y)](#PluginPositionClient+setNormalizedPosition)
    * [.getNormalizedPosition()](#PluginPositionClient+getNormalizedPosition) ⇒ <code>Object</code>

<a name="new_PluginPositionClient_new"></a>

#### new PluginPositionClient()
The constructor should never be called manually. The plugin will be
instantiated by soundworks when registered in the `pluginManager`

Available options:
- `randomize` {Boolean} - Autoamtically give a random position to the client.
  Useful for testing

**Example**  
```js
client.pluginManager.register('position', positionPlugin, { randomize: true });
```
<a name="PluginPositionClient+setPosition"></a>

#### pluginPositionClient.setPosition(x, y)
Set the x and y position of the client in the given ranges units.

By default, this method is automatically called by the soundworks launcher,
you should not have to call it manually in most cases.

**Kind**: instance method of [<code>PluginPositionClient</code>](#PluginPositionClient)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | x position in the given ranges units. |
| y | <code>Number</code> | y position in the given ranges units. |

<a name="PluginPositionClient+getPosition"></a>

#### pluginPositionClient.getPosition() ⇒ <code>Object</code>
Retrieve the given position in the given ranges units.

**Kind**: instance method of [<code>PluginPositionClient</code>](#PluginPositionClient)  
**Returns**: <code>Object</code> - - x / y position of the client.  
<a name="PluginPositionClient+setNormalizedPosition"></a>

#### pluginPositionClient.setNormalizedPosition(x, y)
Set the x and y position of the client in normalized units.

By default, this method is automatically called by the soundworks launcher,
you should not have to call it manually in most cases.

**Kind**: instance method of [<code>PluginPositionClient</code>](#PluginPositionClient)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | x position in normalized units. |
| y | <code>Number</code> | y position in normalized units. |

<a name="PluginPositionClient+getNormalizedPosition"></a>

#### pluginPositionClient.getNormalizedPosition() ⇒ <code>Object</code>
Retrieve the given position in normalized units.

**Kind**: instance method of [<code>PluginPositionClient</code>](#PluginPositionClient)  
**Returns**: <code>Object</code> - - normalized x / y position of the client.  
<a name="PluginPositionServer"></a>

### PluginPositionServer
Server-side representation of the soundworks' position plugin.

**Kind**: global class  
<a name="new_PluginPositionServer_new"></a>

#### new PluginPositionServer()
The constructor should never be called manually. The plugin will be
instantiated by soundworks when registered in the `pluginManager`

Available options:
- `xRange` {Array} - Range of the area in the x axis.
- `yRange` {Array} - Range of the area in the y axis.
- `backgroundImage` {String} - Path to a background image to be displayed
  by the launcher view.

**Example**  
```js
server.pluginManager.register('position', positionPlugin, {
  xRange: [0, 2],
  yRange: [-1, 1],
  backgroundImage: 'public/path/to/map.png',
});
```

<!-- apistop -->

## Credits

[https://soundworks.dev/credits.html](https://soundworks.dev/credits.html)

## License

[BSD-3-Clause](./LICENSE)
