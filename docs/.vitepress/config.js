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
      { text: 'Tutorials', link: '/tutorials/' },
      { text: 'API Reference', link: 'https://soundworks.dev/soundworks' },
      { text: 'Credits', link: '/credits' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ]
      },
      {
        text: 'Tutorials',
        items: [
          { text: 'Using the State Manager', link: '/tutorials/state-manager' },
          { text: 'Using Contexts', link: '/tutorials/contexts' },
          { text: 'Using Plugins', link: '/tutorials/plugins' },
        ]
      }
    ],
  }
}
