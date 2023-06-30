import{_ as e,o as t,c as a,V as r}from"./chunks/framework.7cbf217e.js";const S=JSON.parse('{"title":"soundworks | plugin scripting","description":"","frontmatter":{},"headers":[],"relativePath":"plugins/scripting.md","filePath":"plugins/scripting.md"}'),i={name:"plugins/scripting.md"},n=r(`<h1 id="soundworks-plugin-scripting" tabindex="-1">soundworks | plugin scripting <a class="header-anchor" href="#soundworks-plugin-scripting" aria-label="Permalink to &quot;soundworks | plugin scripting&quot;">​</a></h1><p><a href="https://badge.fury.io/js/@soundworks%2Fplugin-scripting" target="_blank" rel="noreferrer"><img src="https://badge.fury.io/js/@soundworks%2Fplugin-scripting.svg" alt="npm version"></a></p><p><a href="https://soundworks.dev" target="_blank" rel="noreferrer"><code>soundworks</code></a> plugin for runtime distributed scripting.</p><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ul><li><a href="#installation">Installation</a></li><li><a href="#usage">Usage</a><ul><li><a href="#server">Server</a></li><li><a href="#client">Client</a></li><li><a href="#notes">Notes</a></li></ul></li><li><a href="#api">API</a><ul><li><a href="#classes">Classes</a></li><li><a href="#pluginscriptingclient">PluginScriptingClient</a></li><li><a href="#pluginscriptingserver">PluginScriptingServer</a></li><li><a href="#sharedscript">SharedScript</a></li></ul></li><li><a href="#credits">Credits</a></li><li><a href="#license">License</a></li></ul><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">@soundworks/plugin-scripting</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--save</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="server" tabindex="-1">Server <a class="header-anchor" href="#server" aria-label="Permalink to &quot;Server&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// src/server/index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Server } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/server.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> pluginScripting </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-scripting/server.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Server</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#88846F;">// register the plugin with an optionnal dirname</span></span>
<span class="line"><span style="color:#F8F8F2;">server.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;scripting&#39;</span><span style="color:#F8F8F2;">, pluginScripting, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  dirname: </span><span style="color:#E6DB74;">&#39;my-script&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> server.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// use the plugin once the server is started</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> scripting </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> server.pluginManager.</span><span style="color:#A6E22E;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;scripting&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">scripting.</span><span style="color:#A6E22E;">createScript</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-constants&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">&#39;export const answer = 42;&#39;</span><span style="color:#F8F8F2;">)</span></span></code></pre></div><h3 id="client" tabindex="-1">Client <a class="header-anchor" href="#client" aria-label="Permalink to &quot;Client&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// src/client/**/index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Client } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> pluginScripting </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-scripting/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> client </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Client</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#88846F;">// register the plugin</span></span>
<span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;scripting&#39;</span><span style="color:#F8F8F2;">, pluginScriptingClient);</span></span>
<span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// use the plugin once the client is started</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> scripting </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.pluginManager.</span><span style="color:#A6E22E;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;scripting&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> script </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> scripting.</span><span style="color:#A6E22E;">attach</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-constants&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> mod </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> script.</span><span style="color:#A6E22E;">import</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(mod.answer);</span></span></code></pre></div><h3 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h3><p>The shared scripts are stored in the file system as raw Javascript files located in the directory defined on the server side (cf. <code>dirname</code> option).</p><p>The scripts are simple JavaScript modules that are re-bundled using <code>esbuild</code> each time their content is modified. As such, they can import installed dependencies (i.e. <code>node_modules</code>) or import other scripts.</p><p>For now, only named exports are supported. This is the responsibility of the code consuming the shared scripts to define the API that the scripts should expose.</p><p>Internally the <code>scripting</code> plugin relies on the <code>@soundworks/plugin-filesystem</code> plugin. As such, it provide the same security restrictions, i.e. in <code>production</code> mode only authentified and trusted clients are allowed to modify the scripts.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="classes" tabindex="-1">Classes <a class="header-anchor" href="#classes" aria-label="Permalink to &quot;Classes&quot;">​</a></h3><dl><dt><a href="#PluginScriptingClient">PluginScriptingClient</a></dt><dd><p>Client-side representation of the soundworks&#39; scripting plugin.</p></dd><dt><a href="#PluginScriptingServer">PluginScriptingServer</a></dt><dd><p>Server-side representation of the soundworks&#39; scripting plugin.</p></dd><dt><a href="#SharedScript">SharedScript</a></dt><dd><p>A SharedScript can be distributed amongst different clients and modified at runtime. The script source is stored directly in the filestem, see <code>dirname</code> option of the server-side plugin. A Shared script cannot be instatiated manually, it is retrieved by calling the client&#39;s or server <code>PluScritping.attach</code> method.</p></dd></dl><p><a name="PluginScriptingClient"></a></p><h3 id="pluginscriptingclient" tabindex="-1">PluginScriptingClient <a class="header-anchor" href="#pluginscriptingclient" aria-label="Permalink to &quot;PluginScriptingClient&quot;">​</a></h3><p>Client-side representation of the soundworks&#39; scripting plugin.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#PluginScriptingClient">PluginScriptingClient</a><ul><li><a href="#PluginScriptingClient+setGlobalScriptingContext">.setGlobalScriptingContext(ctx)</a></li><li><a href="#PluginScriptingClient+getList">.getList()</a> ⇒ <code>Array</code></li><li><a href="#PluginScriptingClient+getTree">.getTree()</a> ⇒ <code>Object</code></li><li><a href="#PluginScriptingClient+createScript">.createScript(name, [value])</a> ⇒ <code>Promise</code></li><li><a href="#PluginScriptingClient+updateScript">.updateScript(name, value)</a> ⇒ <code>Promise</code></li><li><a href="#PluginScriptingClient+deleteScript">.deleteScript(name)</a> ⇒ <code>Promise</code></li><li><a href="#PluginScriptingClient+attach">.attach(name)</a> ⇒ <code>Promise</code></li></ul></li></ul><p><a name="PluginScriptingClient+setGlobalScriptingContext"></a></p><h4 id="pluginscriptingclient-setglobalscriptingcontext-ctx" tabindex="-1">pluginScriptingClient.setGlobalScriptingContext(ctx) <a class="header-anchor" href="#pluginscriptingclient-setglobalscriptingcontext-ctx" aria-label="Permalink to &quot;pluginScriptingClient.setGlobalScriptingContext(ctx)&quot;">​</a></h4><p>Registers a global context object to be used in scripts. Note that the context is store globally, so several scripting plugins running in parallel will share the same underlying object. The global <code>getGlobalScriptingContext</code> function will allow to retrieve the given object from within scripts.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingClient"><code>PluginScriptingClient</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>ctx</td><td><code>Object</code></td><td>Object to store in global context</td></tr></tbody></table><p><a name="PluginScriptingClient+getList"></a></p><h4 id="pluginscriptingclient-getlist-⇒-array" tabindex="-1">pluginScriptingClient.getList() ⇒ <code>Array</code> <a class="header-anchor" href="#pluginscriptingclient-getlist-⇒-array" aria-label="Permalink to &quot;pluginScriptingClient.getList() ⇒ &lt;code&gt;Array&lt;/code&gt;&quot;">​</a></h4><p>Returns the list of all available scripts.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingClient"><code>PluginScriptingClient</code></a><br><a name="PluginScriptingClient+getTree"></a></p><h4 id="pluginscriptingclient-gettree-⇒-object" tabindex="-1">pluginScriptingClient.getTree() ⇒ <code>Object</code> <a class="header-anchor" href="#pluginscriptingclient-gettree-⇒-object" aria-label="Permalink to &quot;pluginScriptingClient.getTree() ⇒ &lt;code&gt;Object&lt;/code&gt;&quot;">​</a></h4><p>Convenience method that return the underlying filesystem tree. Can be usefull to reuse components created for the filesystem (e.g. sc-filesystem)</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingClient"><code>PluginScriptingClient</code></a><br><a name="PluginScriptingClient+createScript"></a></p><h4 id="pluginscriptingclient-createscript-name-value-⇒-promise" tabindex="-1">pluginScriptingClient.createScript(name, [value]) ⇒ <code>Promise</code> <a class="header-anchor" href="#pluginscriptingclient-createscript-name-value-⇒-promise" aria-label="Permalink to &quot;pluginScriptingClient.createScript(name, [value]) ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Create a new script. The returned promise resolves when all underlyings states, files and script instances are up-to-date.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingClient"><code>PluginScriptingClient</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td></td><td>Name of the script, will be used as the actual filename</td></tr><tr><td>[value]</td><td><code>string</code></td><td><code>&quot;&#39;&#39;&quot;</code></td><td>Initial value of the script</td></tr></tbody></table><p><a name="PluginScriptingClient+updateScript"></a></p><h4 id="pluginscriptingclient-updatescript-name-value-⇒-promise" tabindex="-1">pluginScriptingClient.updateScript(name, value) ⇒ <code>Promise</code> <a class="header-anchor" href="#pluginscriptingclient-updatescript-name-value-⇒-promise" aria-label="Permalink to &quot;pluginScriptingClient.updateScript(name, value) ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Update an existing script. The returned promise resolves when all underlyings states, files and script instances are up-to-date.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingClient"><code>PluginScriptingClient</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td>Name of the script</td></tr><tr><td>value</td><td><code>string</code></td><td>New value of the script</td></tr></tbody></table><p><a name="PluginScriptingClient+deleteScript"></a></p><h4 id="pluginscriptingclient-deletescript-name-⇒-promise" tabindex="-1">pluginScriptingClient.deleteScript(name) ⇒ <code>Promise</code> <a class="header-anchor" href="#pluginscriptingclient-deletescript-name-⇒-promise" aria-label="Permalink to &quot;pluginScriptingClient.deleteScript(name) ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Delete a script. The returned promise resolves when all underlyings states, files and script instances are up-to-date.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingClient"><code>PluginScriptingClient</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td>Name of the script</td></tr></tbody></table><p><a name="PluginScriptingClient+attach"></a></p><h4 id="pluginscriptingclient-attach-name-⇒-promise" tabindex="-1">pluginScriptingClient.attach(name) ⇒ <code>Promise</code> <a class="header-anchor" href="#pluginscriptingclient-attach-name-⇒-promise" aria-label="Permalink to &quot;pluginScriptingClient.attach(name) ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Attach to a script.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingClient"><code>PluginScriptingClient</code></a><br><strong>Returns</strong>: <code>Promise</code> - Promise that resolves on a new Script instance.</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td>Name of the script</td></tr></tbody></table><p><a name="PluginScriptingServer"></a></p><h3 id="pluginscriptingserver" tabindex="-1">PluginScriptingServer <a class="header-anchor" href="#pluginscriptingserver" aria-label="Permalink to &quot;PluginScriptingServer&quot;">​</a></h3><p>Server-side representation of the soundworks&#39; scripting plugin.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#PluginScriptingServer">PluginScriptingServer</a><ul><li><a href="#new_PluginScriptingServer_new">new PluginScriptingServer()</a></li><li><a href="#PluginScriptingServer+setGlobalScriptingContext">.setGlobalScriptingContext(ctx)</a></li><li><a href="#PluginScriptingServer+getList">.getList()</a> ⇒ <code>Array</code></li><li><a href="#PluginScriptingServer+getTree">.getTree()</a> ⇒ <code>Object</code></li><li><a href="#PluginScriptingServer+onUpdate">.onUpdate(callback, [executeListener])</a> ⇒ <code>function</code></li><li><a href="#PluginScriptingServer+switch">.switch(dirname)</a></li><li><a href="#PluginScriptingServer+createScript">.createScript(name, [value])</a> ⇒ <code>Promise</code></li><li><a href="#PluginScriptingServer+updateScript">.updateScript(name, value)</a> ⇒ <code>Promise</code></li><li><a href="#PluginScriptingServer+deleteScript">.deleteScript(name)</a> ⇒ <code>Promise</code></li><li><a href="#PluginScriptingServer+attach">.attach(name)</a> ⇒ <code>Promise</code></li></ul></li></ul><p><a name="new_PluginScriptingServer_new"></a></p><h4 id="new-pluginscriptingserver" tabindex="-1">new PluginScriptingServer() <a class="header-anchor" href="#new-pluginscriptingserver" aria-label="Permalink to &quot;new PluginScriptingServer()&quot;">​</a></h4><p>The constructor should never be called manually. The plugin will be instantiated by soundworks when registered in the <code>pluginManager</code></p><p>Available options:</p><ul><li><code>dirname</code> {String} - directory in which the script files are located</li></ul><p>If no option is given, for example before a user selects a project, the plugin will stay idle until <code>switch</code> is called.</p><p><strong>Example</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">server.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;scripting&#39;</span><span style="color:#F8F8F2;">, scriptingPlugin, { dirname })</span></span></code></pre></div><p><a name="PluginScriptingServer+setGlobalScriptingContext"></a></p><h4 id="pluginscriptingserver-setglobalscriptingcontext-ctx" tabindex="-1">pluginScriptingServer.setGlobalScriptingContext(ctx) <a class="header-anchor" href="#pluginscriptingserver-setglobalscriptingcontext-ctx" aria-label="Permalink to &quot;pluginScriptingServer.setGlobalScriptingContext(ctx)&quot;">​</a></h4><p>Registers a global context object to be used in scripts. Note that the context is store globally, so several scripting plugins running in parallel will share the same underlying object. The global <code>getGlobalScriptingContext</code> function will allow to retrieve the given object from within scripts.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>ctx</td><td><code>Object</code></td><td>Object to store in global context</td></tr></tbody></table><p><a name="PluginScriptingServer+getList"></a></p><h4 id="pluginscriptingserver-getlist-⇒-array" tabindex="-1">pluginScriptingServer.getList() ⇒ <code>Array</code> <a class="header-anchor" href="#pluginscriptingserver-getlist-⇒-array" aria-label="Permalink to &quot;pluginScriptingServer.getList() ⇒ &lt;code&gt;Array&lt;/code&gt;&quot;">​</a></h4><p>Returns the list of all available scripts.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a><br><a name="PluginScriptingServer+getTree"></a></p><h4 id="pluginscriptingserver-gettree-⇒-object" tabindex="-1">pluginScriptingServer.getTree() ⇒ <code>Object</code> <a class="header-anchor" href="#pluginscriptingserver-gettree-⇒-object" aria-label="Permalink to &quot;pluginScriptingServer.getTree() ⇒ &lt;code&gt;Object&lt;/code&gt;&quot;">​</a></h4><p>Convenience method that return the underlying filesystem tree. Can be usefull to reuse components created for the filesystem (e.g. sc-filesystem)</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a><br><a name="PluginScriptingServer+onUpdate"></a></p><h4 id="pluginscriptingserver-onupdate-callback-executelistener-⇒-function" tabindex="-1">pluginScriptingServer.onUpdate(callback, [executeListener]) ⇒ <code>function</code> <a class="header-anchor" href="#pluginscriptingserver-onupdate-callback-executelistener-⇒-function" aria-label="Permalink to &quot;pluginScriptingServer.onUpdate(callback, [executeListener]) ⇒ &lt;code&gt;function&lt;/code&gt;&quot;">​</a></h4><p>Register callback to execute when a script is created or deleted. The callback will receive the updated list of script names and the updated file tree.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a><br><strong>Returns</strong>: <code>function</code> - Function that unregister the listener when executed.</p><table><thead><tr><th>Param</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>callback</td><td><code>function</code></td><td></td><td>Callback function to execute</td></tr><tr><td>[executeListener]</td><td><code>boolean</code></td><td><code>false</code></td><td>If true, execute the given callback immediately.</td></tr></tbody></table><p><a name="PluginScriptingServer+switch"></a></p><h4 id="pluginscriptingserver-switch-dirname" tabindex="-1">pluginScriptingServer.switch(dirname) <a class="header-anchor" href="#pluginscriptingserver-switch-dirname" aria-label="Permalink to &quot;pluginScriptingServer.switch(dirname)&quot;">​</a></h4><p>Switch the plugin to watch and use another directory</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>dirname</td><td><code>String</code> | <code>Object</code></td><td>Path to the new directory. As a convenience to match the plugin filesystem API, an object containing the &#39;dirname&#39; key can also be passed</td></tr></tbody></table><p><a name="PluginScriptingServer+createScript"></a></p><h4 id="pluginscriptingserver-createscript-name-value-⇒-promise" tabindex="-1">pluginScriptingServer.createScript(name, [value]) ⇒ <code>Promise</code> <a class="header-anchor" href="#pluginscriptingserver-createscript-name-value-⇒-promise" aria-label="Permalink to &quot;pluginScriptingServer.createScript(name, [value]) ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Create a new script. The returned promise resolves when all underlyings states, files and script instances are up-to-date.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td></td><td>Name of the script, will be used as the actual filename</td></tr><tr><td>[value]</td><td><code>string</code></td><td><code>&quot;&#39;&#39;&quot;</code></td><td>Initial value of the script</td></tr></tbody></table><p><a name="PluginScriptingServer+updateScript"></a></p><h4 id="pluginscriptingserver-updatescript-name-value-⇒-promise" tabindex="-1">pluginScriptingServer.updateScript(name, value) ⇒ <code>Promise</code> <a class="header-anchor" href="#pluginscriptingserver-updatescript-name-value-⇒-promise" aria-label="Permalink to &quot;pluginScriptingServer.updateScript(name, value) ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Update an existing script. The returned promise resolves when all underlyings states, files and script instances are up-to-date.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td>Name of the script</td></tr><tr><td>value</td><td><code>string</code></td><td>New value of the script</td></tr></tbody></table><p><a name="PluginScriptingServer+deleteScript"></a></p><h4 id="pluginscriptingserver-deletescript-name-⇒-promise" tabindex="-1">pluginScriptingServer.deleteScript(name) ⇒ <code>Promise</code> <a class="header-anchor" href="#pluginscriptingserver-deletescript-name-⇒-promise" aria-label="Permalink to &quot;pluginScriptingServer.deleteScript(name) ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Delete a script. The returned promise resolves when all underlyings states, files and script instances are up-to-date.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td>Name of the script</td></tr></tbody></table><p><a name="PluginScriptingServer+attach"></a></p><h4 id="pluginscriptingserver-attach-name-⇒-promise" tabindex="-1">pluginScriptingServer.attach(name) ⇒ <code>Promise</code> <a class="header-anchor" href="#pluginscriptingserver-attach-name-⇒-promise" aria-label="Permalink to &quot;pluginScriptingServer.attach(name) ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Attach to a script.</p><p><strong>Kind</strong>: instance method of <a href="#PluginScriptingServer"><code>PluginScriptingServer</code></a><br><strong>Returns</strong>: <code>Promise</code> - Promise that resolves on a new Script instance.</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td>Name of the script</td></tr></tbody></table><p><a name="SharedScript"></a></p><h3 id="sharedscript" tabindex="-1">SharedScript <a class="header-anchor" href="#sharedscript" aria-label="Permalink to &quot;SharedScript&quot;">​</a></h3><p>A SharedScript can be distributed amongst different clients and modified at runtime. The script source is stored directly in the filestem, see <code>dirname</code> option of the server-side plugin. A Shared script cannot be instatiated manually, it is retrieved by calling the client&#39;s or server <code>PluScritping.attach</code> method.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#SharedScript">SharedScript</a><ul><li><a href="#SharedScript+source">.source</a> : <code>string</code></li><li><a href="#SharedScript+error">.error</a> : <code>string</code></li><li><a href="#SharedScript+transpiled">.transpiled</a> : <code>string</code></li><li><a href="#SharedScript+import">.import()</a> ⇒ <code>Promise</code></li><li><a href="#SharedScript+detach">.detach()</a></li><li><a href="#SharedScript+onUpdate">.onUpdate(callback, [executeListener])</a> ⇒ <code>function</code></li><li><a href="#SharedScript+onDetach">.onDetach(callback)</a></li><li><a href="#SharedScript+update">.update(value)</a></li><li><a href="#SharedScript+delete">.delete()</a></li></ul></li></ul><p><a name="SharedScript+source"></a></p><h4 id="sharedscript-source-string" tabindex="-1">sharedScript.source : <code>string</code> <a class="header-anchor" href="#sharedscript-source-string" aria-label="Permalink to &quot;sharedScript.source : &lt;code&gt;string&lt;/code&gt;&quot;">​</a></h4><p><strong>Kind</strong>: instance property of <a href="#SharedScript"><code>SharedScript</code></a><br><strong>Read only</strong>: true<br><a name="SharedScript+error"></a></p><h4 id="sharedscript-error-string" tabindex="-1">sharedScript.error : <code>string</code> <a class="header-anchor" href="#sharedscript-error-string" aria-label="Permalink to &quot;sharedScript.error : &lt;code&gt;string&lt;/code&gt;&quot;">​</a></h4><p><strong>Kind</strong>: instance property of <a href="#SharedScript"><code>SharedScript</code></a><br><strong>Read only</strong>: true<br><a name="SharedScript+transpiled"></a></p><h4 id="sharedscript-transpiled-string" tabindex="-1">sharedScript.transpiled : <code>string</code> <a class="header-anchor" href="#sharedscript-transpiled-string" aria-label="Permalink to &quot;sharedScript.transpiled : &lt;code&gt;string&lt;/code&gt;&quot;">​</a></h4><p><strong>Kind</strong>: instance property of <a href="#SharedScript"><code>SharedScript</code></a><br><strong>Read only</strong>: true<br><a name="SharedScript+import"></a></p><h4 id="sharedscript-import-⇒-promise" tabindex="-1">sharedScript.import() ⇒ <code>Promise</code> <a class="header-anchor" href="#sharedscript-import-⇒-promise" aria-label="Permalink to &quot;sharedScript.import() ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Dynamically import the transpiled module. <a href="https://caniuse.com/?search=import()" target="_blank" rel="noreferrer">https://caniuse.com/?search=import()</a></p><p><strong>Kind</strong>: instance method of <a href="#SharedScript"><code>SharedScript</code></a><br><strong>Returns</strong>: <code>Promise</code> - Promise which fulfills to an object containing all exports the script.<br><a name="SharedScript+detach"></a></p><h4 id="sharedscript-detach" tabindex="-1">sharedScript.detach() <a class="header-anchor" href="#sharedscript-detach" aria-label="Permalink to &quot;sharedScript.detach()&quot;">​</a></h4><p>Stop listening for updates</p><p><strong>Kind</strong>: instance method of <a href="#SharedScript"><code>SharedScript</code></a><br><a name="SharedScript+onUpdate"></a></p><h4 id="sharedscript-onupdate-callback-executelistener-⇒-function" tabindex="-1">sharedScript.onUpdate(callback, [executeListener]) ⇒ <code>function</code> <a class="header-anchor" href="#sharedscript-onupdate-callback-executelistener-⇒-function" aria-label="Permalink to &quot;sharedScript.onUpdate(callback, [executeListener]) ⇒ &lt;code&gt;function&lt;/code&gt;&quot;">​</a></h4><p>Register a callback to be executed when the script is updated.</p><p><strong>Kind</strong>: instance method of <a href="#SharedScript"><code>SharedScript</code></a><br><strong>Returns</strong>: <code>function</code> - Function that unregister the callback when executed.</p><table><thead><tr><th>Param</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>callback</td><td><code>function</code></td><td></td><td>Callback function</td></tr><tr><td>[executeListener]</td><td><code>boolean</code></td><td><code>false</code></td><td>If true, execute the given callback immediately.</td></tr></tbody></table><p><a name="SharedScript+onDetach"></a></p><h4 id="sharedscript-ondetach-callback" tabindex="-1">sharedScript.onDetach(callback) <a class="header-anchor" href="#sharedscript-ondetach-callback" aria-label="Permalink to &quot;sharedScript.onDetach(callback)&quot;">​</a></h4><p>Register a callback to be executed when the script is detached, i.e. when <code>detach</code> as been called, or when the script has been deleted</p><p><strong>Kind</strong>: instance method of <a href="#SharedScript"><code>SharedScript</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>callback</td><td><code>function</code></td><td>Callback function</td></tr></tbody></table><p><a name="SharedScript+update"></a></p><h4 id="sharedscript-update-value" tabindex="-1">sharedScript.update(value) <a class="header-anchor" href="#sharedscript-update-value" aria-label="Permalink to &quot;sharedScript.update(value)&quot;">​</a></h4><p>Alias for <code>plugin.updateScript(name, value)</code>, calling this method will update the source of the script. The update will be propagated to all attached scripts</p><p><strong>Kind</strong>: instance method of <a href="#SharedScript"><code>SharedScript</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>value</td><td><code>string</code></td><td>New source code for the script.</td></tr></tbody></table><p><a name="SharedScript+delete"></a></p><h4 id="sharedscript-delete" tabindex="-1">sharedScript.delete() <a class="header-anchor" href="#sharedscript-delete" aria-label="Permalink to &quot;sharedScript.delete()&quot;">​</a></h4><p>Alias for <code>plugin.deleteScript(name)</code>, calling this method will entirely delete the script: the file and all associated scripts. If you just want to stop using the current script without deleting it, call detach instead</p><p><strong>Kind</strong>: instance method of <a href="#SharedScript"><code>SharedScript</code></a></p><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-label="Permalink to &quot;Credits&quot;">​</a></h2><p><a href="https://soundworks.dev/credits.html" target="_blank" rel="noreferrer">https://soundworks.dev/credits.html</a></p><h2 id="license" tabindex="-1">License <a class="header-anchor" href="#license" aria-label="Permalink to &quot;License&quot;">​</a></h2><p><a href="./LICENSE.html">BSD-3-Clause</a></p>`,150),s=[n];function l(o,c,p,d,h,g){return t(),a("div",null,s)}const m=e(i,[["render",l]]);export{S as __pageData,m as default};