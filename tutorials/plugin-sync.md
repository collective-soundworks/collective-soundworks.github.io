# Using Plugins 2 - The _sync_ Plugin

In this tutorial, we will dig into a very important problem when dealing with distributed system, and moreover in musical context, i.e. how to synchronize events across the different devices that compose our system.

After a short introduction about why this can be an issue and of the underlying concepts involved in synchronizing devices on a network, we will learn how to use the [`@soundworks/plugin-sync`](https://github.com/collective-soundworks/soundworks-plugin-sync) plugin which is proposed to solve this particular class of problems.

> The final source code of this tutorial can be found [here](https://github.com/collective-soundworks/tutorials/tree/main/plugin-sync)

### Related documentation

- [@soundworks/plugin-sync](https://github.com/collective-soundworks/soundworks-plugin-sync)
- [Synchronisation for Distributed Audio Rendering over Heterogeneous Devices, in HTML5](https://hal.science/hal-01304889v1)

## Introduction

First of all let's start with a bit of theory to understand the general concepts and theory behind the _sync_ plugin.

### The "Why"

An important thing to understand when working with system composed of multiple devices is that each of them will live into a different timeline. Or to say it in a more formal way:

> _« An important observation is that, as a consequence of dealing with independent nodes, **each one will have its own notion of time**. In other words, we cannot assume that there is something like a global clock. This lack of a common reference of time leads to fundamental questions regarding the synchronization and coordination within a distributed system. »_ Maarten van Steen, and Andrew S. Tanenbaum. “A Brief Introduction to Distributed Systems.” Computing 98, no. 10, October 2016.

Indeed, each device has different physical clocks, each of them having a different time origin and furthermore a different speed. Most of the time, i.e. when we use our computers in our daily life, this is something we don't perceive as users, but only because our computers are constantly synchronizing themselves with reference clocks through the network thanks to the [Network Time Protocol (NTP)](https://en.wikipedia.org/wiki/Network_Time_Protocol).

We could consider at this point that the problem is solved, i.e. let's use NTP! But unfortunately the problem is a bit more complicated in our context.

First, we cannot always assume that our devices will be connected to the Internet and thus able to connect to a NTP server. Indeed, in many situations, you will have to and/or want to create you own local network, and this, for several reasons: e.g. the venue where your artwork is presented has a poor network installation, you want to have some control over what happen on the network to make sure the bandwidth is properly used, etc.

Second, when you want to produce sounds in a synchronized way, the clocks that are of interest for you are not the _system clocks_ but the _audio clocks_. Furthermore, we cannot assume that these two clocks, the system and the audio clocks, 1. share the same origin, e.g. the origin of `AudioContext.currentTime` is defined as when the context is resumed, and 2. that they even advance at the same speed, i.e. this is likely that the system and the sound card don't share the same physical clock.

For all these reason, it is important in our context to have some way of synchronizing _arbitrary clocks_ without relying on external resources such as a NTP server.

### The "How"

On a more practical manner, we can thus consider that when trying to synchronize 2 clocks, we face a problem that can be expressed in the following form:

- **T<sub>clock1</sub> = a * T<sub>clock2</sub> + b**

Where:
- _a_ is the speed difference between the two clocks, i.e. their _drift_
- _b_ is the origin offset, i.e. the delta time between their respective origin

For the sake of keeping things simple, in this tutorial, we will consider the ideal case where 1. the respective speed of the clocks is exactly the same, i.e. `a = 1` and 2. the time of the propagation of a message on the network is constant (disclaimer, none of these assumptions are true in real life...). Hence, the goal will be to estimate _b_ so that we can calculate _T<sub>clock1</sub>_ from _T<sub>clock2</sub>_ and inversely.

To achieve that, we need a clock that we consider as a reference, in our case the most simple is to use a clock provided by the server as all clients are connected to it. Then, as shown in the figure below, the clients will periodically ask the server for its current time, to calculate the offset of their respective clocks:

![sync-process](../assets/tutorials/plugin-sync/sync-process.png)

More precisely at each iteration:
1. The client takes its current time (_t<sub>ping</sub>_),
2. The client sends a message to the server which takes its time tag at message reception (_T<sub>ping</sub>_)
3. Then, the server sends back a time tagged message to the client (_T<sub>pong</sub>_)
4. The client takes its local time (_t<sub>pong</sub>_) at reception of the message from the server.

![ping-pong](../assets/tutorials/plugin-sync/ping-pong.png)

Hence if we assume that the travel duration of the _ping_ and _pong_ messages are equal, we can compute the _offset_ between the 2 clocks as the following:
- T<sub>reference</sub> = (T<sub>pong</sub> - T<sub>ping</sub>) / 2
- t<sub>local</sub> = (t<sub>pong</sub> - t<sub>ping</sub>) / 2
- offset = t<sub>local</sub> - T<sub>reference</sub>

From this point, it is then possible for all clients of our network to calculate a local estimation of the server clock. With such information, it therefore become possible for our clients to schedule audio or musical events in the same inferred time reference, while scheduling the actual audio synthesis in their own local audio time.

While this explanation is indeed simplified, we hope it gives you some intuition on the logic behind the synchronization process between different nodes on a network.

Let's now experiment with the `@soundworks/plugin-sync` to see how all these ideas translate into code.

## Scaffolding the application

First thing first, let's create a new project using the _soundworks_ wizard:

```sh
cd /path/to/working/directory
npx @soundworks/create@latest plugin-sync
```

When the wizard will ask you to select the plugins you would like to install, select the `@soundworks/plugin-platform-init` and the `@soundworks/plugin-sync`:

```ansi
[0;36m# Install plugins[0m[0m
[0;36m?[0m [0;1mSelect the plugins you would like to install/uninstall[0m [0;90m›[0m [0;90m- Space to select. Return to submit[0m [0m
[0;32m◉[0m   @soundworks/plugin-platform-init[0m
[0;32m◉[0m   [0;36;4m@soundworks/plugin-sync[0m[0m
◯   @soundworks/plugin-filesystem[0m
◯   @soundworks/plugin-scripting[0m
◯   @soundworks/plugin-checkin[0m
◯   @soundworks/plugin-position[0m
◯   @soundworks/plugin-logger[0m
```

And the `@ircam/sc-components` library:

```ansi
[0;36m# Install libraries[0m[0m
[0;36m?[0m [0;1mSelect the libraries you would like to install/uninstall[0m [0;90m›[0m [0;90m- Space to select. Return to submit[0m [0m
[0;32m◉[0m   [0;36;4m@ircam/sc-components[0m[0m
◯   @ircam/sc-scheduling[0m
◯   @ircam/sc-utils[0m
◯   node-web-audio-api[0m
```

Then, when the wizard will ask you for the configuration of the default client:
- Name it `player`
- Select the `browser` target
- Select the `default` template

```ansi
[0;36m# Create client[0m[0m
[0;32m✔[0m [0;1mName of your new client (lowercase, no-space):[0m [0;90m…[0m player[0m
[0;32m✔[0m [0;1mWhich runtime for your client?[0m [0;90m›[0m browser[0m
[0;32m✔[0m [0;1mWhich template would you like to use?[0m [0;90m›[0m default[0m
[0m
- Creating client "player" in file "src/clients/player.js"[0m
- name: [0;36mplayer[0m[0m
- runtime: [0;36mbrowser[0m[0m
- template: [0;36mdefault[0m[0m
- default: [0;36mtrue[0m[0m
[0m
[0;36m?[0m [0;1mConfirm?[0m [0;90m›[0m no [0;90m/[0m [0;36;4myes[0m
```

Finally, open the new `plugin-sync` directory in your favorite editor and launch the application in development mode:

```sh
cd plugin-sync
npm run dev
```

## Using the _sync_ plugin

### Register the plugin

Now that everything is ready let's start with installing our plugin both on the server and on the client side.

Open the `src/server.js` file and add the following code:

```js
// src/server.js
import { Server } from '@soundworks/core/server.js';
import { loadConfig, configureHttpRouter } from '@soundworks/helpers/server.js';
import ServerPluginSync from '@soundworks/plugin-sync/server.js'; // [!code ++]

// ...

const server = new Server(config);
configureHttpRouter(server);
server.pluginManager.register('sync', ServerPluginSync); // [!code ++]
```

Then on the client-side, in the `src/clients/player.js`:

```js
// src/clients/player.js
import { Client } from '@soundworks/core/client.js';
import { loadConfig, launcher } from '@soundworks/helpers/browser.js';
import ClientPluginSync from '@soundworks/plugin-sync/client.js'; // [!code ++]

// ...

const client = new Client(config);
client.pluginManager.register('sync', ClientPluginSync); // [!code ++]
```

If you launch a client, i.e. [http://127.0.0.1:8000](http://127.0.0.1:8000), you should now see a screen telling you that the synchronizing process is on-going at startup:

![sync-screen](../assets/tutorials/plugin-sync/sync-screen.png)

Finally, let's add a bit of code to display the current reference time as estimated by the client, alongside its local time:

```js
// src/clients/player.js
await client.start();
// retrieve the sync plugin instance
const sync = await client.pluginManager.get('sync'); // [!code ++]

function renderApp() {
  render(html`
    <div class="simple-layout">
      <p>Hello ${client.config.app.name}!</p> // [!code --]
      <p>localTime: ${sync.getLocalTime()}</p> // [!code ++]
      <p>syncTime: ${sync.getSyncTime()}</p> // [!code ++]

      <sw-credits .infos="${client.config.app}"></sw-credits>
    </div>
  `, $container);

  // refresh the screen at 60 fps // [!code ++]
  window.requestAnimationFrame(renderApp); // [!code ++]
}

renderApp();
```

If you now open several browser windows side by side, you should see how the synchronization process allows to estimate a common reference clock (i.e. `syncTime`) alongside their own local clock (i.e. `localTime`):

![sync-clients](../assets/tutorials/plugin-sync/sync-clients.png)

## Synchronizing the audio context

So far so good, but what we are interested in is to synchronize the clock of an `AudioContext` to synchronize our audio events.

By default, the _sync_ plugin uses a default clock which is either [`Date.now`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/now) or [`performance.now`](https://developer.mozilla.org/docs/Web/API/Performance/now) depending on the runtime (i.e. browser or Node.js). However, it is indeed possible to configure it to use another clock, such as the one provided by [`AudioContext.currentTime`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/currentTime). Let's see how to implement that.

First, we will to setup the `@soundworks/plugin-platform-init` plugin which will allow us to resume the `AudioContext` and thus have a working clock. Indeed, if we used an `AudioContext` in default `suspended` state, the current time would always be zero, which would not be very useful for synchronizing...

Let's then add the following code in the `src/server.js` file:

```js
// src/server.js
import { loadConfig, configureHttpRouter } from '@soundworks/helpers/server.js';
import ServerPluginPlatformInit from '@soundworks/plugin-platform-init/server.js'; // [!code ++]
import ServerPluginSync from '@soundworks/plugin-sync/server.js';

// ...

server.pluginManager.register('platform-init', ServerPluginPlatformInit); // [!code ++]
server.pluginManager.register('sync', ServerPluginSync);
```

And the following on the client side, to resume our `AudioContext` when the user clicks on the screen:

```js
// src/clients/player.js
import ClientPluginPlatformInit from '@soundworks/plugin-platform-init/client.js'; // [!code ++]
import ClientPluginSync from '@soundworks/plugin-sync/client.js';

// ...

const client = new Client(config);
const audioContext = new AudioContext(); // [!code ++]

client.pluginManager.register('platform-init', ClientPluginPlatformInit, { // [!code ++]
  audioContext, // [!code ++]
}); // [!code ++]
client.pluginManager.register('sync', ClientPluginSync);
```

Finally, let configure further the _sync_ plugin so that it uses the clock provided by the `AudioContext` and starts the synchronization process only when the audio context is properly resumed:

```js
// src/clients/player.js
client.pluginManager.register('sync', pluginSync); // [!code --]
client.pluginManager.register('sync', pluginSync, { // [!code ++]
  // use the audio context clock // [!code ++]
  getTimeFunction: () => audioContext.currentTime, // [!code ++]
  // declare the 'platform-init' plugin as a dependency, so that the // [!code ++]
  // sync process starts only when the audio context is resumed // [!code ++]
}, ['platform-init']); // [!code ++]
```

And that's all, we now have a synchronization process estimating the server reference time using the clock provided by our audio context.

## Trigger a synchronized audio event

Now that everything is set up, let's just trigger some synchronized sound between all our `player` clients. The general idea will be that anytime a user clicks on a button, a sound will be played back in a synchronized manner on all clients 0.5 second after the click.

To that end, let's first create a shared state to propagate the synchronized time at which the sound should be played:

```js
// src/server.js
server.stateManager.defineClass('global', { // [!code ++]
  triggerTime: { // [!code ++]
    type: 'float', // [!code ++]
    event: true, // [!code ++]
  }, // [!code ++]
}); // [!code ++]

await server.start();
// create a global state on which all clients will attach // [!code ++]
const _ = await server.stateManager.create('global'); // [!code ++]
```

Then in our `player` clients, let's import a button component and attach to this state:

```js
// src/clients/player.js
import { html, render } from 'lit';
import '@ircam/sc-components/sc-button.js'; // [!code ++]

// ...

await client.start();
const global = await client.stateManager.attach('global'); // [!code ++]
```

Now let's update our interface so that when the user click the button, the `global` shared state is updated with the current sync time to which we add our offset of 0.5 seconds:

```js
// src/clients/player.js
function renderApp() {
  render(html`
    <div class="simple-layout">
      <p>localTime: ${sync.getLocalTime()}</p>
      <p>syncTime: ${sync.getSyncTime()}</p>

      <sc-button // [!code ++]
        @input=${e => global.set('triggerTime', sync.getSyncTime() + 0.5)} // [!code ++]
      >trigger sound</sc-button> // [!code ++]

      <sw-credits .infos="${client.config.app}"></sw-credits>
    </div>
  `, $container);
  // ...
}
```

Finally, let's react to the update of the global state to trigger a sound at the given synchronized time.
The main idea will be to convert the synchronized time into the local audio time to trigger the sound at the right moment.

```js
// src/clients/player.js
const global = await client.stateManager.attach('global');
const sync = await client.pluginManager.get('sync');

global.onUpdate(updates => { // [!code ++]
  if ('triggerTime' in updates) { // [!code ++]
    // trigger time is in the synchronized timeline // [!code ++]
    const syncTime = updates.triggerTime; // [!code ++]
    // convert this time to the local audio timeline // [!code ++]
    const audioTime = sync.getLocalTime(syncTime); // [!code ++]
    // let's now trigger a random frequency at this exact moment // [!code ++]
    const frequency = 200 + Math.random() * 400; // [!code ++]
    const osc = new OscillatorNode(audioContext, { frequency }); // [!code ++]
    osc.connect(audioContext.destination); // [!code ++]
    osc.start(audioTime); // [!code ++]
    osc.stop(audioTime + 0.1); // [!code ++]
  } // [!code ++]
}); // [!code ++]
```

And tada! If you now open several clients at once, e.g. [http://127.0.0.1:8000/?emulate=3](http://127.0.0.1:8000/?emulate=3), and click on a button, you should ear the different oscillators playing all together (with a nice dirty click at the end due to the lack of envelop :)).

## Conclusion

In this tutorial, you have learned the reasons and general concepts behind clock synchronization in a distributed system, and learned how to use the _sync_ plugin provided by _soundworks_ to synchronize audio events.

In the next tutorial, we will go further and use this new tool in a more musical way by implementing a distributed step sequencer.


