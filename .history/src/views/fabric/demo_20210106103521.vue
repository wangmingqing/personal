<template>
  <div>
    <Header @preview="preview" @download="download" @save="save"/>
    <AsideLeft/>
    <div class="html-container">
      <div class="poster-container"></div>
    </div>
    <AsideRight/>
    <div class="canvas-footer clearfix">
      <div class="fr clearfix">
        <div class="name-box fl">
          <input type="text" value="这是一张图片">
          <a href="javascript:;">修改</a>
        </div>
        <div class="size-box fl">
          <i class="el-icon-remove" @click="minus"></i>
          <span>{{percent}}</span>
          <i class="el-icon-circle-plus" @click="plus"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from './demoComponents/Header.vue'
import AsideLeft from './demoComponents/AsideLeft.vue'
import AsideRight from './demoComponents/AsideRight.vue'
export default {
  name: 'html-poster',
  components: {
    Header,
    AsideLeft,
    AsideRight
  },
  data() {
    return {
      percent: '100%',
      zoom: 1
    }
  },
  methods: {
    preview() {
      console.log('preview')
    },
    download() {
      console.log('download')
    },
    save() {
      console.log('save')
    },
    plus() {
      if(this.zoom + 0.05 > 3) {
        this.zoom = 3
      } else {
        this.zoom += 0.05
      }
      this.percent = Math.floor(this.zoom * 100) + '%'
    },
    minus() {
      if(this.zoom - 0.05 < 0.1) {
        this.zoom = 0.1
      } else {
        this.zoom -= 0.05
      }
      this.percent = Math.floor(this.zoom * 100) + '%'
    }
  }
}
</script>
<style scoped>
.canvas-footer{
  position:fixed;
  bottom:20px;
  left:0;
  right:0;
  padding-right:300px;
}
.canvas-footer .name-box{
  padding:5px 20px;
  background-color:#fff;
  -webkit-box-shadow: 0 0 4px 0 rgba(0,0,0,.12);
  box-shadow: 0 0 4px 0 rgba(0,0,0,.12);
  background-color:#fff;
  margin-right:20px;
  border-radius: 14px;
  margin-top: 4px;
}
.canvas-footer .name-box input{border:none;outline:none;font-size: 12px;}
.canvas-footer .name-box a{
  display:inline-block;
  font-size: 12px;
  color: #409EFF;
  padding-left:10px;
}
.canvas-footer .size-box{
  line-height:40px;
  background-color:#fff;
  -webkit-box-shadow: 0 0 4px 0 rgba(0,0,0,.12);
  box-shadow: 0 0 4px 0 rgba(0,0,0,.12);
  background-color:#fff;
  padding:0 12px;
  border-radius: 4px;
}
.canvas-footer .size-box i{cursor:pointer;font-size:16px;}
.canvas-footer .size-box i:hover{color:#ff4555;}
.canvas-footer .size-box span{font-size:12px;width:50px;text-align:center;}
.canvas-footer .size-box i, 
.canvas-footer .size-box span{display:inline-block;padding: 0 5px;}
</style>