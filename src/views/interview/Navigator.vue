<template>
  <div class="navigator-container">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="NO1、cookie和localStorage、sessionStorage、indexDB 的区别" name="1">
            <el-table
                :data="tablecache"
                style="width: 100%">
                 <el-table-column
                    prop="attr"
                    label="特性"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="cookie"
                    label="cookie">
                </el-table-column>
                <el-table-column
                    prop="localStorage"
                    label="localStorage"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="sessionStorage"
                    label="sessionStorage">
                </el-table-column>
                <el-table-column
                    prop="indexDB"
                    label="indexDB">
                </el-table-column>
            </el-table>
            <p>
                <span class="keys">IndexedDB</span> 是一种使用浏览器存储大量数据的方法，它创造的数据可以被查询，并且可以离线使用。
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-29" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-29</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO2、怎么判断页面是否加载完成？" name="2">
            <p><span class="keys">Load</span> 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。</p>
            <p><span class="keys">DOMContentLoaded</span> 事件触发代表初始的 <span class="keys">HTML</span> 被完全加载和解析，不需要等待 CSS，JS，图片加载。</p>
            <pre>
                <h4>DOM文档加载步骤</h4>
                (1) 解析HTML结构。
                (2) 加载外部脚本和样式表文件。
                (3) 解析并执行脚本代码。(按文档代码顺序加载解析)
                (4) 构造HTML DOM模型，由抽象语法树构造成的DOM树。//$().ready 相当于 DOMContentLoaded
                (5) 加载图片等外部文件。
                (6) 页面加载完毕。//$().load
            </pre>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-30" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-30</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO3、如何解决跨域" name="3">
            <p>同源策略 是浏览器与服务器交互的一种约定， 所谓同源是指：域名、协议、端口相同。</p>
            <p>解决办法</p>
            <h4>JSONP</h4>
            <p>
                JSONP 的原理很简单，就是利用 <span class="keys">&lt;script&gt;</span> 标签没有跨域限制的漏洞。通过 <span class="keys">&lt;script&gt;</span> 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。
            </p>
            <pre>
                前端
                <code>
                    &lt;script&gt;
                        function jsonp(data) {
                                console.log(data)
                        }
                        document.addEventListener('DOMContentLoaded', function(){
                            var script = document.createElement('script')
                            script.src = 'http://123.57.229.111:3000/string?callback=jsonp'
                            document.body.appendChild(script);
                        })
                    &lt;/script&gt;
                </code>
            </pre>
            <pre>
                服务段
                <code>
                    router.get('/string', async (ctx, next) => {
                    if(ctx.method == 'GET') {
                        // 获取jsonp的callback
                        let callbackName = ctx.query.callback || 'callback'
                        let returnData = {
                        success: true,
                        data: {
                            text: 'this is a jsonp api',
                            time: new Date().getTime()
                        }
                        }

                        // jsonp的script字符串
                        let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`

                        // 用text/javascript，让请求支持跨域获取
                        ctx.type = 'text/javascript'

                        // 输出jsonp字符串
                        ctx.body = jsonpStr
                    } else {
                        ctx.body = 'hello jsonp'
                    }
                    })
                </code>
            </pre>
            <p><span class="keys">JSONP</span> 使用简单且兼容性不错，但是只限于 <span class="keys">get</span> 请求。</p>
            <p>在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP，以下是简单实现</p>
            <pre>
                <code>
                    function jsonp(url, jsonpCallback, success) {
                    let script = document.createElement("script");
                    script.src = url;
                    script.async = true;
                    script.type = "text/javascript";
                    window[jsonpCallback] = function(data) {
                        success && success(data);
                    };
                    document.body.appendChild(script);
                    }
                    jsonp(
                        "http://xxx",
                        "callback",
                        function(value) {
                            console.log(value);
                        }
                    );
                </code>
            </pre>
            <h4>CORS</h4>
            <p>CORS需要浏览器和后端同时支持。IE 8 和 9 需要通过 <span class="keys">XDomainRequest</span> 来实现。</p>
            <p>浏览器会自动进行 CORS 通信，实现CORS通信的关键是后端。只要后端实现了 CORS，就实现了跨域。</p>
            <p>服务端设置 <span class="keys">Access-Control-Allow-Origin</span> 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。</p>
            <h4>document.domain</h4>
            <p>该方式只能用于二级域名相同的情况下，比如 <span class="keys">a.test.com</span> 和 <span class="keys">b.test.com</span> 适用于该方式。</p>
            <p>只需要给页面添加 <span class="keys">document.domain = 'test.com'</span> 表示二级域名都相同就可以实现跨域</p>
            <h4>postMessage</h4>
            <p>这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息</p>
            <pre>
                <code>
                    // 发送消息端
                    window.parent.postMessage('message', 'http://test.com');
                    // 接收消息端
                    var mc = new MessageChannel();
                    mc.addEventListener('message', (event) => {
                        var origin = event.origin || event.originalEvent.origin; 
                        if (origin === 'http://test.com') {
                            console.log('验证通过')
                        }
                    });
                </code>
            </pre>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-31" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-31</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO4、什么是事件代理" name="4">
            <p>如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上</p>
            <pre>
                <code>
                    &lt;ul id="ul"&gt;
                        &lt;li&gt;1&lt;/li&gt;
                        &lt;li&gt;2&lt;/li&gt;
                        &lt;li&gt;3&lt;/li&gt;
                        &lt;li&gt;4&lt;/li&gt;
                        &lt;li&gt;5&lt;/li&gt;
                    &lt;/ul&gt;
                    &lt;script&gt;
                        let ul = document.querySelector('#ul')
                        ul.addEventListener('click', (event) => {
                            console.log(event.target);
                        })
                    &lt;/script&gt;
                </code>
            </pre>
            <p>事件代理的方式相对于直接给目标注册事件来说，有以下优点</p>
            <pre>
                节省内存
                不需要给子节点注销事件
            </pre>
            <pre>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-36" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-36</a>
            </pre>
        </el-collapse-item>
        <el-collapse-item title="NO5、Service worker" name="5">
            <pre>
                Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。
                它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务
                器上来采取适当的动作。他们还允许访问推送通知和后台同步API。
            </pre>
            <p>目前该技术通常用来做缓存文件，提高首屏速度，可以试着来实现这个功能。</p>
            <pre>
                <code>
                    // index.js
                    if (navigator.serviceWorker) {
                    navigator.serviceWorker
                        .register("sw.js")
                        .then(function(registration) {
                        console.log("service worker 注册成功");
                        })
                        .catch(function(err) {
                        console.log("servcie worker 注册失败");
                        });
                    }
                    // sw.js
                    // 监听 `install` 事件，回调中缓存所需文件
                    self.addEventListener("install", e => {
                    e.waitUntil(
                        caches.open("my-cache").then(function(cache) {
                        return cache.addAll(["./index.html", "./index.js"]);
                        })
                    );
                    });

                    // 拦截所有请求事件
                    // 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
                    self.addEventListener("fetch", e => {
                    e.respondWith(
                        caches.match(e.request).then(function(response) {
                        if (response) {
                            return response;
                        }
                        console.log("fetch source");
                        })
                    );
                    });

                </code>
            </pre>
            <p>
                来源:
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-37" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-37</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO6、浏览器缓存" name="6">
            <h4>浏览器缓存</h4>
            <p>缓存对于前端性能优化来说是个很重要的点，良好的缓存策略可以降低资源的重复加载提高网页的整体加载速度。</p>
            <p>通常浏览器缓存策略分为两种：强缓存和协商缓存。</p>
            <h5>强缓存</h5>
            <p>实现强缓存可以通过两种响应头实现：<span class="keys">Expires</span> 和 <span class="keys">Cache-Control</span> 。强缓存表示在缓存期间不需要请求，state code 为 200</p>
            <h5>协商缓存</h5>
            <p>协商缓存需要客户端和服务端共同实现，和强缓存一样，也有两种实现方式。Last-Modified 和 If-Modified-Since</p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-37" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-37</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO7、浏览器性能问题" name="7">
            <h4>重绘（Repaint）和回流（Reflow）</h4>
            <p>重绘和回流是渲染步骤中的一小节，但是这两个步骤对于性能影响很大。</p>
            <pre>
                重绘是当节点改变外观而不影响布局的，比如改变 <span class="keys">color</span> 就成为重绘
                回流是布局或者几何属性需要改变就称为回流。
            </pre>
            <p>回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流。</p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-45" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-45</a>
            </p>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            activeNames: [ '1' ],
            tablecache: [{
                attr: '数据生命周期',
                cookie: '一般由服务器生成，可以设置过期时间',
                localStorage: '除非被清理，否则一直存在',
                sessionStorage: '页面关闭就清理',
                indexDB: '除非被清理，否则一直存在'
            }, {
                attr: '数据存储大小',
                cookie: '4k',
                localStorage: '5M',
                sessionStorage: '5M',
                indexDB: '无限'
            }, {
                attr: '与服务端通信',
                cookie: '每次都会携带在 header 中，对于请求性能影响',
                localStorage: '不参与',
                sessionStorage: '不参与',
                indexDB: '不存储'
            }]
        }
    },
    methods: {
        handleChange(val){
            return val
        }
    }
}
</script>

<style>
.navigator-container{padding:0 20px;}
.el-collapse-item p{padding:10px 20px;line-height:1.8em;font-size:16px;}
.el-collapse-item p a{color:#0366d6;text-decoration:underline;}
.el-collapse-item p .keys{color:#ff502c;}
</style>