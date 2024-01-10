import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.22f5e90d.js";const o="/assets/wizard-init.8b9d0e7e.png",l="/assets/wizard-create-client.55688247.png",t="/assets/node-client.c5d0cbb4.png",p="/assets/controller.aaddfc1c.png",c="/assets/trigger-sound.a33791fd.png",r="/assets/create-env.e1966aeb.png",b=JSON.parse('{"title":"Working with Node Clients","description":"","frontmatter":{},"headers":[],"relativePath":"tutorials/node-clients.md","filePath":"tutorials/node-clients.md"}'),i={name:"tutorials/node-clients.md"},F=e(`<h1 id="working-with-node-clients" tabindex="-1">Working with Node Clients <a class="header-anchor" href="#working-with-node-clients" aria-label="Permalink to &quot;Working with Node Clients&quot;">​</a></h1><p>In this tutorial, we will explore how to use <em>soundworks</em> to create clients that run within a <em>Node.js</em> process, opening new possibilities of creating application ouside Web Browsers.</p><p>Indeed, this functionality allows to create applications that can work in screenless embedded hardware, such as the Raspberry Pi, allowing to access some fonctionnalities, such as controlling a motor or a LED, which are hard to achieve in sandboxed environment that are Web browsers.</p><p>To illustrate this possibility and discover some of the tools you have at hand to help you, we will build a very simple application where a browser controller client can trigger a sound synthesized by another client running in a Node.js process.</p><h3 id="related-documentation" tabindex="-1">Related Documentation <a class="header-anchor" href="#related-documentation" aria-label="Permalink to &quot;Related Documentation&quot;">​</a></h3><ul><li><a href="https://soundworks.dev/soundworks/client.html" target="_blank" rel="noreferrer">soundworks Client</a></li><li><a href="https://github.com/ircam-ismm/node-web-audio-api" target="_blank" rel="noreferrer">node-web-audio-api</a></li></ul><h2 id="scaffolding-application" tabindex="-1">Scaffolding Application <a class="header-anchor" href="#scaffolding-application" aria-label="Permalink to &quot;Scaffolding Application&quot;">​</a></h2><p>Let&#39;s start with scaffolding our application:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;">cd</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">path/to/tutorials</span></span>
<span class="line"><span style="color:#A6E22E;">npx</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">@soundworks/create@latest</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">node-clients</span></span></code></pre></div><p>When the wizard asks you to create the default client, let&#39;s just create a browser client with the &quot;controller&quot; template (we will create our <em>Node.js</em> client afterward):</p><p><img src="`+o+`" alt="wizard-init"></p><p>Then let&#39;s start our application with:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">cd node-clients</span></span>
<span class="line"><span style="color:#F8F8F2;">npm run dev</span></span></code></pre></div><h2 id="implementing-the-control-logic" tabindex="-1">Implementing the control logic <a class="header-anchor" href="#implementing-the-control-logic" aria-label="Permalink to &quot;Implementing the control logic&quot;">​</a></h2><p>Before implementing our <em>Node.js</em> cient, let&#39;s use the features we have learned so far so that our controller can trigger a sound on any of our future <em>Node.js</em> clients.</p><p>Let&#39;s start with defining the state, we will call <code>thing</code> that will be created by our <em>Node.js</em> clients when they connect to the application. Create a file named <code>thing.js</code> in <code>src/server/schemas</code> and declare the following schema definition:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// src/server/schemas/thing.js</span></span>
<span class="line"><span style="color:#F92672;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">default</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  id: {</span></span>
<span class="line"><span style="color:#F8F8F2;">    type: </span><span style="color:#E6DB74;">&#39;integer&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    default: </span><span style="color:#AE81FF;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    nullable: </span><span style="color:#AE81FF;">true</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  triggerSound: {</span></span>
<span class="line"><span style="color:#F8F8F2;">    type: </span><span style="color:#E6DB74;">&#39;boolean&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    event: </span><span style="color:#AE81FF;">true</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">};</span></span></code></pre></div><p>Now that our schema is declared, let&#39;s just import it into our server index file and register it into our server state manager:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#88846F;">// src/server/index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { loadConfig } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;../utils/load-config.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;../utils/catch-unhandled-errors.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#88846F;">// import the schema of our thing client</span></span>
<span class="line diff add"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> thingSchema </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;./schemas/thing.js&#39;</span><span style="color:#F8F8F2;">; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Server</span><span style="color:#F8F8F2;">(config);</span></span>
<span class="line"><span style="color:#88846F;">// configure the server for usage within this application template</span></span>
<span class="line"><span style="color:#F8F8F2;">server.</span><span style="color:#A6E22E;">useDefaultApplicationTemplate</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#88846F;">// register the schema into the state manager</span></span>
<span class="line diff add"><span style="color:#F8F8F2;">server.stateManager.</span><span style="color:#A6E22E;">registerSchema</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;thing&#39;</span><span style="color:#F8F8F2;">, thingSchema); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> server.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span></code></pre></div><p>Now let&#39;s go to our controller to, first, create a collection of our &quot;thing&quot; states:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#88846F;">// src/clients/controller/index.js</span></span>
<span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">// create the collection and update the GUI on every collection event</span></span>
<span class="line diff add"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> thingCollection </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.stateManager.</span><span style="color:#A6E22E;">getCollection</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;thing&#39;</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">thingCollection.</span><span style="color:#A6E22E;">onUpdate</span><span style="color:#F8F8F2;">(() </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">renderApp</span><span style="color:#F8F8F2;">()); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">thingCollection.</span><span style="color:#A6E22E;">onAttach</span><span style="color:#F8F8F2;">(() </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">renderApp</span><span style="color:#F8F8F2;">()); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">thingCollection.</span><span style="color:#A6E22E;">onDetach</span><span style="color:#F8F8F2;">(() </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">renderApp</span><span style="color:#F8F8F2;">()); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">renderApp</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#88846F;">// ...</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span></code></pre></div><p>And 2. modify the <code>renderApp</code> function to create a simple graphical control interface:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#66D9EF;font-style:italic;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">renderApp</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#A6E22E;">render</span><span style="color:#F8F8F2;">(</span><span style="color:#A6E22E;">html</span><span style="color:#E6DB74;">\`</span></span>
<span class="line"><span style="color:#E6DB74;">    &lt;div class=&quot;controller-layout&quot;&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">      &lt;header&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">        &lt;h1&gt;</span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">client.config.app.name</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;"> | </span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">client.role</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;">&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">        &lt;sw-audit .client=&quot;</span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">client</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;">&quot;&gt;&lt;/sw-audit&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">      &lt;/header&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">      &lt;section&gt;</span></span>
<span class="line diff remove"><span style="color:#E6DB74;">        &lt;p&gt;Hello </span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">client.config.app.name</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;">!&lt;/p&gt; </span></span>
<span class="line diff add"><span style="color:#E6DB74;">        </span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">thingCollection.</span><span style="color:#A6E22E;">map</span><span style="color:#F8F8F2;">(</span><span style="color:#FD971F;font-style:italic;">thing</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">          </span><span style="color:#F92672;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">html</span><span style="color:#E6DB74;">\` </span></span>
<span class="line diff add"><span style="color:#E6DB74;">            &lt;div&gt; </span></span>
<span class="line diff add"><span style="color:#E6DB74;">              &lt;sc-text&gt;</span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">thing.</span><span style="color:#A6E22E;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;id&#39;</span><span style="color:#F8F8F2;">)</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;">&lt;/sc-text&gt; </span></span>
<span class="line diff add"><span style="color:#E6DB74;">              &lt;sc-button </span></span>
<span class="line diff add"><span style="color:#E6DB74;">                @input=</span><span style="color:#F92672;">\${</span><span style="color:#FD971F;font-style:italic;">e</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> thing.</span><span style="color:#A6E22E;">set</span><span style="color:#F8F8F2;">({ triggerSound: </span><span style="color:#AE81FF;">true</span><span style="color:#F8F8F2;"> })</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;"> </span></span>
<span class="line diff add"><span style="color:#E6DB74;">              &gt;trigger sound&lt;/sc-button&gt; </span></span>
<span class="line diff add"><span style="color:#E6DB74;">            &lt;/div&gt; </span></span>
<span class="line diff add"><span style="color:#E6DB74;">          \`</span><span style="color:#F8F8F2;">; </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">        })</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;"> </span></span>
<span class="line"><span style="color:#E6DB74;">      &lt;/section&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">  \`</span><span style="color:#F8F8F2;">, $container);</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span></code></pre></div><p>Of course if you launch the controller (<a href="http://127.0.0.1:8000/" target="_blank" rel="noreferrer">http://127.0.0.1:8000/</a> right now, the screen will be empty but everything is now ready to create and control our node clients.</p><h2 id="implementing-the-node-js-client" tabindex="-1">Implementing the <em>Node.js</em> client <a class="header-anchor" href="#implementing-the-node-js-client" aria-label="Permalink to &quot;Implementing the _Node.js_ client&quot;">​</a></h2><p>Let&#39;s shutdown our server (<code>Ctrl + C</code>) for a while to launch a few commands.</p><p>First let&#39;s install a node package that will allow us to write Web Audio code into <em>Node.js</em>:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--save</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">node-web-audio-api</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>The <a href="https://github.com/ircam-ismm/node-web-audio-api" target="_blank" rel="noreferrer"><code>node-web-audio-api</code></a> package is re-implementation of the Web Audio API specification to be used within Node.js written in the <code>Rust</code> language. The package is relatively recent and does not expose yet all the features, such as <code>AudioWorklet</code>, you would expect in Web browsers. However, it already offers an interesting of compatibility and descent performances which makes it usable in a (hopefully) quite large spectrum of projects.</p><p>For those who might be interested in using the library directly a <code>Rust</code> project, see <a href="https://github.com/orottier/web-audio-api-rs" target="_blank" rel="noreferrer">web-audio-api-rs</a></p></div><p>Then let&#39;s create our second client:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npx</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">soundworks</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--create-client</span></span></code></pre></div><p>with &quot;thing&quot; as name and &quot;node&quot; as target:</p><p><img src="`+l+`" alt="wizard-create-client"></p><p>Once done, you can restart the development server:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">run</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">dev</span></span></code></pre></div><p>To launch our node client, let&#39;s open a second &quot;Terminal&quot;, and run the following commands:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;"># go to the node-clients tutorial directory</span></span>
<span class="line"><span style="color:#66D9EF;">cd</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">path/to/tutorials/node-clients</span></span>
<span class="line"><span style="color:#88846F;"># run you newly created node client in watch mode</span></span>
<span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">run</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">watch</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">thing</span></span></code></pre></div><p>And tada! Your node client should now be connected to the server:</p><p><img src="`+t+`" alt="node-client"></p><p>Now that eveything is setup and ready, let&#39;s write the code needed so our node client react to the instructions from the controller and play some sound.</p><p>First, let&#39;s thus create our &quot;thing&quot; state and initialize its <code>id</code> field with the idea of the <em>soundworks</em> client. Open the <code>src/clients/thing/index.js</code> file and add the following snippet:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line diff add"><span style="color:#88846F;">// create the thing state and initialize it&#39;s id field </span></span>
<span class="line diff add"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> thing </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.stateManager.</span><span style="color:#A6E22E;">create</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;thing&#39;</span><span style="color:#F8F8F2;">, { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  id: client.id, </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">}); </span></span>
<span class="line diff add"><span style="color:#88846F;">// react to updates triggered from controller </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">thing.</span><span style="color:#A6E22E;">onUpdate</span><span style="color:#F8F8F2;">(</span><span style="color:#FD971F;font-style:italic;">updates</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  </span><span style="color:#F92672;">if</span><span style="color:#F8F8F2;"> (</span><span style="color:#E6DB74;">&#39;triggerSound&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">in</span><span style="color:#F8F8F2;"> updates) { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;make some noise!&#39;</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  } </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">}); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">\`Hello </span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">client.config.app.name</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;">!\`</span><span style="color:#F8F8F2;">);</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>If you go see the &quot;Terminal&quot; in which you launched your node client, you can see that the client automatically restarted each time you saved a file, just as with the server. This is the goal of the <code>npm run watch [process_name]</code> command.</p></div><p>If you go back to your controller, you should now see the interface updated with you connected client:</p><p><img src="`+p+'" alt="controller"> And if you click on the &quot;trigger sound&quot; button, the &quot;make some noise!&quot; should in turn appear in the terminal where you launched your <em>thing</em> client:</p><p><img src="'+c+`" alt="trigger-sound"></p><p>Let&#39;s finally write our Web Audio code so that a sound is actually triggered from the <em>Node.js</em> process:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#88846F;">// src/clients/thing/index.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { Client } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/core/client.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> launcher </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;@soundworks/helpers/launcher.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line diff add"><span style="color:#88846F;">// import some classes from the node-web-audio-api package </span></span>
<span class="line diff add"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { AudioContext, GainNode, OscillatorNode } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;node-web-audio-api&#39;</span><span style="color:#F8F8F2;">; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#88846F;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> thing </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> client.stateManager.</span><span style="color:#A6E22E;">create</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;thing&#39;</span><span style="color:#F8F8F2;">, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  id: client.id,</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"><span style="color:#88846F;">// react to updates triggered from controller</span></span>
<span class="line"><span style="color:#F8F8F2;">thing.</span><span style="color:#A6E22E;">onUpdate</span><span style="color:#F8F8F2;">(</span><span style="color:#FD971F;font-style:italic;">updates</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#F92672;">if</span><span style="color:#F8F8F2;"> (</span><span style="color:#E6DB74;">&#39;triggerSound&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">in</span><span style="color:#F8F8F2;"> updates) {</span></span>
<span class="line diff remove"><span style="color:#F8F8F2;">    console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;make some noise!&#39;</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> now </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> audioContext.currentTime; </span></span>
<span class="line diff add"><span style="color:#F8F8F2;"> </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> env </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">GainNode</span><span style="color:#F8F8F2;">(audioContext, { gain: </span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;"> }); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    env.</span><span style="color:#A6E22E;">connect</span><span style="color:#F8F8F2;">(audioContext.destination); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    env.gain.</span><span style="color:#A6E22E;">setValueAtTime</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">0</span><span style="color:#F8F8F2;">, now); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    env.gain.</span><span style="color:#A6E22E;">linearRampToValueAtTime</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">, now </span><span style="color:#F92672;">+</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">0.01</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    env.gain.</span><span style="color:#A6E22E;">exponentialRampToValueAtTime</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">0.0001</span><span style="color:#F8F8F2;">, now </span><span style="color:#F92672;">+</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;"> </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    </span><span style="color:#88846F;">// randomly pick one of harmonics of a sound at 50Hz </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> frequency </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> Math.</span><span style="color:#A6E22E;">floor</span><span style="color:#F8F8F2;">(Math.</span><span style="color:#A6E22E;">random</span><span style="color:#F8F8F2;">() </span><span style="color:#F92672;">*</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">10</span><span style="color:#F8F8F2;">) </span><span style="color:#F92672;">*</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">50</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">+</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">50</span><span style="color:#F8F8F2;">; </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> osc </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">OscillatorNode</span><span style="color:#F8F8F2;">(audioContext, { frequency }); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    osc.</span><span style="color:#A6E22E;">connect</span><span style="color:#F8F8F2;">(env); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    osc.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">(now); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    osc.</span><span style="color:#A6E22E;">stop</span><span style="color:#F8F8F2;">(now </span><span style="color:#F92672;">+</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">1</span><span style="color:#F8F8F2;">); </span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><p>And that&#39;s all! You have now a simple <em>soundworks</em> client that runs into <em>Node.js</em> process and can trigger sound.</p><p>As you can see, the code you wrote to create this client is exactly the same as the one you would have written in a browser client. Indeed, abstracting the platform in such manner is an important goal of <em>soundworks</em> and of the related libraries, such as the <code>node-web-audio-api</code> package.</p><h2 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h2><h3 id="emulating-multiple-clients" tabindex="-1">Emulating multiple clients <a class="header-anchor" href="#emulating-multiple-clients" aria-label="Permalink to &quot;Emulating multiple clients&quot;">​</a></h3><p>In previous tutorial, we often used the <code>?emulate=6</code> query parameter in our url to emulate several clients in only one browser window, which is very practical when developing a distributed application.</p><p>In a similar manner, this is also possible to run several node clients in the same terminal, for example run:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">EMULATE</span><span style="color:#F92672;">=</span><span style="color:#AE81FF;">4</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">run</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">watch</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">thing</span></span></code></pre></div><p>to launch four clients in parallel.</p><h3 id="running-node-client-on-a-network" tabindex="-1">Running node client on a network <a class="header-anchor" href="#running-node-client-on-a-network" aria-label="Permalink to &quot;Running node client on a network&quot;">​</a></h3><p>Another important point to consider is that the node clients needs some configuration to be able to connect to the server. Indeed, when we launch a client in a browser we, as human, tell the browser where to reach the server when we write the URL in the address bar of the Web browser.</p><p>However, node clients don&#39;t have any address bar, hence if you node client doesn&#39;t run into your computer but in a remote device, it will need a bit of configuration to know the IP address of the server. To that end, you can launch the following command to create a environment config file that node clients will be able to consume:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">npx</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">soundworks</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--create-env</span></span></code></pre></div><p><img src="`+r+'" alt="create-env"></p><p>A future tutorial will explain more detail about how to configure a soundworks application in a production setting.</p><h2 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h2><p>In this tutorial, we have explored an important feature of <em>soundworks</em>, i.e. the possibility to create clients that are not running in a Web browser, but rather in a <em>Node.js</em> process.</p><p>In the next tutorials, we will continue our journey into <em>soundworks</em>, by tackling the important question of synchronization between different processes and machines.</p>',65),d=[F];function y(u,h,f,g,m,E){return n(),a("div",null,d)}const v=s(i,[["render",y]]);export{b as __pageData,v as default};