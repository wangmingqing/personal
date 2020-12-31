<template>
  <div class="container">
      <h2>{{message}}</h2>
      <p>安装koa</p>
      <pre>
          <code>
              npm install koa --save-dev
          </code>
      </pre>
      <p>创建一个脚手架</p>
      <pre>
          <code>
              npm install koa-generator -g
          </code>
      </pre>
      <p>生成项目，这里命名为HelloKoa2</p>
      <pre>
          <code>
              koa2 HelloKoa2
          </code>
      </pre>
      <p>进入文件夹并安装依赖</p>
      <pre>
          <code>
              cd HelloKoa2
              npm install
          </code>
      </pre>
      <p>启动</p>
      <pre>
          <code>
              npm run start
          </code>
      </pre>
      <p>
        参考文档：
        <a href="https://www.jianshu.com/p/7bcbead3064a" target="_blank">https://www.jianshu.com/p/7bcbead3064a</a>
      </p>
      <p>
        学习资料
        <a href="https://www.liaoxuefeng.com/wiki/1022910821149312/1099752344192192" target="_blank">https://www.liaoxuefeng.com/wiki/1022910821149312/1099752344192192</a>
      </p>
  </div>
</template>

<script>
import { test } from '@/api/test.js'
export default {
    name: "NodeAndKoa",
    data(){
        return{
            message: 'node 开发框架 koa 入门'
        }
    },
    created() {
        test().then(res => {
            return res
        })
    },
    methods: {

    }
}
</script>

<style>
.container{padding:20px;}
p{padding:10px 20px;line-height:1.8em;font-size:16px;}
p a{color:#0366d6;text-decoration:underline;}
</style>