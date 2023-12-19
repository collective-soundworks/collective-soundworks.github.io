import{_ as e,o as a,c as t,Q as s}from"./chunks/framework.a5027060.js";const u=JSON.parse('{"title":"soundworks | plugin logger","description":"","frontmatter":{},"headers":[],"relativePath":"plugins/logger.md","filePath":"plugins/logger.md"}'),n={name:"plugins/logger.md"},r=s(`<h1 id="soundworks-plugin-logger" tabindex="-1">soundworks | plugin logger <a class="header-anchor" href="#soundworks-plugin-logger" aria-label="Permalink to &quot;soundworks | plugin logger&quot;">​</a></h1><p><a href="https://badge.fury.io/js/@soundworks%2Fplugin-logger" target="_blank" rel="noreferrer"><img src="https://badge.fury.io/js/@soundworks%2Fplugin-logger.svg" alt="npm version"></a></p><p><a href="https://github.com/collective-soundworks/soundworks" target="_blank" rel="noreferrer"><code>soundworks</code></a> plugin for recording arbitrary data from any node of the network into plain old files.</p><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ul><li><a href="#installation">Installation</a></li><li><a href="#usage">Usage</a><ul><li><a href="#server">Server</a></li><li><a href="#client">Client</a></li></ul></li><li><a href="#notes--receipes">Notes &amp; Receipes</a><ul><li><a href="#default-extension">Default extension</a></li><li><a href="#prefix-in-log-files">Prefix in log files</a></li><li><a href="#creating-log-files-in-sub-directories">Creating log files in sub-directories</a></li><li><a href="#share-a-writer-between-several-clients">Share a writer between several clients</a></li><li><a href="#client-side-buffering">Client-side buffering</a></li></ul></li><li><a href="#api">API</a><ul><li><a href="#classes">Classes</a></li><li><a href="#pluginloggerclient">PluginLoggerClient</a></li><li><a href="#pluginloggerserver">PluginLoggerServer</a></li><li><a href="#writerclient">WriterClient</a></li><li><a href="#writerserver">WriterServer</a></li></ul></li><li><a href="#credits">Credits</a></li><li><a href="#license">License</a></li></ul><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">@soundworks/plugin-logger</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--save</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="server" tabindex="-1">Server <a class="header-anchor" href="#server" aria-label="Permalink to &quot;Server&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Server } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/server.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> pluginLogger </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-logger/server.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Server</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#F8F8F2;">server.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">, pluginLogger, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#88846F;">// define directory in which the files will be written, </span></span>
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
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> pluginLogger </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-logger/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> client </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Client</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">, pluginLogger);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// create a logger</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> logger </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.pluginManager.</span><span style="color:#A6E22E;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-client-log&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">writer.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;hello client&#39;</span><span style="color:#F8F8F2;">);</span></span></code></pre></div><h2 id="notes-receipes" tabindex="-1">Notes &amp; Receipes <a class="header-anchor" href="#notes-receipes" aria-label="Permalink to &quot;Notes &amp; Receipes&quot;">​</a></h2><p><em>In the following examples, we assume the server-side logger as been configured to use the <code>logs</code> directory.</em></p><h3 id="default-extension" tabindex="-1">Default extension <a class="header-anchor" href="#default-extension" aria-label="Permalink to &quot;Default extension&quot;">​</a></h3><p>If a writer is created with no extesion in its name, the <code>.txt</code> extention is added by default, otherwise the given extension is kept intact:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;first-log.txt&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/2023.07.3_16.39.43_0001_first-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;second-log.md&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/2023.07.3_16.39.43_0002_second-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><h3 id="prefix-in-log-files" tabindex="-1">Prefix in log files <a class="header-anchor" href="#prefix-in-log-files" aria-label="Permalink to &quot;Prefix in log files&quot;">​</a></h3><p>By default all log files (client-side and server-side) are prefixed following a format: <code>yyyy.mm.dd_hh.mm.ss_id_\${basename}</code>. This behavior can be turned of by seeting the <code>usePrefix</code> option to false when creating a writer.</p><p>With <code>usePrefix = true</code> (default):</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-log.txt&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/2023.07.3_16.39.43_0001_my-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><p>With <code>usePrefix = false</code>:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;my-log.txt&#39;</span><span style="color:#F8F8F2;">, { usePrefix: </span><span style="color:#AE81FF;">false</span><span style="color:#F8F8F2;"> });</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/my-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><p>While usefull in some situations, this option can lead to errors if two writers are created with the same name.</p><h3 id="creating-log-files-in-sub-directories" tabindex="-1">Creating log files in sub-directories <a class="header-anchor" href="#creating-log-files-in-sub-directories" aria-label="Permalink to &quot;Creating log files in sub-directories&quot;">​</a></h3><p>If a path is given in the name, e.g. <code>my-dir/my-log</code>, sub-directories will be automatically created:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> writer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">\`my-dir/my-log\`</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(writer.pathname);</span></span>
<span class="line"><span style="color:#F92672;">&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;logs/my-dir/my-log.txt&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><h3 id="share-a-writer-between-several-clients" tabindex="-1">Share a writer between several clients <a class="header-anchor" href="#share-a-writer-between-several-clients" aria-label="Permalink to &quot;Share a writer between several clients&quot;">​</a></h3><p>In a similar way as the shared state (while most simple), clients can attach to a writer created by the server. This can be used for example to create global logs informations where all clients contribute. Create a writer server as usual:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// server-side</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> sharedWrite </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;shared-writer&#39;</span><span style="color:#F8F8F2;">);</span></span></code></pre></div><p>Attach to the writer on the client-size, note the <code>attachWriter</code> method:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// client-side</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> sharedWriter </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">attachWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;shared-writer&#39;</span><span style="color:#F8F8F2;">);</span></span></code></pre></div><p>All writers created by the server can be attached by clients.</p><h3 id="client-side-buffering" tabindex="-1">Client-side buffering <a class="header-anchor" href="#client-side-buffering" aria-label="Permalink to &quot;Client-side buffering&quot;">​</a></h3><p>In many cases you may want to buffer the data client-side and batch the sends to the server to avoid network congestion. This can be done on writers created or attach by the client by defining the <code>bufferSize</code> option.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// client-side</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> myWriter </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> logger.</span><span style="color:#A6E22E;">createWriter</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;buffered-writer&#39;</span><span style="color:#F8F8F2;">, { bufferSize: </span><span style="color:#AE81FF;">10</span><span style="color:#F8F8F2;"> });</span></span>
<span class="line"><span style="color:#88846F;">// data is buffered on the client side</span></span>
<span class="line"><span style="color:#F8F8F2;">myWriter.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;1&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">myWriter.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;2&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#88846F;">// ...</span></span>
<span class="line"><span style="color:#F8F8F2;">myWriter.</span><span style="color:#A6E22E;">write</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;10&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#88846F;">// data is sent to the server</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="classes" tabindex="-1">Classes <a class="header-anchor" href="#classes" aria-label="Permalink to &quot;Classes&quot;">​</a></h3><dl><dt><a href="#PluginLoggerClient">PluginLoggerClient</a></dt><dd><p>Client-side representation of the soundworks sync plugin.</p></dd><dt><a href="#PluginLoggerServer">PluginLoggerServer</a></dt><dd><p>Server-side representation of the soundworks logger plugin.</p></dd><dt><a href="#WriterClient">WriterClient</a></dt><dd><p>Client-side stream writer.</p><p>Created and retrived by the client-side <code>logger.createWriter(name, bufferSize)</code> and <code>logger.attachWriter(name, bufferSize)</code> methods.</p></dd><dt><a href="#WriterServer">WriterServer</a></dt><dd><p>Server-side stream writer.</p><p>Created and retrived by the server-side <code>logger.createWriter(name)</code> method.</p></dd></dl><p><a name="PluginLoggerClient"></a></p><h3 id="pluginloggerclient" tabindex="-1">PluginLoggerClient <a class="header-anchor" href="#pluginloggerclient" aria-label="Permalink to &quot;PluginLoggerClient&quot;">​</a></h3><p>Client-side representation of the soundworks sync plugin.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#PluginLoggerClient">PluginLoggerClient</a><ul><li><a href="#new_PluginLoggerClient_new">new PluginLoggerClient()</a></li><li><a href="#PluginLoggerClient+createWriter">.createWriter(name, options)</a></li><li><a href="#PluginLoggerClient+attachWriter">.attachWriter(name, options)</a></li></ul></li></ul><p><a name="new_PluginLoggerClient_new"></a></p><h4 id="new-pluginloggerclient" tabindex="-1">new PluginLoggerClient() <a class="header-anchor" href="#new-pluginloggerclient" aria-label="Permalink to &quot;new PluginLoggerClient()&quot;">​</a></h4><p>The constructor should never be called manually. The plugin will be instantiated by soundworks when registered in the <code>pluginManager</code></p><p><strong>Example</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">, pluginLogger);</span></span></code></pre></div><p><a name="PluginLoggerClient+createWriter"></a></p><h4 id="pluginloggerclient-createwriter-name-options" tabindex="-1">pluginLoggerClient.createWriter(name, options) <a class="header-anchor" href="#pluginloggerclient-createwriter-name-options" aria-label="Permalink to &quot;pluginLoggerClient.createWriter(name, options)&quot;">​</a></h4><p>Create a writer.</p><p><strong>Kind</strong>: instance method of <a href="#PluginLoggerClient"><code>PluginLoggerClient</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>String</code></td><td></td><td>Name of the writer. Used to generate the log file pathname.</td></tr><tr><td>options</td><td><code>Object</code></td><td></td><td>Options for the writer.</td></tr><tr><td>[options.bufferSize]</td><td><code>Number</code></td><td><code>1</code></td><td>Number of writes buffered before sending the logs to the server.</td></tr><tr><td>[options.usePrefix]</td><td><code>Boolean</code></td><td><code>true</code></td><td>Whether the writer file should be prefixed with a <code>YYYY.MM.DD_hh.mm.ss_uid_</code> string.</td></tr><tr><td>[options.allowReuse]</td><td><code>Boolean</code></td><td><code>false</code></td><td>If <code>usePrefix</code> is false, allow to reuse an existing underlying file for the writer. New data will be appended to the file. Can be usefull to log global informations in the same file amongst different sessions.</td></tr></tbody></table><p><a name="PluginLoggerClient+attachWriter"></a></p><h4 id="pluginloggerclient-attachwriter-name-options" tabindex="-1">pluginLoggerClient.attachWriter(name, options) <a class="header-anchor" href="#pluginloggerclient-attachwriter-name-options" aria-label="Permalink to &quot;pluginLoggerClient.attachWriter(name, options)&quot;">​</a></h4><p>Attach to a shared writer created by the server. Can be usefull to create files that gather informations from multiple nodes.</p><p><strong>Kind</strong>: instance method of <a href="#PluginLoggerClient"><code>PluginLoggerClient</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>String</code></td><td></td><td>Name of the writer. Used to generate the log file pathname.</td></tr><tr><td>options</td><td><code>Object</code></td><td></td><td>Options for the writer.</td></tr><tr><td>[options.bufferSize]</td><td><code>Number</code></td><td><code>1</code></td><td>Number of writes buffered before sending the logs to the server.</td></tr></tbody></table><p><a name="PluginLoggerServer"></a></p><h3 id="pluginloggerserver" tabindex="-1">PluginLoggerServer <a class="header-anchor" href="#pluginloggerserver" aria-label="Permalink to &quot;PluginLoggerServer&quot;">​</a></h3><p>Server-side representation of the soundworks logger plugin.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#PluginLoggerServer">PluginLoggerServer</a><ul><li><a href="#new_PluginLoggerServer_new">new PluginLoggerServer()</a></li><li><a href="#PluginLoggerServer+switch">.switch(dirname)</a></li><li><a href="#PluginLoggerServer+createWriter">.createWriter(name, options)</a></li></ul></li></ul><p><a name="new_PluginLoggerServer_new"></a></p><h4 id="new-pluginloggerserver" tabindex="-1">new PluginLoggerServer() <a class="header-anchor" href="#new-pluginloggerserver" aria-label="Permalink to &quot;new PluginLoggerServer()&quot;">​</a></h4><p>The constructor should never be called manually. The plugin will be instantiated by soundworks when registered in the <code>pluginManager</code></p><p>Available options:</p><ul><li><code>[dirname=null]</code> {String} - The directory in which the log files should be created. If <code>null</code> the plugin is in some &quot;idle&quot; state, and any call to <code>createWriter</code> (or client-side <code>attachWriter</code>) will throw an error. The directory can be changed at runtime usin the <code>switch</code> method.</li></ul><p><strong>Example</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">server.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;logger&#39;</span><span style="color:#F8F8F2;">, pluginLogger, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  dirname: </span><span style="color:#E6DB74;">&#39;my-logs&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><p><a name="PluginLoggerServer+switch"></a></p><h4 id="pluginloggerserver-switch-dirname" tabindex="-1">pluginLoggerServer.switch(dirname) <a class="header-anchor" href="#pluginloggerserver-switch-dirname" aria-label="Permalink to &quot;pluginLoggerServer.switch(dirname)&quot;">​</a></h4><p>Change the directory in which the log files are created. Closes all existing writers.</p><p><strong>Kind</strong>: instance method of <a href="#PluginLoggerServer"><code>PluginLoggerServer</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>dirname</td><td><code>String</code> | <code>Object</code></td><td>Path to the new directory. As a convenience to match the plugin filesystem API, an object containing the &#39;dirname&#39; key can also be passed.</td></tr></tbody></table><p><a name="PluginLoggerServer+createWriter"></a></p><h4 id="pluginloggerserver-createwriter-name-options" tabindex="-1">pluginLoggerServer.createWriter(name, options) <a class="header-anchor" href="#pluginloggerserver-createwriter-name-options" aria-label="Permalink to &quot;pluginLoggerServer.createWriter(name, options)&quot;">​</a></h4><p>Create a writer.</p><p><strong>Kind</strong>: instance method of <a href="#PluginLoggerServer"><code>PluginLoggerServer</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>name</td><td><code>String</code></td><td></td><td>Name of the writer. Used to generate the log file pathname.</td></tr><tr><td>options</td><td><code>Object</code></td><td></td><td>Options for the writer.</td></tr><tr><td>[options.usePrefix]</td><td><code>Boolean</code></td><td><code>true</code></td><td>Whether the writer file should be prefixed with a <code>YYYY.MM.DD_hh.mm.ss_uid_</code> string.</td></tr><tr><td>[options.allowReuse]</td><td><code>Boolean</code></td><td><code>false</code></td><td>If <code>usePrefix</code> is false, allow to reuse an existing underlying file for the writer. New data will be appended to the file. Can be usefull to log global informations in the same file amongst different sessions.</td></tr></tbody></table><p><a name="WriterClient"></a></p><h3 id="writerclient" tabindex="-1">WriterClient <a class="header-anchor" href="#writerclient" aria-label="Permalink to &quot;WriterClient&quot;">​</a></h3><p>Client-side stream writer.</p><p>Created and retrived by the client-side <code>logger.createWriter(name, bufferSize)</code> and <code>logger.attachWriter(name, bufferSize)</code> methods.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#WriterClient">WriterClient</a><ul><li><a href="#WriterClient+name">.name</a></li><li><a href="#WriterClient+pathname">.pathname</a></li><li><a href="#WriterClient+write">.write(data)</a></li><li><a href="#WriterClient+flush">.flush()</a></li><li><a href="#WriterClient+close">.close()</a> ⇒ <code>Promise</code></li><li><a href="#WriterClient+onPacketSend">.onPacketSend(callback)</a> ⇒</li><li><a href="#WriterClient+onClose">.onClose(callback)</a> ⇒</li></ul></li></ul><p><a name="WriterClient+name"></a></p><h4 id="writerclient-name" tabindex="-1">writerClient.name <a class="header-anchor" href="#writerclient-name" aria-label="Permalink to &quot;writerClient.name&quot;">​</a></h4><p>Name of the Writer.</p><p><strong>Kind</strong>: instance property of <a href="#WriterClient"><code>WriterClient</code></a><br><strong>Read only</strong>: true<br><a name="WriterClient+pathname"></a></p><h4 id="writerclient-pathname" tabindex="-1">writerClient.pathname <a class="header-anchor" href="#writerclient-pathname" aria-label="Permalink to &quot;writerClient.pathname&quot;">​</a></h4><p>Pathname of the Writer.</p><p><strong>Kind</strong>: instance property of <a href="#WriterClient"><code>WriterClient</code></a><br><strong>Read only</strong>: true<br><a name="WriterClient+write"></a></p><h4 id="writerclient-write-data" tabindex="-1">writerClient.write(data) <a class="header-anchor" href="#writerclient-write-data" aria-label="Permalink to &quot;writerClient.write(data)&quot;">​</a></h4><p>Format and write data.</p><ul><li>Successive write calls are added to a new line</li><li>Data can be of any type, it will be stringified before write.</li><li>TypedArrays are converted to Array before being stringified.</li></ul><p><strong>Kind</strong>: instance method of <a href="#WriterClient"><code>WriterClient</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>data</td><td><code>Any</code></td><td>Data to be written</td></tr></tbody></table><p><a name="WriterClient+flush"></a></p><h4 id="writerclient-flush" tabindex="-1">writerClient.flush() <a class="header-anchor" href="#writerclient-flush" aria-label="Permalink to &quot;writerClient.flush()&quot;">​</a></h4><p>Flush the buffer, only applies if <code>bufferSize</code> option is set.</p><p><strong>Kind</strong>: instance method of <a href="#WriterClient"><code>WriterClient</code></a><br><a name="WriterClient+close"></a></p><h4 id="writerclient-close-⇒-promise" tabindex="-1">writerClient.close() ⇒ <code>Promise</code> <a class="header-anchor" href="#writerclient-close-⇒-promise" aria-label="Permalink to &quot;writerClient.close() ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Close the writer.</p><p><strong>Kind</strong>: instance method of <a href="#WriterClient"><code>WriterClient</code></a><br><strong>Returns</strong>: <code>Promise</code> - Promise that resolves when the stream is closed<br><a name="WriterClient+onPacketSend"></a></p><h4 id="writerclient-onpacketsend-callback-⇒" tabindex="-1">writerClient.onPacketSend(callback) ⇒ <a class="header-anchor" href="#writerclient-onpacketsend-callback-⇒" aria-label="Permalink to &quot;writerClient.onPacketSend(callback) ⇒&quot;">​</a></h4><p>Register a function to be executed when a packet is sent on the network., i.e. when the buffer is full or flushed on close.</p><p><strong>Kind</strong>: instance method of <a href="#WriterClient"><code>WriterClient</code></a><br><strong>Returns</strong>: Function that unregister the listener when executed.</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>callback</td><td><code>function</code></td><td>Function to execute on close.</td></tr></tbody></table><p><a name="WriterClient+onClose"></a></p><h4 id="writerclient-onclose-callback-⇒" tabindex="-1">writerClient.onClose(callback) ⇒ <a class="header-anchor" href="#writerclient-onclose-callback-⇒" aria-label="Permalink to &quot;writerClient.onClose(callback) ⇒&quot;">​</a></h4><p>Register a function to be executed when the Writer is closed. The function will be executed after the buffer has been flushed and underlying state has been deleted, and before the <code>close</code> Promise resolves.</p><p><strong>Kind</strong>: instance method of <a href="#WriterClient"><code>WriterClient</code></a><br><strong>Returns</strong>: Function that unregister the listener when executed.</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>callback</td><td><code>function</code></td><td>Function to execute on close.</td></tr></tbody></table><p><a name="WriterServer"></a></p><h3 id="writerserver" tabindex="-1">WriterServer <a class="header-anchor" href="#writerserver" aria-label="Permalink to &quot;WriterServer&quot;">​</a></h3><p>Server-side stream writer.</p><p>Created and retrived by the server-side <code>logger.createWriter(name)</code> method.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#WriterServer">WriterServer</a><ul><li><a href="#WriterServer+name">.name</a></li><li><a href="#WriterServer+pathname">.pathname</a></li><li><a href="#WriterServer+write">.write(data)</a></li><li><a href="#WriterServer+close">.close()</a> ⇒ <code>Promise</code></li><li><a href="#WriterServer+onClose">.onClose(callback)</a> ⇒</li></ul></li></ul><p><a name="WriterServer+name"></a></p><h4 id="writerserver-name" tabindex="-1">writerServer.name <a class="header-anchor" href="#writerserver-name" aria-label="Permalink to &quot;writerServer.name&quot;">​</a></h4><p>Name of the Writer.</p><p><strong>Kind</strong>: instance property of <a href="#WriterServer"><code>WriterServer</code></a><br><strong>Read only</strong>: true<br><a name="WriterServer+pathname"></a></p><h4 id="writerserver-pathname" tabindex="-1">writerServer.pathname <a class="header-anchor" href="#writerserver-pathname" aria-label="Permalink to &quot;writerServer.pathname&quot;">​</a></h4><p>Pathname of the Writer.</p><p><strong>Kind</strong>: instance property of <a href="#WriterServer"><code>WriterServer</code></a><br><strong>Read only</strong>: true<br><a name="WriterServer+write"></a></p><h4 id="writerserver-write-data" tabindex="-1">writerServer.write(data) <a class="header-anchor" href="#writerserver-write-data" aria-label="Permalink to &quot;writerServer.write(data)&quot;">​</a></h4><p>Format and write data.</p><ul><li>Successive write calls are added to a new line</li><li>Data can be of any type, it will be stringified before write.</li><li>TypedArrays are converted to Array before being stringified.</li></ul><p><strong>Kind</strong>: instance method of <a href="#WriterServer"><code>WriterServer</code></a></p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>data</td><td><code>Any</code></td><td>Data to be written</td></tr></tbody></table><p><a name="WriterServer+close"></a></p><h4 id="writerserver-close-⇒-promise" tabindex="-1">writerServer.close() ⇒ <code>Promise</code> <a class="header-anchor" href="#writerserver-close-⇒-promise" aria-label="Permalink to &quot;writerServer.close() ⇒ &lt;code&gt;Promise&lt;/code&gt;&quot;">​</a></h4><p>Close the writer and the underlying stream.</p><p><strong>Kind</strong>: instance method of <a href="#WriterServer"><code>WriterServer</code></a><br><strong>Returns</strong>: <code>Promise</code> - Promise that resolves when the stream is closed<br><a name="WriterServer+onClose"></a></p><h4 id="writerserver-onclose-callback-⇒" tabindex="-1">writerServer.onClose(callback) ⇒ <a class="header-anchor" href="#writerserver-onclose-callback-⇒" aria-label="Permalink to &quot;writerServer.onClose(callback) ⇒&quot;">​</a></h4><p>Register a function to be executed when the Writer is closed. The function will be executed when the underlying stream is closed and before the <code>close()</code> Promise is resolved.</p><p><strong>Kind</strong>: instance method of <a href="#WriterServer"><code>WriterServer</code></a><br><strong>Returns</strong>: Function that unregister the listener when executed.</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>callback</td><td><code>function</code></td><td>Function to execute on close.</td></tr></tbody></table><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-label="Permalink to &quot;Credits&quot;">​</a></h2><p>The code has been initiated in the framework of the WAVE and CoSiMa research projects, funded by the French National Research Agency (ANR).</p><h2 id="license" tabindex="-1">License <a class="header-anchor" href="#license" aria-label="Permalink to &quot;License&quot;">​</a></h2><p>BSD-3-Clause</p>`,145),l=[r];function o(i,p,c,d,h,g){return a(),t("div",null,l)}const y=e(n,[["render",o]]);export{u as __pageData,y as default};