import{_ as e,o as a,c as o,Q as r}from"./chunks/framework.22f5e90d.js";const f=JSON.parse('{"title":"soundworks | helpers","description":"","frontmatter":{},"headers":[],"relativePath":"plugins/soundworks-helpers.md","filePath":"plugins/soundworks-helpers.md"}'),t={name:"plugins/soundworks-helpers.md"},l=r(`<h1 id="soundworks-helpers" tabindex="-1">soundworks | helpers <a class="header-anchor" href="#soundworks-helpers" aria-label="Permalink to &quot;soundworks | helpers&quot;">​</a></h1><p>Set of common helpers for <a href="https://soundworks.dev" target="_blank" rel="noreferrer"><code>soundworks</code></a> applications.</p><h2 id="manual-installation" tabindex="-1">Manual Installation <a class="header-anchor" href="#manual-installation" aria-label="Permalink to &quot;Manual Installation&quot;">​</a></h2><p>Note that the <code>@soundworks/helpers</code> package is automatically installed when you create an application using the <code>@soundworks/create</code> wizard, so most of the time you should not care to install this package manually.</p><p>See <a href="https://soundworks.dev/guides/getting-started.html" target="_blank" rel="noreferrer">https://soundworks.dev/guides/getting-started.html</a> for more information on the <code>soundworks</code> wizard.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">npm install --save @soundworks/helpers</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h3><ul><li><a href="#browserlauncher">browserLauncher</a><ul><li><a href="#examples">Examples</a></li><li><a href="#language">language</a></li><li><a href="#execute">execute</a></li><li><a href="#register">register</a></li><li><a href="#setlanguagedata">setLanguageData</a></li><li><a href="#getlanguagedata">getLanguageData</a></li></ul></li><li><a href="#browserloadconfig">browserLoadConfig</a></li><li><a href="#nodelauncher">nodeLauncher</a><ul><li><a href="#examples-3">Examples</a></li><li><a href="#execute-1">execute</a></li><li><a href="#register-1">register</a></li></ul></li><li><a href="#nodeloadconfig">nodeLoadConfig</a><ul><li><a href="#parameters-6">Parameters</a></li></ul></li></ul><h2 id="browserlauncher" tabindex="-1">browserLauncher <a class="header-anchor" href="#browserlauncher" aria-label="Permalink to &quot;browserLauncher&quot;">​</a></h2><p>Launcher for clients running in browser runtime.</p><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> launcher </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/helpers/launcher.js&#39;</span></span></code></pre></div><h3 id="language" tabindex="-1">language <a class="header-anchor" href="#language" aria-label="Permalink to &quot;language&quot;">​</a></h3><p>Set the language to be used in the initialization screens.</p><p>By default, picks language from the browser and fallback to english if not supported. For now, available languages are &#39;fr&#39; and &#39;en&#39;.</p><p>Type: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">string</a></p><h3 id="execute" tabindex="-1">execute <a class="header-anchor" href="#execute" aria-label="Permalink to &quot;execute&quot;">​</a></h3><p>Allow to launch multiple clients at once in the same brwoser window by adding <code>?emulate=numberOfClient</code> at the end of the url e.g. <code>http://127.0.0.1:8000?emulate=10</code> to run 10 clients in parallel</p><h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><p><code>bootstrap</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> Bootstrap function to execute.</p></li><li><p><code>options</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">object</a></strong> Configuration object. (optional, default <code>{}</code>)</p><ul><li><code>options.numClients</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number" target="_blank" rel="noreferrer">number</a></strong> Number of parallel clients. (optional, default <code>1</code>)</li><li><code>options.width</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">string</a></strong> If numClient &gt; 1, width of the container. (optional, default <code>&#39;20%&#39;</code>)</li><li><code>options.height</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">string</a></strong> If numClient &gt; 1, height of the container. (optional, default <code>&#39;500px&#39;</code>)</li></ul></li></ul><h4 id="examples-1" tabindex="-1">Examples <a class="header-anchor" href="#examples-1" aria-label="Permalink to &quot;Examples&quot;">​</a></h4><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">launcher.</span><span style="color:#A6E22E;">execute</span><span style="color:#F8F8F2;">(main, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  numClients: </span><span style="color:#A6E22E;">parseInt</span><span style="color:#F8F8F2;">(</span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">URLSearchParams</span><span style="color:#F8F8F2;">(window.location.search).</span><span style="color:#A6E22E;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;emulate&#39;</span><span style="color:#F8F8F2;">)) </span><span style="color:#F92672;">||</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><h3 id="register" tabindex="-1">register <a class="header-anchor" href="#register" aria-label="Permalink to &quot;register&quot;">​</a></h3><p>Register the client in the launcher.</p><p>The launcher will do a bunch of stuff for you:</p><ul><li>Display default initialization screens. If you want to change the provided initialization screens, you can import all the helpers directly in your application by doing <code>npx soundworks --eject-helpers</code>. You can also customise some global syles variables (background-color, text color etc.) in <code>src/clients/components/css/app.scss</code>. You can also change the default language of the intialization screen by setting, the <code>launcher.language</code> property, e.g.: <code>launcher.language = &#39;fr&#39;</code></li><li>By default the launcher automatically reloads the client when the socket closes or when the page is hidden. Such behavior can be quite important in performance situation where you don&#39;t want some phone getting stuck making noise without having any way left to stop it... Also be aware that a page in a background tab will have all its timers (setTimeout, etc.) put in very low priority, messing any scheduled events.</li></ul><h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><p><code>client</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> The soundworks client.</p></li><li><p><code>options</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">object</a></strong> Configuration object. (optional, default <code>{}</code>)</p><ul><li><code>options.initScreensContainer</code> <strong><a href="https://developer.mozilla.org/docs/Web/HTML/Element" target="_blank" rel="noreferrer">HTMLElement</a></strong> The HTML container for the initialization screens. (optional, default <code>null</code>)</li><li><code>options.reloadOnVisibilityChange</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">boolean</a></strong> Define if the client should reload on visibility change. (optional, default <code>true</code>)</li><li><code>options.reloadOnSocketError</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">boolean</a></strong> Define if the client should reload on socket error and disconnection. (optional, default <code>true</code>)</li></ul></li></ul><h4 id="examples-2" tabindex="-1">Examples <a class="header-anchor" href="#examples-2" aria-label="Permalink to &quot;Examples&quot;">​</a></h4><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">launcher.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(client, { initScreensContainer: $container });</span></span></code></pre></div><h3 id="setlanguagedata" tabindex="-1">setLanguageData <a class="header-anchor" href="#setlanguagedata" aria-label="Permalink to &quot;setLanguageData&quot;">​</a></h3><p>Set the text to be used for a given language. Allows to override an existing language as well as define a new one.</p><h4 id="parameters-2" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-2" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>lang</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">string</a></strong> Key correspondig to the language (e.g. &#39;fr&#39;, &#39;en&#39;, &#39;es&#39;)</li><li><code>data</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">object</a></strong> Key/value pairs defining the text strings to be used.</li></ul><h3 id="getlanguagedata" tabindex="-1">getLanguageData <a class="header-anchor" href="#getlanguagedata" aria-label="Permalink to &quot;getLanguageData&quot;">​</a></h3><p>Retrieve the data for a given language.</p><h4 id="parameters-3" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-3" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>lang</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">string</a></strong> Key correspondig to the language (e.g. &#39;fr&#39;, &#39;en&#39;, &#39;es&#39;) (optional, default <code>null</code>)</li></ul><h2 id="browserloadconfig" tabindex="-1">browserLoadConfig <a class="header-anchor" href="#browserloadconfig" aria-label="Permalink to &quot;browserLoadConfig&quot;">​</a></h2><p>Returns the browser client configuration as retrieved by the server</p><p>Returns <strong>ClientConfig</strong></p><h2 id="nodelauncher" tabindex="-1">nodeLauncher <a class="header-anchor" href="#nodelauncher" aria-label="Permalink to &quot;nodeLauncher&quot;">​</a></h2><p>Launcher for clients running in Node.js runtime.</p><h3 id="examples-3" tabindex="-1">Examples <a class="header-anchor" href="#examples-3" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> launcher </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/helpers/launcher.js&#39;</span></span></code></pre></div><h3 id="execute-1" tabindex="-1">execute <a class="header-anchor" href="#execute-1" aria-label="Permalink to &quot;execute&quot;">​</a></h3><p>The &quot;execute&quot; function allows to fork multiple clients in the same terminal window by defining the <code>EMULATE</code> env process variable e.g. <code>EMULATE=10 npm run watch-process thing</code> to run 10 clients side-by-side</p><h4 id="parameters-4" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-4" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><p><code>bootstrap</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">function</a></strong> Bootstrap function to execute.</p></li><li><p><code>options</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">object</a></strong> Configuration object. (optional, default <code>{}</code>)</p><ul><li><code>options.numClients</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number" target="_blank" rel="noreferrer">number</a></strong> Number of parallel clients. (optional, default <code>1</code>)</li><li><code>options.moduleURL</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">string</a></strong> Module url of the calling file, used as current worink directory of the subprocesses. (optional, default <code>null</code>)</li></ul></li></ul><h4 id="examples-4" tabindex="-1">Examples <a class="header-anchor" href="#examples-4" aria-label="Permalink to &quot;Examples&quot;">​</a></h4><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">launcher.</span><span style="color:#A6E22E;">execute</span><span style="color:#F8F8F2;">(bootstrap, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  numClients: p<wbr>rocess.env.EMULATE </span><span style="color:#F92672;">?</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">parseInt</span><span style="color:#F8F8F2;">(p<wbr>rocess.env.EMULATE) </span><span style="color:#F92672;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  moduleURL: </span><span style="color:#F92672;">import</span><span style="color:#F8F8F2;">.meta.url,</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><h3 id="register-1" tabindex="-1">register <a class="header-anchor" href="#register-1" aria-label="Permalink to &quot;register&quot;">​</a></h3><p>Register the soundworks client into the launcher</p><p>Automatically restarts the process when the socket closes or when an uncaught error occurs in the program.</p><h4 id="parameters-5" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-5" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><p><code>client</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> The soundworks client.</p></li><li><p><code>options</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">object</a></strong> Configuration object. (optional, default <code>{}</code>)</p><ul><li><code>options.restartOnError</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">boolean</a></strong> Define if the client should restart on uncaught errors. (optional, default <code>false</code>)</li><li><code>options.restartOnSocketClose</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">boolean</a></strong> Define if the client should restart on socket disconnection. (optional, default <code>true</code>)</li><li><code>options.exitParentProcess</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">boolean</a></strong> If true, exit the parent &quot;launcher&quot; process on both error and socket close, may be usefull in production settings if the application is e.g. managed by a daemon at the system level. (optional, default <code>false</code>)</li></ul></li></ul><h4 id="examples-5" tabindex="-1">Examples <a class="header-anchor" href="#examples-5" aria-label="Permalink to &quot;Examples&quot;">​</a></h4><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">launcher.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(client);</span></span></code></pre></div><h2 id="nodeloadconfig" tabindex="-1">nodeLoadConfig <a class="header-anchor" href="#nodeloadconfig" aria-label="Permalink to &quot;nodeLoadConfig&quot;">​</a></h2><p>Load configuration from files located in <code>/config</code> directory</p><h3 id="parameters-6" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-6" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><ul><li><code>ENV</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">String</a></strong> Name of the environment corresponding to the <code>config/env-\${name}.{yaml|json}</code> file. (optional, default <code>&#39;default&#39;</code>)</li><li><code>callerURL</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">String</a></strong> Module url of the calling file, used to automatically retrieve the <code>role</code> of node clients. (optional, default <code>null</code>)</li></ul><p>Returns <strong>(ClientConfig | ServerConfig)</strong></p><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-label="Permalink to &quot;Credits&quot;">​</a></h2><p><a href="https://soundworks.dev/credits.html" target="_blank" rel="noreferrer">https://soundworks.dev/credits.html</a></p><h2 id="license" tabindex="-1">License <a class="header-anchor" href="#license" aria-label="Permalink to &quot;License&quot;">​</a></h2><p><a href="./LICENSE.html">BSD-3-Clause</a></p>`,68),n=[l];function s(i,c,p,d,h,u){return a(),o("div",null,n)}const b=e(t,[["render",s]]);export{f as __pageData,b as default};