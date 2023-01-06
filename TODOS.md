## v-next structure

### homepage

add links to:
- apps.ismm.ircam.fr
- youtube channel
- ircam-ismm.github.io
- github.com/collective-soundworks

same layout as apps.ismm.ircam.fr

### guide

- Getting Started
- Soundworks Ecosystem
  + @soundworks/core
  + @soundworks/create
  + @soundworks/plugin-*
  + @soundworks/helpers
  + @soundworks/build
- Related Libraries and Tools
  + sc-* libraries
  + node-web-audio-api
  + dot-* ecosystem
- Generic Applications
  + Playground
  + CoMo - Elements
  + Koryphaios
- Conventions about naming in packages
    * client / server
    * node and browser runtimes for clients

### tutorial

- soundworks internals
  + using the state-manager
  + using plugins (1)
    * @soundworks/plugin-platform example
  + using contexts
    * paragraph on locking contexts to specific roles
    * paragraph on creating contexts between init and start
  + mixing it all, the "todo-noise" application
  + customize the @soundworks/helpers
    * customize the css globals variables
    * customize the text / language
    * eject @soundworks/helpers
  + using plugins (2)
    - @soundworks/plugin-sync example
  + synchronized audio scheduling, building a distributed step sequencer
  + using plugins (3)
    - @soundworks/plugin-scripting example
  + working with node clients
  
  + understand and configure the @soundworks/build system
  + soundworks-max - sharing state with Max/MSP
  + anatomy of the default template app
  + creating a connected lamp with a RPi :)
  + create an embedded distributed system with dotpi
  
  + working with MIDI and OSC (some plugin could be welcome)
- misc
  + setting up a development environment
  + general principles of networks
  + creating a local network and deploying a soundworks application
  + deploying an application on the internet
    * nginx configuration
    * apache configuration
  + contributing to the site

### Examples

