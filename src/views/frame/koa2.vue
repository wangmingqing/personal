<template>
    <article class="koa2-container">
        <h2 style="text-align:center;padding:20px 0;">KOA2中文文档</h2>
        <p>
            来源：
            <a href="https://www.itying.com/koa/article-index-id-82.html" target="_blank">https://www.itying.com/koa/article-index-id-82.html</a>
        </p>
        <el-collapse v-model="activeNames"  @change="handleChange">
            <el-collapse-item title="NO1、koa2快速开始 " name="1">
                <h3>1.1koa环境搭建教程</h3>
                <pre>
                    1.初始化package.json 
                    <code>
                        npm init
                    </code>
                    2、安装koa2  
                    <code>
                        npm install koa
                        hello world 代码


                        const Koa = require('koa')
                        const app = new Koa()


                        app.use( async ( ctx ) => {
                            ctx.body = 'hello koa2'
                        })


                        app.listen(3000)
                        console.log('[demo] start-quick is starting at port 3000')
                    </code>
                    3、启动Koa2的demo 
                    由于koa2是基于async/await操作中间件，目前node.js 7.x的harmony模式下才能使用，所以启动的时的脚本如下：
                    <code>
                        node index.js
                    </code>
                </pre>
                <h3>1.2 Koa2 async/await使用 </h3>
                <p>
                    async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。
                </p>
                <p>
                    <strong>简单理解</strong>
                </p>
                <p>async是让方法变成异步。</p>
                <p>await是等待异步方法执行完成。</p>
                <h4>详细说明</h4>
                <p>
                    <strong>async是让方法变成异步</strong>，在终端里用node执行这段代码，你会发现输出了Promise { ‘Hello async’ }，这时候会发现它返回的是Promise。
                </p>
                <pre>
                    <code>
                        async function testAsync(){
                            return 'hello async'
                        }

                        const result = testAsync()
                        console.log(result)

                        PS D:\learnspace\personal> node main.js
                        Promise { 'hello async' }
                        PS D:\learnspace\personal>
                    </code>
                </pre>
                <p>
                    <strong>await 在等待async方法执行完毕</strong>，其实await等待的只是一个表达式，这个表达式在官方文档里说的是Promise对象，但是它也可以接受普通值。 注意：await必须在async方法中才可以使用因为await访问本身就会造成程序停止堵塞, <strong>所以必须在异步方法中才可以使用</strong>。
                </p>
                <pre>
                    <code>
                        function getData() {
                            return 'koa2'
                        }
                        async function testAsync(){
                            return 'hello async'
                        }
                        async function test() {
                            const v1 = await getData()
                            const v2 = await testAsync()
                            console.log(v1, v2)
                        }
                        test()
                    </code>
                </pre>
                <p>
                    async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。
                </p>
                <pre>
                    <code>
                        function findData() {
                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve('long_time_value')
                                }, 1000)
                            })
                        }

                        async function test() {
                            const v = await findData()
                            console.log(v)
                        }
                        test()
                    </code>
                </pre>
            </el-collapse-item>
            <el-collapse-item title="NO2、Koa2 路由 以及中间件" name="2">
                <h3>Koa2路由 以及 路由get传值</h3>
                <p><strong>Koa2路由的基本使用</strong></p>
                <p>
                    路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。
                </p>
                <p>
                    通俗的讲：路由就是根据不同的URL地址，加载不同的页面实现不同的功能。
                </p>
                <p>
                    Koa中的路由和Express有所不同，在Express中直接引入Express就可以配置路由，但是在Koa中我们需要安装对应的koa-router路由模块来实现。
                </p>
                <pre>
                    <code>npm install --save koa-router</code>
                </pre>
                <pre>
                    <code>
                        const Koa = require('koa');
                        const router = require('koa-router')();  //注意：引入的方式
                        const app = new Koa();
                        router.get('/', function (ctx, next) {
                        ctx.body="Hello koa";
                        })


                        router.get('/news,(ctx,next)=>{
                            ctx.body="新闻page"
                        });


                        app.use(router.routes()); //作用：启动路由
                        app.use(router.allowedMethods()); 
                        // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
                        app.listen(3000,()=>{
                            console.log('starting at port 3000');
                        });
                    </code>
                </pre>
                <p><strong>二、Koa路由get传值 </strong></p>
                <p>在koa2中GET传值通过request接收，但是接收的方法有两种：query和querystring。</p>
                <p><b>query</b>返回的是格式化好的参数对象。</p>
                <p><b>querystring</b>返回的是请求字符串。</p>
                <pre>
                    <code>
                        const Koa = require('koa');
                        const Router = require('koa-router');

                        const app = new Koa();
                        const router = new Router();
                        router.get('/', function (ctx, next) {
                            ctx.body="Hello koa";
                        })
                        router.get('/newscontent,(ctx,next)=>{

                            let url =ctx.url;
                                //从request中获取GET请求
                                let request =ctx.request;
                                let req_query = request.query;
                                let req_querystring = request.querystring;
                                //从上下文中直接获取
                                let ctx_query = ctx.query;
                                let ctx_querystring = ctx.querystring;
                                ctx.body={
                                url,
                                req_query,
                                req_querystring,
                                ctx_query,
                                ctx_querystring
                            }

                        });
                        app.use(router.routes()); //作用：启动路由
                        app.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑
                        app.listen(3000,()=>{
                            console.log('starting at port 3000');
                        });
                    </code>
                </pre>
                <p><strong>三、Koa动态路由</strong></p>
                <pre>
                    <code>
                        //请求方式   http://域名/product/123
                        router.get('/product/:aid',async (ctx)=>{
                            console.log(ctx.params); //{ aid: '123' }  //获取动态路由的数据
                            ctx.body='这是商品页面';
                        })
                    </code>
                </pre>
            </el-collapse-item>
        </el-collapse>
    </article>
</template>

<script>
export default {
    name: 'koa2',
    data() {
        return {
            activeNames: [ '1' ]
        }
    },
    methods: {
        handleChange(val) {
            return val
        }
    }
}
</script>

<style>
.koa2-container{padding:0 20px;}
.el-collapse-item p{padding:10px 20px;line-height:1.8em;font-size:16px;}
.el-collapse-item p a{color:#0366d6;text-decoration:underline;}
.el-collapse-item p .keys{color:#ff502c;}
code{background-color:#272727;color:#fff;line-height:1.8em;}
</style>