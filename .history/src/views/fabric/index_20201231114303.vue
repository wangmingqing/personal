<template>
  <div>
    <Header/>
    <AsideLeft @setFont="setFont" @setBackgroundImage="setBackgroundImage"/>
    <div class="fabric-container">
      <div class="container">
        <canvas id="canvas"></canvas>
      </div>
    </div>
    <AsideRight :designType="designType" @setFontFamily="setFontFamily"/>
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
      designType: '' // 设置类型 默认空  text设置文本 image设置图片
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.canvas = new fabric.Canvas('canvas')
      if(localStorage.getItem('image')) {
        var data = JSON.parse(localStorage.getItem('image'))
        if(data.backgroundImage) {
          this.canvas.setWidth(data.backgroundImage.width * data.backgroundImage.scaleX)
          this.canvas.setHeight(data.backgroundImage.height * data.backgroundImage.scaleY)
        }
        this.exchangeToFromJSON(localStorage.getItem('image'))
      } else {
        this.setBackgroundImage(require('../../assets/ning1.jpg'))
      }
      // 添加点击事件
      this.canvas.on('mouse:down', e => {
        console.log(e.target)
        if(!e.target) {
          this.designType = ''
          return false
        }
        if(e.target.type === 'textbox') {
          this.designType = 'text'
        }
        if(e.target.type === 'image') {
          this.designType = 'image'
        }
      })
    },
    setBackgroundImage(url) {
      var img = document.createElement('img')
      img.src = url
      img.onload = () => {
        this.canvas.setWidth(img.width)
        this.canvas.setHeight(img.height)
        fabric.Image.fromURL(url, (img) => {
          img.set({
            // 通过scale来设置图片大小，这里设置和画布一样大
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height,
          })
          // 设置背景
          this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas))
          this.canvas.renderAll()
        })
      }
    },
    setFont(data) {
      // 获取绘制文字参数
      var textbox = new fabric.Textbox(data.text, data)
      this.canvas.add(textbox)
      this.canvas.renderAll()
    },
    setFontFamily(fontFamily) {
      // 设置字体
      var currentFontPlayer = JSON.parse(JSON.stringify(this.canvas.getActiveObject()))
      this.canvas.remove(this.canvas.getActiveObject())
      currentFontPlayer.fontFamily = fontFamily
      this.setFont(currentFontPlayer)
    },
    exchangeToFromJSON(json) {
      this.canvas.loadFromJSON(json)
    }
  }
}
</script>
<style scoped>
.fabric-container .container{
  overflow: hidden;
  padding-top:88px;
  padding-bottom:30px;
}
>>> .canvas-container{margin:0 auto;}
canvas{
  display:block;
  margin:0 auto;
}
</style>
