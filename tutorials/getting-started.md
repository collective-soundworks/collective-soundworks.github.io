# Getting Started

In this tutorial, we will learn how to setup a project and develop a simple _soundworks_ application where any connected user will be able to trigger a flash on the screen of all connected clients.

The tutorial requires basic knowledge of _JavaScript_, _Node.js_ and of the command-line. If you are just starting with _JavaScript_ development, please first set up a working environment following the instructions [here](https://ircam-ismm.github.io/webaudio-tutorials/first-steps/setting-up-environment.html) and come back when done.

### Prerequisites

- [Node.js 16+](https://nodejs.org/en/)
- A modern browser (e.g. Chrome, Firefox)

## Step 1 - Setting things up

The best and most simple way to create a new _soundworks_ application is to use our dedicated command line tools:

![soundworks/create](../assets/tutorials/getting-started/soundworks-create-min.gif)

So first thing first, open a Terminal, go to some directory and execute the following command:

```sh
cd path/to/working/dir
npx @soundworks/create@latest
```

::: tip
If you run the command for the first time (which is quite likely), the `npx` command will tell you that it needs to install the `@soundworks/create` package, just press `Enter` to accept and continue.
:::

The wizard will startup and ask you for the name of the directory in which you want to create the application: just write `getting-started` and press `Enter`. The wizard will automatically create the directory, copy a bunch of files and install the required dependencies as illustrated in the screenshot below.

::: info
Note that the screenshots in this guide may differ slightly from what you actually see in your console, as the CLI tool might have evolved a bit since the screenshots have been made.
:::

```ansi
[0;32m~/tmp[0m $ npx @soundworks/create@latest[0m
[0;90m[@soundworks/create#v5.0.3][0m[0m
[0m
[0;33m> welcome to soundworks[0m[0m
[0m
- documentation: [0;36mhttps://soundworks.dev[0m[0m
- issues: [0;36mhttps://github.com/collective-soundworks/soundworks/issues[0m[0m
[0m
[0;32m✔[0m [0;1mWhere should we create your project? (leave blank to use current directory)[0m [0;90m…[0m getting-started[0m
[0m
- Scaffolding application in "~/tmp/getting-started" directory[0m
- Installing dependencies[0m
```

:::tip
If you run the command for the first time, you will prompt to install the `@soundworks/create` package from the internet, just press `Enter` to confirm

```ansi
[0;32m~/tmp[0m $ npx @soundworks/create@latest[0m
Need to install the following packages:[0m
@soundworks/create@5.0.3[0m
Ok to proceed? (y) [0m
```
:::

Once the installation is done, the `@soundworks/create` wizard will propose you to install some _soundworks_ plugins and some curated libraries. For now, just press `Enter` to skip this steps.

```ansi
[0;90m[@soundworks/wizard#v5.0.3][0m[0m
[0m
[0;36m# Install plugins[0m[0m
[0;32m✔[0m [0;1mSelect the plugins you would like to install/uninstall[0m [0;90m›[0m [0m
[0;33m+ nothing to do, aborting...[0m[0m
[0m
[0;36m# Install libraries[0m[0m
[0;32m✔[0m [0;1mSelect the libraries you would like to install/uninstall[0m [0;90m›[0m [0m
[0;33m+ nothing to do, aborting...[0m
```

After that step, the wizard will propose you to create a client of your application. Let's call it `player` and press `Enter` as shown below.

```ansi
[0;36m# Install plugins[0m[0m
[0;32m✔[0m [0;1mSelect the plugins you would like to install/uninstall[0m [0;90m›[0m [0m
[0;33m+ nothing to do, aborting...[0m[0m
[0m
[0;36m# Install libraries[0m[0m
[0;32m✔[0m [0;1mSelect the libraries you would like to install/uninstall[0m [0;90m›[0m [0m
[0;33m+ nothing to do, aborting...[0m[0m
[0m
[0;36m# Create client[0m[0m
[0;36m?[0m [0;1mName of your new client (lowercase, no-space):[0m [0;90m›[0m player[0m
```

The wizard will then ask a few questions to configure your client, again just press `Enter` to select the default values, i.e. select the `browser` runtime

```ansi
[0;36m# Create client[0m[0m
[0;32m✔[0m [0;1mName of your new client (lowercase, no-space):[0m [0;90m…[0m player[0m
[0;36m?[0m [0;1mWhich runtime for your client?[0m [0;90m›[0m [0;90m- Use arrow-keys. Return to submit.[0m[0m
[0;36m❯[0m   [0;36;4mbrowser[0m[0m
    node[0m
```

and the `default` template:

```ansi
[0;36m# Create client[0m[0m
[0;32m✔[0m [0;1mName of your new client (lowercase, no-space):[0m [0;90m…[0m player[0m
[0;32m✔[0m [0;1mWhich runtime for your client?[0m [0;90m›[0m browser[0m
[0;36m?[0m [0;1mWhich template would you like to use?[0m [0;90m›[0m [0;90m- Use arrow-keys. Return to submit.[0m[0m
[0;36m❯[0m   [0;36;4mdefault[0m[0m
    controller[0m
```

Finally, the wizard will ask you to confirm your choices, press `Enter`.

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

Once done, the wizard will propose you a bunch of possible thing to do, for now let's just `exit`:

```ansi{11}
[0;36m?[0m [0;1mWhat do you want to do?[0m [0;90m›[0m [0;90m- Use arrow-keys. Return to submit.[0m[0m
    create a new soundworks client[0m
    install / uninstall soundworks plugins[0m
    install / uninstall related libs[0m
    find documentation about plugins and libs[0m
    get config information about you application[0m
    create a new environment config file[0m
    eject the launcher and default init views[0m
    check and update your dependencies[0m
    upgrade config files from JSON to YAML[0m
[0;36m❯[0m   [0;36;4m→ exit[0m
```

Congrats, your application is now ready to be launched!

```ansi
[0;32m+ Your project is ready![0m[0m
[0m
- next steps:[0m
  1: [0;36mcd getting-started[0m[0m
  2: [0;36mgit init && git add -A && git commit -m "first commit"[0m (optional)[0m
  3: [0;36mnpm run dev[0m
```

To make sure the application is correctly set up and installed, just follow the steps 1 and 3 proposed as next steps by the wizard:

1. Go to the directory: `cd getting-started`
2. Launch the project in development mode: `npm run dev`

After a few seconds, the server should be running:

```ansi
[0;32m~/tmp[0m $ cd getting-started/[0m
[0;32m~/tmp/getting-started[0m $ npm run dev[0m
[0m
[0;33m[...some build logs...][0m[0m
[0m
--------------------------------------------------------[0m
- launching "getting-started" in "default" environment[0m
- [pid: 38424][0m
--------------------------------------------------------[0m
[0m
[0;36m+ configured clients and routing[0m[0m
[0m
ROLE     | RUNTIME | PATH   | DEFAULT |  AUTH [0m
> player | [0;31mbrowser[0m | /      |    x    |       [0m
[0m
[0;36m+ starting registered plugins[0m[0m
[0;36m+ http server listening on[0m[0m
    http://127.0.0.1:[0;32m8000[0m[0m
    http://192.168.1.89:[0;32m8000[0m[0m
[0m
> press "[0;1mCtrl + C[0m" to exit[0m
Sass is watching for changes. Press Ctrl-C to stop.[0m
```

Open you favorite browser (which shall probably not be Safari), go to [http://127.0.0.1:8000](http://127.0.0.1:8000), and tada! You should see a rather pretty almost black screen:

![fancy-black-screen](../assets/tutorials/getting-started/fancy-black-screen.png)

Congrats! You just configured and ran your first soundworks application. Now, let's have a closer look to the code base.

## Step 2 - Exploring the file structure of the application

Press `Ctrl + C` to stop the server and open the `getting-started` directory in your favorite text editor. You should see the following file structure:

```sh
getting-started
├── .build              # Directory where your application is built
├── config              # Configuration files
│   ├── application.yaml
│   └── env-default.yaml
├── node_modules        # Directory where the dependencies are installed
├── public              # Directory that is exposed by the server
├── src
│   ├── clients         # Directory where all clients are declared
│   │   └── player.js    # Source code of the `player` client you just created
│   ├── styles
│   └── server.js       # Source code of the server
├── package.json        # File that contains the declaration of your dependencies
└── README.md           # General infos about your application
```

There are a few thing to note about all these files:
- The `node_modules` and `.build` directories should **_never_** be edited manually. They are respectively used by the [Node Package Manager](https://docs.npmjs.com/about-npm) (i.e. `npm`) to install dependencies of your application, and by the _soundworks_ build tools to make some transformation on your source files.
- The `src` directory, at contrary, contains all the source files of your application, this is where you will work most of the time.
- The `public` directory is the directory that is exposed to the network by the server. This is the place where you should put your static assets such as images or sound files, so that clients connected to your application can download and use them.

::: warning
It is **_very_** important to understand and to keep in mind that exposing a directory to the network means that **_all the files_** located in this directory will be accessible by **_any_** computer connected to the same network.

**_So, DO NOT expose any sensitive or private information in this directory_**.

This is an important thing to keep in mind whenever you deal with servers and networks, it's not specific to _soundworks_ applications.
:::

Now that we have an overview of the file structure of a _soundworks_ application, let's write some code!

## Step 3 - Create a global shared state

First, go back to the Terminal and restart our server:

```sh
npm run dev
```

:::tip
The `dev` command (quite wisely) starts the server in development mode. This means the application will be bundled and the server restarted each time a source file is saved (which is expected to be comfortable and time saving when developing an application).
:::

Open the `src/server.js` file and add the following lines at the end of the file (i.e. after the `await server.start();` line):

```js {5-7}
// src/server.js
await server.start();

// and do your own stuff!
const globalSchema = {
  trigger: { type: 'boolean', event: true },
};
```

Here, we are just creating a plain old JavaScript object that follows the _soundworks_ shared state class description syntax. This data structure declares a parameter named `trigger` that is configured to be a `boolean` event.

::: tip
If you are familiar with databases, you can think of these data structure as the schema of a table.
If you are curious, the full API documentation for declaring shared state class descriptions can be found [here](https://soundworks.dev/soundworks/global.html#SharedStateClassDescription).
:::

Then we need to define a shared state class with a name and using this description in the _soundworks_' state manager:

```js {5}
const globalSchema = {
  trigger: { type: 'boolean', event: true },
};

server.stateManager.defineClass('global', globalSchema);
```

Finally, we can create a global shared state instance from this schema definition:

```js {7}
const globalSchema = {
  trigger: { type: 'boolean', event: true },
};

server.stateManager.defineClass('global', globalSchema);

const global = await server.stateManager.create('global');
```

And, that's it for the server-side logic!

If everything went well, you should see no error in the Terminal, and launching a [client in your browser](http://120.0.0.1:8000) should still show you the same fancy black page.

## Step 4 - Make clients interactive

Now that the server-side logic is ready, let's implement the client-side of our simple application.

Open a browser and go to [http://127.0.0.1:8000](http://127.0.0.1:8000), then go back to your text editor and open the `src/clients/player.js` file.

First, let's change a line of code to modify the text on the page to make sure we can act on this fancy black screen:

```js
// src/clients/player/index.js
await client.start();

function renderApp() {
  render(html`
    <div class="simple-layout">
      <p>Hello ${client.config.app.name}!</p> // [!code --]
      <p>Click here</p>  // [!code ++]

      <sw-credits .infos="${client.config.app}"></sw-credits>
    </div>
  `, $container);
}
```

If you reload the page (`Cmd + R` on Mac or `Ctrl + R` on Windows), you should now see the text "click here" displayed of the top left of your screen.

::: tip
The HTML rendering is done here using the [lit](https://lit.dev/) library developed by _Google_. While we promote usage of this library in our application template, _soundworks_ does not require usage of this library and could potentially be used with any other UI library or framework.
:::

Now that we are sure everything works as expected and that we have control over the behavior of this Web page, let's add the following code in the same file:

```js
// src/clients/player/index.js
await client.start();

const global = await client.stateManager.attach('global'); // [!code ++]
console.log('global shared state', global.getValues()); // [!code ++]

function renderApp() {
  render(html`
    <div class="simple-layout">
      <p>Click here</p>
      <sw-credits .infos="${client.config.app}"></sw-credits>
    </div>
  `, $container);
}
```

Here, we simply attach our client to the `global` state created by the server. This means that our client will be able 1. to apply some updates to the shared state, and 2. to be notified when a change is made to the shared state from another client on the network.

The second line will just log the current values of the `global` shared state into the browser's console, so that we can make sure that the `global` shared state has been successfully attached.

![browser-console](../assets/tutorials/getting-started/browser-console.png)

:::tip
To open the _JavaScript_ console in your browser, you should press `Cmd + Alt + I` and then select the `Console` tab.
:::

Now that our shared state is attached, let's write the code that allows us to react to any change made on the shared state:

```js
await client.start();

const global = await client.stateManager.attach('global');
console.log('global shared state', global.getValues());

global.onUpdate(updates => { // [!code ++]
  console.log(updates); // [!code ++]
}); // [!code ++]
```

In this snippet, we use the `onUpdate` method of the `global` shared state that allows us to register a function to be executed when something is updated on the state. For now, the callback function will just log the updates in the console, but we will come back there later on to do something more fancy.

At this point, we have all the logic we need to react to a change in the `global` shared state, but nothing to actually trigger a change. So, let's now add the following code to update the value of the `trigger` parameter when the user clicks on the screen:

```js
await client.start();

const global = await client.stateManager.attach('global');
console.log('global shared state', global.getValues());

global.onUpdate(updates => {
  console.log(updates);
});

$container.addEventListener('click', () => {  // [!code ++]
  global.set({ trigger: true }); // [!code ++]
}); // [!code ++]
```

Reload the page again (`Cmd + Shift + R`), and click anywhere on the screen, you should see a new log appear in the console on each click.

![browser-console-2](../assets/tutorials/getting-started/browser-console-2.png)

Finally, let's just review the code inside the `onUpdate` callback function to change the color of the screen, instead of just logging into the console.

```js
await client.start();

const global = await client.stateManager.attach('global');

global.onUpdate(updates => {
  console.log(updates);
  if (updates.trigger === true) {  // [!code ++]
    $container.style.backgroundColor = 'white';  // [!code ++]
  // [!code ++]
    setTimeout(() => {  // [!code ++]
      $container.style.backgroundColor = 'black';  // [!code ++]
    }, 50);  // [!code ++]
  }  // [!code ++]
});
```

Now, whenever the `trigger` parameter of the `global` shared state is set to `true`, we change the background color of the screen to `'white'` and put it back to `'black'` after 50 ms.

To see the shared state in action, and understand more precisely why we keep calling it a "_shared state_", let's emulate several parallel browser clients in our browser window. To that end, open [http://127.0.0.1:8000?emulate=8](http://127.0.0.1:8000?emulate=8) (note the `?emulate=8` at the end of the URL).

![emulated-clients](../assets/tutorials/getting-started/emulated-clients.png)

If you click on any of these 8 emulated clients, all of them will blink. Indeed all of them are attached to the same `global` shared state, and react exactly in the same way to the updates of the state.

## Conclusion

Congrats, you just wrote your first _soundworks_ application. Along the way you learned quite a few things:
1. How to setup a _soundworks_ application using the `@soundworks/create` wizard,
2. How to use some of the tools that are at your end to simplify development
3. Discovered the shared states provided by _soundworks_, and how they allow you to simplify development and to hide network complexity.

On the next tutorial, we will explore more possibilities proposed by the _soundworks_' distributed state management system.

