<template>
  <div style="height:100%;">
    <Header
      :undoStatus="config.undoStatus"
      :redoStatus="config.redoStatus"
      @preview="preview"
      @download="download"
      @save="save"
      @undo="undo" 
      @redo="redo"/>
    <AsideLeft
      @setFont="setFont"
      @setBackgroundImage="setBackgroundImage"
      @selectMaterialImage="selectMaterialImage"
      :canvasWidth="containerWidth"
      :canvasHeight="containerHeight"
    />
    <div class="fabric-container" :style="opened?'padding-left: 360px;':'padding-left: 80px;'">
      <div class="container">
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>
    </div>
    <AsideRight
      :designType="designType"
      @setFontFamily="setFontFamily"
      @setFontSize="setFontSize"
      @setFontColor="setFontColor"
      @setFontEditor="setFontEditor"
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
import { fabric } from 'fabric'
import Header from './components/Header.vue'
import AsideLeft from './components/AsideLeft.vue'
import AsideRight from './components/AsideRight.vue'
export default {
  name: 'fabric',
  components: {
    Header,
    AsideLeft,
    AsideRight
  },
  data() {
    return {
      canvas: null,
      canvasWidth: 750,
      canvasHeight: 0,
      containerWidth: 0,
      containerHeight: 0,
      designType: '', // 设置类型 默认空  text设置文本 image设置图片
      previewImageDialog: false, // 预览图片窗口开关
      previewImage: '', // 预览图片地址

      percent: '100%',
      zoom: 1,

      isRedoing: false,
      undoRedoArr: [],
      // 撤销恢复相关操作状态配置表
      config: {
        isInitialStatus: true, // 是否是初始状态
        canvasState: [], // 存储各状态的json数据
        currentStateIndex: -1,
        undoStatus: false, // 撤销
        redoStatus: false, // 恢复
        undoFinishedStatus: 1,// 撤销中的状态
        redoFinishedStatus: 1,// 恢复中的状态
        undoBtnStatus:false,// 撤销按钮可点击状态
        redoBtnStatus: false, // 恢复按钮可点击状态
        isStart: true
      }
    }
  },
  computed: {
    opened() {
      this.$nextTick(() => {
        this.setCanvasSize()
      })
      return this.$store.state.opened
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.canvas = new fabric.Canvas('canvas')
      if(localStorage.getItem('image')) {
        this.setCanvasSize()
        var data = JSON.parse(localStorage.getItem('image'))
        if(data.backgroundImage) {
          this.containerWidth = data.backgroundImage.width * data.backgroundImage.scaleX
          this.containerHeight = data.backgroundImage.height * data.backgroundImage.scaleY
        }
        this.exchangeToFromJSON(localStorage.getItem('image'))
      } else {
        this.setBackgroundImage(require('../../assets/ning1.jpg'))
      }
      // 添加点击事件
      this.canvas.on('mouse:down', e => {
        if(!e.target) {
          this.designType = ''
          this.canvas.selection = false
          return false
        }
        if(e.target.type === 'textbox') {
          this.designType = 'text'
        }
        if(e.target.type === 'image') {
          this.designType = 'image'
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
        this.zoom = (data.e.deltaY > 0 ? -0.1 : 0.1) + this.canvas.getZoom()
        this.zoom = Math.max(0.1, this.zoom) // 最小为原来的1/10
        this.zoom = Math.min(3, this.zoom) // 最大为原来的3倍
        this.percent = Math.floor(this.zoom * 100) + '%'
        this.setCanvasZoom(this.zoom)
      })
      // 监听添加图层
      this.canvas.on('object:added', () => {
        if(this.config.isStart) this.updateCanvasState()
      })
      // 监听更新图层
      this.canvas.on('object:modified', () => {
        if(this.config.isStart) this.updateCanvasState()
      })
      // 监听移除图层
      this.canvas.on('object:removed', () => {
        this.updateCanvasState()
      })
      // 监听旋转图层
      this.canvas.on('object:rotate', () => {
        this.updateCanvasState()
      })
      window.onresize = () => {
        this.setCanvasSize()
      }
    },
    setBackgroundImage(url) {
      this.setCanvasSize()
      var img = document.createElement('img')
      img.src = url
      img.onload = () => {
        // this.containerWidth = img.width || 750
        // this.containerHeight = img.height
        this.containerHeight = this.canvasHeight * 0.8
        this.containerWidth = this.containerHeight * img.width / img.height
        this.zoom = this.containerHeight / img.height
        this.setCanvasZoom(this.zoom)
        fabric.Image.fromURL(url, (img) => {
          // 设置背景
          this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
            left: this.canvasWidth / 2 - this.containerWidth / 2,
            top: this.canvasHeight / 2 - this.containerHeight / 2
          })
        })
      }
    },
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
    setCanvasSize() {
      var container = document.querySelector('.fabric-container .container')
      this.canvasWidth = container.clientWidth
      this.canvasHeight = container.clientHeight
      this.canvas.setWidth(this.canvasWidth)
      this.canvas.setHeight(this.canvasHeight)
    },
    setCanvasZoom(zoom) {
      this.percent = Math.floor(this.zoom * 100) + '%'
      var zoomPoint = new fabric.Point(this.canvasWidth / 2, this.canvasHeight / 2) // 获取当前事件触发点的坐标
      this.canvas.zoomToPoint(zoomPoint, zoom) //设置此画布实例的缩放级别，缩放以点为中心，这意味着后续缩放到具有相同点的点将具有源自该点的缩放的视觉效果。它与视口的画布中心或视觉中心无关。
    },
    selectMaterialImage(url) {
      this.setImage(url)
    },
    setImage(url) {
      fabric.Image.fromURL(url, img => {
        this.canvas.add(img).setActiveObject(img)
      })
    },
    setFont(data) {
      this.updateCanvasState()
      // 获取绘制文字参数
      var textbox = new fabric.Textbox(data.text, data)
      // setActiveObject 选中当前元素
      this.canvas.add(textbox).setActiveObject(textbox)
    },
    setFontFamily(fontFamily) {
      // 设置字体
      var currentFontPlayer = JSON.parse(JSON.stringify(this.canvas.getActiveObject()))
      this.canvas.remove(this.canvas.getActiveObject())
      currentFontPlayer.fontFamily = fontFamily
      this.setFont(currentFontPlayer)
    },
    setFontSize(size) {
      // 设置字号
      var currentFontPlayer = JSON.parse(JSON.stringify(this.canvas.getActiveObject()))
      this.canvas.remove(this.canvas.getActiveObject())
      currentFontPlayer.fontSize = size
      this.setFont(currentFontPlayer)
    },
    setFontColor(color) {
      // 设置文本颜色
      var currentFontPlayer = JSON.parse(JSON.stringify(this.canvas.getActiveObject()))
      this.canvas.remove(this.canvas.getActiveObject())
      currentFontPlayer.fill = color
      this.setFont(currentFontPlayer)
    },
    setFontEditor(type) {
      // 设置文本样式
      var currentFontPlayer = JSON.parse(JSON.stringify(this.canvas.getActiveObject()))
      this.canvas.remove(this.canvas.getActiveObject())
      if(type === 'bold') {
        currentFontPlayer.fontWeight = type
      }
      if(type === 'italic') {
        currentFontPlayer.fontStyle = type
      }
      if(type === 'underline') {
        currentFontPlayer.underline = type
      }
      if(type === 'left' || type === 'right' || type === 'center' || type === 'justify') {
        currentFontPlayer.textAlign = type
      }
      this.setFont(currentFontPlayer)
    },
    copyPlayer() {
      // 复制图层
      this.copy()
    },
    paste(_clipboard){
      // 粘贴图层
      this.updateCanvasState()
      let canvas = this.canvas;
      _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject()
        clonedObj.set({
          left: clonedObj.left,
          top: clonedObj.top,
          evented: true,
        })
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = canvas
          clonedObj.forEachObject(function(obj) {
            canvas.add(obj)
          })
          // this should solve the unselectability
          clonedObj.setCoords()
        } else {
          canvas.add(clonedObj)
        }
        _clipboard.top += 20;
        _clipboard.left += 20;
        canvas.setActiveObject(clonedObj)
      })
    },
    copy(){
      // 复制图层
      let canvas = this.canvas
      var _self = this;
      canvas.getActiveObject().clone(function(cloned){
        _self.paste(cloned)
      })
    }, 
    delPlayer() {
      // 删除图层
      this.canvas.remove(this.canvas.getActiveObject())
    },
    undo() {
      // 撤销
      if(this.config.undoFinishedStatus == 0) {
        this.config.undoStatus = false
      } else {
        if(this.config.canvasState.length >= 2) {
          this.config.undoFinishedStatus = 0
          this.config.undoStatus = true
          this.canvas.loadFromJSON(this.config.canvasState[this.config.currentStateIndex - 1],
          () => {
            this.canvas.renderAll()
            this.config.undoStatus = false
            this.config.currentStateIndex -= 1
            this.config.undoFinishedStatus = 1
            this.canvas.renderAll.bind(this.canvas)
          })
        }
      }
    },
    redo() {
      // 恢复
      if (this.config.redoFinishedStatus && 
          this.config.currentStateIndex < this.config.canvasState.length - 1 &&
          this.config.canvasState.length > this.config.currentStateIndex + 1 && 
          this.config.canvasState.length > 1
      ){
        this.config.redoFinishedStatus = 0;
        this.config.redoStatus = true;
        this.canvas.loadFromJSON(this.config.canvasState[this.config.currentStateIndex + 1],
        () => {
          this.canvas.renderAll();
          this.config.redoStatus = false
          this.config.currentStateIndex += 1
          this.config.redoFinishedStatus = 1
          this.canvas.renderAll.bind(this.canvas)
        })
      }
    },
    //记录每步操作,用户撤销和回退操作
    updateCanvasState () {
      let jsonData = this.canvas.toJSON()
      let canvasAsJson = JSON.stringify(jsonData)
      console.log(this.config.currentStateIndex)
      console.log(this.config.canvasState.length)
      if (this.config.currentStateIndex < this.config.canvasState.length - 1) {
        //恢复操作更新
        let oldData = JSON.parse(JSON.stringify(this.config.canvasState))
        this.config.canvasState = oldData.splice(0, this.config.currentStateIndex + 1)
        this.config.canvasState.push(canvasAsJson)
      } else {
        this.config.canvasState.push(canvasAsJson)
      }
      this.config.currentStateIndex = this.config.canvasState.length - 1
      this.updateUnRedoBtnStatus()
      if (this.config.currentStateIndex == this.config.canvasState.length - 1 && this.config.currentStateIndex == 0) return
      if (this.config.isInitialStatus){
        this.config.isInitialStatus=false
        this.updateInitialStatus(this.config.isInitialStatus)
      }
    },
    //更新撤销/回退的操作状态
    updateUnRedoBtnStatus() {
      //撤销按钮状态更新
      if (this.config.currentStateIndex <= 0) {
        this.config.undoBtnStatus = false
      } else {
        this.config.undoBtnStatus = true
      }
      // 恢复按钮状态更新
      if(this.config.canvasState.length > this.config.currentStateIndex + 1 && this.config.canvasState.length > 1) {
        this.config.redoBtnStatus = true
      } else {
        this.config.redoBtnStatus = false
      }
    },
    //更新是否是初始状态的状态
    updateInitialStatus(status){
      this.initialStatus=status
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
.fabric-container .container{width:100%;height:100%;}
>>> .canvas-container{margin:0 auto;}
canvas{
  display:block;
  margin:0 auto;
  background-image:#ccc;
}
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
