# Using Plugins 1 - The _platform-init_ Plugin

In this first tutorial on _soundworks_ plugins, we will learn why and how to use the _platform-init_ plugin, which aims to simplify the use of certain features (such as the Web Audio API) that require a user gesture to be properly initialized.


The tutorial requires basic knowledge of the `soundworks` wizard, so please refer to the [getting started tutorial](/tutorials/getting-started) if you didn't check it yet.

### Relevant documentation

- [client.PluginManager](https://soundworks.dev/soundworks/client.PluginManager)
- [server.PluginManager](https://soundworks.dev/soundworks/server.PluginManager)
- [@soundworks/plugin-platform-init](https://github.com/collective-soundworks/soundworks-plugin-platform-init)

## Scaffolding the application and installing the plugin

First thing first, let's generate a new empty application with the `@soundworks/create` wizard. When the wizard will ask you for the name of the default client, enter the following information:
- Name it `player` 
- Select the `browser` target 
- Select the `default` template

```sh
cd /path/to/working/directory
npx @soundworks/create@latest plugin-platform-init
```

![wizard-create-player-confirm](../assets/tutorials/plugin-platform-init/wizard-create-player-confirm.png)

Once done, go to the directory and launch the `soundworks` wizard again to install the plugin:

```sh
cd plugin-platform-init
npx soundworks
```

Select the `install / uninstall soundworks plugins` entry:

![wizard-1](../assets/tutorials/plugin-platform-init/wizard-1.png)

Select the `@soundworks/plugin-platform-init` using the space bar:

![wizard-2](../assets/tutorials/plugin-platform-init/wizard-2.png)

And confirm:

![wizard-3](../assets/tutorials/plugin-platform-init/wizard-3.png)

After the installation has completed, you can exit the wizard by pressing `Ctrl+C` or by selecting the `→ exit` entry.

::: tip
Note that the wizard asks you if you want to install plugins when creating the application. We just followed the long path to show you how to use the wizard within the application.
:::

::: info
Note that this specific functionality of the wizard is just a mere alias of `npm install`, it is equivalent to doing:

```sh
npm install --save @soundworks/plugin-platform-init
```
:::

If you open the `package.json` file, you should see the `@soundworks/plugin-platform-init` appearing under the `dependencies` key:

```json {6}
// package.json
  "dependencies": {
    "@ircam/sc-components": "^3.0.0-alpha.44",
    "@soundworks/core": "^4.0.0-alpha.0",
    "@soundworks/helpers": "^1.0.0-alpha.2",
    "@soundworks/plugin-platform-init": "^1.0.0-alpha.5",
    "json5": "^2.2.2",
    "lit": "^3.0.2"
  },
```

::: info
Note that the actual list of dependencies and version numbers might change compared the ones listed above, as new versions of the core library and of the plugins will be released in the future.
:::

This file allows you and the _node package manager_ (i.e. `npm`) to keep track of the dependencies of your project. Then, if you need to re-install the application dependencies (i.e. `npm install`) the plugin will be re-installed as well.

## Registering the plugin into _soundworks_

Now that the plugin is installed as a dependency of our application, let's write the code to register the plugin into _soundworks_. 

By design, all _soundworks_ plugins always come with both a server-side component and a client-side component. Hence, you will always have to register the plugin on both side of your application. 

### Server-side registration

Let's start with the server-side part and write the following code in the `src/server/index.js` file. First let's import the server-side part of the plugin on top of the file:

```js {4-5}
// src/server/index.js
import '@soundworks/helpers/polyfills.js';
import { Server } from '@soundworks/core/server.js';
// import the server-side part of the `platform-init` plugin
import pluginPlatformInit from '@soundworks/plugin-platform-init/server.js';
```

Then register it into the `server.pluginManager` component:

```js {4-5}
// src/server/index.js
const server = new Server(config);
server.useDefaultApplicationTemplate();
// register the plugin into the soundworks' plugin manager
server.pluginManager.register('platform-init', pluginPlatformInit);
```

The [`pluginManager.register`](https://soundworks.dev/soundworks/server.PluginManager#register) method takes at least 2 arguments:
- A user defined `id` (here `platform-init`) that is used as an internal identifier to retrieve the plugin instance. In more advanced use-cases, it also allows you to register several times the same plugin under different ids .
- A factory function (i.e. `pluginPlatformInit`) automatically executed by _soundworks_, from which the actual plugin instance will be created.

::: info
A **_factory function_** is common design pattern that allows to create a full-featured object from a function call. If you are interested, you can check this [tutorial ](https://www.javascripttutorial.net/javascript-factory-functions/) for more information on this subject.
:::

And that's all for the server-side! Let's now install the plugin on the client-side.

### Client-side registration

Let's open the `src/clients/player/index.js` and, as for the server-side, import the client-side part of the _platform-init_ plugin:

```js {4-5}
// src/clients/player/index.js
import { Client } from '@soundworks/core/client.js';
import launcher from '@soundworks/helpers/launcher.js';
// import the client-side part of the `platform-init` plugin
import pluginPlatformInit from '@soundworks/plugin-platform-init/client.js';
```

Now that our plugin is imported, we can register it into the [`client.PluginManager`](https://soundworks.dev/soundworks/client.PluginManager):

```js {3-4}
// src/clients/player/index.js
const client = new Client(config);
// register the plugin into the soundworks' plugin manager
client.pluginManager.register('platform-init', pluginPlatformInit);
```

As for the server-side, we passed 2 arguments to the [`client.PluginManager#register`](https://soundworks.dev/soundworks/client.PluginManager#register) method: the plugin user-defined `id` and the plugin factory function. An important point here is that the `id` we used is the same on both server-side and client-side. This allows _soundworks_ to automatically match and associate the two components.

At this point, if you start the server (i.e. `npm run dev`) and go to [http://127.0.0.1:8000](http://127.0.0.1:8000), you should see the default splash screen provided by the plugin. This screen requires a user gesture (i.e. a "click" event) and is automatically shown by the `launcher` because the _platform-init_ plugin has been registered into _soundworks_:

![homepage](../assets/tutorials/plugin-platform-init/homepage.png)

## Resuming an `AudioContext`

So far, so good but what we did until now is mainly to add a slash screen asking for a click, that does nothing particular... Or, as stated in the beginning of the tutorial, the whole aim of the `platform-init` plugin is to simplify the initialization of features that require a user-gesture in order to be properly launched. Let's exemplify that by resuming an `AudioContext` So let's do that.

::: info
An user gesture is required by the browsers to access or initialize certain features such as the Web Audio API, the microphone or the camera. This is a way to protect end-users against intrusive ads and/or for obvious privacy reasons.
:::

So first, let's first create an new `audioContext`:

```js {3-4}
// src/clients/player/index.js
const config = window.SOUNDWORKS_CONFIG;
// create a global audio context
const audioContext = new AudioContext();
```

And pass it as third argument to the `pluginManager.register` method:

```js {4-5}
// src/clients/player/index.js
const client = new Client(config);
// register the plugin into the soundworks' plugin manager, and pass it the audioContext
client.pluginManager.register('platform-init', pluginPlatformInit);  // [!code --]
client.pluginManager.register('platform-init', pluginPlatformInit, { audioContext });  // [!code ++]
```

:::info
By default, the _platform-init_ plugin provides simplified access to several features, such as motion sensors, microphone and camera. Refer to the [plugin documentation](https://github.com/collective-soundworks/soundworks-plugin-platform-init) for more information.
:::

Finally, let's create some welcoming sound that will show us that everything works well and that our `audioContext` is properly resumed:

```js {5,7,8-23}
// src/clients/player/index.js
launcher.register(client, { initScreensContainer: $container });

// launch application
console.log(`> before start - audioContext is "${audioContext.state}"`);
await client.start();
console.log(`> after start - audioContext is "${audioContext.state}"`);

const now = audioContext.currentTime;
// create a simple envelop
const env = audioContext.createGain();
env.connect(audioContext.destination);
env.gain.setValueAtTime(0, now);
env.gain.linearRampToValueAtTime(0.5, now + 0.01);
env.gain.exponentialRampToValueAtTime(0.0001, now + 4);

const src = audioContext.createOscillator();
src.connect(env);
// randomly pick a frequency on an harmonic  spectrum (150, 300, 450, etc...)
src.frequency.value = 150 + Math.floor(Math.random() * 10) * 150;
src.start(now);
src.stop(now + 4);
```

Reload the page (`Cmd+R`) and click, you should now ear an incredibly nice sound coming from your speakers!

:::tip
Note that if you emulate multiple clients in the same window (i.e. [http://127.0.0.1:8000/?emulate=4](http://127.0.0.1:8000/?emulate=4)), you should see how the soundworks launcher also helps you to start all the clients at once without requiring you to click on each of them:

![homepage-multiple](../assets/tutorials/plugin-platform-init/homepage-multiple.png)
:::

## Notes on the `@soundworks/helpers` default views

The splash screen, as well as other default initialization views that we have not seen yet, are automatically created and handled the `launcher` object included in the default application template:

```js 
// src/clients/player.index.js
launcher.register(client, { initScreensContainer: $container });
```

The launcher offer numerous way to adapt these views to your specific needs: e.g. to change the default styles, to adapt the language, or even to use completely different user defined views. 

While won't cover these advanced use-case here, as they will be the subject of a dedicated tutorial, let's just see here the minimal changes we can make to customize the init view.

Let's then open the `config/application.json` file which should look like this:

```js
// config/application.json
{
  name: 'plugin-platform-init',
  author: '',
  clients: {
    player: {
      target: 'browser',
      default: true,
    },
  },
}
```

This file has been generated for you by the _soundworks_ wizard, and the `clients` entry is automatically updated each time you create a new client using the wizard.

However, the first 2 lines can be safely updated and are used by the `launcher` to create the splash screen. Let's just change the `name` and `author` entries to see it in action:

```
name: 'plugin-platform-init', // [!code --]
name: 'Hello Plugins', // [!code ++]
author: '', // [!code --]
author: 'me & myself', // [!code ++]
```

And tada! If you now go to [http://127.0.0.1:8000](http://127.0.0.1:8000) you should now see something like:

![homepage-custom](../assets/tutorials/plugin-platform-init/homepage-custom.png)

::: info
By default, the init views try to adapt to the locale of the browser and falls back to English if the localized texts do not exist. However, as we only provide English and french versions of the texts at time of writing the tutorial, it's likely that you have seen the English version.

If you are comfortable with another language and are willing to contribute a localized version of [this file](https://github.com/collective-soundworks/soundworks-helpers/blob/main/browser-client/i18n/en.js), please open an issue or a pull request in the [`@soundworks/helpers`](https://github.com/collective-soundworks/soundworks-helpers/) repository!
:::

## Conclusion

In this tutorial, you have learned the basics of _soundworks_ plugins usage, and more precisely how to use the _platform-init_ plugin. While this plugin is not _per se_ very complex, it can save you a lot of (quite boring) development time by simplifying the initialization of certain browser features. Along the way, you also discovered some of the functionalities provided by the `launcher` component that is automatically included in all _soundworks_ applications created using the wizard.

In the next tutorial, we will wrap up what we have learned so far by creating a small working application where several clients can be used as distributed speakers by a central controller.





