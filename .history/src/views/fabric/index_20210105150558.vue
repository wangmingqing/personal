<template>
  <div>
    <Header @preview="preview" @download="download" @save="save"/>
    <AsideLeft
      @setFont="setFont"
      @setBackgroundImage="setBackgroundImage"
      @selectMaterialImage="selectMaterialImage"
      :canvasWidth="canvasWidth"
    />
    <div class="fabric-container">
      <div class="container">
        <canvas id="canvas"></canvas>
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
      designType: '', // 设置类型 默认空  text设置文本 image设置图片
      previewImageDialog: false, // 预览图片窗口开关
      previewImage: '', // 预览图片地址

      canvasSelection: false, // 是否允许选择canvas控件 默认true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      localStorage.removeItem('image')
      this.canvas = new fabric.Canvas('canvas')
      if(localStorage.getItem('image')) {
        var data = JSON.parse(localStorage.getItem('image'))
        if(data.backgroundImage) {
          this.canvasWidth = data.backgroundImage.width * data.backgroundImage.scaleX
          this.canvasHeight = data.backgroundImage.height * data.backgroundImage.scaleY
          this.canvas.setWidth(data.backgroundImage.width * 3)
          this.canvas.setHeight(data.backgroundImage.height * 3)
        }
        this.exchangeToFromJSON(localStorage.getItem('image'))
      } else {
        this.setBackgroundImage(require('../../assets/ning1.jpg'))
      }
      // 添加点击事件
      this.canvas.on('mouse:down', e => {
        if(!e.target) {
          this.designType = ''
          this.canvasSelection = false
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
      // 添加move事件
      // this.canvas.on('mouse:move', data => {
      //   console.log(data)
      //   if(this.canvasSelection) {
      //     var delta = new fabric.Point(data.e.movementX, data.e.movementY)
      //     console.log(delta)
      //     this.canvas.relativePan(delta)
      //   }
      // })
      // 添加up事件
      this.canvas.on('mouse:up', () => {
        this.canvasSelection = true
        this.canvas.selection = true
      })
      // 添加滚轮事件
      this.canvas.on('mouse:wheel', data => {
        // data.e.deltaY大于0滚轮向下 data.e.deltaY小于0滚轮向上
        // this.canvas.getZoom() 获取当前画布缩放比例
        var zoom = (data.e.deltaY > 0 ? -0.1 : 0.1) + this.canvas.getZoom()
        zoom = Math.max(0.1, zoom) // 最小为原来的1/10
        zoom = Math.min(3, zoom) // 最大为原来的3倍
        var zoomPoint = new fabric.Point(data.e.pageX, data.e.pageY) // 获取当前事件触发点的坐标
        // this.canvas.setWidth(this.canvasWidth * zoom)
        // this.canvas.setHeight(this.canvasHeight * zoom)
        this.canvas.zoomToPoint(zoomPoint, zoom) //设置此画布实例的缩放级别，缩放以点为中心，这意味着后续缩放到具有相同点的点将具有源自该点的缩放的视觉效果。它与视口的画布中心或视觉中心无关。
      })
    },
    setBackgroundImage(url) {
      var img = document.createElement('img')
      img.src = url
      img.onload = () => {
        this.canvasWidth = img.width || 750
        this.canvasWidth = img.width
        this.canvasHeight = img.height
        this.canvas.setWidth(img.width * 3)
        this.canvas.setHeight(img.height * 3)
        fabric.Image.fromURL(url, (img) => {
          img.set({
            // 通过scale来设置图片大小，这里设置和画布一样大,
            left: (img.width * 3 / 2) + (img.width / 2),
            top: (img.height * 3 / 2) + (img.height / 2),
            scaleX: 1,
            scaleY: 1,
          })
          // 设置背景
          this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
          this.canvas.renderAll()
        })
      }
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
      // 获取绘制文字参数
      var textbox = new fabric.Textbox(data.text, data)
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
      let canvas = this.canvas;
      _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject()
        clonedObj.set({
            left: clonedObj.left + 20,
            top: clonedObj.top + 20,
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
    preview() {
      // 预览
      this.previewImageDialog = true
      this.previewImage = this.canvas.toDataURL('image/jpg')
    },
    download() {
      // 下载
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
.fabric-container .container{width:100%;overflow: hidden;padding-top:58px;}
>>> .canvas-container{margin:0 auto;}
canvas{
  display:block;
  margin:0 auto;
}
</style>
