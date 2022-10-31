# Getting Started

In this tutorial, you will learn how to setup a simple `soundworks` application that allows any user to trigger a flash on the screen of all connected clients.

The tutorial requires basic knowledge of _JavaScript_, _Node.js_ and of the command-line. If you are just starting with _JavaScript_ development, please first set up a working environment following the instructions [here](/misc/setting-up-environment.html) and come back when done.

## Prerequisites

- Node.js 16+
- A modern browser

<!-- [[toc]] -->

## Setting Things Up

The best way to set up your application is by using the soudnworks' dedicated CLI tools. 

To create a new project, open a terminal and execute the following command:

```sh
npx init @soundworks soundworks-tutorial
cd soundworks-tutorial
npm install
```

The tool will ask you a number of questions to customize the application, for now just hit enter to select the defaults.

Once done, you should able to run the application by executing:

```sh
npm run dev
```

--> screenshot of a terminal

--> review, this is wrong, the server crashes in that case

`@soundworks/create`
  - install `@soundworks/devtools`
  - `@soundworks/devtools` postinstall: check app config, if no clients defined, execute `npx soundworks --create-client`

When the server starts, it tells you that an http server is listening on port `8000`. However, if you try
to access the following URL <a href="http://127.0.0.1:8000" target="_blank">http://127.0.0.1:8000</a> in you favorite browser, you should see an error page (i.e. the famous "404 Not Found" error): 

--> screenshot of 404

Indeed, we created the application but we did not create and configure any client yet. To do so, shutdown the server by typing `exit` in the terminal window and press `Enter`, or alternatively, press `Ctrl+C`. Once the server is closed execute the following command:

```sh
npx soundworks create-client
```

The wizard will ask you a couple of questions:
- The name (i.e. its role) of the client, let's call it "player"
- The template you would like to use, choose `default`
- If the client is the default one, choose `yes`

--> add animated gif

Once done, you can restart the server (`npm run dev`) and visit <a href="http://127.0.0.1:8000" target="_blank">http://127.0.0.1:8000</a> in your favorite browser again (or just press `Cmd+R` in the previous browser tab to refresh the page). You should now see the following screen:


you should be able to open a web page at the following url <a href="http://127.0.0.1:8000" target="_blank">http://127.0.0.1:8000</a> in you favorite browser and see the following screen:

--> screenshot of a default webpage

Congrats! You just configured and ran your first soundworks application. Now, let's have a closer look to the codebase.

## Unfolding the Directory Structure

Open the `soundworks-tutorial` directory in your favorite text editor.

```
├── README.md
├── index.html     # The main HTML page for your application
├── package.json
├── src
│   ├── index.js   # Main application script
│   └── components    # Directory containing local components bundled with your application
│       └── index.js
└── vite.config.js # Build tool configuration file
```

## Creating a Global Shared State


## Implementing the Client Logic
