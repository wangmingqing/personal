<template>
  <div style="width:100%">
    <Header
      :undoBtnStatus="config.undoBtnStatus"
      :redoBtnStatus="config.redoBtnStatus"
      @preview="preview"
      @download="download"
      @save="save"
      @undo="undo" 
      @redo="redo"
      @reset="reset"/>
    <div class="fabric-container" :style="opened?'padding-left: 360px;':'padding-left: 80px;'">
      <div class="container">
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
  import { fabric } from 'fabric'
  import Header from './components/GroupHeader.vue'
  export default {
    name: 'group',
    components: { Header },
    data() {
      return {
        canvasWidth: 0, // 设置canvas宽度
        canvasHeight: 0,// 设置canvas高度


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
      }
    }
  }
</script>