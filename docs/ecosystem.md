# Ecosystem

[[toc]]

## `@soundworks/core`

The core of the framework is principally dedicated to:
- WebSocket communications
- Distributed state management
- Plugin hosting

::: tip Note
Most of the time you won't need to install `soundworks` manually, as the application template already takes care of that.
:::

```sh
npm install --save @soundworks/core
```

[__→ documentation__](http://collective-soundworks.github.io/soundworks/)  
[__→ github__ ](https://github.com/collective-soundworks/soundworks)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/core)  

## Plugins

`soundworks/core` functionalities can be extended by installing plugin, here is the list of the available plugins so far:

### `@soundworks/plugin-audio-buffer-loader`

*`soundworks` plugin for loading and managing audio buffers and related JSON data. Currently limited to `.mp3`, `.wav` or `.json` formats to enforce browser compatibility and support (meaning support for Safari...)*

```sh
npm install @soundworks/plugin-audio-buffer-loader --save 
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-plugin-audio-buffer-loader)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/plugin-audio-buffer-loader)  
[__→ example__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-audio-buffer-loader)  
[__→ example (w/ filesystem)__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-audio-buffer-loader-and-filesystem)  


### `@soundworks/plugin-checkin`

*`soundworks` plugin for assigning a ticket (unique index) to the client among the available ones. The number of available tickets can be limited and tickets can be associated with additional data.*

```sh
npm install @soundworks/plugin-checkin --save 
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-plugin-checkin)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/plugin-checkin)  
[__→ example__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-checkin)  


### `@soundworks/plugin-filesystem`

*`soundworks plugin to parse and watch directories and distribute their content the all clients in real-time.*

```sh
npm install @soundworks/plugin-filesystem --save 
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-plugin-filesystem)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/plugin-filesystem)  
[__→ example__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-filesystem)  


### `@soundworks/plugin-logger`

*`soundworks` plugin dedicated to recording arbitrary from any node of the network into plain old files.*

```sh
npm install @soundworks/plugin-logger --save 
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-plugin-logger)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/plugin-logger)  
[__→ example__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-logger)  


### `@soundworks/plugin-platform`

*`soundworks` plugin that checks availability and initialize features required by the application. It also provides an entry point for features that may require a user gesture (e.g. clicking on the screen to resume an audio context). The plugin can also be used to simply add a splash screen to the application.*

```sh
npm install @soundworks/plugin-platform --save 
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-plugin-platform)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/plugin-platform)  
[__→ example__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-platform)  
[__→ example (w/ devicemotion)__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-platform-devicemotion)  


### `@soundworks/plugin-position`

*`soundworks` plugin for locating people in an area. In the `soundworks-template default views, the plugin is associated to an initialization screen where people are asked to give their position on a map.*

```sh
npm install @soundworks/plugin-position --save 
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-plugin-position)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/plugin-position)  
[__→ example__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-position)  


### `@soundworks/plugin-scripting`

*`soundworks` plugin for runtime scripting. The plugin allows to define entry point in the application that enable the end user to modify the behavior of the distributed application at runtime, following an end-user programming strategy.*

```sh
npm install @soundworks/plugin-scripting --save 
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-plugin-scripting)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/plugin-scripting)  
[__→ example__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-scripting)  


### `@soundworks/plugin-sync`

*`soundworks` plugin for synchronizing arbitrary clocks across devices. The plugin is basically a wrapper around the [@ircam/sync](https://github.com/collective-soundworks/sync) library.*

```sh
npm install @soundworks/plugin-sync --save 
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-plugin-sync)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/plugin-sync)  
[__→ example__ ](https://github.com/collective-soundworks/soundworks-examples/tree/master/plugin-sync)  


## `soundworks-template`

*Project template for developing soundworks applications, the template provides a clean code base to start developing an application*

```sh
git clone https://github.com/collective-soundworks/soundworks-template.git my-application
cd my-application
rm -Rf .git
npm install
npm run dev
```

[__→ github__ ](https://github.com/collective-soundworks/soundworks-template)  

Additionally to the `@soundworks/core` package, the template install and uses the `@soundworks/template-build` and `@soundworks/template-helpers` to simplify a set of common tasks.


### `@soundworks/template-build`

*Build scripts of the `soundworks-template`*

```sh
npm install --save @soundworks/template-build
```
[__→ github__ ](https://github.com/collective-soundworks/soundworks-template-build)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/template-build)  


### `@soundworks/template-helpers`

*Set of common helpers (init views, etc.) for applications based on the soundworks-template*

```sh
npm install --save @soundworks/template-helpers
```
[__→ github__ ](https://github.com/collective-soundworks/soundworks-template-build)  
[__→ npm__](https://www.npmjs.com/package/@soundworks/template-build)  

