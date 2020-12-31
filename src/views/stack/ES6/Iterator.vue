<template>
    <div class="iterator-container">
        <p>迭代器 <span class="keys">Iterator</span> 是 <span class="keys">ES6</span> 引入的一种新的遍历机制，迭代器有两个核心概念：</p>
        <pre>
            迭代器是一个统一的接口，它的作用是使各种数据结构可被便捷的访问，它是通过一个键为Symbol.iterator 的方法来实现。
            迭代器是用于遍历数据结构元素的指针（如数据库中的游标）
        </pre>
        <p>迭代过程</p>
        <pre>
            通过 Symbol.iterator 创建一个迭代器，指向当前数据结构的起始位置
            随后通过 next 方法进行向下迭代指向下一个位置， next 方法会返回当前位置的对象，对象包含了 value 和 done 两个属性， value 是当前属性的值， done 用于判断是否遍历结束
            当 done 为 true 时则遍历结束
        </pre>
        <p>是什么使得一个编程语言的新特性很棒？当这个特性可以结合多个其它特性的时候。</p>
        <p><span class="keys">ES2015</span>版本中引入的 <span class="keys">for...of</span> 语句就是这种情况。</p>
        <p><span class="keys">for...of</span> 可以迭代数组、类数组以及任何可以迭代的对象(maps、sets、DOM集合)，并且，<span class="keys">for...of</span> 的语句还很短。</p>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="NO1、数组迭代？" name="1">
                <p><span class="keys">for...of</span> 最常见的应用是对数组项进行迭代。该循环可以高效得完成迭代，而无需其他变量来保持索引。</p>
                <pre>
                    <code>
                        const products = ['oranges', 'apples']
                        for (const product of products) {
                            console.log(product)
                        }
                    </code>
                </pre>
                <p><span class="keys">for...of</span> 循环遍历 <span class="keys">products</span> 的每一项。迭代项被赋值给变量 <span class="keys">product</span>.</p>
                <p>数组方法 <span class="keys">entries()</span> 可以用于访问迭代项的索引。该方法在每次迭代时返回一对 <span class="keys">[index，item]</span>。</p>
                <h3>1.1 就地解构</h3>
                <p>首先，我们来看一下 <span class="keys">for...of</span> 循环的语法：</p>
                <pre>
                    <code>
                        for (LeftHandSideExpression of Expression) {
                            // statements
                        }
                    </code>
                </pre>
                <p><span class="keys">LeftHandSideExpression</span> 表达式可以替换为任意赋值表达式左侧的内容。</p>
                <p>在前面的示例中，<span class="keys">LeftHandSideExpression</span> 是一个变量声明 <span class="keys">const product</span>，甚至是一个解构 <span class="keys">const [index，product]</span>。</p>
                <p>因此，<span class="keys">for...of</span> 的语法支持实现迭代项的解构。</p>
                <p>让我们遍历一个对象数组，提取每个对象的 <span class="keys">name</span> 属性：</p>
                <pre>
                    <code>
                        const persons = [
                            {name: 'Jhon Smith'},
                            {name: 'Jane Doe'}
                        ]
                        for(const {name} of persons) {
                            console.log(name)
                        }
                    </code>
                </pre>
            </el-collapse-item>
            <el-collapse-item title="NO2、类数组迭代" name="2">
                <p>
                    <span class="keys">for...of</span> 可以用于迭代类数组对象。<span class="keys">arguments</span> 是函数体内的特殊变量，包含函数的所有参数，这是一个经典的类数组对象。
                </p>
                <p>让我们写一个求和函数 sum(num1, num2, ..., numN)：</p>
                <pre>
                    <code>
                        function sum() {
                            var sum = 0
                            for(const number of arguments) {
                                sum += number
                            }
                            return sum
                        }
                        sum(1, 2, 3)
                    </code>
                </pre>
                <p>在每次迭代中，<span class="keys">for...of</span> 循环遍历类数组 <span class="keys">arguments</span> 中的每一个数，并计算总和。</p>
            </el-collapse-item>
            <el-collapse-item title="NO3、快速了解可迭代" name="3">
                <p>什么是可迭代对象？它是支持可迭代协议的对象。</p>
                <p>我们可以通过查看 <span class="keys">Symbol.iterator</span> 方法来确定某个数据是否可迭代。例如，下面的例子显示了数组是可迭代的：</p>
                <pre>
                    <code>
                        const array = [1, 2, 3]
                        const iterator1 = array[Symbol.iterator]()
                        iterator1.next() // => { value: 1, done: false }
                    </code>
                </pre>
                <p><span class="keys">for...of</span> 接受可迭代对象。这很棒，因为现在你可以遍历<span class="keys">string</span>、<span class="keys">数组</span>、<span class="keys">类数组</span>、<span class="keys">set</span>、<span class="keys">map</span>，同时仍可以享受 <span class="keys">for...of</span> 的简洁。</p>
            </el-collapse-item>
            <el-collapse-item title="NO4、字符串迭代" name="4">
                <p><span class="keys">JavaScript</span> 的基础类型 <span class="keys">string</span> 是可迭代的。因此，可以轻松地遍历字符串的字符。</p>
                <pre>
                    <code>
                        const message = 'hello'
                        for(const character of message) {
                            console.log(character)
                        } // h e l l o
                    </code>
                </pre>
                <p><span class="keys">message</span> 是一个字符串。由于字符串可迭代的，因此 <span class="keys">for...of</span> 循环遍历 <span class="keys">message</span> 。</p>
            </el-collapse-item>
            <el-collapse-item title="NO5、Map 和 Set 迭代" name="5">
                <p><span class="keys">Map</span> 是一个特殊的对象，将键与值相关联。键可以是任何基本类型（通常是 <span class="keys">string</span>，但可以是 <span class="keys">number</span> 等）。</p>
                <p>
                    幸运的是，<span class="keys">Map</span> 也是可迭代的（在键/值对上进行迭代），并且 <span class="keys">for...of</span> 可以轻松地循环迭代所有键/值对。
                </p>
                <pre>
                    <code>
                        const names = new Map()
                        names.set(1, 'one')
                        names.set(2, 'two')

                        for(const [number, name] of names) {
                            console.log(number, name)
                        }
                    </code>
                </pre>
                <p><span class="keys">for (const [number, name] of names)</span> 迭代 <span class="keys">names</span> 的键值对。</p>
                <p>在每个循环中，迭代器都会返回一个数组 <span class="keys">[key，value]</span> ，并使用 <span class="keys">const [number，name]</span> 立即对这对数组进行解构。</p>
                <p>以相同的方式可以遍历 <span class="keys">Set</span> 的项</p>
                <pre>
                    <code>
                        const colors = new Set(['white, red, bule, white'])
                        for(color of colors) {
                            console.log(color)
                        }
                    </code>
                </pre>
            </el-collapse-item>
            <el-collapse-item title="NO6、迭代普通的JavaScript对象" name="6">
                <p>
                    尝试遍历普通JS对象的属性/值总是很痛苦。过去，我通常使用 <span class="keys">Object.keys()</span> 获取对象的键，然后使用 <span class="keys">forEach</span> 来迭代键数组。
                    【译者：这不代表本人观点，我比较喜欢用 <span class="keys">for...in</span> 遍历对象，不过要注意 <span class="keys">for...in</span> 的副作用】
                </p>
                <pre>
                    <code>
                        const person = {
                            name: 'John Smith',
                            job: 'agent'
                        }
                        Object.keys(person).forEach(prop => {
                            console.log(prop, person[prop])
                        })
                    </code>
                </pre>
                <p>
                    新的 <span class="keys">Object.keys()</span> 函数与 <span class="keys">for...of</span> 组合使用是个不错的选择：
                </p>
                <pre>
                    <code>
                        const person = {
                            name: 'John Smith',
                            job: 'agent'
                        }
                        for(const [prop, value] of Object.entries(person)) {
                            console.log(prop, value)
                        }
                    </code>
                </pre>
                <p>
                    Object.entries(person) 返回一个键和值的元组数组：
                    [[''name'，'John Smith']，['job'，'agent']]。然后，使用 for...of 循环遍历数组，并将每个元组解构为 const [prop，value]。
                </p>
            </el-collapse-item>
            <el-collapse-item title="NO7、遍历DOM集合" name="7">
                <p>
                    你可能知道 <span class="keys">HTMLCollection</span> 令人沮丧。主要是因为 <span class="keys">HTMLCollection</span> 是一个类数组的对象（而不是常规数组），所以我们无法使用数组的方法。
                </p>
                <p>
                    例如，每个 <span class="keys">DOM</span> 元素的 <span class="keys">children</span> 属性都是 <span class="keys">HTMLCollection</span> 。
                    好在 <span class="keys">for...of</span> 可以在类似数组的对象上进行迭代，因此我们可以轻松地迭代 <span class="keys">children</span>
                </p>
                <pre>
                    <code>
                        var children = document.body.children
                        for(const child of children) {
                            console.log(child)
                        }
                    </code>
                </pre>
                <p>
                    此外，<span class="keys">for...of</span> 可以迭代 <span class="keys">NodeList</span> 集合（可迭代）。例如，函数 <span class="keys">document.querySelectorAll(query)</span> 返回一个 <span class="keys">NodeList</span>
                </p>
                <pre>
                    <code>
                        const allImages = document.querySelectorAll('img')
                        // ES5
                        Array.prototype.forEach().call(allImages, item => {
                            console.log(item)
                        })
                        // for...of
                        for(const img of allImages) {
                            console.log(img)
                        }
                    </code>
                </pre>
                <p>
                    如果你想遍历 <span class="keys">DOM</span> 中的不同种类的集合，那么 <span class="keys">for...of</span> 语句是一个不错的选择。
                </p>
            </el-collapse-item>
            <el-collapse-item title="NO8、性能"  name="8">
                <p>迭代大型数组时，<span class="keys">for...of</span> 的执行速度可能会比经典方法慢：</p>
                <pre>
                    <code>
                        const a = [/* big array */];
                        for (let i = 0; i &lt; a.length; i++) {
                            console.log(a[i]);
                        }
                    </code>
                </pre>
                <p>在每次迭代中调用迭代器比通过增加索引访问的开销更大。但是，这种细微差别在使用大型数组的应用程序中以及性能至关重要的应用程序中非常重要，不过这种情况很少发生。</p>
            </el-collapse-item>
            <el-collapse-item title="NO9、总结" name="9">
                <p><span class="keys">for...of</span>简明扼要</p>
                <p>它接受迭代器，包括数组，字符串，<span class="keys">Set</span>，<span class="keys">Map</span>，<span class="keys">DOM</span>集合</p>
                <p><span class="keys">for...of</span> 接受类数组对象</p>
                <p>迭代的项目可以在就地解构</p>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name: 'Iterator',
    data() {
        return {
            activeNames: ['1']
        }
    }
}
</script>

<style>
.iterator-container{padding:0 20px;}
p{padding:10px 20px;line-height:1.8em;font-size:16px;}
p a{color:#0366d6;text-decoration:underline;}
p .keys{color:#ff502c;}
</style>