import sidebarPlugins from './sidebar-plugins.js';

export default {
  title: 'soundworks',
  description: 'Creative coding framework for distributed applications based on Web technologies',

  srcExclude: ['README.md', 'TODOS.md'],

  // https://vitepress.vuejs.org/config/app-configs#markdown
  markdown: {
    theme: 'monokai',
    lineNumbers: false,
  },

  themeConfig: {
    logo: '/logo-nav.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/collective-soundworks/' },
    ],

    nav: [
      { text: 'Guide', link: '/tutorials/getting-started' },
      { text: 'soundworks API', link: 'https://soundworks.dev/soundworks' },
      { text: 'Credits', link: '/credits' },
    ],

    sidebar: [
      {
        text: 'Introduction', link: '/introduction',
      },
      {
        text: 'Tutorials',
        items: [
          { text: 'Getting Started', link: '/tutorials/getting-started' },
          { text: 'Using the State Manager', link: '/tutorials/state-manager' },
          { text: 'Using Plugins 1 - <i>platform-init</i>', link: '/tutorials/plugin-platform-init' },
          { text: 'The <i>Todo Noise</i> Application', link: '/tutorials/todo-noise' },
          { text: 'Working with Node Clients', link: '/tutorials/node-clients' },
          { text: 'Using Plugins 2 - <i>sync</i>', link: '/tutorials/plugin-sync' },
          { text: 'Distributed Step Sequencer', link: '/tutorials/step-sequencer' },
          // { text: 'Using Contexts', link: '/tutorials/context' },
          // { text: 'Using Plugins 3 - Scripting', link: '/tutorials/plugin-scripting' },

        ],
      },
      {
        text: 'Documentation',
        items: [
          { text: 'soundworks API', link: 'https://soundworks.dev/soundworks', },
          ...sidebarPlugins,
        ],
      },
      // {
      //   text: 'Receipes',
      //   items: [
      //     { text: 'Customizing Init Screens', link: '/receipes/customizing-init-screens' },
      //   ],
      // },
      {
        text: 'Ecosystem',
        items: [
          { text: '@ircam/sc-components', link: 'https://ircam-ismm.github.io/sc-components' },
          // { text: '@ircam/sc-scheduling', link: 'https://ircam-ismm.github.io/sc-scheduling' },
          { text: '@ircam/sc-utils', link: 'https://github.com/ircam-ismm/sc-utils' },
          { text: '@ircam/devicemotion', link: 'https://github.com/ircam-ismm/devicemotion' },
        ],
      },
      {
        text: 'Misc',
        items: [
          { text: 'WebSockets 101', link: '/misc/websockets-101' },
        ],
      },
    ],
  }
}
