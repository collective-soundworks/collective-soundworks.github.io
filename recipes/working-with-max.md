# Working with Max

In this recipe we will explore how to use _soundworks_ in the _Max (Cycling '74)_ environment and learn why we need to keep some specific workaround in mind in order to make our applications fully working and stable.

In the [Working with Node Clients](https://soundworks.dev/tutorials/node-clients.html) tutorial, we already explored the possibilities to work outside Web Browsers using Node.js, which to use _soundworks_ in a large set of use (for example, using the _node.script_ object exposed by the _Max_ environment).

To illustrate this specific usage, we will create a simple _soundworks-max_ application using the _soundworks_ wizard that will be your base skeleton for your own projects!

### Prerequisites

- [Node.js LTS](https://nodejs.org/en/)
- [Max 9+](https://cycling74.com/downloads) or [Live Suite 12+](https://www.ableton.com/)

### Related documentation

- [`node.script` object](https://docs.cycling74.com/reference/node.script/)
- [Max API for Node.js](https://docs.cycling74.com/apiref/nodeformax/)

<!-- - [Max](https://docs.cycling74.com/)
- [soundworks](https://soundworks.dev/soundworks/) -->

## General structure

To illustrate such usage, while keeping things organized, we will structure our application as follow:

```sh
my-super-app
├── working-with-max              # directory in which the soundworks application lives
└── my-max-patches                # directory in which the Max patches lives
```

Keep in mind that such structure is not mandatory, but a structure that may should be close to a "real-world" use case.

## Scaffolding the application

First, open a terminal and go to your projects directory:

```sh
cd path/to/your/projects/folder
```

Create your top level application directory and go into it:

```sh
mkdir my-super-app
cd my-super-app
```

As seen in other tutorials, we will use the _soundworks_ wizard to scaffold the application.

```sh
npx @soundworks/create@latest working-with-max
```

When the wizard asks you for plugins and libraries, just skip steps using `enter`.

Then, we will create a client (as well as his associated _patch_) using the template specifically adapted to the _Max_ environment. When the wizard asks you for the configuration of the default client:
- Name it `helloworld`
- Select the `node` target
- Select the `max` template

```ansi
[0;36m# Create client[0m[0m
[0;32m✔[0m [0;1mName of your new client (lowercase, no-space):[0m [0;90m…[0m helloworld[0m
[0;32m✔[0m [0;1mWhich runtime for your client?[0m [0;90m›[0m node[0m
[0;32m✔[0m [0;1mWhich template would you like to use?[0m [0;90m›[0m max (`node.script`)[0m
[0m
- Creating client "helloworld" in file "src/clients/helloworld.js"[0m
- name: [0;36mhelloworld[0m[0m
- runtime: [0;36mnode[0m[0m
- template: [0;36mmax[0m[0m
[0m
[0;36m?[0m [0;1mConfirm?[0m [0;90m›[0m no [0;90m/[0m [0;36;4myes[0m
```

After confirming, the wizard will then ask you to inform where you would like to create your associated _Max patch_. <!-- This is a rather important information since during the installation process, a folder including a _Max patch_ template and a _js_ file pointing at the _soundworks_ app will be created. -->

```ansi
Where should we create your Max patch? (leave blank to use current directory) › ../my-max-patches
```

<!-- Create the directory at the root of your app directory (one step behind the _soundworks_ app) : -->

:::warning Important Note
Since the wizard runs inside the _soundworks_ application you are creating (in our example, in the `my-super-app/working-with-max/` directory), the path you write here should be either an absolute path or a relative path from the _soundworks_ application directory.
:::

You can then exit the wizard :

```ansi
[0;36m?[0m [0;1mWhat do you want to do?[0m [0;90m›[0m [0;90m- Use arrow-keys. Return to submit.[0m[0m
    create a new soundworks client[0m
    install / uninstall soundworks plugins[0m
    install / uninstall related libs[0m
    find documentation about plugins and related libs[0m
    get config information about you application[0m
    create a new environment config file[0m
    eject the launcher and default views from `@soundworks/helpers[0m
    check and update your dependencies[0m
    upgrade config files from JSON to YAML[0m
[0;36m❯[0m   [0;36;4m→ exit[0m
```

## Running the application

To make sure the application is correctly set up, just go into the _soundworks_ project directory and run the server in development mode:

```sh
cd working-with-max
npm run dev
```

Then, open the _patch_ (`my-max-patches/node-helloworld.maxpat`) and click on the `script start` message box. You should see the _Node for Max debug tool_ turning green with _process running_ message. If you click on the `hello` message box, the object should answer `world`.

![hello-world_max-patch.png](../assets/recipes/hello-world_max-patch.png)

Tada! You have a fully working _soundworks_ app with a client running in _Node for Max_!

## How it works

Let's now have a closer look at your project's architecture and what was created by the wizard :

```sh
my-super-app
├── working-with-max              # Soundworks directory (where you do soundworks stuff)
│   ├── src
│       └── clients
│           └── helloworld.js     # Your client script (the one you edit)
│   ├── public
│   ├── node_modules
│   └── config
├── my-max-patches                # Max directory (where you do Max stuff)
│   ├── node-helloworld.maxpat    # A patcher skeleton with a node.script object
│   └── node-helloworld.js        # The script used in your Max patch acting as a 'bridge'
                                  # to the soundworks app (should remain unchanged)
```

This architecture is meant to work around some inconsistencies on how the filesystem is handled between _Node.js_ and _Max_. Indeed, if you take a closer look at the _node.script_ object in the _Max_ documentation, you will see that :

> _"Node and Max can sometimes disagree about how folder should be organized"_

For that matter, the _script_ instantiated by the _node.script_ _Max_ object should always remain in the same directory as your _patch_.

This lead to a conflict between the _soundworks_ file structure, the need for the _Node.js_ process to run within the `my-super-app/working-with-max` directory, and the need to organize your _Max_ patches within your own workflow.

Solving these different conflicts and requirements leds us to create this "bridge / proxy" script (i.e. `/my-super-app/my-max-patches/node-helloworld.js`) which is responsible to configure the _Node.js_ process to run in the right directory (i.e. `my-super-app/working-with-max`) and to import the "real" client script (i.e. `/my-super-app/working-with-max/src/client/helloworld.js`):

```js
// change process current working directory to the soundworks application root
process.chdir('../working-with-max');
// import the "real" client source file
import('../working-with-max/src/clients/helloworld.js');
```

## Important notes

### Moving you patches around

1) If for some reason you would like to move the _patches_ and `js` scripts elsewhere, it is essential to keep in mind that you will also have to change the relative path to the _soundworks_ app inside the associated _proxy_ script (`node-helloworld.js`).

2) The _patch_ and its related proxy script should **always** together in the same directory.

A good practice could also be for example to have the entire directory in your _File Preferences_ path in _Max_ in order to use this _patch_ as an _abstraction_.

### Specificities of the soundworks client for Max

Compared to a regular _Node.js_ client, the _Node.js_ for _Max_ as the following peculiarities:

1. Import to use the `max-api` in node

```js
import Max from 'max-api';
```

Note that this will make the process to crash if run outside the _Max_ `node.script` object.

2. Hardcoded `ENV` variable to be able to switch between different environment configurations

```js
const ENV = 'default';
```

This is due the impossibility to define environment variables from the `node.script` object

<!-- 3. Since it does not make any sense to emulate clients in _Node for Max_, there is no bootstrap function as you could see in a regular _soundworks_ client. -->

