# Working with Node Clients

In this tutorial, we will explore how to use _soundworks_ to create clients that run within a _Node.js_ process, opening new possibilities for creating applications outside Web Browsers.

Indeed, this functionality enables to work with screen less embedded hardware, such as the Raspberry Pi, which allows us to access some functionalities (e.g. control a motor or a LED) which are hard or impossible to achieve in the sandboxed environment that are Web browsers.

To illustrate this possibility and discover some of the tools you have at hand to help you, we will build a very simple application where a browser controller client can trigger a sound synthesized by another client running in a Node.js process.

> The final source code of this tutorial can be found [here](https://github.com/collective-soundworks/tutorials/tree/main/node-clients)


### Related Documentation

- [Client](https://soundworks.dev/soundworks/Client.html)
- [node-web-audio-api](https://github.com/ircam-ismm/node-web-audio-api)

## Scaffolding Application

Let's start as usual with scaffolding our application:

```sh
cd path/to/tutorials
npx @soundworks/create@latest node-clients
```

When the wizard asks you for plugins and libraries, just select the `@ircam/sc-components` and `node-web-audio-api` libraries:

```ansi
[0;36m# Install plugins[0m[0m
[0;32m✔[0m [0;1mSelect the plugins you would like to install/uninstall[0m [0;90m›[0m [0m
[0;33m+ nothing to do, aborting...[0m[0m
[0m
[0;36m# Install libraries[0m[0m
[0;36m?[0m [0;1mSelect the libraries you would like to install/uninstall[0m [0;90m›[0m [0;90m- Space to select. Return to submit[0m [0m
[0;32m◉[0m   @ircam/sc-components[0m
◯   @ircam/sc-scheduling[0m
◯   @ircam/sc-utils[0m
[0;32m◉[0m   [0;36;4mnode-web-audio-api[0m
```

::: info
The [`node-web-audio-api`](https://github.com/ircam-ismm/node-web-audio-api) package provides an implementation of the Web Audio API specification written in the `Rust` language to be used in Node.js programs.

For those who might be interested in using the library directly in a `Rust` project, see [web-audio-api-rs](https://github.com/orottier/web-audio-api-rs)
:::

Then when the wizard asks you to create the default client, let's just create a browser client with the "controller" template (we will create our _Node.js_ client later in the tutorial):

```ansi
[0;36m# Create client[0m[0m
[0;32m✔[0m [0;1mName of your new client (lowercase, no-space):[0m [0;90m…[0m controller[0m
[0;32m✔[0m [0;1mWhich runtime for your client?[0m [0;90m›[0m browser[0m
[0;32m✔[0m [0;1mWhich template would you like to use?[0m [0;90m›[0m controller[0m
[0m
- Creating client "controller" in file "src/clients/controller.js"[0m
- name: [0;36mcontroller[0m[0m
- runtime: [0;36mbrowser[0m[0m
- template: [0;36mcontroller[0m[0m
- default: [0;36mtrue[0m[0m
[0m
[0;32m✔[0m [0;1mConfirm?[0m [0;90m…[0m no [0;90m/[0m [0;36;4myes[0m
```

Then let's jump into the directory and start our application:

```sh
cd node-clients
npm run dev
```

## Implementing the controller

Before implementing our _Node.js_ client, let's use the features we have learned so far so that we can trigger a sound on any of our future _Node.js_ clients through the `controller` interface.

Let's thus start with defining a shared state class, we will call `thing`, that will be created by each of our _Node.js_ clients when they connect to the application.

```js
// src/server.js
const server = new Server(config);
configureHttpRouter(server);

server.stateManager.defineClass('thing', { // [!code ++]
  id: { // [!code ++]
    type: 'integer', // [!code ++]
    default: null, // [!code ++]
    nullable: true, // [!code ++]
  }, // [!code ++]
  triggerSound: { // [!code ++]
    type: 'boolean', // [!code ++]
    event: true, // [!code ++]
  }, // [!code ++]
}); // [!code ++]
```

And that's everything we have to do on the server side!

Let's then create our control interface. First, we need to grab a collection of our "thing" shared states:

```js
// src/clients/controller.js
await client.start();

const thingCollection = await client.stateManager.getCollection('thing'); // [!code ++]
// update GUI when any changes in the collection occurs // [!code ++]
thingCollection.onChange(() => renderApp()); // [!code ++]
```

Then. let's modify the `renderApp` function to show a simple graphical control interface for each `thing` state in the collection:

```js
function renderApp() {
  render(html`
    <div class="controller-layout">
      <header>
        <h1>${client.config.app.name} | ${client.role}</h1>
        <sw-audit .client="${client}"></sw-audit>
      </header>
      <section>
        <p>Hello ${client.config.app.name}!</p> // [!code --]
        ${thingCollection.map(thing => { // [!code ++]
          return html` // [!code ++]
            <div> // [!code ++]
              <sc-text>${thing.get('id')}</sc-text> // [!code ++]
              <sc-button // [!code ++]
                @input=${e => thing.set({ triggerSound: true })} // [!code ++]
              >trigger sound</sc-button> // [!code ++]
            </div> // [!code ++]
          `; // [!code ++]
        })} // [!code ++]
      </section>
    </div>
  `, $container);
}
```

Of course if you launch the controller ([http://127.0.0.1:8000/](http://127.0.0.1:8000/)) right now, the screen will be empty as we don't have any `thing` state in our colllection, but everything is now ready to create and control our Node.js clients.

## Creating and running a _Node.js_ client

Let's shutdown our server (`Ctrl + C`) for a while and create our Node.js client using the _soundworks_ wizard with the following command line:

```sh
npx soundworks --create-client
```

Enter "thing" as name and "node" as target:

```ansi
[0;36m# Create client[0m[0m
[0;32m✔[0m [0;1mName of your new client (lowercase, no-space):[0m [0;90m…[0m thing[0m
[0;32m✔[0m [0;1mWhich runtime for your client?[0m [0;90m›[0m node[0m
[0m
- Creating client "thing" in file "src/clients/thing.js"[0m
- name: [0;36mthing[0m[0m
- runtime: [0;36mnode[0m[0m
[0m
[0;36m?[0m [0;1mConfirm?[0m [0;90m›[0m no [0;90m/[0m [0;36;4myes[0m[0m
[0m
```

Once done, you can just restart the development server:

```sh
npm run dev
```

To launch our node client, let's open a second "Terminal", and run the following commands:

```sh
# go to the node-clients tutorial directory
cd path/to/tutorials/node-clients
# run you newly created node client in watch mode
npm run watch thing
```

And tada! Your node client should now be connected to the server:

```ansi
[0;36m> watching process	 .build/clients/thing.js[0m[0m
[0;36m[launcher][client thing] connecting to http://127.0.0.1:8000[0m[0m
[0;36m[launcher][client thing(0)] connected[0m[0m
Hello node-clients![0m
```

## Implementing the _Node.js_ client

Now that everything is setup and ready, let's write the code needed so our newly created client plays some sound when the button is clicked on the controller interface.

First, let's thus create our "thing" shared state and initialize its `id` field with the `id` of the _soundworks_ client. Open the `src/clients/thing.js` file and add the following snippet:

```js
await client.start();
// create the thing state and initialize it's id field // [!code ++]
const thing = await client.stateManager.create('thing', { // [!code ++]
  id: client.id, // [!code ++]
}); // [!code ++]
```

::: info
If you go in the "Terminal" where you launched the Node.js client, you should see that the client automatically restarted each time you save a file, just as with the server. This is the behavior and goal of the `npm run watch [process_name]` command.
:::

If reload your controller now, you should also see the interface updated with your connected client:

![controller](../assets/tutorials/node-clients/controller.png)

Let's finally write our Web Audio code so that a sound is triggered from the _Node.js_ process when the "trigger sound" button is pressed on the controller interface:

```js
// src/clients/thing.js
import { Client } from '@soundworks/core/client.js';
import launcher from '@soundworks/helpers/launcher.js';
// import some classes from the node-web-audio-api package // [!code ++]
import { AudioContext, GainNode, OscillatorNode } from 'node-web-audio-api'; // [!code ++]

// ...

await client.start();
// create an audio context (note that it is resumed by default)
const audioContext = new AudioContext(); // [!code ++]
// create the thing state and initialize it's id field
const thing = await client.stateManager.create('thing', {
  id: client.id,
});
// react to updates triggered from controller
thing.onUpdate(updates => { // [!code ++]
  if ('triggerSound' in updates) { // [!code ++]
    const now = audioContext.currentTime; // [!code ++]
 // [!code ++]
    const env = new GainNode(audioContext, { gain: 0 }); // [!code ++]
    env.connect(audioContext.destination); // [!code ++]
    env.gain.setValueAtTime(0, now); // [!code ++]
    env.gain.linearRampToValueAtTime(1, now + 0.01); // [!code ++]
    env.gain.exponentialRampToValueAtTime(0.0001, now + 1); // [!code ++]
    // randomly pick one of the harmonics of a sound at 50Hz // [!code ++]
    const frequency = Math.floor(Math.random() * 10) * 50 + 100; // [!code ++]
    const osc = new OscillatorNode(audioContext, { frequency }); // [!code ++]
    osc.connect(env); // [!code ++]
    osc.start(now); // [!code ++]
    osc.stop(now + 1); // [!code ++]
  } // [!code ++]
}); // [!code ++]
```

And that's all! You have now a simple _soundworks_ client that runs into _Node.js_ process and can synthesize some sound.

::: tip
As you can see, the code you wrote to make this Node.js client work is the same as the one you would have written in a browser client.

Abstracting the platform in such a way is an important goal of _soundworks_ and of the related libraries, such as the `node-web-audio-api` package.
:::

## Notes

### Locally emulate multiple clients

In previous tutorials, we often used the `?emulate=6` query parameter in our URL to emulate several clients in only one browser window, which is handy when developing distributed applications.

A similar behavior can be achieved with Node.js clients to run many of them in the same terminal. For example, to launch four clients in parallel, you can just write:

```sh
EMULATE=4 npm run watch thing
```

### Running Node.js clients on a network

Another important point to consider is that Node.js clients do need some configuration to be able to connect to the server. Indeed, when we launch a client in a browser, we just tell the browser where to reach the server when we write the URL in the address bar of the Web browser.

However, as you may have notices, Terminals and Node.js processes don't have any address bar... Hence if your node client doesn't run into your computer but in a remote device, it will need a bit of configuration to know the IP address of the server.

The _soundworks_ wizard has an dedicated command to help you to create additional environment config files:

```sh
npx soundworks --create-env
```

The command will prompt you with a series of questions to configure a environment, and in particular the question about the "Address of the server":

```ansi
[0;36m# Create environment configuration file:[0m[0m
[0;32m✔[0m [0;1mName of the config[0m [0;90m…[0m remote[0m
[0;32m✔[0m [0;1mType:[0m [0;90m›[0m development[0m
[0;32m✔[0m [0;1mPort (default is 80 for http and 443 for https):[0m [0;90m…[0m 80[0m
[0;32m✔[0m [0;1mAddress of the server (domain or ip), leave empty for local development:[0m [0;90m…[0m 192.168.1.34[0m
[0;32m✔[0m [0;1mUse https?[0m [0;90m…[0m no[0m
[0;32m✔[0m [0;1mbaseUrl (if the application live behind a proxy server, leave empty for most cases):[0m [0;90m…[0m [0m
[0;32m✔[0m [0;1mDo you want to protect some clients with a password?[0m [0;90m…[0m no[0m
[0m
- creating config file "env-remote.yaml":[0m
```[0m
type: development[0m
port: 80[0m
baseUrl: ""[0m
serverAddress: 192.168.1.34[0m
useHttps: false[0m
httpsInfos:[0m
  cert: null[0m
  key: null[0m
auth:[0m
  clients: [][0m
  login: ""[0m
  password: ""[0m
[0m
```[0m
[0m
[0;32m✔[0m [0;1mConfirm?[0m [0;90m…[0m yes[0m
[0m
[0;32m+ config file "env-remote.yaml" successfully created[0m
```

To use this configuration file, you will just have to start your clients by giving them the name of the config, e.g.:

```sh
ENV=remote npm run watch thing
```

## Conclusion

In this tutorial, we have explored an important feature of _soundworks_, i.e. the possibility to create clients that are not running in a Web browser, but rather in a _Node.js_ process.

In the next tutorials, we will continue our journey into _soundworks_, by tackling the important question of synchronization between different processes and machines.
