<template>
  <div class="html-container">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="NO1、src和href的区别" name="1">
            <p>href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系。</p>
            <p>src表示引用资源，表示替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。</p>
            <p>src是source的缩写，是指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；在请求src资源时会将其指向的资源下载并应用到当前文档中，例如js脚本，img图片和frame等元素。</p>
            <pre>
                <code>
                    &lt;script src="javascript.js"&gt;&lt;/script&gt;
                </code>
            </pre>
            <p>当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直至将该资源加载，编译，执行完毕，图片和框架等元素也是如此，类似于该元素所指向的资源嵌套如当前标签内，这也是为什么要把js饭再底部而不是头部。</p>
            <p>来源 <a href="https://blog.csdn.net/binlety/article/details/81448195" target="_blank">https://blog.csdn.net/binlety/article/details/81448195</a></p>
        </el-collapse-item>
        <el-collapse-item title="NO2、一个iframe，内嵌了一个A页面，iframe的宽高不停变化，如何让A页面的宽高实时自适应这个iframe的宽高大小。请说出至少3种方法，越难越好" name="2">
          <p>来源： <a href="https://juejin.im/post/5cd82463518825692330d440#heading-8" target="_blank">https://juejin.im/post/5cd82463518825692330d440#heading-8</a></p>
        </el-collapse-item>
        <el-collapse-item title="NO2、import和link的区别" name="3">
          <p>从属关系、加载顺序、兼容性以及DOM可控性</p>
          <p>来源： <a href="https://juejin.im/post/5ab36d99f265da23866fccd1" target="_blank">https://juejin.im/post/5ab36d99f265da23866fccd1</a></p>
        </el-collapse-item>
        <el-collapse-item title="NO4、说说常用的meta标签" name="4">
          <p>来源： <a href="https://juejin.im/post/5b94d8965188255c5a0cdc02#heading-4" target="_blank">https://juejin.im/post/5b94d8965188255c5a0cdc02#heading-4</a></p>
        </el-collapse-item>
        <el-collapse-item title="NO5、说说对html语义化的理解" name="5">
          <p>来源： <a href="https://juejin.im/post/5b94d8965188255c5a0cdc02#heading-3" target="_blank">https://juejin.im/post/5b94d8965188255c5a0cdc02#heading-3</a></p>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'Html5',
  data(){
    return {
      activeNames: ['1'],
      message: 'hello html5'
    }
  }
}
</script>

<style>
.html-container{padding:0 20px;}
.el-collapse-item p{padding:10px 20px;line-height:1.8em;font-size:16px;}
.el-collapse-item p a{color:#0366d6;text-decoration:underline;}
</style>