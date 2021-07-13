# StateManager Tutorial

> Learn how to use the soundworks' `stateManager` to:
>   - create shared global and local states
>   - remote control and monitor clients of your application
>
> Note that the `stateManager` component can simplifies the development of applications by abstracting in large parts network communications and routing.

## Table of Content

[[toc]]

::: warning @todos
- make a clean code example
- review end of tutorial
:::

## Declaring Schemas

The `stateManager` component makes use of schemas that declare a set of attributes and their properties (you can think of it has the schema of a database table). The schema syntax follows the format described in [https://github.com/ircam-jstools/parameters](https://github.com/ircam-jstools/parameters).

In this application two schemas are declared (cf. `src/server/schemas/`, note that the `schema` directory is not mandatory but looks like a good practice to keep things clean).

- the `globals` schema (cf. `src/server/schemas/globals.js`) is meant to declare a state that will be created by the server, and will thus be unique across the whole application. Every client will be able to attach to the created state, but we guarantee that this state will be kept identical across all of the clients.
Here, the schema declares a global `master` volume and a `mute` flag.

```js
// `src/server/schemas/globals.js`
export default {
  // master volume in dB [-60, 6]
  master: {
    type: 'integer',
    min: -60,
    max: 6,
    step: 1,
    default: 0,
  },
  // mute [true, false]
  mute: {
    type: 'boolean',
    default: false,
  },
};
```

- the `player` schema is dedicated to describing the state of a single player client, meaning that each player will instantiate its own instance of the schema. Other clients (typically a controller) can attach to the player's state to monitor and remotely control the client.
Here the schema declares two oscillator parameters: `type` and `frequency`

```js
// `src/server/schemas/player.js`
export default {
  // dummy oscillator params
  type: {
    type: 'enum',
    list: ['sine', 'square', 'sawtooth', 'triangle'],
    default: 'sine',
  },
  frequency: {
    type: 'integer',
    min: 50,
    max: 1000,
    default: 440,
  },
};
```

## Registering Schemas

- [server.SharedStateManagerServer#registerSchema](http://collective-soundworks.github.io/soundworks/server.SharedStateManagerServer.html#registerSchema)

Once the schemas have been declared, we must register them server-side into the soundworks' `stateManager`. Indeed, the server keeps a local instance of every state created in the application and acts as the only source of ground truth.

A good practice is to do that after the server initialization (`await server.init(...)`, so that the state manager is ready to be used, but before the server start (`await server.start()`), so that we accept client connections when everything is properly configured.

In order to register the schemas, you have to follow the two following steps:

1. import the files where the schemas are declared:
```js
// src/server/index.js (line 15-16)
import globalsSchema from './schemas/globals';
import playerSchema from './schemas/player';
```

2. register the schema to the `stateManager`:

```js
// src/server/index.js (line 59-60)
server.stateManager.registerSchema('globals', globalsSchema);
server.stateManager.registerSchema('player', playerSchema);
```

## Creating States

- [server.SharedStateManagerServer#create](http://collective-soundworks.github.io/soundworks/server.SharedStateManagerServer.html#create)
- [client.SharedStateManagerClient#create](http://collective-soundworks.github.io/soundworks/client.SharedStateManagerClient.html#create)

Once schemas are registered, they can be instantiated by any server or clients `stateManager` (_note: internally the `server.stateManager` is itself a client of the shared state system, except for `registerState` method, its API is thus the same as the client side API_).

Typically, creating a state server-side will allow to share a common state to all the clients of the application. While creating a state client side will create a novel instance of the state for every client, simplifying remote control and monitoring.

```js
// server-side
const state = await server.stateManager.create(schemaName, [defaultValues]);
// or client-side
const state = await client.stateManager.create(schemaName, [defaultValues]);
```

In the example application the `globals` state is created by the server:
```js
// src/server/index.js (line 62)
const globalsState = await server.stateManager.create('globals');
console.log('globalsState:', globalsState.getValues());
// > globalsState: { master: 0, mute: false }
```

While each player creates its own instance of the `player` schema:
```js
// src/clients/player/PlayerExperience.js (line 22-24)
const playerState = await this.client.stateManager.create('player', {
  frequency: Math.round(50 + Math.random() * 950),
});
console.log('playerState:', playerState.getValues());
// > playerState: {type: "sine", frequency: 513}
```
As we want every client connecting to play a different frequency, we initialize the state with a random value.

## Attaching to States

- [server.SharedStateManagerServer#attach](http://collective-soundworks.github.io/soundworks/server.SharedStateManagerServer.html#attach)
- [client.SharedStateManagerClient#attach](http://collective-soundworks.github.io/soundworks/client.SharedStateManagerClient.html#attach)

Any node of the network (client or server) can attach to a state created by another node.

```js
// on server-side
const state = await server.stateManager.attach(schemaName, [stateId]);
// or client-side
const state = await client.stateManager.attach(schemaName, [stateId]);
```

In our example, we want every player be informed of the current values of the `globalsState` created by the server, the player clients must thus `attach` to this state.

```js
// src/clients/player/PlayerExperience.js (line 22-24)
const globalsState = await this.client.stateManager.attach('globals');
console.log('globalsState:', globalsState.getValues());
// > globalsState: { master: 0, mute: false }
```

Every player client is now attached to the `globals` state created by the server and will be notified if any update occur (more on that in _Subscribing to updates and updating states_).

## Observing the Creation of States on the Network

- [server.SharedStateManagerServer#observe](http://collective-soundworks.github.io/soundworks/server.SharedStateManagerServer.html#observe)
- [client.SharedStateManagerClient#observe](http://collective-soundworks.github.io/soundworks/client.SharedStateManagerClient.html#observe)
- [client.SharedStateManagerClient~observeCallback](http://collective-soundworks.github.io/soundworks/client.SharedStateManagerClient.html#~observeCallback)

As states can be dynamically created by any node, we need a way to monitor the newly created state in the application (e.g. when a `player` client connect to the application, the `controller` client wants to be notified so it can attach to the newly created state and monitor or control it).

This can be achived using the `observe` method :
```js
// on server-side
server.stateManager.observe(observeCallback);
// or client-side
client.stateManager.observe(observeCallback);
```

In our example, the controller wants to track every `player` states created by `player` clients, to be able to monitor and control them remotely, it thus `observe` and attach to the state when notified:

```js
// src/clients/controller/ControllerExperience (line 23)

// create a list to store the player states
this.playerStates = new Set();

this.client.stateManager.observe(async (schemaName, stateId, nodeId) => {
  console.log('arguments:', schemaName, stateId, nodeId);
  // the callback is called twice, for the global and player states
  // > arguments: 'globals' 0 -1
  // > arguments: 'player' 2 1
  switch(schemaName) {
    case 'player':
      const playerState = await this.client.stateManager.attach(schemaName, stateId);
      console.log('playerState:', playerState.getValues());
      // > playerState: {type: "sine", frequency: 513}

      // logic to do when the state is deleted
      // (e.g. when the player disconnects)
      playerState.onDetach(() => {
        // clean things
        this.playerStates.delete(playerState);
      });
      // store the player state into a list
      this.playerStates.add(playerState);
      break;
  }
});
```

## Updating Values and Subscribing to Updates

Once we have a local instance of state (through `create` or `attach`), we need to be notified of any change that may occur and to be able to change its values.

The `set` method allows for updating the values of a state
```js
state.set(updates);
```
- [common.SharedState#set](http://collective-soundworks.github.io/soundworks/common.SharedState.html#set)

In our example, the controller, once attached to a player state will update the `frequency` to a new random value every second (practically, this does not make a lot of sense, but for now it explains the concept...):

```js
// src/clients/controller/ControllerExperience (line 33)
const intervalId = setInterval(() => {
  const frequency = Math.round(50 + Math.random() * 950);
  await playerState.set({ frequency });
});
```

*Note: we wouldn't implement this kind of logic in a real world situation. Indeed, if we open 2 controllers each one will set a new value to the frequency every second*

The `subscribe` method allows to be notified when an update occur on the state:
```js
state.subscribe(callback);
```
- [common.SharedState#subscribe](http://collective-soundworks.github.io/soundworks/common.SharedState.html#subscribe)

In our example, the player can `subscribe` to the updates triggered by the controller and react accordingly. The callback is thus called every second (if we ignore the network latency):

```js
// src/clients/controller/ControllerExperience (line 30)
playerState.subscribe(async updates => {
  console.log('updates:', updates);
});

// updates: { frequency: 288 }
// updates: { frequency: 965 }
// updates: { frequency: 540 }
// updates: { frequency: 120 }
// updates: { frequency: 678 }
// ...
```

The same logic could be done with the `globals` state, at the difference that every player client would be notified of the update.








