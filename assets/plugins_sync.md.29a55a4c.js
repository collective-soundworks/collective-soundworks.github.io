import{_ as e,o as n,c as s,V as a}from"./chunks/framework.7cbf217e.js";const h=JSON.parse('{"title":"soundworks | plugin sync","description":"","frontmatter":{},"headers":[],"relativePath":"plugins/sync.md","filePath":"plugins/sync.md"}'),o={name:"plugins/sync.md"},t=a(`<h1 id="soundworks-plugin-sync" tabindex="-1">soundworks | plugin sync <a class="header-anchor" href="#soundworks-plugin-sync" aria-label="Permalink to &quot;soundworks | plugin sync&quot;">​</a></h1><p><a href="https://badge.fury.io/js/@soundworks%2Fplugin-sync" target="_blank" rel="noreferrer"><img src="https://badge.fury.io/js/@soundworks%2Fplugin-sync.svg" alt="npm version"></a></p><p><a href="https://github.com/collective-soundworks/soundworks" target="_blank" rel="noreferrer"><code>soundworks</code></a> plugin for synchronizing clients on a common master clock.</p><p>Because <em>&quot;as a consequence of dealing with independent nodes, each one will have its own notion of time [...] we cannot assume that there is something like a <strong>global clock</strong>&quot;</em> [<a href="https://link.springer.com/article/10.1007/s00607-016-0508-7" target="_blank" rel="noreferrer">M. van Steen &amp; A. S. Tanenbaum</a>], the <code>sync</code> plugin synchronizes a local clock from the client with a master clock from the server.</p><p>The plugin is a wrapper around the <a href="https://github.com/ircam-ismm/sync" target="_blank" rel="noreferrer"><code>@ircam/sync</code></a> library.</p><h2 id="table-of-contents" tabindex="-1">Table of Contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of Contents&quot;">​</a></h2><ul><li><a href="#installation">Installation</a></li><li><a href="#usage">Usage</a><ul><li><a href="#server">Server</a></li><li><a href="#client">Client</a></li></ul></li><li><a href="#notes">Notes</a><ul><li><a href="#default-clocks">Default clocks</a></li><li><a href="#using-audiocontextcurrenttime-as-the-local-clock">Using <code>audioContext.currentTime</code> as the local clock</a></li><li><a href="#scheduling-synchronized-audio-events">Scheduling synchronized audio events</a></li><li><a href="#correspondances-between-local-time-and-sync-time">Correspondances between local time and sync time</a></li></ul></li><li><a href="#api">API</a><ul><li><a href="#classes">Classes</a></li><li><a href="#pluginsyncclient">PluginSyncClient</a></li><li><a href="#pluginsyncserver">PluginSyncServer</a></li></ul></li><li><a href="#resources">Resources</a></li><li><a href="#credits">Credits</a></li><li><a href="#license">License</a></li></ul><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--save</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">@soundworks/plugin-sync</span></span></code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="server" tabindex="-1">Server <a class="header-anchor" href="#server" aria-label="Permalink to &quot;Server&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Server } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/server.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> pluginSync </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-sync/server.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Server</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#F8F8F2;">server.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;sync&#39;</span><span style="color:#F8F8F2;">, pluginSync);</span></span></code></pre></div><h3 id="client" tabindex="-1">Client <a class="header-anchor" href="#client" aria-label="Permalink to &quot;Client&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Client } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> pluginSync </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-sync/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> client </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Client</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;sync&#39;</span><span style="color:#F8F8F2;">, pluginSync);</span></span></code></pre></div><h2 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h2><h3 id="default-clocks" tabindex="-1">Default clocks <a class="header-anchor" href="#default-clocks" aria-label="Permalink to &quot;Default clocks&quot;">​</a></h3><p>On the server side, the master clock used by default returns the time in seconds since the plugin started using <code>process.hrtime()</code>, i.e:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> startTime </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> process.</span><span style="color:#A6E22E;">hrtime</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6E22E;">getTimeFunction</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> now </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> process.</span><span style="color:#A6E22E;">hrtime</span><span style="color:#F8F8F2;">(startTime);</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#F92672;">return</span><span style="color:#F8F8F2;"> now[</span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;">] </span><span style="color:#F92672;">+</span><span style="color:#F8F8F2;"> now[</span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">] </span><span style="color:#F92672;">*</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">1e-9</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span></code></pre></div><p>In most case, you will be perfectly fine with this default.</p><p>On the clients, the local clocks used by default return the time in second since the plugin started using <code>performance.now</code> on browser clients, or <code>process.hrtime</code> on node clients.</p><p>In many case, you will want to configure this to synchronize with another clock, such as the <code>audioContext.currentTime</code>.</p><h3 id="using-audiocontext-currenttime-as-the-local-clock" tabindex="-1">Using <code>audioContext.currentTime</code> as the local clock <a class="header-anchor" href="#using-audiocontext-currenttime-as-the-local-clock" aria-label="Permalink to &quot;Using \`audioContext.currentTime\` as the local clock&quot;">​</a></h3><p>An important thing to consider to perform synchronization using the <code>audioContext.currentTime</code> is that the audio clock only starts to increment when <code>await audioContext.resume()</code> has been fulfilled. In other words, if the <code>audioContext</code> is suspended calling <code>audioContext.currentTime</code> will always return <code>0</code> and the synchronization process will be broken.</p><p>Hence, you must make sure to <code>resume</code> the audio context first, for example using the <a href="https://soundworks.dev/plugins/platform-init.html" target="_blank" rel="noreferrer"><code>@soudnworks/plugin-platform-init</code></a> plugin, before starting the synchronization process.</p><p>First you will need to install the <code>@soundworks/plugin-platform-init</code></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--save</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">@soundworks/plugin-platform-init</span></span></code></pre></div><p>Then, you will need to register the <code>platform-init</code> plugin and configure it so that it resumes the audio context:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Client } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> pluginPlatform </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-platform-init/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> pluginSync </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/plugin-sync/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> client </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Client</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#88846F;">// create an audio context</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> audioContext </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">AudioContext</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// register the platform plugin to resume the audio context</span></span>
<span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;platform&#39;</span><span style="color:#F8F8F2;">, pluginPlatform, { audioContext });</span></span></code></pre></div><p>Finally, you will need to configure the <code>sync</code> plugin to use the <code>audioContext.currentTime</code> as the local clock, and to make sure it is started after the platform is itself fully started.</p><p>To that end, the last argument passed to the <code>pluginManager.register</code> method (i.e. <code>[&#39;platform&#39;]</code>) specifically tells soundworks to start the <code>sync</code> plugin only once the <code>platform</code> plugin is itself started.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;platform&#39;</span><span style="color:#F8F8F2;">, pluginPlatform, { audioContext });</span></span>
<span class="line"><span style="color:#88846F;">// configure the sync plugin to start once the audio context is resumed</span></span>
<span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;sync&#39;</span><span style="color:#F8F8F2;">, pluginSync, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#A6E22E;">getTimeFunction</span><span style="color:#F8F8F2;">: () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> audioContext.currentTime,</span></span>
<span class="line"><span style="color:#F8F8F2;">}, [</span><span style="color:#E6DB74;">&#39;platform&#39;</span><span style="color:#F8F8F2;">]);</span></span></code></pre></div><h3 id="scheduling-synchronized-audio-events" tabindex="-1">Scheduling synchronized audio events <a class="header-anchor" href="#scheduling-synchronized-audio-events" aria-label="Permalink to &quot;Scheduling synchronized audio events&quot;">​</a></h3><p>When you propagate some event on your network of devices to trigger a sound at a specific synchronized time, you will need to convert this synchronized information to the local audio clock so that you speak to the audio context on it&#39;s own time reference (which wont be same on each device). The next example assume you have some <a href="https://soundworks.dev/tutorials/state-manager.html" target="_blank" rel="noreferrer">shared state</a> set up between all your clients:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// client pseudo-code</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> sync </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.pluginManager.</span><span style="color:#A6E22E;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;sync&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">mySharedState.</span><span style="color:#A6E22E;">onUpdate</span><span style="color:#F8F8F2;">(</span><span style="color:#FD971F;font-style:italic;">updates</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#88846F;">// syncTriggerTime is the time of an audio even defined in the sync clock</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#F92672;">if</span><span style="color:#F8F8F2;"> (</span><span style="color:#E6DB74;">&#39;syncTriggerTime&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">in</span><span style="color:#F8F8F2;"> updates) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> syncTime </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> updates.syncTriggerTime;</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#88846F;">// convert to local audio time</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> audioTime </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> sync.</span><span style="color:#A6E22E;">getLocalTime</span><span style="color:#F8F8F2;">(syncTime);</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#88846F;">// trigger your sound in the local audio time reference</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> src </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> audioContext.createBufferSource;</span></span>
<span class="line"><span style="color:#F8F8F2;">    src.buffer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> someAudioBuffer;</span></span>
<span class="line"><span style="color:#F8F8F2;">    src.</span><span style="color:#A6E22E;">connect</span><span style="color:#F8F8F2;">(audioContext.destination);</span></span>
<span class="line"><span style="color:#F8F8F2;">    src.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">(audioTime); </span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><p>Note that this simple strategy will effectively trigger the sound at the same logical time on each client, but it will unfortunately not compensate for the <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/outputLatency" target="_blank" rel="noreferrer">audio output latency</a> of each client (which may differ to a great extent...).</p><h3 id="correspondances-between-local-time-and-sync-time" tabindex="-1">Correspondances between local time and sync time <a class="header-anchor" href="#correspondances-between-local-time-and-sync-time" aria-label="Permalink to &quot;Correspondances between local time and sync time&quot;">​</a></h3><p>The following API is similar client-side and server-side:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// get current time from the local clock reference</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> localTime </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> sync.</span><span style="color:#A6E22E;">getLocalTime</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// get time in the local clock reference according to the</span></span>
<span class="line"><span style="color:#88846F;">// time given in the synchronized clock reference</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> localTime </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> sync.</span><span style="color:#A6E22E;">getLocalTime</span><span style="color:#F8F8F2;">(syncTime);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">// get time in the synchronized clock reference</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> sync </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> sync.</span><span style="color:#A6E22E;">getSyncTime</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// get time in the synchronized clock reference</span></span>
<span class="line"><span style="color:#88846F;">// according the time given in the local clock reference</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> sync </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> sync.</span><span style="color:#A6E22E;">getSyncTime</span><span style="color:#F8F8F2;">(localTime);</span></span></code></pre></div><p>Note that on the server-side, as it is the master clock, there is no difference between <code>localTime</code> and <code>syncTime</code>.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="classes" tabindex="-1">Classes <a class="header-anchor" href="#classes" aria-label="Permalink to &quot;Classes&quot;">​</a></h3><dl><dt><a href="#PluginSyncClient">PluginSyncClient</a></dt><dd><p>Client-side representation of the soundworks&#39; sync plugin.</p></dd><dt><a href="#PluginSyncServer">PluginSyncServer</a></dt><dd><p>Server-side representation of the soundworks&#39; sync plugin.</p></dd></dl><p><a name="PluginSyncClient"></a></p><h3 id="pluginsyncclient" tabindex="-1">PluginSyncClient <a class="header-anchor" href="#pluginsyncclient" aria-label="Permalink to &quot;PluginSyncClient&quot;">​</a></h3><p>Client-side representation of the soundworks&#39; sync plugin.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#PluginSyncClient">PluginSyncClient</a><ul><li><a href="#new_PluginSyncClient_new">new PluginSyncClient()</a></li><li><a href="#PluginSyncClient+getLocalTime">.getLocalTime([syncTime])</a> ⇒ <code>Number</code></li><li><a href="#PluginSyncClient+getSyncTime">.getSyncTime([audioTime])</a> ⇒ <code>Number</code></li><li><a href="#PluginSyncClient+onReport">.onReport(callback)</a></li><li><a href="#PluginSyncClient+getReport">.getReport()</a> ⇒ <code>Object</code></li></ul></li></ul><p><a name="new_PluginSyncClient_new"></a></p><h4 id="new-pluginsyncclient" tabindex="-1">new PluginSyncClient() <a class="header-anchor" href="#new-pluginsyncclient" aria-label="Permalink to &quot;new PluginSyncClient()&quot;">​</a></h4><p>The constructor should never be called manually. The plugin will be instantiated by soundworks when registered in the <code>pluginManager</code></p><p>Available options:</p><ul><li><code>getTimeFunction</code> {Function} - Function that returns a time in second. Defaults to <code>performance.now</code> is available or <code>Date.now</code> on browser clients, and <code>process.hrtime</code> on node clients, all of them with an origin set when the plugin starts.</li><li><code>[onReport=null]</code> {Function} - Function to execute when the synchronization reports some statistics.</li></ul><p><strong>Example</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">client.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;sync&#39;</span><span style="color:#F8F8F2;">, syncPlugin, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#A6E22E;">getTimeFunction</span><span style="color:#F8F8F2;">: () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> audioContext.currentTime,</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><p><a name="PluginSyncClient+getLocalTime"></a></p><h4 id="pluginsyncclient-getlocaltime-synctime-⇒-number" tabindex="-1">pluginSyncClient.getLocalTime([syncTime]) ⇒ <code>Number</code> <a class="header-anchor" href="#pluginsyncclient-getlocaltime-synctime-⇒-number" aria-label="Permalink to &quot;pluginSyncClient.getLocalTime([syncTime]) ⇒ &lt;code&gt;Number&lt;/code&gt;&quot;">​</a></h4><p>Time of the local clock. If no arguments provided, returns the current local time, else performs the convertion between the given sync time and the associated local time.</p><p><strong>Kind</strong>: instance method of <a href="#PluginSyncClient"><code>PluginSyncClient</code></a><br><strong>Returns</strong>: <code>Number</code> - Local time corresponding to the given sync time (sec).</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>[syncTime]</td><td><code>Number</code></td><td>optionnal, time from the sync clock (sec).</td></tr></tbody></table><p><a name="PluginSyncClient+getSyncTime"></a></p><h4 id="pluginsyncclient-getsynctime-audiotime-⇒-number" tabindex="-1">pluginSyncClient.getSyncTime([audioTime]) ⇒ <code>Number</code> <a class="header-anchor" href="#pluginsyncclient-getsynctime-audiotime-⇒-number" aria-label="Permalink to &quot;pluginSyncClient.getSyncTime([audioTime]) ⇒ &lt;code&gt;Number&lt;/code&gt;&quot;">​</a></h4><p>Time of the synced clock. If no arguments provided, returns the current sync time, else performs the convertion between the given local time and the associated sync time.</p><p><strong>Kind</strong>: instance method of <a href="#PluginSyncClient"><code>PluginSyncClient</code></a><br><strong>Returns</strong>: <code>Number</code> - Sync time corresponding to the given local time (sec).</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>[audioTime]</td><td><code>Number</code></td><td>optionnal, time from the local clock (sec).</td></tr></tbody></table><p><a name="PluginSyncClient+onReport"></a></p><h4 id="pluginsyncclient-onreport-callback" tabindex="-1">pluginSyncClient.onReport(callback) <a class="header-anchor" href="#pluginsyncclient-onreport-callback" aria-label="Permalink to &quot;pluginSyncClient.onReport(callback)&quot;">​</a></h4><p>Subscribe to reports from the sync process. See <a href="https://github.com/ircam-ismm/sync#SyncClient..reportFunction" target="_blank" rel="noreferrer">https://github.com/ircam-ismm/sync#SyncClient..reportFunction</a></p><p><strong>Kind</strong>: instance method of <a href="#PluginSyncClient"><code>PluginSyncClient</code></a></p><table><thead><tr><th>Param</th><th>Type</th></tr></thead><tbody><tr><td>callback</td><td><code>function</code></td></tr></tbody></table><p><a name="PluginSyncClient+getReport"></a></p><h4 id="pluginsyncclient-getreport-⇒-object" tabindex="-1">pluginSyncClient.getReport() ⇒ <code>Object</code> <a class="header-anchor" href="#pluginsyncclient-getreport-⇒-object" aria-label="Permalink to &quot;pluginSyncClient.getReport() ⇒ &lt;code&gt;Object&lt;/code&gt;&quot;">​</a></h4><p>Get last statistics from the synchronaization process. See <a href="https://github.com/ircam-ismm/sync#SyncClient..reportFunction" target="_blank" rel="noreferrer">https://github.com/ircam-ismm/sync#SyncClient..reportFunction</a></p><p><strong>Kind</strong>: instance method of <a href="#PluginSyncClient"><code>PluginSyncClient</code></a><br><strong>Returns</strong>: <code>Object</code> - The last report<br><a name="PluginSyncServer"></a></p><h3 id="pluginsyncserver" tabindex="-1">PluginSyncServer <a class="header-anchor" href="#pluginsyncserver" aria-label="Permalink to &quot;PluginSyncServer&quot;">​</a></h3><p>Server-side representation of the soundworks&#39; sync plugin.</p><p><strong>Kind</strong>: global class</p><ul><li><a href="#PluginSyncServer">PluginSyncServer</a><ul><li><a href="#new_PluginSyncServer_new">new PluginSyncServer()</a></li><li><a href="#PluginSyncServer+getLocalTime">.getLocalTime([syncTime])</a> ⇒ <code>Number</code></li><li><a href="#PluginSyncServer+getSyncTime">.getSyncTime([localTime])</a> ⇒ <code>Number</code></li></ul></li></ul><p><a name="new_PluginSyncServer_new"></a></p><h4 id="new-pluginsyncserver" tabindex="-1">new PluginSyncServer() <a class="header-anchor" href="#new-pluginsyncserver" aria-label="Permalink to &quot;new PluginSyncServer()&quot;">​</a></h4><p>The constructor should never be called manually. The plugin will be instantiated by soundworks when registered in the <code>pluginManager</code></p><p>Available options:</p><ul><li><code>getTimeFunction</code> {Function} - Function that returns a time in second. Defaults to <code>process.hrtime</code> with an origin set when the plugin starts. In most cases, you shouldn&#39;t have to modify this default behavior.</li></ul><p><strong>Example</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">server.pluginManager.</span><span style="color:#A6E22E;">register</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;sync&#39;</span><span style="color:#F8F8F2;">, syncPlugin);</span></span></code></pre></div><p><a name="PluginSyncServer+getLocalTime"></a></p><h4 id="pluginsyncserver-getlocaltime-synctime-⇒-number" tabindex="-1">pluginSyncServer.getLocalTime([syncTime]) ⇒ <code>Number</code> <a class="header-anchor" href="#pluginsyncserver-getlocaltime-synctime-⇒-number" aria-label="Permalink to &quot;pluginSyncServer.getLocalTime([syncTime]) ⇒ &lt;code&gt;Number&lt;/code&gt;&quot;">​</a></h4><p>Time of the local clock. If no arguments provided, returns the current local time, else performs the convertion between the given sync time and the associated local time.</p><p><strong>Kind</strong>: instance method of <a href="#PluginSyncServer"><code>PluginSyncServer</code></a><br><strong>Returns</strong>: <code>Number</code> - Local time corresponding to the given sync time (sec).<br><strong>Note:</strong>: server-side, <code>getLocalTime</code> and <code>getSyncTime</code> are identical</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>[syncTime]</td><td><code>Number</code></td><td>optionnal, time from the sync clock (sec).</td></tr></tbody></table><p><a name="PluginSyncServer+getSyncTime"></a></p><h4 id="pluginsyncserver-getsynctime-localtime-⇒-number" tabindex="-1">pluginSyncServer.getSyncTime([localTime]) ⇒ <code>Number</code> <a class="header-anchor" href="#pluginsyncserver-getsynctime-localtime-⇒-number" aria-label="Permalink to &quot;pluginSyncServer.getSyncTime([localTime]) ⇒ &lt;code&gt;Number&lt;/code&gt;&quot;">​</a></h4><p>Time of the synced clock. If no arguments provided, returns the current sync time, else performs the convertion between the given local time and the associated sync time.</p><p><strong>Kind</strong>: instance method of <a href="#PluginSyncServer"><code>PluginSyncServer</code></a><br><strong>Returns</strong>: <code>Number</code> - Sync time corresponding to the given local time (sec).<br><strong>Note:</strong>: server-side, <code>getLocalTime</code> and <code>getSyncTime</code> are identical</p><table><thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>[localTime]</td><td><code>Number</code></td><td>optionnal, time from the local clock (sec).</td></tr></tbody></table><h2 id="resources" tabindex="-1">Resources <a class="header-anchor" href="#resources" aria-label="Permalink to &quot;Resources&quot;">​</a></h2><ul><li>Jean-Philippe Lambert, Sébastien Robaszkiewicz, Norbert Schnell. Synchronisation for Distributed Audio Rendering over Heterogeneous Devices, in HTML5. 2nd Web Audio Conference, Apr 2016, Atlanta, GA, United States. &lt;<a href="https://hal.archives-ouvertes.fr/hal-01304889v1" target="_blank" rel="noreferrer">hal-01304889v1</a>&gt;</li></ul><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-label="Permalink to &quot;Credits&quot;">​</a></h2><p><a href="https://soundworks.dev/credits.html" target="_blank" rel="noreferrer">https://soundworks.dev/credits.html</a></p><h2 id="license" tabindex="-1">License <a class="header-anchor" href="#license" aria-label="Permalink to &quot;License&quot;">​</a></h2><p><a href="./LICENSE.html">BSD-3-Clause</a></p>`,100),l=[t];function c(r,i,p,d,y,u){return n(),s("div",null,l)}const g=e(o,[["render",c]]);export{h as __pageData,g as default};
