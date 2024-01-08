import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.a5027060.js";const o="/assets/protocol.7a8362ee.png",l="/assets/homepage.ebb579e0.png",p="/assets/socket-connected.4ad96566.png",t="/assets/data-flow.0749b921.png",m=JSON.parse('{"title":"WebSockets 101","description":"","frontmatter":{},"headers":[],"relativePath":"misc/web-sockets-101.md","filePath":"misc/web-sockets-101.md"}'),c={name:"misc/web-sockets-101.md"},r=e('<h1 id="websockets-101" tabindex="-1">WebSockets 101 <a class="header-anchor" href="#websockets-101" aria-label="Permalink to &quot;WebSockets 101&quot;">​</a></h1><p>WebSocket is a communication protocol that provides full-duplex communication channels over a single TCP connection. In other, WebSocket enable bi-directionnal communication between a client and a server, meaning that both the client and the server can send data to the other, which is not possible with traditionnal HTTP protocol.</p><p>They are particularly useful for creating applications requiring instant updates, such as chats, multiplayer games, or in our case distributed music systems.</p><p><img src="'+o+`" alt="protocol"></p><p>Let&#39;s then create a very simple application from groundup to have a taste of what using raw WebSockets means.</p><h2 id="scaffolding-the-project" tabindex="-1">Scaffolding the project <a class="header-anchor" href="#scaffolding-the-project" aria-label="Permalink to &quot;Scaffolding the project&quot;">​</a></h2><p>Let&#39;s first create a new simple project:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;">cd</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">/path/to/working/directory</span></span>
<span class="line"><span style="color:#A6E22E;">npx</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">@ircam/create@latest</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">websockets-101</span></span></code></pre></div><p>In this project, we wont use the simple server which the command line tool propose (i.e. <code>npx serve</code>), but we will rather create our own server which will be able to handle handle websocket connections.</p><p>Let&#39;s then install some dependencies to simplifies the process:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#66D9EF;">cd</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">websockets-101</span></span>
<span class="line"><span style="color:#A6E22E;">npm</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#AE81FF;">--save</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">ws</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">server-static</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">finalhandler</span></span></code></pre></div><p>After the last command, you should see a new file called <code>package.json</code> that have been created by <code>npm</code> in order to (amongst other things) track the dependencies of your application. Let&#39;s just add the following line in the file so that we can use a more modern and compliant javascript syntax within node:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#88846F;">// package.json</span></span>
<span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  </span><span style="color:#E6DB74;">&quot;type&quot;</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">&quot;module&quot;</span><span style="color:#F8F8F2;">, </span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#E6DB74;">&quot;dependencies&quot;</span><span style="color:#F8F8F2;">: {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#E6DB74;">&quot;finalhandler&quot;</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">&quot;^1.2.0&quot;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#E6DB74;">&quot;serve-static&quot;</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">&quot;^1.15.0&quot;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#E6DB74;">&quot;ws&quot;</span><span style="color:#F8F8F2;">: </span><span style="color:#E6DB74;">&quot;^8.16.0&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span></code></pre></div><h2 id="implementing-the-server" tabindex="-1">Implementing the server <a class="header-anchor" href="#implementing-the-server" aria-label="Permalink to &quot;Implementing the server&quot;">​</a></h2><p>Now eveything is ready to implement our simple server, So. let&#39;s create a new file called <code>server.js</code> and let&#39;s start with importing all the dependencies we will need:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// server.js</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> http </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;node:http&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { WebSocketServer } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;ws&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> serveStatic </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;serve-static&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> finalHandler </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;finalhandler&#39;</span><span style="color:#F8F8F2;">;</span></span></code></pre></div><p>Let&#39;s start with creating a simple HTTP server and configuring it so that it behaves as a static file server:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// create handler for static files</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> staticFileHandler </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">serveStatic</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;./&#39;</span><span style="color:#F8F8F2;">, { index: [</span><span style="color:#E6DB74;">&#39;index.html&#39;</span><span style="color:#F8F8F2;">] })</span></span>
<span class="line"><span style="color:#88846F;">// create the server and use our static file handler to respond to requests</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> http.</span><span style="color:#A6E22E;">createServer</span><span style="color:#F8F8F2;">((</span><span style="color:#FD971F;font-style:italic;">req</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">res</span><span style="color:#F8F8F2;">) </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#A6E22E;">staticFileHandler</span><span style="color:#F8F8F2;">(req, res, </span><span style="color:#A6E22E;">finalHandler</span><span style="color:#F8F8F2;">(req, res))</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"><span style="color:#88846F;">// start the server, listening for request on port 3000</span></span>
<span class="line"><span style="color:#F8F8F2;">server.</span><span style="color:#A6E22E;">listen</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">3000</span><span style="color:#F8F8F2;">, () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">\`Server started: http://127.0.0.1:</span><span style="color:#F92672;">\${</span><span style="color:#F8F8F2;">PORT</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;">\`</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><p>If you now start the server:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#F8F8F2;">node server.js</span></span></code></pre></div><p>And open the URL <a href="http://127.0.0.1:3000" target="_blank" rel="noreferrer">http://127.0.0.1:3000</a> in your browser, the server should retrieve all the files requested by the client, e.g. <code>index.html</code>, <code>main.js</code>, etc. and you should thus see the following on your screen:</p><p><img src="`+l+`" alt="homepage"></p><p>Let&#39;s then just modify a bit our server so that it can handle websockets connection as well:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#88846F;">// create handler for static files</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> staticFileHandler </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">serveStatic</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;./&#39;</span><span style="color:#F8F8F2;">, { index: [</span><span style="color:#E6DB74;">&#39;index.html&#39;</span><span style="color:#F8F8F2;">] })</span></span>
<span class="line"><span style="color:#88846F;">// create the server and use our static file handler to respond to requests</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> http.</span><span style="color:#A6E22E;">createServer</span><span style="color:#F8F8F2;">((</span><span style="color:#FD971F;font-style:italic;">req</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">res</span><span style="color:#F8F8F2;">) </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#A6E22E;">staticFileHandler</span><span style="color:#F8F8F2;">(req, res, </span><span style="color:#A6E22E;">finalHandler</span><span style="color:#F8F8F2;">(req, res))</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"><span style="color:#88846F;">// start the server, listening for request on port 3000</span></span>
<span class="line"><span style="color:#F8F8F2;">server.</span><span style="color:#A6E22E;">listen</span><span style="color:#F8F8F2;">(</span><span style="color:#AE81FF;">3000</span><span style="color:#F8F8F2;">, () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">\`Server started: http://127.0.0.1:3000\`</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line diff add"><span style="color:#88846F;">// create the WebSocket server </span></span>
<span class="line diff add"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> wss </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">WebSocketServer</span><span style="color:#F8F8F2;">({ server }); </span></span>
<span class="line diff add"><span style="color:#88846F;">// listen for &quot;connection&quot; event when a new WebSocket is created </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">wss.</span><span style="color:#A6E22E;">on</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;connection&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">socket</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;- new websocket connection!&#39;</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">}); </span></span></code></pre></div><p>For now, we just log any created socket so we can easily see in the console if eveything works as expected.</p><p>Let&#39;s just restart our server so that our changes. In the <code>Terminal</code>, press <code>Ctrl+C</code> to close the server then restart it with:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki monokai"><code><span class="line"><span style="color:#A6E22E;">node</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">serve</span></span></code></pre></div><h2 id="opening-a-client-websocket" tabindex="-1">Opening a client WebSocket <a class="header-anchor" href="#opening-a-client-websocket" aria-label="Permalink to &quot;Opening a client WebSocket&quot;">​</a></h2><p>Now that eveything is setup and running on our server side, let&#39;s create our WebSocket client to communicate with the server.</p><p>Open the <code>main.js</code> file and add the following lines of code:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> { html, render } </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;https://unpkg.com/lit-html&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;https://unpkg.com/@ircam/sc-components@latest&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> resumeAudioContext </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;./lib/resume-audio-context.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F92672;">import</span><span style="color:#F8F8F2;"> loadAudioBuffer </span><span style="color:#F92672;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;./lib/load-audio-buffer.js&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line diff add"><span style="color:#88846F;">// create a WebSocket to the server </span></span>
<span class="line diff add"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> url </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> window.location.origin.</span><span style="color:#A6E22E;">replace</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;http&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E6DB74;">&#39;ws&#39;</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> socket </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">WebSocket</span><span style="color:#F8F8F2;">(url); </span></span>
<span class="line diff add"></span>
<span class="line diff add"><span style="color:#F8F8F2;">socket.</span><span style="color:#A6E22E;">addEventListener</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;open&#39;</span><span style="color:#F8F8F2;">, () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;socket connected&#39;</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">}); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">socket.</span><span style="color:#A6E22E;">addEventListener</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;error&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">err</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(err.message)); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">socket.</span><span style="color:#A6E22E;">addEventListener</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;close&#39;</span><span style="color:#F8F8F2;">, () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;socket closed&#39;</span><span style="color:#F8F8F2;">)); </span></span></code></pre></div><p>If you reload the page, you should see the &quot;socket connected&quot; message displayed in the console:</p><p><img src="`+p+'" alt="socket-connected"></p><h2 id="propagating-events" tabindex="-1">Propagating Events <a class="header-anchor" href="#propagating-events" aria-label="Permalink to &quot;Propagating Events&quot;">​</a></h2><p>Now, that our communication channel is setup, let&#39;s modify sligthly the behavior of our demo app, so that we a user click on the bang components the sound is triggered on every connected client and not just itself.</p><p>Our data flow will thus be of the following form:</p><ol><li>When the client click on the <code>sc-bang</code> component, a message (e.g. &quot;trigger-input&quot;) is sent to the server</li><li>When the server receives a &quot;trigger-output&quot; message, it sends another message (e.g. &quot;trigger-output&quot;) to every connected socket</li><li>When a client receives a &quot;trigger-output&quot; message, it plays the sound file</li></ol><p><img src="'+t+`" alt="data-flow"></p><p>So let&#39;s start by implementing the point 1. on our client-side:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#88846F;">// main.js</span></span>
<span class="line"><span style="color:#A6E22E;">render</span><span style="color:#F8F8F2;">(</span><span style="color:#A6E22E;">html</span><span style="color:#E6DB74;">\`</span></span>
<span class="line"><span style="color:#E6DB74;">  &lt;h1&gt;websockets-101&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">  &lt;sc-bang</span></span>
<span class="line diff add"><span style="color:#E6DB74;">    @input=</span><span style="color:#F92672;">\${</span><span style="color:#FD971F;font-style:italic;">e</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> socket.</span><span style="color:#A6E22E;">send</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;trigger-input&#39;</span><span style="color:#F8F8F2;">)</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;"> </span></span>
<span class="line diff remove"><span style="color:#E6DB74;">    @input=</span><span style="color:#F92672;">\${</span><span style="color:#FD971F;font-style:italic;">e</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> { </span></span>
<span class="line diff remove"><span style="color:#F8F8F2;">      </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> src </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> audioContext.</span><span style="color:#A6E22E;">createBufferSource</span><span style="color:#F8F8F2;">(); </span></span>
<span class="line diff remove"><span style="color:#F8F8F2;">      src.</span><span style="color:#A6E22E;">connect</span><span style="color:#F8F8F2;">(audioContext.destination); </span></span>
<span class="line diff remove"><span style="color:#F8F8F2;">      src.buffer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> buffer; </span></span>
<span class="line diff remove"><span style="color:#F8F8F2;">      src.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">(); </span></span>
<span class="line diff remove"><span style="color:#F8F8F2;">    }</span><span style="color:#F92672;">}</span><span style="color:#E6DB74;"> </span></span>
<span class="line"><span style="color:#E6DB74;">  &gt;&lt;/sc-bang&gt;</span></span>
<span class="line"><span style="color:#E6DB74;">\`</span><span style="color:#F8F8F2;">, document.body);</span></span></code></pre></div><p>Quite easy step, we just send the message &quot;trigger-input&quot; to the server through our socket instance.</p><p>Let&#39;s now implement the step 2. on the server side:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai has-diff"><code><span class="line"><span style="color:#88846F;">// server.js</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> wss </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">WebSocketServer</span><span style="color:#F8F8F2;">({ server });</span></span>
<span class="line diff add"><span style="color:#88846F;">// A store for our socket client instances </span></span>
<span class="line diff add"><span style="color:#66D9EF;font-style:italic;">let</span><span style="color:#F8F8F2;"> sockets </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">Set</span><span style="color:#F8F8F2;">(); </span></span>
<span class="line"><span style="color:#88846F;">// listen for &quot;connection&quot; event when a new WebSocket is created</span></span>
<span class="line"><span style="color:#F8F8F2;">wss.</span><span style="color:#A6E22E;">on</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;connection&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">socket</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;- new websocket connection!&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  </span><span style="color:#88846F;">// add socket to list  </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  sockets.</span><span style="color:#A6E22E;">add</span><span style="color:#F8F8F2;">(socket); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  </span><span style="color:#88846F;">// listen for message from the socket </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  socket.</span><span style="color:#A6E22E;">addEventListener</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;message&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">event</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    console.</span><span style="color:#A6E22E;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;message received&#39;</span><span style="color:#F8F8F2;">, event.data); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    </span><span style="color:#88846F;">// if the received message is equal to &quot;trigger-input&quot;, loop though  </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    </span><span style="color:#88846F;">// all the connected sockets to dispatch the &quot;trigger-output&quot; message </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    </span><span style="color:#F92672;">if</span><span style="color:#F8F8F2;"> (event.data </span><span style="color:#F92672;">===</span><span style="color:#F8F8F2;"> </span><span style="color:#E6DB74;">&#39;trigger-input&#39;</span><span style="color:#F8F8F2;">) { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">      sockets.</span><span style="color:#A6E22E;">forEach</span><span style="color:#F8F8F2;">(</span><span style="color:#FD971F;font-style:italic;">socket</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">        socket.</span><span style="color:#A6E22E;">send</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;trigger-output&#39;</span><span style="color:#F8F8F2;">); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">      }); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    } </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  }); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  </span><span style="color:#88846F;">// delete socket from the list when it is closed </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  socket.</span><span style="color:#A6E22E;">addEventListener</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;close&#39;</span><span style="color:#F8F8F2;">, () </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> { </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">    sockets.</span><span style="color:#A6E22E;">delete</span><span style="color:#F8F8F2;">(socket); </span></span>
<span class="line diff add"><span style="color:#F8F8F2;">  }); </span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><p>Finally, let&#39;s go back to our client-side to make the client react to the &quot;trigger-output&quot; message:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki monokai"><code><span class="line"><span style="color:#88846F;">// main.js</span></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> audioContext </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">AudioContext</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">resumeAudioContext</span><span style="color:#F8F8F2;">(audioContext);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> buffer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#F92672;">await</span><span style="color:#F8F8F2;"> </span><span style="color:#A6E22E;">loadAudioBuffer</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;./assets/sample.wav&#39;</span><span style="color:#F8F8F2;">, audioContext.sampleRate);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">socket.</span><span style="color:#A6E22E;">addEventListener</span><span style="color:#F8F8F2;">(</span><span style="color:#E6DB74;">&#39;message&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#FD971F;font-style:italic;">event</span><span style="color:#F8F8F2;"> </span><span style="color:#66D9EF;font-style:italic;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#66D9EF;font-style:italic;">const</span><span style="color:#F8F8F2;"> src </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> audioContext.</span><span style="color:#A6E22E;">createBufferSource</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">  src.buffer </span><span style="color:#F92672;">=</span><span style="color:#F8F8F2;"> buffer;</span></span>
<span class="line"><span style="color:#F8F8F2;">  src.</span><span style="color:#A6E22E;">connect</span><span style="color:#F8F8F2;">(audioContext.destination);</span></span>
<span class="line"><span style="color:#F8F8F2;">  src.</span><span style="color:#A6E22E;">start</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span></code></pre></div><p>And congrats! You now have a working simple distributed application.</p><h2 id="conclusion" tabindex="-1">Conclusion <a class="header-anchor" href="#conclusion" aria-label="Permalink to &quot;Conclusion&quot;">​</a></h2><p>This tutorial just showed you how simple it is to use WebSocket to create a distributed application, however it also gives you an idea of the problem you might encounter when using the raw WebSocket API.</p><p>Indeed, the API is rather low-level, e.g. implies to send messages as raw strings, to route them all manually. In this application, the messages where deliberately simple, but what if we want to send some variables (e.g. some frequency values) or more complex data structure?</p><p>Another issue is that the application is completely stateless, meaning there is no history of what happened in the past which can be an issue in more comple situations: for example, you want your clients to playback a sound file all together, but one of them just connected after the event was send, what should we do in such case?</p><p><em>soundworks</em> is designed to hopefully help handle such more complex cases in simple manner.</p>`,51),F=[r];function i(y,d,u,h,f,E){return n(),a("div",null,F)}const v=s(c,[["render",i]]);export{m as __pageData,v as default};
