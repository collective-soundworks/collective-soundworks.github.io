import{_ as a,o as s,c as l,O as n}from"./chunks/framework.b2c12034.js";const F=JSON.parse('{"title":"soundworks | plugin logger","description":"","frontmatter":{},"headers":[],"relativePath":"plugins/logger.md","filePath":"plugins/logger.md"}'),r={name:"plugins/logger.md"};function o(t,e,i,p,c,d){return s(),l("div",null,e[0]||(e[0]=[n(`<h1 id="soundworks-plugin-logger" tabindex="-1">soundworks | plugin logger <a class="header-anchor" href="#soundworks-plugin-logger" aria-label="Permalink to &quot;soundworks | plugin logger&quot;">​</a></h1><p><a href="https://badge.fury.io/js/@soundworks%2Fplugin-logger" target="_blank" rel="noreferrer"><img src="https://badge.fury.io/js/@soundworks%2Fplugin-logger.svg" alt="npm version"></a></p><p><a href="https://github.com/collective-soundworks/soundworks" target="_blank" rel="noreferrer"><code>soundworks</code></a> plugin for recording arbitrary data from any node of the network into plain old files.</p><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ul><li><a href="#installation">Installation</a></li><li><a href="#usage">Usage</a></li><li><a href="#notes--recipes">Notes &amp; Recipes</a></li><li><a href="#api">API</a></li><li><a href="#clientpluginlogger">ClientPluginLogger</a></li><li><a href="#clientwriter">ClientWriter</a></li><li><a href="#serverpluginlogger">ServerPluginLogger</a></li><li><a href="#serverwriter">ServerWriter</a></li><li><a href="#credits">Credits</a></li><li><a href="#license">License</a></li></ul><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">@soundworks/plugin-logger</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--save</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="server" tabindex="-1">Server <a class="header-anchor" href="#server" aria-label="Permalink to &quot;Server&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Server } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/server.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> ServerPluginLogger </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-logger/server.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Server</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#F8F8F2;">server.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">, ServerPluginLogger, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#88846F;">// define directory in which the files will be written,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#88846F;">// defaults to \`null\`, i.e. kind of &quot;idle&quot; plugin state</span></span>
<span class="line"><span style="color:#F8F8F2;">  dirname: </span><span style="color:#E6DB74;">&#39;logs&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> server.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// create a logger</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> logger </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> server.pluginManager.</span><span style="color:#A6E22E;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-server-log&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">writer.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;hello server&#39;</span><span style="color:#F8F8F2;">);</span></span></code></pre></div><h3 id="client" tabindex="-1">Client <a class="header-anchor" href="#client" aria-label="Permalink to &quot;Client&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Client } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> ClientPluginLogger </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-logger/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> client </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Client</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">, ClientPluginLogger);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// create a logger</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> logger </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.pluginManager.</span><span style="color:#A6E22E;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-client-log&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">writer.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;hello client&#39;</span><span style="color:#F8F8F2;">);</span></span></code></pre></div><h2 id="notes-recipes" tabindex="-1">Notes &amp; Recipes <a class="header-anchor" href="#notes-recipes" aria-label="Permalink to &quot;Notes &amp; Recipes&quot;">​</a></h2><p><em>In the following examples, we assume the server-side logger as been configured to use the <code>logs</code> directory.</em></p><h3 id="default-extension" tabindex="-1">Default extension <a class="header-anchor" href="#default-extension" aria-label="Permalink to &quot;Default extension&quot;">​</a></h3><p>If a writer is created with no extension in its name, the <code>.txt</code> extension is added by default, otherwise the given extension is kept intact:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;first-log.txt&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/2023.07.3_16.39.43_0001_first-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;second-log.md&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/2023.07.3_16.39.43_0002_second-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><h3 id="prefix-in-log-files" tabindex="-1">Prefix in log files <a class="header-anchor" href="#prefix-in-log-files" aria-label="Permalink to &quot;Prefix in log files&quot;">​</a></h3><p>By default all log files (client-side and server-side) are prefixed following a format: <code>yyyy.mm.dd_hh.mm.ss_id_\${basename}</code>. This behavior can be turned of by setting the <code>usePrefix</code> option to false when creating a writer.</p><p>With <code>usePrefix = true</code> (default):</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-log.txt&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/2023.07.3_16.39.43_0001_my-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><p>With <code>usePrefix = false</code>:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-log.txt&#39;</span><span style="color:#F8F8F2;">, { usePrefix: </span><span style="color:#AE81FF;">false</span><span style="color:#F8F8F2;"> });</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/my-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><p>While useful in some situations, this option can lead to errors if two writers are created with the same name.</p><h3 id="creating-log-files-in-sub-directories" tabindex="-1">Creating log files in sub-directories <a class="header-anchor" href="#creating-log-files-in-sub-directories" aria-label="Permalink to &quot;Creating log files in sub-directories&quot;">​</a></h3><p>If a path is given in the name, e.g. <code>my-dir/my-log</code>, sub-directories will be automatically created:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">\`my-dir/my-log\`</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/my-dir/my-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><h3 id="share-a-writer-between-several-clients" tabindex="-1">Share a writer between several clients <a class="header-anchor" href="#share-a-writer-between-several-clients" aria-label="Permalink to &quot;Share a writer between several clients&quot;">​</a></h3><p>In a similar way as the shared state (while most simple), clients can attach to a writer created by the server. This can be used for example to create global logs information where all clients contribute. Create a writer server as usual:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// server-side</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> sharedWrite </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;shared-writer&#39;</span><span style="color:#F8F8F2;">);</span></span></code></pre></div><p>Attach to the writer on the client-size, note the <code>attachWriter</code> method:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// client-side</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> sharedWriter </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">attachWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;shared-writer&#39;</span><span style="color:#F8F8F2;">);</span></span></code></pre></div><p>All writers created by the server can be attached by clients.</p><h3 id="client-side-buffering" tabindex="-1">Client-side buffering <a class="header-anchor" href="#client-side-buffering" aria-label="Permalink to &quot;Client-side buffering&quot;">​</a></h3><p>In many cases you may want to buffer the data client-side and batch the sends to the server to avoid network congestion. This can be done on writers created or attach by the client by defining the <code>bufferSize</code> option.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// client-side</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> myWriter </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;buffered-writer&#39;</span><span style="color:#F8F8F2;">, { bufferSize: </span><span style="color:#AE81FF;">10</span><span style="color:#F8F8F2;"> });</span></span>
<span class="line"><span style="color:#88846F;">// data is buffered on the client side</span></span>
<span class="line"><span style="color:#F8F8F2;">myWriter.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;1&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">myWriter.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;2&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#88846F;">// ...</span></span>
<span class="line"><span style="color:#F8F8F2;">myWriter.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;10&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#88846F;">// data is sent to the server</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="table-of-contents-1" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents-1" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h3><ul><li><a href="#clientpluginlogger">ClientPluginLogger</a><ul><li><a href="#examples">Examples</a></li><li><a href="#createwriter">createWriter</a></li><li><a href="#attachwriter">attachWriter</a></li></ul></li><li><a href="#clientwriter">ClientWriter</a><ul><li><a href="#parameters-2">Parameters</a></li><li><a href="#name">name</a></li><li><a href="#pathname">pathname</a></li><li><a href="#write">write</a></li><li><a href="#flush">flush</a></li><li><a href="#close">close</a></li><li><a href="#onpacketsend">onPacketSend</a></li><li><a href="#onclose">onClose</a></li></ul></li><li><a href="#serverpluginlogger">ServerPluginLogger</a><ul><li><a href="#examples-1">Examples</a></li><li><a href="#switch">switch</a></li><li><a href="#createwriter-1">createWriter</a></li></ul></li><li><a href="#serverwriter">ServerWriter</a><ul><li><a href="#parameters-8">Parameters</a></li><li><a href="#name-1">name</a></li><li><a href="#pathname-1">pathname</a></li><li><a href="#write-1">write</a></li><li><a href="#close-1">close</a></li><li><a href="#onclose-1">onClose</a></li></ul></li></ul><h2 id="clientpluginlogger" tabindex="-1">ClientPluginLogger <a class="header-anchor" href="#clientpluginlogger" aria-label="Permalink to &quot;ClientPluginLogger&quot;">​</a></h2><p><strong>Extends ClientPlugin</strong></p><p>Client-side representation of the soundworks sync plugin.</p><p>The constructor should never be called manually. The plugin will be instantiated by soundworks when registered in the <code>pluginManager</code></p><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">, ClientPluginLogger);</span></span></code></pre></div><h3 id="createwriter" tabindex="-1">createWriter <a class="header-anchor" href="#createwriter" aria-label="Permalink to &quot;createWriter&quot;">​</a></h3><p>Create a writer.</p><h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><p><code>name</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">String</a></strong> Name of the writer. Used to generate the log file pathname.</p></li><li><p><code>options</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">Object</a></strong> Options for the writer. (optional, default <code>{}</code>)</p><ul><li><code>options.bufferSize</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number" target="_blank" rel="noreferrer">Number</a></strong> Number of writes buffered before sending the logs to the server. (optional, default <code>1</code>)</li><li><code>options.usePrefix</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">Boolean</a></strong> Whether the writer file should be prefixed with a <code>YYYY.MM.DD_hh.mm.ss_uid_</code> string. (optional, default <code>true</code>)</li><li><code>options.allowReuse</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">Boolean</a></strong> If <code>usePrefix</code> is false, allow to reuse an existing underlying file for the writer. New data will be appended to the file. Can be useful to log global information in the same file amongst different sessions. (optional, default <code>false</code>)</li></ul></li></ul><h3 id="attachwriter" tabindex="-1">attachWriter <a class="header-anchor" href="#attachwriter" aria-label="Permalink to &quot;attachWriter&quot;">​</a></h3><p>Attach to a shared writer created by the server. Can be useful to create files that gather information from multiple nodes.</p><h4 id="parameters-1" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-1" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><p><code>name</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">String</a></strong> Name of the writer. Used to generate the log file pathname.</p></li><li><p><code>options</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">Object</a></strong> Options for the writer. (optional, default <code>{}</code>)</p><ul><li><code>options.bufferSize</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number" target="_blank" rel="noreferrer">Number</a></strong> Number of writes buffered before sending the logs to the server. (optional, default <code>1</code>)</li></ul></li></ul><h2 id="clientwriter" tabindex="-1">ClientWriter <a class="header-anchor" href="#clientwriter" aria-label="Permalink to &quot;ClientWriter&quot;">​</a></h2><p>Client-side stream writer.</p><p>Created and retrieved by the client-side <code>logger.createWriter(name, bufferSize)</code> and <code>logger.attachWriter(name, bufferSize)</code> methods.</p><h3 id="parameters-2" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-2" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><ul><li><code>plugin</code></li><li><code>state</code></li><li><code>bufferSize</code> (optional, default <code>1</code>)</li></ul><h3 id="name" tabindex="-1">name <a class="header-anchor" href="#name" aria-label="Permalink to &quot;name&quot;">​</a></h3><p>Name of the Writer.</p><h3 id="pathname" tabindex="-1">pathname <a class="header-anchor" href="#pathname" aria-label="Permalink to &quot;pathname&quot;">​</a></h3><p>Pathname of the Writer.</p><h3 id="write" tabindex="-1">write <a class="header-anchor" href="#write" aria-label="Permalink to &quot;write&quot;">​</a></h3><p>Format and write data.</p><ul><li>Successive write calls are added to a new line</li><li>Data can be of any type, it will be stringified before write.</li><li>TypedArrays are converted to Array before being stringified.</li></ul><h4 id="parameters-3" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-3" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>data</code> <strong>Any</strong> Data to be written</li></ul><h3 id="flush" tabindex="-1">flush <a class="header-anchor" href="#flush" aria-label="Permalink to &quot;flush&quot;">​</a></h3><p>Flush the buffer, only applies if <code>bufferSize</code> option is set.</p><h3 id="close" tabindex="-1">close <a class="header-anchor" href="#close" aria-label="Permalink to &quot;close&quot;">​</a></h3><p>Close the writer.</p><p>Returns <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noreferrer">Promise</a></strong> Promise that resolves when the stream is closed</p><h3 id="onpacketsend" tabindex="-1">onPacketSend <a class="header-anchor" href="#onpacketsend" aria-label="Permalink to &quot;onPacketSend&quot;">​</a></h3><p>Register a function to be executed when a packet is sent on the network., i.e. when the buffer is full or flushed on close.</p><h4 id="parameters-4" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-4" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>callback</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> Function to execute on close.</li></ul><p>Returns <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> that unregister the listener when executed.</p><h3 id="onclose" tabindex="-1">onClose <a class="header-anchor" href="#onclose" aria-label="Permalink to &quot;onClose&quot;">​</a></h3><p>Register a function to be executed when the Writer is closed. The function will be executed after the buffer has been flushed and underlying state has been deleted, and before the <code>close</code> Promise resolves.</p><h4 id="parameters-5" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-5" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>callback</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> Function to execute on close.</li></ul><p>Returns <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> that unregister the listener when executed.</p><h2 id="serverpluginlogger" tabindex="-1">ServerPluginLogger <a class="header-anchor" href="#serverpluginlogger" aria-label="Permalink to &quot;ServerPluginLogger&quot;">​</a></h2><p><strong>Extends ServerPlugin</strong></p><p>Server-side representation of the soundworks logger plugin.</p><p>The constructor should never be called manually. The plugin will be instantiated by soundworks when registered in the <code>pluginManager</code></p><p>Available options:</p><ul><li><code>[dirname=null]</code> {String} - The directory in which the log files should be created. If <code>null</code> the plugin is in some &quot;idle&quot; state, and any call to <code>createWriter</code> (or client-side <code>attachWriter</code>) will throw an error. The directory can be changed at runtime using the <code>switch</code> method.</li></ul><h3 id="examples-1" tabindex="-1">Examples <a class="header-anchor" href="#examples-1" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">server.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">, ServerPluginLogger, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  dirname: </span><span style="color:#E6DB74;">&#39;my-logs&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><h3 id="switch" tabindex="-1">switch <a class="header-anchor" href="#switch" aria-label="Permalink to &quot;switch&quot;">​</a></h3><p>Change the directory in which the log files are created. Closes all existing writers.</p><h4 id="parameters-6" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-6" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>dirname</code> <strong>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">String</a> | <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">Object</a>)</strong> Path to the new directory. As a convenience to match the plugin filesystem API, an object containing the &#39;dirname&#39; key can also be passed.</li></ul><h3 id="createwriter-1" tabindex="-1">createWriter <a class="header-anchor" href="#createwriter-1" aria-label="Permalink to &quot;createWriter&quot;">​</a></h3><p>Create a writer.</p><h4 id="parameters-7" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-7" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><p><code>name</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noreferrer">String</a></strong> Name of the writer. Used to generate the log file pathname.</p></li><li><p><code>options</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noreferrer">Object</a></strong> Options for the writer. (optional, default <code>{}</code>)</p><ul><li><code>options.usePrefix</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">Boolean</a></strong> Whether the writer file should be prefixed with a <code>YYYY.MM.DD_hh.mm.ss_uid_</code> string. (optional, default <code>true</code>)</li><li><code>options.allowReuse</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean" target="_blank" rel="noreferrer">Boolean</a></strong> If <code>usePrefix</code> is false, allow to reuse an existing underlying file for the writer. New data will be appended to the file. Can be useful to log global information in the same file amongst different sessions. (optional, default <code>false</code>)</li></ul></li></ul><h2 id="serverwriter" tabindex="-1">ServerWriter <a class="header-anchor" href="#serverwriter" aria-label="Permalink to &quot;ServerWriter&quot;">​</a></h2><p>Server-side stream writer.</p><p>Created and retrieved by the server-side <code>logger.createWriter(name)</code> method.</p><h3 id="parameters-8" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-8" aria-label="Permalink to &quot;Parameters&quot;">​</a></h3><ul><li><code>state</code></li><li><code>format</code> (optional, default <code>null</code>)</li></ul><h3 id="name-1" tabindex="-1">name <a class="header-anchor" href="#name-1" aria-label="Permalink to &quot;name&quot;">​</a></h3><p>Name of the Writer.</p><h3 id="pathname-1" tabindex="-1">pathname <a class="header-anchor" href="#pathname-1" aria-label="Permalink to &quot;pathname&quot;">​</a></h3><p>Pathname of the Writer.</p><h3 id="write-1" tabindex="-1">write <a class="header-anchor" href="#write-1" aria-label="Permalink to &quot;write&quot;">​</a></h3><p>Format and write data.</p><ul><li>Successive write calls are added to a new line</li><li>Data can be of any type, it will be stringified before write.</li><li>TypedArrays are converted to Array before being stringified.</li></ul><h4 id="parameters-9" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-9" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>data</code> <strong>Any</strong> Data to be written</li></ul><h3 id="close-1" tabindex="-1">close <a class="header-anchor" href="#close-1" aria-label="Permalink to &quot;close&quot;">​</a></h3><p>Close the writer and the underlying stream.</p><p>Returns <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noreferrer">Promise</a></strong> Promise that resolves when the stream is closed</p><h3 id="onclose-1" tabindex="-1">onClose <a class="header-anchor" href="#onclose-1" aria-label="Permalink to &quot;onClose&quot;">​</a></h3><p>Register a function to be executed when the Writer is closed. The function will be executed when the underlying stream is closed and before the <code>close()</code> Promise is resolved.</p><h4 id="parameters-10" tabindex="-1">Parameters <a class="header-anchor" href="#parameters-10" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><ul><li><code>callback</code> <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> Function to execute on close.</li></ul><p>Returns <strong><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function" target="_blank" rel="noreferrer">Function</a></strong> that unregister the listener when executed.</p><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-label="Permalink to &quot;Credits&quot;">​</a></h2><p>The code has been initiated in the framework of the WAVE and CoSiMa research projects, funded by the French National Research Agency (ANR).</p><h2 id="license" tabindex="-1">License <a class="header-anchor" href="#license" aria-label="Permalink to &quot;License&quot;">​</a></h2><p>BSD-3-Clause</p>`,124)]))}const g=a(r,[["render",o]]);export{F as __pageData,g as default};
