# soundworks | helpers

Set of common helpers for [`soundworks`](https://soundworks.dev) applications.

## Manual Installation

Note that the `@soundworks/helpers` package is automatically installed when you create an application using the `@soundworks/create` wizard, so most of the time you should not care to install this package manually. 

See [https://soundworks.dev/guides/getting-started.html](https://soundworks.dev/guides/getting-started.html) for more information on the `soundworks` wizard.

```
npm install --save @soundworks/helpers
```

## API

<!-- api -->
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [browserLauncher][1]
    *   [Examples][2]
    *   [language][3]
    *   [execute][4]
    *   [register][5]
    *   [setLanguageData][6]
    *   [getLanguageData][7]
*   [browserLoadConfig][8]
*   [nodeLauncher][9]
    *   [Examples][10]
    *   [execute][11]
    *   [register][12]
*   [nodeLoadConfig][13]
    *   [Parameters][14]

## browserLauncher

Launcher for clients running in browser runtime.

### Examples

```javascript
import launcher from '@soundworks/helpers/launcher.js'
```

### language

Set the language to be used in the initialization screens.

By default, picks language from the browser and fallback to english if not
supported. For now, available languages are 'fr' and 'en'.

Type: [string][15]

### execute

Allow to launch multiple clients at once in the same brwoser window by
adding `?emulate=numberOfClient` at the end of the url
e.g. `http://127.0.0.1:8000?emulate=10` to run 10 clients in parallel

#### Parameters

*   `bootstrap` **[Function][16]** Bootstrap function to execute.
*   `options` **[object][17]** Configuration object. (optional, default `{}`)

    *   `options.numClients` **[number][18]** Number of parallel clients. (optional, default `1`)
    *   `options.width` **[string][15]** If numClient > 1, width of the container. (optional, default `'20%'`)
    *   `options.height` **[string][15]** If numClient > 1, height of the container. (optional, default `'500px'`)

#### Examples

```javascript
launcher.execute(main, {
  numClients: parseInt(new URLSearchParams(window.location.search).get('emulate')) || 1,
});
```

### register

Register the client in the launcher.

The launcher will do a bunch of stuff for you:

*   Display default initialization screens. If you want to change the provided
    initialization screens, you can import all the helpers directly in your
    application by doing `npx soundworks --eject-helpers`. You can also
    customise some global syles variables (background-color, text color etc.)
    in `src/clients/components/css/app.scss`.
    You can also change the default language of the intialization screen by
    setting, the `launcher.language` property, e.g.:
    `launcher.language = 'fr'`
*   By default the launcher automatically reloads the client when the socket
    closes or when the page is hidden. Such behavior can be quite important in
    performance situation where you don't want some phone getting stuck making
    noise without having any way left to stop it... Also be aware that a page
    in a background tab will have all its timers (setTimeout, etc.) put in very
    low priority, messing any scheduled events.

#### Parameters

*   `client` **[Function][16]** The soundworks client.
*   `options` **[object][17]** Configuration object. (optional, default `{}`)

    *   `options.initScreensContainer` **[HTMLElement][19]** The HTML container for
        the initialization screens. (optional, default `null`)
    *   `options.reloadOnVisibilityChange` **[boolean][20]** Define if the client
        should reload on visibility change. (optional, default `true`)
    *   `options.reloadOnSocketError` **[boolean][20]** Define if the client
        should reload on socket error and disconnection. (optional, default `true`)

#### Examples

```javascript
launcher.register(client, { initScreensContainer: $container });
```

### setLanguageData

Set the text to be used for a given language. Allows to override an existing
language as well as define a new one.

#### Parameters

*   `lang` **[string][15]** Key correspondig to the language (e.g. 'fr', 'en', 'es')
*   `data` **[object][17]** Key/value pairs defining the text strings to be used.

### getLanguageData

Retrieve the data for a given language.

#### Parameters

*   `lang` **[string][15]** Key correspondig to the language (e.g. 'fr', 'en', 'es') (optional, default `null`)

## browserLoadConfig

Returns the browser client configuration as retrieved by the server

Returns **ClientConfig**&#x20;

## nodeLauncher

Launcher for clients running in Node.js runtime.

### Examples

```javascript
import launcher from '@soundworks/helpers/launcher.js'
```

### execute

The "execute" function allows to fork multiple clients in the same terminal window
by defining the `EMULATE` env process variable
e.g. `EMULATE=10 npm run watch-process thing` to run 10 clients side-by-side

#### Parameters

*   `bootstrap` **[function][16]** Bootstrap function to execute.
*   `options` **[object][17]** Configuration object. (optional, default `{}`)

    *   `options.numClients` **[number][18]** Number of parallel clients. (optional, default `1`)
    *   `options.moduleURL` **[string][15]** Module url of the calling file, used as
        current worink directory of the subprocesses. (optional, default `null`)

#### Examples

```javascript
launcher.execute(bootstrap, {
  numClients: process.env.EMULATE ? parseInt(process.env.EMULATE) : 1,
  moduleURL: import.meta.url,
});
```

### register

Register the soundworks client into the launcher

Automatically restarts the process when the socket closes or when an
uncaught error occurs in the program.

#### Parameters

*   `client` **[Function][16]** The soundworks client.
*   `options` **[object][17]** Configuration object. (optional, default `{}`)

    *   `options.restartOnError` **[boolean][20]** Define if the client should
        restart on uncaught errors. (optional, default `false`)
    *   `options.restartOnSocketClose` **[boolean][20]** Define if the client should
        restart on socket disconnection. (optional, default `true`)
    *   `options.exitParentProcess` **[boolean][20]** If true, exit the parent "launcher"
        process on both error and socket close, may be usefull in production settings
        if the application is e.g. managed by a daemon at the system level. (optional, default `false`)

#### Examples

```javascript
launcher.register(client);
```

## nodeLoadConfig

Load configuration from files located in `/config` directory

### Parameters

*   `ENV` **[String][15]** Name of the environment corresponding to the
    `config/env-${name}.{yaml|json}` file. (optional, default `'default'`)
*   `callerURL` **[String][15]** Module url of the calling file, used to
    automatically retrieve the `role` of node clients. (optional, default `null`)

Returns **(ClientConfig | ServerConfig)**&#x20;

[1]: #browserlauncher

[2]: #examples

[3]: #language

[4]: #execute

[5]: #register

[6]: #setlanguagedata

[7]: #getlanguagedata

[8]: #browserloadconfig

[9]: #nodelauncher

[10]: #examples-3

[11]: #execute-1

[12]: #register-1

[13]: #nodeloadconfig

[14]: #parameters-6

[15]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[17]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[18]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[19]: https://developer.mozilla.org/docs/Web/HTML/Element

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

<!-- apistop -->

## Credits

[https://soundworks.dev/credits.html](https://soundworks.dev/credits.html)

## License

[BSD-3-Clause](./LICENSE)