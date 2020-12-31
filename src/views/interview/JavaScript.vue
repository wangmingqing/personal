<template>
  <div class="javascript-container">
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="NO1、谈谈变量提升" name="1">
            <p>通常提升的解释是说将声明的代码移动到了顶部，这其实没什么错误，便于大家理解。但是更准确的解释应该是：在生成执行环境时，会有两个阶段，JS解释器会找出需要提升的变量和函数，并且给他们提前内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值undefined，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用。在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升。</p>
            <p>var 会产生很多错误，所以在ES6中引入了let。let不能在声明前使用，但是这并不是常说的let不会提升，let提升了，在第一阶段内存也已经为他开辟好了空间，但是因为这个声明的特性导致了并不能在声明前使用。</p>
            <p>来源 <a href="https://juejin.im/post/5ba34e54e51d450e5162789b" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b</a></p>
        </el-collapse-item>
        <el-collapse-item title="NO2、说说bind、call、apply的 区别？" name="2">
            <p>call和apply都用于改变函数内this的指向。能力是相同的，只是传参的方式不同。</p>
            <p>除了第一个参数外，call可以接收一个参数列表，apply只接受一个参数数组。</p>
            <p>bind和上面两个方法作用是一致的，只是该方法会返回一个函数。</p>
            <p>详解：<a href="https://juejin.im/post/59bfe84351882531b730bac2" target="_blank">https://juejin.im/post/59bfe84351882531b730bac2</a></p>
        </el-collapse-item>
        <el-collapse-item title="NO3、执行上下文" name="3">
            <p>执行上下文可以理解为一个对象</p>
            <p>它包含三个部分</p>
            <pre>
                变量对象VO
                作用域链（词法作用域）
                this指向
            </pre>
            <p>
                <a href="https://juejin.im/post/5c64d15d6fb9a049d37f9c20#heading-16" target="_blank">
                    原文 https://juejin.im/post/5c64d15d6fb9a049d37f9c20#heading-16
                </a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO3、this的指向" name="4">
            <p>this是函数在运行时确定的，谁是调用者this就指向谁。</p>
            <p>当然箭头函数是不绑定this的，他的this指向的是他的上一层作用域所指向的this。</p>
            <p>
                <a href="https://www.cnblogs.com/zhoudaxiaa/p/9705716.html" target="_blank">详解： https://www.cnblogs.com/zhoudaxiaa/p/9705716.html</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO5、如何实现一个bind函数？" name="5">
            <p><i>//不传入第一个参数，默认是window</i></p>
            <p><i>//改变this的指向，让新的对象可以执行该函数，那么思路是否可以变成给新的对象添加一个函数，然后再执行完以后删除。</i></p>
            <pre>
                <code>
                    Function.prototype.myBind = function(context){
                        if(typeof this !== 'function') {
                            throw new TypeError('not functionp')
                        }

                        var _this = this
                        var arg = [...arguments].slice(1)

                        // 返回一个函数
                        return function F(){
                            // 因为返回了一个函数， 我们可以new F(), 所以需要判断
                            if(this instanceof F){
                                return new _this(...args, ...arguments)
                            }
                            return _this.apply(context, args.concat(...arguments))
                        }
                    }
                </code>
            </pre>
            <p>
                来源： 
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-4" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-4</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO6、请实现一个 call 函数？" name="6">
            <p><i>// 思路：根据 this 查找策略，我们将方法挂在到context 上，然后调用此方法即可。</i></p>
            <pre>
                <code>
                    Function.prototype.myCall = function(context) {
                        if(typeof this !== 'function') {
                            throw new TypeError('not function')
                        }

                        context = context || window
                        context.fn = this
                        let arg = [...arguments].slice(1)
                        let result = context.fn(...arg)

                        delete context.fn
                        return result
                    }
                </code>
            </pre>
        </el-collapse-item>
        <el-collapse-item title="NO7、请实现一个 apply 函数？" name="7">
            <p><i>//思路：根据 this 的查找策略，我们将要执行的函数挂载到 context 上执行</i></p>
            <p><i>//函数内的 this 就是当前的调用者context 了</i></p>
            <pre>
                <code>
                    Function.prototype.myApply = function(context) {
                        if(typeof this !== 'function') {
                            throw new TypeError('not function')
                        }

                        context = context || window
                        context.fn = this
                        let result 
                        if(arguments[1]) {
                            result = context.fn(...arguments[1])
                        } else {
                            result = context.fn()
                        }

                        delete context.fn
                        return result
                    }
                </code>
            </pre>
        </el-collapse-item>
        <el-collapse-item title="NO8、简单说下原型链" name="8">
            <p>
                每个函数都有 <span class="keys">prototype</span> 属性，除了 <span class="keys">Function.prototype.bind()</span>,
                该属性指向原型。每个对象都有 <span class="keys">__proto__</span> 属性，指向了创建该对象的构造函数的原型。
                其实这个属性指向了 <span class="keys">[[prototype]]</span> ,但是 <span class="keys">[[prototype]]</span> 是内部属性，
                我们并不能访问得到，所以使用 <span class="keys">__proto__</span> 来访问。对象可以通过 <span class="keys">__proto__</span> 来
                寻找不属于该对象的属性， <span class="keys">__proto__</span> 将对象链接起来组成了原型链。
            </p>
            <p>
                来源： <a href="https://juejin.im/post/5ba34e54e51d450e5162789b" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b</a>
            </p>
            <p>
                深度解析： <a href="https://github.com/KieSun/Dream/issues/2" target="_blank">https://github.com/KieSun/Dream/issues/2</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO9、怎么判断对象类型" name="9">
            <p>
                可以通过 <span class="keys">Object.prototype.toString.call(xx)</span> 来判断，<span class="keys">typeof</span> 只能判断基本数据类型，无法区分数组和对象。
            </p>
            <p>
                基本数据类型： String Number Boolean Null undefined
            </p>
            <p>
                来源： <a href="https://juejin.im/post/5b0b9b9051882515773ae714" target="_blank">https://juejin.im/post/5b0b9b9051882515773ae714</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO10、说说箭头函数的特点" name="10">
            <p>
                <code>
                    <pre>
                        function a() {
                            return () => {
                                return () => {
                                    console.log(this)
                                }
                            }
                        }
                        console.log(a()()())
                    </pre>
                </code>
            </p>
            <p>
                箭头函数其实是没有 <span class="keys">this</span> 的，这个函数中的 this 只取决于他外面的第一个不是箭头函数的函数的 <span class="keys">this</span>。在这个例子中，因为调用 a 符合前面代码中的第一个情况，所以 <span class="keys">this</span> 是 <span class="keys">this</span>。并且 <span class="keys">this</span> 一旦绑定了上下文，就不会被任何代码改变。
            </p>
            <p>
                基本数据类型： String Number Boolean Null undefined
            </p>
            <p>
                来源： <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-9" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-9</a>
            </p>
            <p>
                详解 少年，不要滥用箭头函数啊 
                <a href="http://jingsam.github.io/2016/12/08/things-you-should-know-about-arrow-functions.html" target="_blank">http://jingsam.github.io/2016/12/08/things-you-should-know-about-arrow-functions.html</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO11、对Promise对象的理解" name="11">
            <p><span class="keys">Promise</span> 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更强大和更合理</p>
            <p><span class="keys">Promise</span> 是 <span class="keys">ES6</span> 新增的语法，解决了回调地狱问题。</p>
            <p>
                可以把 <span class="keys">Promise</span> 看成一个状态机。初始是 <span class="keys">pending</span> 状态，它可以通过
                函数 <span class="keys">resolve</span> 和 <span class="keys">reject</span>,将状态转变为 <span class="keys">resolved</span> 或者
                <span class="keys">rejected</span> 状态，状态一旦改变就不能再次变化。<span class="keys">then</span> 函数会返回一个 <span class="keys">promise</span> 实例。
                并且该返回值是一个新的实例而不是之前的实例。因为 <span class="keys">promise</span> 规范规定除了 <span class="keys">pending</span> 状态，其他状态是不可以改变的，如果返回的是一个相同实例的话，
                多个 <span class="keys">then</span> 调用就失去意义了。对于 <span class="keys">then</span> 来说，本质上可以把它看成是 flatMap
            </p>
            <pre>
                示例一：简单实现ajax封装
                <code>
                    const getJSON = function(url) {
                        return new Promise((resolve, reject) => {
                            var xhr = new XMLHttpRequest()
                            xhr.open('GET', url, true)
                            xhr.onreadystatechange = function(){
                                if(xhr.readyState === 4 && xhr.status === 200){
                                    resolve(xhr.responseText)
                                }
                            }
                            xhr.send(null)
                        })
                    } 
                    getJSON('http://localhost').then(value => {
                        cosnole.log(value)
                    }).catch(error => {
                        console.log(error)
                    })
                </code>
            </pre>
            <p>
                来源
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-13" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-13</a>    
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO12、Generator函数的原理" name="12">
            <p><span class="keys">Generator</span> 是异步编程的一种解决方案，语法行为与传统函数完全不同。</p>
            <p>
                <span class="keys">Promise</span> 是 <span class="keys">ES6</span> 新增的语法，用来创建生成器，生成器的作用是用来返回一个迭代器对象，
                迭代器对象可以通过调用next方法来得到返回值。
            </p>
            <p>
                来源
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-12" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-12</a>    
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO13、async和await的优缺点" name="13">
            <p>
                <span class="keys">async</span> 和 <span class="keys">await</span> 相比直接使用 <span class="keys">Promise</span> 来说，
                优势在于处理 <span class="keys">then</span> 的调用链，能够更清晰准确地写出代码。
            </p>
            <p>
                缺点是滥用 <span class="keys">await</span> 可能会导致性能问题，因为 <span class="keys">await</span> 会阻塞代码，也许之后的异步代码并不依赖于前者，
                但任然需要等待前者完成，导致代码失去了并发性。
            </p>
            <p>
                来源
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-11" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-11</a>    
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO14、==和=== 的区别 什么情况用==" name="14">
            <p>
                <span class="keys">===</span> 用于判断两者类型和值是否相同。 在开发中，对于后端返回的 <span class="code">code</span>，可以通过 <span class="keys">==</span> 去判断。
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-15" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-15</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO15、垃圾回收 老生代算法 新生代算法" name="15">
            <h4>垃圾回收</h4>
            <p>
                <span class="keys">V8</span> 实现了准确式 <span class="keys">GC</span>, <span class="keys">GC</span> <span class="keys">V8</span> 将内存（堆）分为新生代和老生代两部分。
            </p>
            <h4>新生代算法</h4>
            <p>
                新生代中的对象一般存活时间较短，使用 <span class="keys">Scavenge GC</span> 算法。
            </p>
            <p>
                在新生代空间中，内存空间分为两部分，分别为 <span class="keys">From</span> 空间和 <span class="keys">To</span> 空间。
                在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的。新分配的对象会被放入 <span class="keys">From</span> 空间中，当 <span class="keys">From</span> 空间被占满时，新生代 <span class="keys">GC</span> 就会启动了。算法会检查 <span class="keys">From</span> 空间中存活的对象并复制到 <span class="keys">To</span> 空间中，如果有失活的对象就会销毁。
                当复制完成后将 <span class="keys">From</span> 空间和 <span class="keys">To</span> 空间互换，这样 <span class="keys">GC</span> 就结束了。
            </p>
            <h4>老生代算法</h4>
            <p>
                老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是标记清除算法和标记压缩算法。
            </p>
            <p>
                新生代中的对象是否已经经历过一次 <span class="keys">Scavenge</span> 算法，如果经历过的话，会将对象从新生代空间移到老生代空间中。
            </p>
            <p>
                <span class="keys">To</span> 空间的对象占比大小超过 25 %。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-16" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-16</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="No16、说说你对闭包的理解" name="16">
            <h4>闭包</h4>
            <p>
                函数A返回了一个函数B，并且函数B访问了函数A的变量，函数B被称为闭包
            </p>
            <pre>
                <code>
                    function A(){
                        var a = 1
                        var B = function(){
                            console.log(a)
                        }
                        return B;
                    }
                </code>
            </pre>
            <p>
                常见面试题
            </p>
            <pre>
                <code>
                    首先因为 setTimeout 是个异步函数，所有会先把循环全部执行完毕，这时候 i 就是 6 了，所以会输出一堆 6。
                    for(var i = 0; i &lt; 6; i++) {
                        setTimeout(function(){
                            console.log(i) // 6 6 6 6 6 6
                        }, i * 1000)
                    }
                    // 输出 0 1 2 3 4 5
                    // 第一种方法 闭包
                    for(var i = 0; i &lt; 6; i++) {
                        (function(j){
                            setTimeout(function(){
                                console.log(j)
                            }, j * 1000)
                        })(i)
                    }
                    // 第二种方法 给定时器传值
                    for(var i = 0; i &lt; 6; i++){
                        setTimeout(function(){
                            console.log(i)
                        }, i * 1000, i)
                    }
                    // 第三种方法 用let声明i 
                    for(let i = 0; i &lt; 6; i++) {
                        setTimeout(function(){
                            console.log(i)
                        },i * 1000)
                    }
                </code>
            </pre>
        </el-collapse-item>
        <el-collapse-item title="NO17、基本数据类型和引用类型在存储上的差别" name="17">
            <p>基本数据类型存储在栈上，引用类型存储在堆上</p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-20" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-20</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO18、浏览器 Eventloop 和 Node 中的有什么区别" name="18">
            <p>
                <span class="keys">Event Loop</span> 即事件循环,是指浏览器或者 <span class="keys">Node</span> 的
                一种解决 <span class="keys">javascript</span> 单线程运行时不会阻塞一种机制，就是我们经常使用异步的原理。
            </p>
            <p>
                来源： 
                <a href="https://zhuanlan.zhihu.com/p/55511602" target="_blank">https://zhuanlan.zhihu.com/p/55511602</a>
            </p>
            <h4>浏览器中的Event Loop</h4>
            <p>
                任务源可以分为微任务(microtask)和宏任务(macrotask)
            </p>
            <p>
                微任务包括 <span class="keys">process.nextTick</span> ，<span class="keys">promise</span> ，<span class="keys">Object.observe</span> ，<span class="keys">MutationObserver</span>
            </p>
            <p>
                宏任务包括 <span class="keys">script</span><span class="keys">setTimeout</span>, <span class="keys">setInterval</span>, <span class="keys">setImmediate </span>,
                <span class="keys">I/O</span>, <span class="keys">UI rendering</span>
            </p>
            <pre>
                Event Loop的执行顺序
                1.执行同步代码，这属于宏任务。
                2.执行栈为空，查询是否有微任务需要执行
                3.执行所有微任务
                4.必要的话渲染 UI
                5.然后开始下一轮 Event loop，执行宏任务中的异步代码
            </pre>
            <h4>Node中的Event Loop</h4>
            <p>Node 的 Event loop 分为6个阶段，它们会按照顺序反复运行</p>
            <pre>
                <code>
                    ┌───────────────────────┐
                    ┌─>│        timers         │
                    │  └──────────┬────────────┘
                    │  ┌──────────┴────────────┐
                    │  │     I/O callbacks     │
                    │  └──────────┬────────────┘
                    │  ┌──────────┴────────────┐
                    │  │     idle, prepare     │
                    │  └──────────┬────────────┘      ┌───────────────┐
                    │  ┌──────────┴────────────┐      │   incoming:   │
                    │  │         poll          │&lt;──connections───     │
                    │  └──────────┬────────────┘      │   data, etc.  │
                    │  ┌──────────┴────────────┐      └───────────────┘
                    │  │        check          │
                    │  └──────────┬────────────┘
                    │  ┌──────────┴────────────┐
                    └──┤    close callbacks    │
                    └───────────────────────┘

                </code>
            </pre>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-21" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-20</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO19、setTimeout倒计时误差" name="19">
            <p>
                JS 是单线程的，所以 <span class="keys">setTimeout</span> 的误差其实是无法被完全解决的
            </p>
            <pre>
                倒计时尽可能的准确应该以时间差来计算 不应该以1000ms为单位计算
                var interval = 1000
                var currentInterval = interval
                var offset = new Date().getTime() - (startTime + count * interval); // 代码执行所消耗的时间
                currentInterval = interval - offset // 得到下一次循环所消耗的时间
            </pre>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-23" target="_balnk">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-23</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO20、防抖" name="20">
            <p>
                函数防抖动：如果在频繁的事件回调中做复杂计算，很有可能导致页面卡顿，不如将多次计算合并为一次计算，只在一个精确点做操作。
            </p>
            <p> 
                PS：防抖和节流的作用都是防止函数多次调用。区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，防抖的情况下只会调用一次，而节流的 情况会每隔一定时间（参数wait）调用函数。
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-24" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-24</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO21、数组降维" name="21">
            <p>
                Array.prototype.flat() 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
            </p>
            <pre>
                <code>
                    [1, 2, [3, 4]].flat()
                    // [1, 2, 3, 4]

                    [1, 2, [3, [4, 5]]].flat()
                    // [1, 2, 3, [4, 5]]

                    [1, 2, [3, [4, 5]]].flat(2)
                    // [1, 2, 3, 4, 5]

                    [1, [2, [3]]].flat(Infinity)
                    // [1, 2, 3]
                </code>
            </pre>
            <p>
                flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
            </p>
            <pre>
                <code>
                    // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
                    [2, 3, 4].flatMap((x) => [x, x * 2])
                    // [2, 4, 3, 6, 4, 8]

                    //flatMap()只能展开一层数组。
                    // 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
                    [1, 2, 3, 4].flatMap(x => [[x * 2]])
                    // [[2], [4], [6], [8]]
                </code>
            </pre>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-25" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-25</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO22、深拷贝" name="22">
            <p>可以通过 <span class="keys">JSON.parse(JSON.stringify(object))</span> 来解决</p>
            <p>该方法存在局限性</p>
            <pre>
                会忽略 undefined
                会忽略 symbol
                不能序列化函数
                不能解决循环引用的对象
            </pre>
            <p>
                如果需要深拷贝的数据包含函数、symbol以及undefined 则用：
                <a target="_blank" href="https://lodash.com/docs#cloneDeep">lodash 的深拷贝函数</a>
            </p>
            <p>
                如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 MessageChannel
            </p>
            <pre>
                <code>
                    function structuralClone(obj) {
                        return new Promise(resolve => {
                            const {port1, port2} = new MessageChannel();
                            port2.onmessage = ev => resolve(ev.data);
                            port1.postMessage(obj);
                        });
                    }

                    var obj = {a: 1, b: {
                        c: b
                    }}
                    // 注意该方法是异步的
                    // 可以处理 undefined 和循环引用对象
                    (async () => {
                        const clone = await structuralClone(obj)
                    })()
                </code>
            </pre>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-26" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-26</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO23、typeof与instanceof的区别" name="23">
            <p><span class="keys">typeof</span> 对于基本类型，除了 <span class="keys">null</span> 都可以显示正确的类型</p>
            <pre>
                <code>
                    typeof 1 // 'number'
                    typeof '1' // 'string'
                    typeof undefined // 'undefined'
                    typeof true // 'boolean'
                    typeof Symbol() // 'symbol'
                    typeof b // b 没有声明，但是还会显示 undefined
                </code>
            </pre>
            <p>
                <span class="keys">typeof</span> 对于对象，除了函数都会显示 <span class="keys">object</span>
            </p>
            <pre>
                <code>
                    typeof [] // 'object'
                    typeof {} // 'object'
                    typeof console.log // 'function'
                </code>
            </pre>
            <p>
                对于 <span class="keys">null</span> 来说，虽然它是基本类型，但是会显示 <span class="keys">object</span>，这是一个存在很久了的 Bug
            </p>
            <p>
                <span class="keys">instanceof</span> 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 <span class="keys">prototype</span>。
            </p>
            <p>
                实现一个 <span class="keys">instanceof</span>
            </p>
            <pre>
                <code>
                    function instanceof(left, right) {
                        // 获得类型的原型
                        let prototype = right.prototype
                        // 获得对象的原型
                        left = left.__proto__
                        // 判断对象的类型是否等于类型的原型
                        while(true) {
                            if (left === null)
                                return false
                            if (prototype === left)
                                return true
                            left = left.__proto__
                        }
                    }
                </code>
            </pre>
        </el-collapse-item>
        <el-collapse-item title="NO24、实现一个new操作符" name="24">
            <p><span class="keys">new</span> 操作符</p>
            <pre>
                它创建了一个全新的对象。
                它会被执行 <span class="keys">[[Prototype]]</span>（也就是 <span class="keys">__proto__</span>）链接。
                它使 <span class="keys">this</span> 指向新创建的对象。。
                通过 <span class="keys">new</span> 创建的每个对象将最终被 <span class="keys">[[Prototype]]</span> 链接到这个函数的 <span class="keys">prototype</span> 对象上。
                如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用。
            </pre>
            <pre>
                <code>
                    function New(func) {
                        var res = {};
                        if (func.prototype !== null) {
                            res.__proto__ = func.prototype;
                        }
                        var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
                        if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
                            return ret;
                        }
                        return res;
                    }
                    var obj = New(A, 1, 2);
                    // equals to
                    var obj = new A(1, 2);
                </code>
            </pre>
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-0" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-0</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO25、实现一个JSON.stringify" name="25">
            <p><span class="keys">JSON.stringify(value[, replacer [, space]])：</span></p>
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-1" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-1</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO26、实现一个JSON.parse" name="26">
            <p><span class="keys">JSON.parse(text[, reviver])</span></p>
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-2" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-2</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO27、实现一个call或 apply" name="27">
            <p>
                实现改变来源：
                <a href="https://github.com/mqyqingfeng/Blog/issues/11" target="_blank">https://github.com/mqyqingfeng/Blog/issues/11</a>
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-3" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-3</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO28、实现一个Function.bind()" name="28">
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-5" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-5</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO29、实现一个继承" name="29">
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-6" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-6</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO30、实现一个JS函数柯里化" name="30">
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-7" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-7</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO31、手写一个Promise(中高级必考)" name="31">
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-8" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-8</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO32、手写防抖(Debouncing)和节流(Throttling)" name="32">
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-9" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-9</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO33、手写一个JS深拷贝" name="33">
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-10" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-10</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO34、实现一个instanceOf" name="34">
            <p>
                来源：
                <a href="https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-11" target="_blank">https://juejin.im/post/5c9c3989e51d454e3a3902b6#heading-11</a>
            </p>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'JavaScript',
  data() {
    return {
      message: 'javascript',
      activeNames: [ '1' ],
      tablecache: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
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
.javascript-container{padding:0 20px;}
p{padding:10px 20px;line-height:1.8em;font-size:16px;}
p a{color:#0366d6;text-decoration:underline;}
p .keys{color:#ff502c;}
</style>