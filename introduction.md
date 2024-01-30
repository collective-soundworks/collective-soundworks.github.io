# Introduction

## Goal

**soundworks** is an open-source creative coding framework for distributed applications based on Web technologies. Primarily focused on music, **soundworks** aims at supporting rapid development of real-time distributed applications using JavaScript. It provides abstractions to hide the complexity of the network and to foster very rapid-prototyping and trial-and-error workflows that are typical in artistic practices. 

At its core, **soundworks** is primarily focused on synchronization of data and states among clients, and on simplifying their control both locally and remotely. 

Another important feature is that one **soundworks** is to make no distinction between browsers or _Node.js_ runtimes. As such it can be used to prototype and develop distributed applications running exclusively or partly on embedded hardware such as Raspberry Pi while using the same architecture, code base and principles.

![high level architecture](/assets/introduction/high-level-architecture.png)

Despite the "sound" in **soundworks**, the framework doesn't do any choice for you regarding the audio library you might use (be it low-level Web Audio API or higher level libraries) and more generally on the rendering aspects of your application. Therefore, it can also be suited to develop applications outside the audio realm, such as distributed applications focused on graphics or multi-user collaborative games.

## Philosophy

**soundworks** has been and is still primarily developed as an experimental platform for artistic and scientific research in the domain of music and arts. As such the code base is considered as an experimental platform which embodies a dynamic relation and a dialog between _"epistemic things"__ and _"technical objects"_, to quote Rheinberger.

Such an approach has strong implications on the design and maintenance of the code base, as it must evolve in such way to keep questioning the theory and practices it embodies (in order to not be _"reduced to the simple demonstration of a phenomenon"_  - to quote Rheinberger again).

To mitigate this need of change and mutation with the contradictory need of stability required by software development, we opted for a modular architecture and to follow the [semver](https://semver.org/) approach. We hope this choice will minimize the maintenance burden of existing application while allowing the framework to evolve according to novel research questions.

Finally, both for maintenance and philosophical reasons, one of the goal of **soundworks** is to follow Web Standards as close as possible. As such, the code base is developed in pure _JavaScript_ and will only integrate language features that have reach [Stage 3](https://tc39.es/process-document/). For example, while we hope to propose some "type" files derived from the _JSDoc_ for _TypeScript_ users in a near future (and the fact that it works or not is not in our hands), this won't be implemented into the code base until the [type annotation](https://github.com/tc39/proposal-type-annotations) proposal has evolved.

## Architecture

The core of **soundworks**  framework mainly provides the following functionalities:

### Client and server initialization

The **soundworks** `Client` and `Server` abstractions, which are the main entry points of soundworks, are responsible to do all the nifty-gritty of creating a distributed application: running an http server, setting up WebSockets, properly sharing configuration objects, handling initialization process, etc.

> See the [Getting Started](/tutorials/getting-started) tutorial

### Distributed shared states

The `StateManager` component provides tools to help you create synchronized states among your distributed devices. The component is specifically designed to help implement remote control and monitoring which is a key feature for rapid prototyping real-time distributed applications where you want to control many devices from a single point.

> See the [State Manager](/tutorials/state-manager) tutorial

![distributed shared states](/assets/introduction/distributed-state-management.png)

### Plugin host

**soundworks** also implements a plugin system to add new and more specific functionalities to the core framework. For example, we provide plugins for [synchronizing clocks](/plugins/sync), working with the [filesystem](/plugins/filesystem) or to dynamically [script](/plugins/scripting) parts of application at runtime. All plugins live in their own repository and are versioned at their own pace to simplify future evolution.

> See the [Plugin Platform Init](/tutorials/plugin-platform-init) tutorial

## About the tutorials

These tutorials are focused on _soundworks_ functionality which are quite abstract according to the low-level platform APIs such as WebSockets. If you need some refresher on this point you can have a look [here](./misc/websockets-101).

Also, the tutorials assume that you have some level of familiarity with the usage of the Web Audio API, if you need a refresher on that point, you can have a look [there](https://ircam-ismm.github.io/webaudio-tutorials).

Else, you can just jump to the [Getting Started](./tutorials/getting-started) tutorial.
