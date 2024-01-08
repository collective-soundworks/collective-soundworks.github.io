# soundworks | plugin checkin

[![npm version](https://badge.fury.io/js/@soundworks%2Fplugin-checkin.svg)](https://badge.fury.io/js/@soundworks%2Fplugin-checkin)

[`soundworks`](https://soundworks.dev) plugin to assign a unique index to the clients among the available ones. 

When a client disconnects, it's index is recycled into the pool of available indexes and can be re-assigned to a newly connected client. The number of available indexes can be limited and can be associated to additional data.

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Server](#server)
  * [Client](#client)
- [API](#api)
  * [Classes](#classes)
  * [PluginCheckinClient](#plugincheckinclient)
  * [PluginCheckinServer](#plugincheckinserver)
- [Credits](#credits)
- [License](#license)

<!-- tocstop -->

## Installation

```sh
npm install @soundworks/plugin-checkin --save
```

## Usage

### Server

```js
// index.js
import { Server } from '@soundworks/core/server.js';
import pluginCheckin from '@soundworks/plugin-checkin/server.js';

const server = new Server();
server.pluginManager.register('checkin', pluginCheckin);
```

### Client

```js
// index.js
import { Client } from '@soundworks/core/client.js';
import pluginCheckin from '@soundworks/plugin-checkin/client.js';

const client = new Client();
client.pluginManager.register('checkin', pluginCheckin);

await client.start();

const checkin = await client.pluginManager.get('checkin');
const index = checkin.getIndex();
```

## API

<!-- api -->

### Classes

<dl>
<dt><a href="#PluginCheckinClient">PluginCheckinClient</a></dt>
<dd><p>Client-side representation of the soundworks&#39; checkin plugin.</p>
</dd>
<dt><a href="#PluginCheckinServer">PluginCheckinServer</a></dt>
<dd><p>Server-side representation of the soundworks&#39; checkin plugin.</p>
</dd>
</dl>

<a name="PluginCheckinClient"></a>

### PluginCheckinClient
Client-side representation of the soundworks' checkin plugin.

**Kind**: global class  

* [PluginCheckinClient](#PluginCheckinClient)
    * [.getIndex()](#PluginCheckinClient+getIndex) ⇒ <code>number</code>
    * [.getData()](#PluginCheckinClient+getData) ⇒ <code>mixed</code>

<a name="PluginCheckinClient+getIndex"></a>

#### pluginCheckinClient.getIndex() ⇒ <code>number</code>
Return the unique index given to the client

**Kind**: instance method of [<code>PluginCheckinClient</code>](#PluginCheckinClient)  
<a name="PluginCheckinClient+getData"></a>

#### pluginCheckinClient.getData() ⇒ <code>mixed</code>
Return the associated data given to the client (if any)

**Kind**: instance method of [<code>PluginCheckinClient</code>](#PluginCheckinClient)  
<a name="PluginCheckinServer"></a>

### PluginCheckinServer
Server-side representation of the soundworks' checkin plugin.

**Kind**: global class  
<a name="new_PluginCheckinServer_new"></a>

#### new PluginCheckinServer()
The constructor should never be called manually. The plugin will be
instantiated by soundworks when registered in the `pluginManager`

Available options:
- `capacity` {number} [Infinity] - Number of available indexes
- `data` {array} - optionnal data associated to a given index.

**Example**  
```js
server.pluginManager.register('checkin', pluginCheckin, {
  capacity: 3,
  data: [{ color: 'green' }, { color: 'yellow' }, { color: 'pink' }],
});
```

<!-- apistop -->

## Credits

[https://soundworks.dev/credits.html](https://soundworks.dev/credits.html)

## License

[BSD-3-Clause](./LICENSE)
