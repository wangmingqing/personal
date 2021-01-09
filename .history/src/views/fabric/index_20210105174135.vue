<template>
  <div>
    <Header @preview="preview" @download="download" @save="save"/>
    <AsideLeft
      @setFont="setFont"
      @setBackgroundImage="setBackgroundImage"
      @selectMaterialImage="selectMaterialImage"
      :canvasWidth="canvasWidth"
      :canvasHeight="canvasHeight"
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
      designType: '', // 设置类型 默认空  text设置文本 image设置图片
      previewImageDialog: false, // 预览图片窗口开关
      previewImage: '', // 预览图片地址

      canvasSelection: true, // 是否允许选择canvas控件 默认true
      percent: '100%',
      zoom: 1
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
          this.setCanvasSize(data.backgroundImage.width * data.backgroundImage.scaleX, data.backgroundImage.height * data.backgroundImage.scaleY)
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
      this.canvas.on('mouse:move', data => {
        if(!this.canvasSelection) {
          var delta = new fabric.Point(data.e.movementX, data.e.movementY)
          this.canvas.relativePan(delta)
        }
      })
      // 添加up事件
      this.canvas.on('mouse:up', () => {
        this.canvasSelection = true
        this.canvas.selection = true
      })
      // 添加滚轮事件
      this.canvas.on('mouse:wheel', data => {
        // data.e.deltaY大于0滚轮向下 data.e.deltaY小于0滚轮向上
        // this.canvas.getZoom() 获取当前画布缩放比例
        this.zoom = (data.e.deltaY > 0 ? -0.1 : 0.1) + this.canvas.getZoom()
        this.zoom = Math.max(0.1, this.zoom) // 最小为原来的1/10
        this.zoom = Math.min(3, this.zoom) // 最大为原来的3倍
        // this.setCanvasSize(this.canvasWidth * zoom, this.canvasHeight * zoom)
        this.percent = Math.floor(this.zoom * 100) + '%'
        this.setCanvasZoom(this.zoom)
      })
    },
    setBackgroundImage(url) {
      var img = document.createElement('img')
      img.src = url
      img.onload = () => {
        this.canvasWidth = img.width || 750
        this.canvasHeight = img.height
        this.setCanvasSize(img.width, img.height)
        fabric.Image.fromURL(url, (img) => {
          img.set({
            // 通过scale来设置图片大小，这里设置和画布一样大,
            scaleX: 1,
            scaleY: 1,
          })
          // 设置背景
          this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
          this.canvas.renderAll()
        })
      }
    },
    plus() {
      if(this.zoom + 0.05 > 3) {
        this.zoom = 3
      } else {
        this.zoom += 0.05
      }
      this.percent = Math.floor(this.zoom * 100) + '%'
      this.setCanvasZoom(this.zoom)
    },
    minus() {
      if(this.zoom - 0.05 < 0.1) {
        this.zoom = 0.1
      } else {
        this.zoom -= 0.05
      }
      this.percent = Math.floor(this.zoom * 100) + '%'
      this.setCanvasZoom(this.zoom)
    },
    setCanvasSize(width, height) {
      this.canvas.setWidth(width)
      this.canvas.setHeight(height)
    },
    setCanvasZoom(zoom) {
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
.fabric-container .container{width:100%;overflow: hidden;padding-top:88px;}
>>> .canvas-container{margin:0 auto;}
canvas{
  display:block;
  margin:0 auto;
  background-image: url("data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkMyNjVGQkJDNEYzOTExRUJCRDI5RjUyNjUxMjcwNkFCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkMyNjVGQkJENEYzOTExRUJCRDI5RjUyNjUxMjcwNkFCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzI2NUZCQkE0RjM5MTFFQkJEMjlGNTI2NTEyNzA2QUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzI2NUZCQkI0RjM5MTFFQkJEMjlGNTI2NTEyNzA2QUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEB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");
  background-repeat: repeat;
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
