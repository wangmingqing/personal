<template>
  <div>
    <Header @preview="preview" @download="download" @save="save"/>
    <AsideLeft/>
    <div class="html-container">
      <div class="poster-container">
        <div class="player text">这是一个神奇的国度</div>
      </div>
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
      container: null,
      containerWidth: 0,
      containerHeight: 0,
      percent: '100%',
      zoom: 1
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // header组件方法
    preview() {
      console.log('preview')
    },
    download() {
      console.log('download')
    },
    save() {
      console.log('save')
    },

    // 本页方法
    init() {
      this.container = document.querySelector('.poster-container')
      this.setBackgroundImage(require('../../assets/ning1.jpg'))
      this.container.onmousewheel = event => {
        this.zoom = (event.deltaY > 0 ? -0.1 : 0.1) + this.zoom
        this.zoom = Math.min(this.zoom, 3) //设置缩放比最大为3倍
        this.zoom = Math.max(0.1, this.zoom) // 设置缩放比最大为0.1倍
        this.setContainerZoom(this.zoom)
      }
    },
    setBackgroundImage(url) {
      var img = document.createElement('img')
      img.src = url
      img.onload = () => {
        this.containerWidth = img.width
        this.containerHeight = img.height
        this.container.style.width = img.width + 'px'
        this.container.style.height = img.height + 'px'
        this.container.style.backgroundImage = `url(${url})`
      }
    },
    setContainerZoom(zoom) {
      this.container.style.transform = `translate(-50%, -50%) scale(${zoom})`
      this.container.style.webkitTransform = `translate(-50%, -50%) scale(${zoom})`
      this.percent = Math.floor(this.zoom * 100) + '%'
    },
    plus() {
      if(this.zoom + 0.05 > 3) {
        this.zoom = 3
      } else {
        this.zoom += 0.05
      }
      this.setContainerZoom(this.zoom)
    },
    minus() {
      if(this.zoom - 0.05 < 0.1) {
        this.zoom = 0.1
      } else {
        this.zoom -= 0.05
      }
      this.setContainerZoom(this.zoom)
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


.html-container{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}
.poster-container{
  width:0;
  height:0;
  margin: 0 auto;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>