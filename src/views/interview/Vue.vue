<template>
  <div class="vue-container">
      <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="NO1、Vue的 nextTick 原理" name="1">
            <p>
                <span class="keys">nextTick</span> 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-61" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-61</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO2、Vue的生命周期" name="2">
            <p>
                生命周期函数就是组件在初始化或者数据更新时会触发的钩子函数。
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-62" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-62</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO3、Vue 双向绑定" name="3">
            <p>
                在初始化 data props 时，递归对象，给每一个属性双向绑定，对于数组而言，会拿到原型重写函数，实现手动派发更新。因为函数不能监听到数据的变动，和 proxy 比较一下。
            </p>
            <p>
                除了以上数组函数，通过索引改变数组数据或者给对象添加新属性也不能触发，需要使用自带的set 函数，这个函数内部也是手动派发更新
            </p>
            <p>
                在组件挂载时，会实例化渲染观察者，传入组件更新的回调。在实例化过程中，会对模板中的值对象进行求值，触发依赖收集。在触发依赖之前，会保存当前的渲染观察者，用于组件含有子组件的时候，恢复父组件的观察者。触发依赖收集后，会清理掉不需要的依赖，性能优化，防止不需要的地方去重复渲染。
            </p>
            <p>
                改变值会触发依赖更新，会将收集到的所有依赖全部拿出来，放入 nextTick 中统一执行。执行过程中，会先对观察者进行排序，渲染的最后执行。先执行 beforeupdate 钩子函数，然后执行观察者的回调。在执行回调的过程中，可能 watch 会再次 push 进来，因为存在在回调中再次赋值，判断无限循环。
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-63" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-63</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO4、v-model原理" name="4">
            <p>
                v:model 在模板编译的时候转换代码
            </p>
            <p>
                v-model 本质是 :value 和 v-on，但是略微有点区别。在输入控件下，有两个事件监听，输入中文时只有当输出中文才触发数据赋值
            </p>
            <p>
                v-model 和:bind 同时使用，前者优先级更高，如果 :value 会出现冲突
            </p>
            <p>
                v-model 因为语法糖的原因，还可以用于父子通信
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-64" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-64</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO5、watch 和 computed 的区别和运用的场景" name="5">
            <p>
                前者是计算属性，依赖其他属性计算值。并且 computer 的值有缓存，只有当计算值变化才变化触发渲染。后者监听到值得变化就会执行回调
            </p>
            <p>
                computer 就是简单计算一下，适用于渲染页面。watch 适合做一些复杂业务逻辑
            </p>
            <p>
                前者有依赖两个 watcher，computer watcher 和渲染 watcher。判断计算出的值变化后渲染 watcher 派发更新触发渲染
            </p>
             <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-65" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-65</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO6、Vue 的父子通信" name="6">
            <p>
                使用 v-model 实现父传子，子传父。因为 v-model 默认解析成 :value 和 :input
            </p>
            <p>父传子</p>
            <p>子传父</p>
            <p>平行组件</p>
            <p>利用Vuex改变值</p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-66" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-66</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO7、路由原理" name="7">
            <p>
                前端路由实现起来其实很简单，本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新。目前单页面使用的路由就只有两种实现方式
            </p>
            <pre>
                hash 模式
                history 模式
            </pre>
            <p>
                <img src="../../assets/hash.png" alt="">
                <img src="../../assets/history.png" alt="">
            </p>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-67" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-67</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO8、MVVM" name="8">
            <p>MVVM 由以下三个内容组成</p>
            <pre>
                View：界面
                Model：数据模型
                ViewModel：作为桥梁负责沟通 View 和 Model
            </pre>
            <p>
                来源：
                <a href="https://juejin.im/post/5ba34e54e51d450e5162789b#heading-68" target="_blank">https://juejin.im/post/5ba34e54e51d450e5162789b#heading-68</a>
            </p>
        </el-collapse-item>
        <el-collapse-item title="NO9、vue组件的data为什么是函数" name="9">
            <p>
               防止组件在重复使用时，数据互相干扰，使用函数将产生新作用域，所以同一个组件在不同位置被使用时，不适用同一份数据
            </p>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
export default {
    name: "Vue",
    data() {
        return {
            activeNames: [ '1' ]
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
.vue-container{padding:0 20px;}
.el-collapse-item p{padding:10px 20px;line-height:1.8em;font-size:16px;}
.el-collapse-item p a{color:#0366d6;text-decoration:underline;}
.el-collapse-item p .keys{color:#ff502c;}
</style>