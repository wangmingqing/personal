<template>
  <div style="height:100%">
    <Header
      :undoBtnStatus="config.undoBtnStatus"
      :redoBtnStatus="config.redoBtnStatus"/>
    <GroupLeft @newDesign="newDesign"/>
    <div class="fabric-container" :style="opened?'padding-left: 360px;':'padding-left: 80px;'">
      <div class="container">
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>
    </div>
    <Footer @plus="plus" @minus="minus" :percent="percent"/>
  </div>
</template>
<script>
  import { fabric } from 'fabric'
  import Header from './components/GroupHeader.vue'
  import GroupLeft from './components/GroupLeft.vue'
  import Footer from './components/Footer.vue'
  export default {
    name: 'group',
    components: { Header, GroupLeft, Footer },
    data() {
      return {
        canvas: null,
        canvasWidth: 0, // 设置canvas宽度
        canvasHeight: 0,// 设置canvas高度

        // footer
        percent: '100%', // 画布缩放百分比
        zoom: 1, // 缩放变量  用于scale

        opened: true,


        // 撤销恢复相关操作状态配置表
        config: {
          undoCanvasState: [],
          redoCanvasState: [],
          undoFinishState: true, // 撤销完成状态 防止触发added事件
          redoFinishState: true, // 恢复完成状态 防止触发added事件
          resetFinishState: true, // 重置完成状态 防止触发added事件
          undoBtnStatus:false,// 撤销按钮可点击状态
          redoBtnStatus: false, // 恢复按钮可点击状态
        },
        previewImageDialog: false, // 预览dialog的开关
        previewImage: '', // 预览图片地址

        currentObject: null, // 当前操作对象 默认null
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.canvas = new fabric.Canvas('canvas')
        this.setCanvasSize(400, 400)
        // 添加滚轮事件
        this.canvas.on('mouse:wheel', data => {
          // data.e.deltaY大于0滚轮向下 data.e.deltaY小于0滚轮向上
          // this.canvas.getZoom() 获取当前画布缩放比例
          this.zoom = (data.e.deltaY > 0 ? -0.1 : 0.1) + this.zoom
          this.zoom = Math.max(0.1, this.zoom) // 最小为原来的1/10
          this.zoom = Math.min(3, this.zoom) // 最大为原来的3倍
          this.percent = Math.floor(this.zoom * 100) + '%'
          this.setCanvasZoom(this.zoom)
        })
      },
      // 画布操作
      plus() {
        // 画布放大
        if(this.zoom + 0.05 > 3) {
          this.zoom = 3
        } else {
          this.zoom += 0.05
        }
        this.setCanvasZoom(this.zoom)
      },
      minus() {
        // 画布缩小
        if(this.zoom - 0.05 < 0.1) {
          this.zoom = 0.1
        } else {
          this.zoom -= 0.05
        }
        this.setCanvasZoom(this.zoom)
      },
      setCanvasSize(width, height) {
        this.canvas.setWidth(width)
        this.canvas.setHeight(height)
      },
      setCanvasZoom(zoom) {
        this.percent = Math.floor(zoom * 100) + '%'
        var container = document.querySelector('.fabric-container .container')
        container.style.transform = `scale(${zoom})`
      },
      newDesign(width, height) {
        this.setCanvasSize(width, height)
      }
    }
  }
</script>
<style scoped>
.fabric-container{
  height:100%;
  overflow:hidden;
  padding-right:280px;
  padding-top:58px;
}
.fabric-container .container{width:100%;height:100%;position:relative;}
>>> .canvas-container{
  margin:0 auto;
  position: absolute;
  top: 50%;
  left:0;
  transform: translateY(-50%)
}
canvas{
  display:block;
  margin:0 auto;
  box-shadow: 0 0 5px #ccc;
}
</style>