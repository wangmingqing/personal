<template>
  <div class="asideLeft" :class="showDrawer?'opened':''">
    <div class="wrapper">
      <a href="javascript:;" v-for="(item, index) in navList" :key="index" class="btn-aside" :class="asideType === item.type?'active':''" @click="selectNav(item.type)">
        <i class="fa" :class="item.icon"></i>
        <div class="text">{{item.text}}</div>
      </a>
    </div>
    <div class="container" v-if="showDrawer">
      
    </div>
  </div>
</template>
<script>
  export default {
    name: 'TextLeft',
    data() {
      return {
        showDrawer: true,
        navList: [{
          type: 'newAdd',
          icon: 'fa-add',
          text: '新建'
        },{
          type: 'font',
          icon: 'fa-font',
          text: '文本'
        }]
      }
    }
  }
</script>