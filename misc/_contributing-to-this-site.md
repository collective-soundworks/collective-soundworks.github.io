# Contributing to this Website

You wrote some documentation about some `soundworks` related stuff that could be useful to others, or you would like to fix or even improve existing content (which might be a great challenge)? Please contribute!

::: tip Note
This site is generated using `vuepress`, full documentation can be found at [https://vuepress.vuejs.org/](https://vuepress.vuejs.org/)
:::

## Install

1. Clone repo and go to `sources` branch where the source files are located

```sh
git clone git@github.com:collective-soundworks/collective-soundworks.github.io.git
cd collective-soundworks.github.io
git checkout sources
npm install
```

## Run Development Mode

Get remote changes

```sh
git pull origin sources
```

Start the development server

```sh
npm run dev
```

Go to [http://127.0.0.1:8080](http://127.0.0.1:8080) in your favorite browser (which shall not be Safari) to see the development preview and edit some content (cf. [examples](#examples)).

## Publish

::: tip Note
The following commands will only work if you are part of the soundworks team. Otherwise, proceed the usual steps and create a pull request for changes.
:::

Push your changes on the source branch

```sh
git add -A
git commit -m 'your message'
git push origin sources
```

A Github action will build the website and deploy it automatically (this can take a few minutes).

## Examples

### Adding a "Misc" Page

1. Add your markdown file in the `/misc` directory

::: tip Note
If your file is quite long, it can be nice to insert a "table of content" on top of it using the `[[toc]]` macro:

```md
# My Awesome Document

[[toc]]

## subsection 1

Lorem ipsum dolor sit amet...

## subsection 2

Duis aute irure dolor in...
```

cf. [https://vuepress.vuejs.org/guide/markdown.html#table-of-contents](https://vuepress.vuejs.org/guide/markdown.html#table-of-contents)
::: 

2. Add your page to the sidebar menu

- Open the `.vuepress/config.js`
- Add the path to your markdown file in `children` entry of the 'Misc' object:

```js
{
  title: 'Misc',      // required
  path: '/misc/',     // optional, which should be a absolute path.
  collapsable: false,  // optional, defaults to true
  sidebarDepth: 2,    // optional, defaults to 1
  children: [
    '/misc/setting-up-environment',
    '/misc/local-deployment',
    '/misc/contributing-to-this-site',
    // add your file here
  ]
},
```

3. [Publish](#publish)

### Adding a "Tutorial" Page

Creating a "tutorial" page follow the same process as a "Misc" page, except your file should be placed in the `/tutorials` directory and the link in the side-bar should be placed in the `Tutorials` entry of the `config.js` file:

```js
{
  title: 'Tutorials',      // required
  path: '/tutorials/',     // optional, which should be a absolute path.
  collapsable: false,  // optional, defaults to true
  sidebarDepth: 2,    // optional, defaults to 1
  children: [
    '/tutorials/state-manager',
    // add your file here
  ]
},
```


