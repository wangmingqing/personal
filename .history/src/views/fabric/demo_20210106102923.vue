<template>
  <div>
    <Header @preview="preview" @download="download" @save="save"/>
    <AsideLeft/>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import AsideLeft from './components/AsideLeft.vue'
import AsideRight from './components/AsideRight.vue'
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