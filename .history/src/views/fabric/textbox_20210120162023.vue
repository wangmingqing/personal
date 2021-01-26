<template>
  <div style="height:100%;">
    <Header
      :undoBtnStatus="config.undoBtnStatus"
      :redoBtnStatus="config.redoBtnStatus"
      @preview="preview"
      @download="download"
      @save="save"
      @undo="undo" 
      @redo="redo"
      @reset="reset"
      @centerObjectH="centerObjectH"
      @centerObjectV="centerObjectV"/>
    <TextLeft @addFont="addFont"/>
    <div class="fabric-container" :style="opened?'padding-left: 360px;':'padding-left: 80px;'">
      <div class="container">
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>
    </div>
    <TextRight
      :currentObject="currentObject"
      @setFont="setFont"
      @copyPlayer="copyPlayer"
      @delPlayer="delPlayer"
    />
    <el-dialog
      title="预览图片"
      :visible.sync="previewImageDialog"
      width="80%"
      center>
      <el-row>
        <el-col :span="18" style="border-right:1px solid #eee;">
          <img :src="previewImage" alt="" style="display:block;width:375px;margin:0 auto">
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </el-dialog>
    <Footer @plus="plus" @minus="minus" :percent="percent"/>
  </div>
</template>
<script>
import { fabric } from 'fabric'
import Header from './components/Header.vue'
import TextLeft from './components/TextLeft.vue'
import TextRight from './components/TextRight.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'textbox',
  components: {
    Header,
    TextLeft,
    TextRight,
    Footer
  },
  data() {
    return {
      canvas: null,

      opened: true,
      canvasWidth: 400,
      canvasHeight: 400,
      percent: '100%',
      zoom: 1,

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

      // 右侧设置栏状态
      currentObject: null, // 当前编辑状态
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.canvas = new fabric.Canvas('canvas')
      this.canvas.on('mouse:down', event => {
        console.log(event.target && event.target.type)
        if(this.canvas.getActiveObject()) {
          this.canvas.setActiveObject(this.canvas.getActiveObject())
          this.customization(this.canvas.getActiveObject())
          this.currentObject = this.canvas.getActiveObject()
        } else {
          this.currentObject = null
        }
      })
      // 添加up事件
      this.canvas.on('mouse:up', () => {
        this.canvas.selection = true
      })
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
      // 监听添加图层
      this.canvas.on('object:added', () => {
        if(!this.config.undoFinishState) return false
        if(!this.config.redoFinishState) return false
        this.updateUndoCanvasState()
      })
      // 监听更新图层
      this.canvas.on('object:modified', () => {
        this.updateUndoCanvasState()
      })
      // 监听移除图层
      this.canvas.on('object:removed', () => {
        this.updateUndoCanvasState()
      })
      // 监听旋转图层
      this.canvas.on('object:rotate', () => {
        this.updateUndoCanvasState()
      })
      window.onresize = () => {
        console.log('onresize')
      }
    },
    // 画布操作
    plus() {
      if(this.zoom + 0.05 > 3) {
        this.zoom = 3
      } else {
        this.zoom += 0.05
      }
      this.setCanvasZoom(this.zoom)
    },
    minus() {
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
      // var zoomPoint = new fabric.Point(this.canvasWidth / 2, this.canvasHeight / 2) // 获取当前事件触发点的坐标
      // this.canvas.zoomToPoint(zoomPoint, zoom) //设置此画布实例的缩放级别，缩放以点为中心，这意味着后续缩放到具有相同点的点将具有源自该点的缩放的视觉效果。它与视口的画布中心或视觉中心无关。
      var container = document.querySelector('.fabric-container .container')
      container.style.transform = `scale(${zoom})`
    },

    // 左侧栏中的操作
    addFont(obj) {
      var text = new fabric.Textbox("Aa", obj.params)
      if(obj.style === 'gradient') {
        this.setGradient(text, 'linear', {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: text.get("height")
        },[{
            offset: 0, // value 0 - 1
            color: "#FFF9EB",
            opacity: 1
          },
          {
            offset: 1,
            color: "#E0BB65",
            opacity: 1
          }
        ])
      }
      this.centerObject(text)

      this.canvas.add(text)
      this.customization(text)
    },
    setFont(obj){
      // 设置文本
      if(!this.canvas.getActiveObject()) return false
      if(obj.type === 'gradient') {
        console.log(obj)
        this.setGradient(
          this.canvas.getActiveObject(), 
          obj.value.type,
          obj.value.coords,
          obj.value.colorStops
        )
      } else {
        this.canvas.getActiveObject().set({
          [obj.type]: obj.value
        })
      }
      this.canvas.renderAll()
    },
    setGradient(gradient, type, coords, colorStops) {
      gradient.set('fill', 
        new fabric.Gradient({
          type: type, // or "radial"
          coords:coords,
          colorStops: colorStops
        })
      )
    },
    customization(obj) {
      // 设置选区
      obj.set({
        borderColor: '#f25b4a', // 指定控件边框颜色
        cornerStyle: 'circle', // 指定控件样式 rect | circle
        cornerColor: '#f25b4a', // 指定控件 颜色
        cornerSize: 8, // 控件大小
        editingBorderColor: '#f25b4a', // 当文本处于编辑状态时的控件边框颜色
        transparentCorners: false
      })
      this.canvas.setActiveObject(obj)
    },
    centerObject(object) {
      // 图层相对于画布水平 垂直居中
      this.canvas.centerObject(object)
    },
    centerObjectH() {
      // 图层相对于画布水平居中
      this.canvas.centerObjectH(this.canvas.getActiveObject())
    },
    centerObjectV() {
      // 图层相对于画布垂直居中
      this.canvas.centerObjectV(this.canvas.getActiveObject())
    },
    // 右侧数据设置
    copyPlayer() {
      // 复制图层
      this.copy()
    },
    paste(clipboard){
      // 粘贴图层
      clipboard.clone(clonedObj => {
        this.canvas.discardActiveObject()
        clonedObj.set({
          left: clonedObj.left,
          top: clonedObj.top,
          evented: true,
        })
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = this.canvas
          clonedObj.forEachObject(obj => {
            this.canvas.add(obj)
          })
          // this should solve the unselectability
          clonedObj.setCoords()
        } else {
          this.canvas.add(clonedObj)
        }
        clipboard.top += 20;
        clipboard.left += 20;
        this.canvas.setActiveObject(clonedObj)
      })
    },
    copy(){
      // 复制图层
      if(!this.canvas.getActiveObject()) return false
      this.canvas.getActiveObject().clone(cloned => {
        this.paste(cloned)
      })
    }, 
    delPlayer() {
      // 删除图层
      this.canvas.remove(this.canvas.getActiveObject())
    },

    // header中的操作
    undo() {
      // 撤销
      this.config.undoFinishState = false
      var json = this.config.undoCanvasState.pop()
      this.config.redoCanvasState.push(json)
      this.canvas.loadFromJSON(json, () => {
        this.canvas.renderAll()
        this.config.undoFinishState = true
      })
      this.updateUnRedoBtnStatus()
    },
    redo() {
      // 恢复
      this.config.redoFinishState = false
      var json = this.config.redoCanvasState.pop()
      this.config.undoCanvasState.push(json)
      this.canvas.loadFromJSON(json, () => {
        this.canvas.renderAll()
        this.config.redoFinishState = true
      })
      this.updateUnRedoBtnStatus()
    },
    reset() {
      // 重置
      // this.config.resetFinishState = false
      // this.config.undoCanvasState = []
      // this.config.redoCanvasState = []
      // this.init()
      location.reload()
    },
    // 记录用户能够撤销的数组
    updateUndoCanvasState () {
      this.config.undoCanvasState.push(JSON.stringify(this.canvas.toJSON()))
      this.updateUnRedoBtnStatus()
    },
    //更新撤销/回退的操作状态
    updateUnRedoBtnStatus() {
      //撤销按钮状态更新
      this.config.undoCanvasState.length > 0 ? this.$set(this.config, 'undoBtnStatus', true) : this.$set(this.config, 'undoBtnStatus', false)
      // 恢复按钮状态更新
      this.config.redoCanvasState.length > 0 ? this.$set(this.config, 'redoBtnStatus', true) : this.$set(this.config, 'redoBtnStatus', false)
    },
    preview() {
      // 预览
      this.setCanvasZoom(1)
      this.previewImageDialog = true
      this.previewImage = this.canvas.toDataURL('image/jpg')
    },
    download() {
      // 下载
      this.setCanvasZoom(1)
      var type = 'jpg'
      var imgURL = this.canvas.toDataURL('image/jpg')
      var link = document.createElement('a')
      var filename = 'download.' + type
      link.download = filename
      link.href = imgURL
      link.dataset.downloadurl = ['image/jpg', link.download, link.href].join(':')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    save(){
      // 保存
      this.exchangeToJSON()
    },
    exchangeToJSON() {
      // 序列化
      localStorage.setItem('image', JSON.stringify(this.canvas.toJSON()))
    },
    exchangeToFromJSON(json) {
      // 反序列化
      this.canvas.loadFromJSON(json)
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