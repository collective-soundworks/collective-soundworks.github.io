# Using the State Manager

In this tutorial, we will dig into the distributed state management system proposed by _soundworks_. After a short introduction on the underlying concepts, we will see how to use shared states, and how this pattern can help you to implement remote control and monitoring in your applications. Additionally, we will see how the shared states simplify the development of distributed applications by abstracting the network communications and messages routing.

Along the way, we will discover a related library, [@ircam/sc-components](https://ircam-ismm.github.io/sc-components/), to simply create usable (and hopefully elegant) graphical user interfaces.

> The final source code of this tutorial can be found [here](https://github.com/collective-soundworks/tutorials/tree/main/state-manager)

### Relevant documentation

- [ClientStateManager](https://soundworks.dev/soundworks/ClientStateManager.html)
- [ServerStateManager](https://soundworks.dev/soundworks/ServerStateManager.html)
- [SharedState](https://soundworks.dev/soundworks/SharedState.html)
- [SharedStateCollection](https://soundworks.dev/soundworks/SharedStateCollection.html)
- [@ircam/sc-components](https://ircam-ismm.github.io/sc-components/)

## Introduction

First of all, let's start with a bit of theory to understand the concepts and general logic behind the _soundworks_' shared states.

### The "Why"

Most of the time, we think of an application as "something" that runs on a computer with which a user can interact in some way. The idea of _distributed application_ extends this definition to applications that run on several computers and where several users can interact at the same time. Or to say it in a more formal way:

> _« A distributed system is a collection of autonomous computing elements that appears to its users as a single coherent system. »_ Maarten van Steen, and Andrew S. Tanenbaum. “A Brief Introduction to Distributed Systems.” Computing 98, no. 10, October 2016.

![distributed-application](../assets/tutorials/state-manager/distributed-application.png)

Additionally, in creative contexts, it's important to have very simple ways to monitor and/or control the state of distant clients. This is true both during the development of the artwork / application, e.g. to tweak some synthesizer on distant machines from a central point (even in the studio, modifying some parameters on several machines can get cumbersome quite quickly), as well as during a performance, e.g. to control the general volume, to switch between two sections of the piece, etc.

The `StateManager` and the `SharedState` abstractions proposed by _soundworks_ provide a simple way to define and synchronize some sets of parameters that are of interest by multiple clients, while abstracting all the network communications involved.

### The "How"

From a more technical point of view, the distributed state management system proposed by _soundworks_ is a circular data flow pattern adapted to the particular needs of real-time distributed applications.

To that end, the flow data is structured according to a circular path that is always synchronized with the server.

![distributed-state-management](../assets/tutorials/state-manager/distributed-state-management.png)


As illustrated in the figure above, when an input (e.g. some user gesture) triggers a change in the state of a client (arrow 1, red), the data is automatically synchronized with a server-side representation of the state through WebSockets (arrow 2), which once done triggers the change in the rendering, be it audio or visual (arrow 3).

This simple pattern enables an important feature: any other node of the network can make a change on the same server-side representation of the state (arrow 1', blue), which will trigger 2 (red) and 3 (red) in a completely transparent way.

::: info
In these tutorials, when we speak of a **_node of the network_**, we consider both the clients and the server.

Form the point of view of the distributed state management system, the server is indeed a _node_ just as any client. However, its central role gives it particular abilities and features.
:::

## Scaffolding the application

::: info
This section requires basic knowledge of the _soundworks_ wizard, so please refer to the [getting started tutorial](/tutorials/getting-started) if you didn't check it yet.
:::

First thing first, let's generate a new empty application with the `@soundworks/create` wizard.

```sh
cd /path/to/working/directory
npx @soundworks/create@latest state-manager
```

When the wizard asks you for the configuration of the default client:
- Name it `player`
- Select the `browser` target
- Select the `default` template

```ansi
[0;32m~/tmp[0m $ npx @soundworks/create@latest state-manager[0m
[0;90m[@soundworks/create#v5.0.3][0m[0m
[0m
[0;33m> welcome to soundworks[0m[0m
[0m
- documentation: [0;36mhttps://soundworks.dev[0m[0m
- issues: [0;36mhttps://github.com/collective-soundworks/soundworks/issues[0m[0m
[0m
- Scaffolding application in "~/tmp/state-manager" directory[0m
- Installing dependencies[0m
[0m
[0;90m[@soundworks/wizard#v5.0.3][0m[0m
[0m
[0;36m# Install plugins[0m[0m
[0;32m✔[0m [0;1mSelect the plugins you would like to install/uninstall[0m [0;90m›[0m [0m
[0;33m+ nothing to do, aborting...[0m[0m
[0m
[0;36m# Install libraries[0m[0m
[0;32m✔[0m [0;1mSelect the libraries you would like to install/uninstall[0m [0;90m›[0m [0m
[0;33m+ nothing to do, aborting...[0m[0m
[0m
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

Then open the new `state-manager` directory in your favorite editor and launch the application in development mode:

```sh
cd state-manager
npm run dev
```

## Describing shared state classes

The `StateManager` component is configured with JavaScript objects that declare a set of attributes and their properties, called [`SharedStateClassDescription`](https://soundworks.dev/soundworks/global.html#SharedStateClassDescription). You can think of a `SharedStateClassDescription` as a kind of blueprint from which multiple `SharedState` instances can be created.

::: tip
If you are familiar with databases, you can think of `SharedStateClassDescription` has similar to the _schema_ of a database table.

The syntax for declaring `SharedStateClassDescription` is documented [`here`](https://soundworks.dev/soundworks/global.html#SharedStateClassDescription).
:::

In this application we will declare two different `SharedStateClassDescription`:

- A description called `global` which we will use to store information accessible by all nodes of the network. This shared state will be unique across the whole application, i.e. it will be created by the server and all `player` clients will "attach" to it.
- A description called `player`, which we will use to describe the state of a single client of the application. All clients with the `player` role will create their own `SharedState` instance from this class.

Let's then create the file `src/state-descriptions/global.js`, and push the following code into it:

```js
// src/state-descriptions/global.js
export default {
  // volume volume in dB [-60, 6]
  volume: {
    type: 'float',
    min: -60,
    max: 6,
    default: 0,
  },
  // mute [true, false]
  mute: {
    type: 'boolean',
    default: false,
  },
};
```

:::tip
Note that the `state-descriptions` directory you just created is just proposal to keep the code organized and is in anyway mandatory, i.e. such declarations could potentially live anywhere in your code...

Just keep in mind that this is your responsibility as a developer to keep things organized and to properly name them in way that minimize your cognitive load.
:::

From this simple code we can see that this description, and its derived `SharedState` instance, will allow us to control the _volume_ of all clients as well as to _mute/unmute_ them.

Second, let's create the file `src/state-descriptions/player.js` containing the following code:

```js
// src/state-descriptions/player.js
export default {
  frequency: {
    type: 'float',
    min: 50,
    max: 1000,
    default: 440,
  },
};
```

This description, that we will use to create a new `SharedState` on each client, will allow us to control the _frequency_ of an oscillator.

Interestingly, we can already foresee from these two definitions, the structure of the audio graph that we will create on each client:

> `[OscillatorNode] -> [GainNode (mute)] -> [GainNode (volume)] -> [output]`

- The `OscillatorNode` will be controlled by the different `SharedState`s created from description declared in the `player.js` file, i.e. each client will be able to have a different oscillator _frequency_.
- At contrary, the `GainNode`s (_mute_ and _volume_) will be controlled globally for all clients by the common `SharedState` created from description declared in the `global.js` file,.

:::info
To keep things focused on the distributed state management system, we won't actually create the audio graph in this tutorial, but this could be an interesting exercise to do on your own!
:::

## Defining shared state classes

Let's first import the declarations into the `src/server.js` file:

```js
// src/server.js
import { Server } from '@soundworks/core/server.js';
import { loadConfig, configureHttpRouter } from '@soundworks/helpers/server.js';

import globalDescription from './state-descriptions/global.js'; // [!code ++]
import playerDescription from './state-descriptions/player.js'; // [!code ++]
```

Once done, we can define classes of `SharedState`s from these `SharedStateClassDescription` using the `stateManager` instance of the _soundworks_ `server`:

```js
// src/server.js
const server = new Server(config);
configureHttpRouter(server);

// define the shared state classes from our descriptions // [!code ++]
server.stateManager.defineClass('global', globalDescription); // [!code ++]
server.stateManager.defineClass('player', playerDescription); // [!code ++]
```

Note that the `stateManager.defineClass` method takes 2 arguments:
- A [`SharedStateClassName`](https://soundworks.dev/soundworks/global.html#SharedStateClassName): a _user defined_ string that acts as a sort of identifier for this class of shared states, here `'global'` and `'player'`.
- A [`SharedStateClassDescription`](https://soundworks.dev/soundworks/global.html#SharedStateClassDescription): the `globalDescription` and `playerDescription` we defined in their own files and explained above.

:::tip
While this signature allows to declare simple user-friendly names for creating and attaching shared state, it also allows to register the same schema under different names in more advanced use cases.
:::

Now that our `SharedState` classes are defined within the `server.stateManager`, we can safely create new instances of `SharedState`s based on these names and descriptions.

## Creating shared states

Let's first create our `global` shared state instance from the class we just defined.

As explained above, we want this shared state to be unique across the entire application so that all clients share the same values. This can be simply achieved by:
1. _creating_ the state on the server-side, i.e. the server is thus the _owner_ of the state.
2. _attaching_ all our clients to this state, i.e. they have full access to the shared state values and can even update them but _they do not own the state_, which means that the state won't be deleted when they disconnect.

While this distinction between `create` and `attach` can be a bit confusing at first, this will get more clear writing the code.

Let's thus add following lines into the `src/server.js` to create our `global` shared state instance, using the same `SharedStateClassName` we used when we defined the class:

```js
// src/server.js
await server.start();

const global = await server.stateManager.create('global'); // [!code ++]
console.log(global.getValues()); // [!code ++]
```

In your `Terminal` window, you should now see the default values of the state logged:

```ansi
[0;36m+ http server listening on[0m[0m
    http://127.0.0.1:[0;32m8000[0m[0m
[0m
> press "[0;1mCtrl + C[0m" to exit[0m
{ volume: [0;33m0[0m, mute: [0;33mfalse[0m }[0m
```

Let 's now _attach_ all our `player` clients to the `global` state created by the server.

To that end, open the file `src/clients/player.js` and add the following lines of code:

```js {4-5}
// src/clients/player.js
await client.start();

const global = await client.stateManager.attach('global'); // [!code ++]
console.log(global.getValues()); // [!code ++]
```

Note that, instead of the method `stateManager.create` used on the server side, we use its counterpart `stateManager.attach` on the client side. Hence only one instance of the state exists on the network (it is owned by the server which created it), but _all nodes_ of the network have access to the different values of the shared state.

If you open the URL [http://127.0.0.1:8000](http://127.0.0.0:8000) in your browser of choice and open the JavaScript console, you should see the current values of the `global` state displayed in the console just as for the server:

![global-client-log](../assets/tutorials/state-manager/global-client-log.png)

::: tip
To open the _JavaScript_ console in your browser, you can press `Cmd + Alt + I` and then select the `Console` tab.
:::

While we are on the client-side code of our "player" clients, let's create the `player` shared state for each of them. To that end, add the following line of code in the `src/clients/player.js` file:

```js
// src/clients/player.js
await client.start();

const global = await client.stateManager.attach('global');
const player = await client.stateManager.create('player'); // [!code ++]
```

Here, you can see side-by-side the `stateManager.create` and `stateManager.attach` methods and how they relate:
- `stateManager.create` creates a new instance of a shared state that is owned by the node (either client or server).
- `stateManager.attach` attach to an existing shared state instance created and owned by another node.

## Display the states values

Now that our shared states are setup, let's continue on our client-side code to display the current values of the different shared states and update the screen when their values change.

::: info
In these series, all HTML rendering will be achieved by using the [Lit](https://lit.dev/) library proposed by _Google_ and the [@ircam/sc-components](https://ircam-ismm.github.io/sc-components/) library. Both libraries are installed by default when you create a new application using the soundworks wizard.
:::

Let's first modify the `renderApp` provided by the "player" boilerplate code to display the values of our two states:

```js
// src/clients/player.js
await client.start();

const global = await client.stateManager.attach('global');
const player = await client.stateManager.create('player');

function renderApp() {
  render(html`
    <div class="simple-layout">
      <p>Hello ${client.config.app.name}!</p> // [!code --]
      <h2>Global</h2> // [!code ++]
      <ul> // [!code ++]
        <li>volume: ${global.get('volume')}</li> // [!code ++]
        <li>mute: ${global.get('mute')}</li> // [!code ++]
      </ul> // [!code ++]
      <h2>Player</h2> // [!code ++]
      <ul> // [!code ++]
        <li>frequency: ${player.get('frequency')}</li> // [!code ++]
      </ul> // [!code ++]

      <sw-credits .infos="${client.config.app}"></sw-credits>
    </div>
  `, $container);
}

renderApp();
```

If you refresh your web page (`Cmd + Shift + R`), you should now see the following:

![states-in-html](../assets/tutorials/state-manager/states-in-html.png)

So far so good, we have all our states set up and some display of their values.

:::info
In this tutorial the rendering will be only graphical and we won't go into the audio details to keep things focused on the shared states. Just keep in mind that the general idea and logic would be exactly the same with some audio rendering instead of graphics.
:::

However, what we miss now is a way to change the values of the states. While we could implement it directly in our `player` clients, we will go a bit deeper with the `StateManager` and create a new "controller" client dedicated to this task.

## Remote control and monitoring

In this section we will implement a second client with a specific role dedicated to control and monitor the general state of the application, we will call `controller`.

### Scaffolding the _controller_ client

Let's use the soundworks wizard to configure our new client and to create all the boilerplate code.

Go to the `Terminal`, shutdown your server (`Ctrl + C`) and enter the following command:

```sh
npx soundworks --create-client
```

Just as when you created the application at the beginning of the tutorial, the soundworks wizard will ask you some questions to configure the client:
1. Name this new client `controller`
2. Select the `browser` target
3. But this time select the `controller` template

Additionally, the wizard will ask you if you want to use this client as the default one (meaning it will be accessible at the root of your website), choose `no` and confirm.

```ansi
[0;32m~/tmp/state-manager[0m $ npx soundworks --create-client[0m
[0;90m[@soundworks/wizard#v5.0.3][0m[0m
[0m
[0;36m# Create client[0m[0m
[0;32m✔[0m [0;1mName of your new client (lowercase, no-space):[0m [0;90m…[0m controller[0m
[0;32m✔[0m [0;1mWhich runtime for your client?[0m [0;90m›[0m browser[0m
[0;32m✔[0m [0;1mWhich template would you like to use?[0m [0;90m›[0m controller[0m
[0;32m✔[0m [0;1mUse this client as default?[0m [0;90m…[0m [0;36;4mno[0m [0;90m/[0m yes[0m
[0m
- Creating client "controller" in file "src/clients/controller.js"[0m
- name: [0;36mcontroller[0m[0m
- runtime: [0;36mbrowser[0m[0m
- template: [0;36mcontroller[0m[0m
- default: [0;36mfalse[0m[0m
[0m
[0;32m✔[0m [0;1mConfirm?[0m [0;90m…[0m no [0;90m/[0m [0;36;4myes[0m[0m
[0;32m+ client controller created and configured[0m
```

In your editor you can see that new file `src/clients/controller.js` has been created by the wizard. This is where we will implement the logic for our "controller" client.

Now that everything is set up, we can restart our development server and go back to the implementation of our `controller` client:

```sh
npm run dev
```

The controller client will be accessible via the following URL: [http://127.0.0.1:8000/controller](http://127.0.0.1:8000/controller)

::: tip
Note that the `/controller` part of the URL is automatically created by the default router configuration using to the names of the clients.
:::

### Binding the `global` state

Let's first start with creating the controls for the `global` shared state. Open the `src/clients/controller.js` file and add the following code to import all the components provided by the [@ircam/sc-components](https://ircam-ismm.github.io/sc-components/) library:

```js {7-10}
// src/clients/controller.js
import '@soundworks/helpers/polyfills.js';
import { Client } from '@soundworks/core/client.js';
import { loadConfig, launcher } from '@soundworks/helpers/browser.js';
import { html, render } from 'lit';

import '@ircam/sc-components'; // [!code ++]
```

Importing this file will register new HTML elements that we can now use in our HTML templates. For example, a text element to display parameter names, a slider to control the volume, a toggle button to control the mute parameter, and a number box to control the players' frequencies.

:::info
Such HTML components are defined using a Web standard called Web Components. See [https://developer.mozilla.org/en-US/docs/Web/Web_Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for more information.
:::

Then, such as for the `player`, let's first attach to the `global` state

```js
// src/clients/controller.js
await client.start();
const global = await client.stateManager.attach('global'); // [!code ++]
```

Then, let's create an interface that displays the `global` state current values using the [`global.get`](https://soundworks.dev/soundworks/SharedState.html#get) method:

```js
// src/clients/controller.js
await client.start();
const global = await client.stateManager.attach('global');

function renderApp() {
  render(html`
    <div class="controller-layout">
      <header>
        <h1>${client.config.app.name} | ${client.role}</h1>
        <sw-audit .client="${client}"></sw-audit>
      </header>
      <section>
        <p>Hello ${client.config.app.name}!</p> // [!code --]
        <div> // [!code ++]
          <h2>Global</h2> // [!code ++]
          <div style="padding-bottom: 4px;"> // [!code ++]
            <sc-text readonly>volume (dB)</sc-text> // [!code ++]
            <sc-slider // [!code ++]
              min="-60" // [!code ++]
              max="6" // [!code ++]
              value=${global.get('volume')} // [!code ++]
            ></sc-slider> // [!code ++]
          </div> // [!code ++]
          <div style="padding-bottom: 4px;"> // [!code ++]
            <sc-text readonly>mute</sc-text> // [!code ++]
            <sc-toggle // [!code ++]
              ?active=${global.get('mute')} // [!code ++]
            ></sc-toggle> // [!code ++]
          </div> // [!code ++]
        </div> // [!code ++]
      </section>
    </div>
  `, $container);
}

renderApp();
```

If you refresh your `controller` page, you should now see the following interface displayed with the `global` shared state default values correctly displayed:

![controller-1](../assets/tutorials/state-manager/controller-1.png)

However, the binding between the state and the interface is still missing: interacting the interface (e.g. moving the slider or clicking the toggle) does not yet update the shared state values. To fix that, we simply need to use the [`global.set`](https://soundworks.dev/soundworks/SharedState.html#set) method and add the following lines of code to update the state when interacting with the interface:

```js
// src/clients/controller.js
function renderApp() {
    render(html`
      <div class="controller-layout">
        <header>
          <h1>${client.config.app.name} | ${client.role}</h1>
          <sw-audit .client="${client}"></sw-audit>
        </header>
        <section>
          <div>
            <h2>Global</h2>
            <div style="padding-bottom: 4px;">
              <sc-text readonly>volume (dB)</sc-text>
              <sc-slider
                min="-60"
                max="6"
                value=${global.get('volume')}
                @input=${e => global.set('volume', e.detail.value)} // [!code ++]
              ></sc-slider>
            </div>
            <div style="padding-bottom: 4px;">
              <sc-text readonly>mute</sc-text>
              <sc-toggle
                ?active=${global.get('mute')}
                @change=${e => global.set('mute', e.detail.value)} // [!code ++]
              ></sc-toggle>
            </div>
          </div>
        </section>
      </div>
    `, $container);
  }
```

Finally, we just need to tell your interface to re-render itself when the `global` shared state is updated, using the [`global.onUpdate`](https://soundworks.dev/soundworks/SharedState.html#onUpdate) method:

```js
const global = await client.stateManager.attach('global');

function renderApp() {
  // ...
}

// update interface when the shared state values are updated
global.onUpdate(() => renderApp()); // [!code ++]

renderApp();
```

Now, if you open [http://127.0.0.1:8000/controller?emulate=2](http://127.0.0.1:8000/controller?emulate=2) to emulate two `controller` clients side by side (see the `?emulate=2` at the end of the URL), you should see that both interfaces are fully synchronized through the `global` shared state.

![controller-2](../assets/tutorials/state-manager/controller-2.png)

Now that our "controller" is ready, let's go back to our `player` clients to implement a similar logic to update the screen when the shared states are updated. So let's re-open the `src/clients/player.js` file and add the following lines of code:

```js
// src/clients/player.js
await client.start();

const global = await client.stateManager.attach('global');
const player = await client.stateManager.create('player');

function renderApp() {
  // ...
}

global.onUpdate(() => renderApp()); // [!code ++]
player.onUpdate(() => renderApp()); // [!code ++]

renderApp();
```

With these two simple lines of code, all the players interfaces are now automatically updated every time a parameter of a shared state is updated.

To see this in action, open two browser windows side by side and, launch some controller(s) in one of them [http://127.0.0.1:8000/controller?emulate=2](http://127.0.0.1:8000/controller?emulate=2) and some players in the other one [http://127.0.0.1:8000/?emulate=2](http://127.0.0.1:8000/?emulate=2). If you manipulate one of the controller you can see that all clients are synced and updated as expected.

![controller-and-clients-1](../assets/tutorials/state-manager/controller-and-clients-1.png)

### Observing and controlling collections of states

The final thing we want to do is to be able to control the frequency of each player individually from our `controller` interfaces. To that end, the controller needs to be able to track the creation (and deletion) of all `player` states in the distributed application. Fortunately, the `StateManager` gives you access to such functionality.

Let's thus create a new [`SharedStateCollection`](https://soundworks.dev/soundworks/SharedStateCollection.html) of players and make sure the interface is updated each time a "player" state is created (i.e. when a client connects to the application), deleted (i.e. when a client disconnects from the application), or when a state is updated:

```js {4-24}
// src/clients/controller.js
await client.start();

const global = await client.stateManager.attach('global');
// Create a new collection that contains all the player states
const players = await client.stateManager.getCollection('player'); // [!code ++]

function renderApp() {
  // ...
}

// update interface when the shared state values are updated
global.onUpdate(() => renderApp());
players.onChange(() => renderApp()); // when a state is created, deleted or updated // [!code ++]
```

Finally, let's just update our HTML template to display the frequency control for all `player` shared states:

```js
render(html`
  <header>
    // ...
  </header>
  <section>
    <div>
      <h2>Global</h2>
      // ...
    </div>
    <div> // [!code ++]
      <h2>Players</h2> // [!code ++]
      ${players.map(player => { // [!code ++]
        return html` // [!code ++]
          <div> // [!code ++]
            <sc-text>frequency</sc-text> // [!code ++]
            <sc-number // [!code ++]
              min=${player.getDescription('frequency').min} // [!code ++]
              max=${player.getDescription('frequency').max} // [!code ++]
              value=${player.get('frequency')} // [!code ++]
              @input=${e => player.set('frequency', e.detail.value)} // [!code ++]
            ></sc-number> // [!code ++]
          </div> // [!code ++]
        ` // [!code ++]
      })} // [!code ++]
    </div> // [!code ++]
  </section>
`, $container);
```

Now if you open two browser windows and launch a controller [http://127.0.0.1:8000/controller](http://127.0.0.1:8000/controller) and a player [http://127.0.0.1:8000/](http://127.0.0.1:8000/), you will see that you can control the frequency of the player from the controller.

![controller-and-clients-2](../assets/tutorials/state-manager/controller-and-clients-2.png)

However, there is still an issue with our interface: if we emulate several `player` clients, e.g. [http://127.0.0.1:8000/?emulate=5](http://127.0.0.1:8000/?emulate=5), we can see that we have no way to know which control corresponds to which player:

![badly-defined-players](../assets/tutorials/state-manager/badly-defined-players.png)

Let's review our code a bit to handle this problem.

### Using the client id to enhance the control interface

To fix this problem, let's just use the id that is automatically given by _soundworks_ to each client when it connects, to share it within the `player` state.

So first, let's add a new parameter called `id` of type `integer` to our `player` schema to store this value:

```js {3-6}
// src/state-descriptions/player.js
export default {
  id: { // [!code ++]
    type: 'integer', // [!code ++]
    default: 0, // [!code ++]
  }, // [!code ++]
  frequency: {
    type: 'float',
    min: 50,
    max: 1000,
    default: 440,
  },
};
```

Second, let's review our `player` client code to:

1. pass the client id to the shared state when it is created by the client

```js
// src/clients/player/index.js
const global = await client.stateManager.attach('global');
// create the player state with the client id
const player = await client.stateManager.create('player') // [!code --]
const player = await client.stateManager.create('player', { id: client.id }); // [!code ++]
```

2. and display the `client.id` in the player interface:

```js
// src/clients/player/index.js
function renderApp() {
  render(html`
    <div class="simple-layout">
      <h1>Player ${player.get('id')}</h1> // [!code ++]
      <h2>Global</h2>
      // ...
    </div>
  `, $container);
}

```

Finally, let's just display this information in the controller interface:

```js
// src/clients/controller/index.js
${players.map(player => {
  return html`
    <div>
      <sc-text>frequency</sc-text> // [!code --]
      <sc-text>player ${player.get('id')} - frequency</sc-text> // [!code ++]
      <sc-number
        min=${player.getDescription('frequency').min}
        max=${player.getDescription('frequency').max}
        value=${player.get('frequency')}
        @input=${e => player.set('frequency', e.detail.value)}
      ></sc-number>
    </div>
  `
})}
```

Now, if you open a controller ([http://127.0.0.1:8000/controller](http://127.0.0.1:8000/controller)) and several players ([http://127.0.0.1:8000/?emulate=3](http://127.0.0.1:8000/?emulate=3)) side by side, you should see a more useful interface:

![controller-player-final](../assets/tutorials/state-manager/controller-player-final.png)

## Conclusion

In this tutorial, you learned how to use the _soundworks_ distributed state management system which we consider one of its most powerful and versatile feature.

You have seen how to create global states that are common to all clients of the application, how to use them to describe the state of each client and how use them to implement remote control and monitoring interfaces using shared state collections. Along the way, you have seen how to use the _soundworks_ wizard within your application (i.e. `npx soundworks`).

In the next tutorial, we will see how to extend the possibilities of _soundworks_ with plugins. For this first dive into plugins we will use the `@soundworks/plugin-platform-init` plugin that is meant to simplify some redundant and cumbersome tasks such as resuming the audio context, etc.




