<template>
  <div class="drop-item">
    <div class="title">
      <h2>{{ info.config.title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
    name: "Title",
    data() {
        return {

        }
    },
    props: ['info']
}
</script>

<style>
  h2{
    font-size:18px;
    color:#111;
    font-weight:bold;
    padding:5px 0;
  }
</style>