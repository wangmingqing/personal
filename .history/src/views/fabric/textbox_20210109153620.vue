<template>
  <div style="height:100%;">
    <canvas id="canvas" width="800" height="500" style="border:1px solid #eee;box-shadow: 0 0 5px #ccc;"></canvas>
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
    }
  }
}
</script>