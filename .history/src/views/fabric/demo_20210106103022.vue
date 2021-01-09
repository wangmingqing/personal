<template>
  <div>
    <Header @preview="preview" @download="download" @save="save"/>
    <AsideLeft/>
    <AsideRight/>
  </div>
</template>
<script>
import Header from './demoComponents/Header.vue'
import AsideLeft from './demoComponents/AsideLeft.vue'
import AsideRight from './demoComponents/AsideRight.vue'
export default {
  name: 'html-poster',
  components: {
    Header,
    AsideLeft,
    AsideRight
  },
  methods: {
    preview() {
      console.log('preview')
    },
    download() {
      console.log('download')
    },
    save() {
      console.log('save')
    }
  }
}
</script>