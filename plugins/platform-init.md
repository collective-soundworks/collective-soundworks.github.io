# soundworks | plugin platform init

[![npm version](https://badge.fury.io/js/@soundworks%2Fplugin-platform-init.svg)](https://badge.fury.io/js/@soundworks%2Fplugin-platform)

[`soundworks`](https://soundworks.dev) plugin to handle initialization of browser client features that require a user interaction such as resuming audio context, etc. 

**_Tutorial_**: [https://soundworks.dev/tutorials/plugin-platform-init.html](https://soundworks.dev/tutorials/plugin-platform-init.html)

## Table of Contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Server](#server)
  * [Client](#client)
- [Available features](#available-features)
- [API](#api)
  * [Classes](#classes)
  * [PluginPlatformInitClient](#pluginplatforminitclient)
  * [PluginPlatformInitServer](#pluginplatforminitserver)
- [Credits](#credits)
- [License](#license)

<!-- tocstop -->

## Installation

```sh
npm install @soundworks/plugin-platform-init --save
```

## Usage

### Server

```js
// src/server/index.js
import { Server } from '@soundworks/core/server.js';
import platformInitPlugin from '@soundworks/plugin-platform-init/server.js';

const server = new Server(config);
// 
server.pluginManager.register('platform-init', platformInitPlugin);
```

### Client

```js
// src/clients/**/index.js
import { Client } from '@soundworks/core/client.js';
import platformInitPlugin from '@soundworks/plugin-platform-init/client.js';

const audioContext = new AudioContext();

const client = new Client(config);
// pass the audio context to the plugin will automatically generate a landing page 
// for resuming the audio context
client.pluginManager.register('platform-init', platformInitPlugin, { audioContext });

await client.start();

console.log(audioContext.state === 'running');
```

## Available features

By default, the `@soundworks/plugin-platform-init` provide a way to resume audio context (as shown above) but also to access microphone, camera streams, and motion sensors throught the [`@ircam/devicemotion`](https://www.npmjs.com/package/@ircam/devicemotion) package.

```sh
npm install --save @ircam/devicemotion
```

```js
// src/clients/**/index.js
import { Client } from '@soundworks/core/client.js';
import platformInitPlugin from '@soundworks/plugin-platform-init/client.js';
import devicemotion from '@ircam/devicemotion';

const client = new Client(config);

client.pluginManager.register('platform-init', platformInitPlugin, { 
  microphone: true,
  camera: true,
  devicemotion,
});

await client.start();

const platformInit = await client.pluginManager.get('platform-init');

const micStream = platformInit.get('microphone');
const cameraStream = platformInit.get('camera');
devicemotion.addEventListener(e => console.log(e));
```

_Note that these additional features require a https connection._

You can also add any arbitraty logic by passing a function to the `onCheck` and 
`onActivate` options:

```js
let onCheckCalled = false;
let onActivateCalled = false;

client.pluginManager.register('platform-init', platformInitPlugin, {
  onCheck: (plugin) => {
    onCheckCalled = true;
    return Promise.resolve();
  },
  onActivate: (plugin) => {
    onActivateCalled = true;
    return Promise.resolve();
  }
});
```

## API

<!-- api -->

### Classes

<dl>
<dt><a href="#PluginPlatformInitClient">PluginPlatformInitClient</a></dt>
<dd><p>Client-side representation of the soundworks&#39; platform init plugin.</p>
</dd>
<dt><a href="#PluginPlatformInitServer">PluginPlatformInitServer</a></dt>
<dd><p>Client-side representation of the soundworks&#39; platform init plugin.</p>
</dd>
</dl>

<a name="PluginPlatformInitClient"></a>

### PluginPlatformInitClient
Client-side representation of the soundworks' platform init plugin.

**Kind**: global class  

* [PluginPlatformInitClient](#PluginPlatformInitClient)
    * [new PluginPlatformInitClient()](#new_PluginPlatformInitClient_new)
    * [.onUserGesture()](#PluginPlatformInitClient+onUserGesture)
    * [.get(featureId)](#PluginPlatformInitClient+get)

<a name="new_PluginPlatformInitClient_new"></a>

#### new PluginPlatformInitClient()
The constructor should never be called manually. The plugin will be
instantiated by soundworks when registered in the `pluginManager`

Available options:
- `audioContext` {AudioContext} - instance audio context to be resumed
  aliases: ['webaudio', 'audio-context', 'audioContext']
- `devicemotion` {DeviceMotion} - `@ircam/devicemotion` module.
  aliases: ['devicemotion', 'device-motion']
- `micro` {Boolean} - create a microphone stream with all feature (i.e.
  echoCancellation, noiseReduction, autoGainControl) set to false.
  + aliases: ['mic', 'micro']
  + todo: implement `deviceId`
- `video` {Boolean} - create a camera stream
  + todo: implement `deviceId`
- `onCheck` {Function} - function executed when the plugin is started to check
  for example if the feature is available. The provided function should return
  a Promise.
- `onActive` {Function} - function executed on the user gesture to init a feature.
  The provided function should return a Promise.

**Example**  
```js
client.pluginManager.register('platform-init', platformInitPlugin, { audioContext });
```
<a name="PluginPlatformInitClient+onUserGesture"></a>

#### pluginPlatformInitClient.onUserGesture()
Method to be executed by the application on the first user gesture. Calling
this method several times will result in a no-op after the first call.

By default, this method is automatically called by the soundworks launcher,
you should not have to call it manually in most cases.

**Kind**: instance method of [<code>PluginPlatformInitClient</code>](#PluginPlatformInitClient)  
**Example**  
```js
myView.addEventListener((e) => {
  platformPlugin.onUserGesture(e);
});
```
<a name="PluginPlatformInitClient+get"></a>

#### pluginPlatformInitClient.get(featureId)
Returns the poayload associated to a given feature.

**Kind**: instance method of [<code>PluginPlatformInitClient</code>](#PluginPlatformInitClient)  

| Param | Type | Description |
| --- | --- | --- |
| featureId | <code>String</code> | Id of the feature as given when the plugin was  registered |

<a name="PluginPlatformInitServer"></a>

### PluginPlatformInitServer
Client-side representation of the soundworks' platform init plugin.

**Kind**: global class  

<!-- apistop -->

## Credits

[https://soundworks.dev/credits.html](https://soundworks.dev/credits.html)

## License

[BSD-3-Clause](./LICENSE)
