<template>
  <div style="height:100%">
    <Header
      :undoBtnStatus="config.undoBtnStatus"
      :redoBtnStatus="config.redoBtnStatus"
      @group="group"/>
    <GroupLeft 
      @newDesign="newDesign"
      @selectFont="selectFont"
      @selectMaterial="selectMaterial"/>
    <div class="fabric-container" :style="opened?'padding-left: 360px;':'padding-left: 80px;'">
      <div class="container">
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>
    </div>
    <GroupRight
      :currentObject="currentObject"
      @setFont="setFont"
      @bringToFront="bringToFront"
      @bringForward="bringForward"
      @sendToBack="sendToBack"
      @sendBackwards="sendBackwards"
      @copyPlayer="copyPlayer"
      @delPlayer="delPlayer"
    />
    <Footer @plus="plus" @minus="minus" :percent="percent"/>
  </div>
</template>
<script>
  import { fabric } from 'fabric'
  import Header from './components/GroupHeader.vue'
  import GroupLeft from './components/GroupLeft.vue'
  import GroupRight from './components/GroupRight.vue'
  import Footer from './components/Footer.vue'
  export default {
    name: 'group',
    components: { Header, GroupLeft, GroupRight, Footer },
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
        this.setCanvasSize(200, 200)
        // 添加鼠标按下事件
        this.mouseDown()
        // 添加滚轮事件
        this.mouseWheel()
      },
      mouseDown() {
        // 鼠标按下事件
        this.canvas.on('mouse:down', event => {
          console.log(event.target)
          if(this.canvas.getActiveObject()) {
            this.canvas.setActiveObject(this.canvas.getActiveObject())
            this.customization(this.canvas.getActiveObject())
            this.currentObject = this.canvas.getActiveObject()
          } else {
            this.currentObject = null
          }
        })
      },
      mouseWheel() {
        // 鼠标滚轮事件
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
      setBackgroundImage(url) {
        var img = document.createElement('img')
        img.src = url
        img.onload = () => {
          this.canvasWidth = img.width
          this.canvasHeight = img.height
          this.setCanvasSize(this.canvasWidth, this.canvasHeight)
          fabric.Image.fromURL(url, (img) => {
            // 设置背景
            this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
          })
        }
      },
      newDesign(width, height) {
        this.setCanvasSize(width, height)
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
      setFont(obj){
        // 设置文本
        if(!this.canvas.getActiveObject()) return false
        if(obj.type === 'gradient') {
          if(obj.direction === 1) {
            obj.value.coords.x2 = this.canvas.getActiveObject().get('width')
            obj.value.coords.y2 = 0
          } else {
            obj.value.coords.x2 = 0
            obj.value.coords.y2 = this.canvas.getActiveObject().get('height')
          }
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
      selectFont(data) {
        data.objects.forEach(item => {
          if(item.type === 'textbox') {
            item.text="双击编辑文本"
            var textbox = new fabric.Textbox("双击编辑文本", item)
            this.canvas.centerObject(textbox)
            this.canvas.add(textbox).setActiveObject(textbox)
          }
        })
      },
      selectMaterial(url) {
        // 选择素材
        this.setImage(url)
      },
      setImage(url) {
        fabric.Image.fromURL(url, img => {
          this.canvas.centerObject(img)
          this.canvas.add(img).setActiveObject(img)
        })
      },

      // 右侧数据设置
      bringToFront() {
        // 移至顶层
        this.canvas.getActiveObject().bringToFront()
      },
      bringForward() {
        // 上移一层
        this.canvas.getActiveObject().bringForward()
      },
      sendToBack() {
        // 下移一层
        this.canvas.getActiveObject().sendBackwards()
      },
      sendBackwards() {
        // 移至底层
        this.canvas.getActiveObject().sendToBack()
      },
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

      // header 设置
      group() {
        console.log(this.canvas.getObjects())
        var group = new fabric.Group(this.canvas.getObjects(), {

        })
        this.canvas.add(group)
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