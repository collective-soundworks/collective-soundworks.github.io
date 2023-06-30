# Introduction

## Goal

**soundworks** is an open-source creative coding framework for distributed applications based on Web technologies. Primarily focused on music, **soundworks** aims at supporting rapid development of real-time distributed applications using JavaScript. It provides abstractions to hide the complexity of the network and to foster very rapid-prototyping and trial-and-error workflows that are typical in artistic practices. 

At its core, **soundworks** is primarily focused on synchronization of data and states amonst clients, and on simplifying their control both localy and remotely. 

Another important feature is that one **soundworks** is to make no distinction between browsers or _Node.js_ runtimes. As such it can be used to prototype and develop distributed applications running exclusively or partly on embedded hardware such as Rapberry Pi while using the same architecture, codebase and principles.

![high level architecture](/assets/introduction/high-level-architecture.png)

Despite the "sound" in **soundworks**, the framework doesn't do any choice for you regarding the audio library you might use (be it low-level Web Audio API or higher level libraries) and more generally on the rendering aspects of your application. Therefore, it can also be suited to develop applications outside the audio realm, such as distributed applications focused on graphics or multi-user collaborative games.

## Philosophy

**soundworks** has been and is still primarily developped as an experimental platform for artistic and scientific research in the domain of music and arts. As such the code base is considered as an experimental platform which embodies a dynamic relation and a dialog betwenn _"epistemic things"__ and _"technical objects"_, to quote Rheinberger.

Such an approach has strong implications on the design and maintenance of the code base, as it must evolve in such way as to keep questionning the theory and practices it embodies, in order to not be _"reduced to the simple demonstration of a phenomenon"_ (to quote Rheinberger again).

To mitigate this need of change and mutation with the contradictory need of stability required by software development, we opted for a quite modular architecture and to follow (as much as possible) the [semver](https://semver.org/) approach, which we hope should minimize the maintenance burden of an existing application. However, let's be honest, in our view software development requires maintenance and will probably always be.

Finally, both for maintenance and philosophical reasons, one of the goal of **soundworks** is to follow Web Standarts as close as possible. As such, the code base is developped in pure _JavaScript_ and will only use language features that have reach [Stage 3](https://tc39.es/process-document/). For example, while we hope to propose some "type" files derived from the _JSDoc_ for _TypeScript_ users in a near future, this won't be implemented in the code base until the [type annotation](https://github.com/tc39/proposal-type-annotations) proposal has evolved.

## Architecture

The core of **soundworks**  framework mainly provides the following fonctionnalities:

### Client and server initalization

The **soundworks** `Client` and `Server` abstrations, which are the main entry points of soundworks, are responsible to do all the nitty-gritty of creating a distributed application: running an http server, setting up WebSockets, properly sharing configuration objets, handling initialization process, etc.

> see the [Getting Started](/tutorials/getting-started) tutorial

### Distributed shared states

The `StateManager` component provides tools to help you create synchronized states among your distributed devices. The component is specifically designed to help implement remote control and monitoring which is a key feature for rapid prototyping real-time distributed applications where you want to control many devices from a single point.

> see the [State Manager](/tutorials/state-manager) tutorial

![distributed shared states](/assets/introduction/distributed-state-management.png)

### Plugin host

**soundworks** also implements a plugin system to add new and more specific functionnalities to the core framework. For example, we provide plugins for [synchronizing clocks](/plugins/sync), working with the [filesystem](/plugins/filesystem) or to dynamically [script](/plugins/scripting) parts of application at runtime. All plugins live in their own repository and are versionned at their own pace to simplify future evolutions.

> see the [Plugin Platform Init](/tutorials/plugin-platform-init) tutorial


