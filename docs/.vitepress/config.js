export default {
  title: 'soundworks',
  description: 'Creative coding framework for distributed applications based on Web technologies',

  // https://vitepress.vuejs.org/config/app-configs#markdown
  markdown: {
    theme: 'monokai',
    lineNumbers: false,
  },

  themeConfig: {
    logo: '/logo-nav.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/collective-soundworks/soundworks' },
    ],

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: 'https://soundworks.dev/soundworks' },
      { text: 'Credits', link: '/credits' },
    ],

    sidebar: [
      {
        items: [
          // { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Getting Started', link: '/guide/getting-started' },
        ],
      },
      {
        text: 'Tutorials',
        items: [
          { text: 'Using the State Manager', link: '/tutorials/state-manager' },
          { text: 'Using Plugins 1 - Platform', link: '/tutorials/plugin-platform' },
          // { text: 'Using Contexts', link: '/tutorials/context' },
          // { text: 'The "Todo Noise" App', link: '/tutorials/todo-noise' },
          // { text: 'Using Plugins 2 - Sync', link: '/tutorials/plugin-sync' },
          // { text: 'Synchronized Scheduling', link: '/tutorials/synchronized-audio-scheduling' },
          // { text: 'Using Plugins 3 - Scripting', link: '/tutorials/plugin-scripting' },
          // { text: 'Working with Node Clients', link: '/tutorials/node-clients' },
          // { text: 'Customize the Init Screens', link: '/tutorials/customizing-init-screens' },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          // { text: 'Soundworks Ecosystem', link: '/ecosystem/soundworks' },
          // { text: 'Related Libraries and Tools', link: '/tutorials/related-libraries' },
          // { text: 'Generic Applications', link: '/tutorials/generic applications' },
        ],
      },
      {
        text: 'Misc',
        items: [
          // { text: 'Using the State Manager', link: '/tutorials/state-manager' },
          // { text: 'Using Contexts', link: '/tutorials/contexts' },
          // { text: 'Using Plugins', link: '/tutorials/plugins' },
        ],
      },
    ],
  }
}
