module.exports = {
  title: 'soundworks',
  description: 'Full-stack JavaScript framework for distributed WebAudio and multimedia applications',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/logo-ismm-200x200.png',
    lastUpdated: 'Last Updated',

    // Edit on github confiuration
    // cf. https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links
    repo: 'collective-soundworks/',
    // options for generating "Edit this page" link
    docsDir: 'docs',
    docsBranch: 'sources',
    editLinks: true,

    // header navigation configuration
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Tutorials', link: '/tutorials/' },
      { text: 'API Reference', link: '/api' },
      { text: 'Examples', link: 'https://github.com/collective-soundworks/soundworks-examples' },
      { text: 'Credits', link: '/credits' },
    ],

    // side bar configuration
    // displayAllHeaders: true,
    sidebar: {
      '/guide/': [
        'getting-started',
        'ecosystem',
      ],

      '/credits': 'auto',
    },
    // sidebar: [
    //   '/guide/',
    //   // '/ecosystem',

    //   // {
    //   //   title: 'Tutorials',      // required
    //   //   path: '/tutorials/',     // optional, which should be a absolute path.
    //   //   collapsable: true,  // optional, defaults to true
    //   //   sidebarDepth: 2,    // optional, defaults to 1
    //   //   children: [
    //   //     // '/tutorials/',
    //   //     '/tutorials/state-manager',
    //   //   ]
    //   // },

    //   // {
    //   //   title: 'Misc',      // required
    //   //   path: '/misc/',     // optional, which should be a absolute path.
    //   //   collapsable: true,  // optional, defaults to true
    //   //   sidebarDepth: 2,    // optional, defaults to 1
    //   //   children: [
    //   //     '/misc/setting-up-environment',
    //   //     '/misc/online-deployment',
    //   //     '/misc/contributing-to-this-site',
    //   //   ]
    //   // },
    // ],
  },
};
