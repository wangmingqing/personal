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
  </div>
</template>
<script>
  import Header from './components/GroupHeader.vue'
  export default {
    name: 'group'
  }
</script>