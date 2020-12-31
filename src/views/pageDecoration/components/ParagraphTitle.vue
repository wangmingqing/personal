<template>
  <div class="paragraph-title">
    <div class="title">{{ info.config.title }}</div>
  </div>
</template>

<script>
export default {
   name: "ParagraphTitle",
   props: ['info']
}
</script>

<style>
.paragraph-title{padding:5px 0;color:#C1803A;font-size:16px;}
</style>