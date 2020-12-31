<template>
  <div class="drop-item">
    <div class="paragraph">
      <pre>{{ info.config.content }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoParagraph",
  data() {
    return {}
  },
  props: ['info']
}
</script>

<style>
  .paragraph pre{line-height:1.5em;text-align:justify;font-size:12px;color:#333;padding:5px 0;white-space: pre-wrap;
word-wrap: break-word;}
</style>