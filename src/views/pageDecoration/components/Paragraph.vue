<template>
  <div class="drop-item">
    <div class="paragraph">
      <p>{{ info.config.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paragraph",
  data() {
    return {}
  },
  props: ['info']
}
</script>

<style>
  .paragraph p{line-height:1.5em;text-align:justify;font-size:12px;color:#333;padding:5px 0;}
</style>