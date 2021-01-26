<template>
<div class="asideLeft" :class="showDrawer?'opened':''">
    <div class="wrapper">
      <a href="javascript:;" v-for="(item, index) in navList" :key="index" class="btn-aside">
        <i class="fa" :class="item.icon"></i>
        <div class="text">{{item.text}}</div>
      </a>
    </div>
    <div class="container" v-if="showDrawer">
      <div class="font-wrapper">
        <div class="item" v-for="(item, index) in fontStyle" :key="index" @click="selectFont(item)">
          <div class="img">
            <img :src="item.src" alt="">
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="btn-openAside">
      <i class="fa fa-chevron-left"></i>
    </a>
  </div>
</template>
<script>
  export default {
    name: 'GroupLeft',
    data() {
      return {

      }
    }
  }
</script>