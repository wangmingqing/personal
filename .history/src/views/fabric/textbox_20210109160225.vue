<template>
  <div style="height:100%;">
    <canvas id="canvas" width="800" height="500" style="display:block;border:1px solid #eee;box-shadow: 0 0 5px #ccc;margin:0 auto"></canvas>
    <p style="margin-top:20px;">
      <el-button type="primary" size="mini" @click="addFontNormal">常规文本</el-button>
      <el-button type="primary" size="mini" @click="addShadowNormal">阴影文本</el-button>
      <el-button type="primary" size="mini" @click="addNeonNormal">霓虹文本</el-button>
      <el-button type="primary" size="mini" @click="addGradientNormal">渐变文本</el-button>
    </p>
  </div>
</template>
<script>
import { fabric } from 'fabric'
export default {
  name: 'textbox',
  data() {
    return {
      canvas: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.canvas = new fabric.Canvas('canvas')
      console.log(this.canvas.getWidth())
      this.canvas.on('mouse:down', event => {
        console.log(event)
        // console.log(this.canvas.getActiveObject())
      })
    },
    addFontNormal() {
      var normal = new fabric.Textbox('Lorem ipsum dolor sit amet', {
        width: this.canvas.getWidth()
      })
      this.canvas.add(normal)
    },
    addShadowNormal() {
      var shadow = new fabric.Textbox('Lorem ipsum dolor sit amet', {
        shadow: 'rgba(0,0,0,0.7) 5px 5px 5px',
        width: this.canvas.getWidth()
      })
      this.canvas.add(shadow)
    },
    addNeonNormal() {
      var neon = new fabric.Textbox('Lorem ipsum dolor sit amet', {
        width: this.canvas.getWidth(),
        fill: 'rgba(255,27,203,1)',
        stroke: '#fff',
        strokeWidth: 1,
        shadow: '#ff1bcb 0 0 5px'
      })
      this.canvas.add(neon)
    },
    addGradientNormal() {
      var gradient = new fabric.Textbox('Lorem ipsum dolor sit amet', {
        width: this.canvas.getWidth()
      })
      gradient.set('fill', 
        new fabric.Gradient({
          type: "linear", // or "radial"
          coords: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: gradient.get("height"),
          },
          colorStops: [
            {
              offset: 0, // value 0 - 1
              color: "#FFF9EB",
              opacity: 1
            },
            {
              offset: 1,
              color: "#E0BB65",
              opacity: 1
            }
          ]
        })
      )
      this.canvas.add(gradient)
    }
  }
}
</script>