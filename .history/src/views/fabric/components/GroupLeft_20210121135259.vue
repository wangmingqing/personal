<template>
<div class="asideLeft" :class="showDrawer?'opened':''">
    <div class="wrapper">
      <a href="javascript:;" v-for="(item, index) in navList" :key="index" class="btn-aside">
        <i class="fa" :class="item.icon"></i>
        <div class="text">{{item.text}}</div>
      </a>
    </div>
    <div class="container" v-if="showDrawer">
      
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
        showDrawer: true,
        navList: [{
          type: 'font',
          icon: 'fa-plus',
          text: '新建'
        }]
      }
    }
  }
</script>
<style scoped>
.asideLeft{
  position: fixed;
  left: 0;
  top: 0;
  width:80px;
  height: 100%;
  padding-top:58px;
  text-align: center;
  z-index: 1;
}
.asideLeft.opened{width:360px;}
.asideLeft .wrapper {
  width: 80px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #f1f3f7;
  overflow: auto;
  padding-bottom: 80px;
  box-sizing:border-box;
  -webkit-box-sizing: border-box;
  position: absolute;
  left:0;
  top:58px;
  bottom:0;
}
.asideLeft .wrapper a{
  position: relative;
  display: block;
  text-align: center;
  height: 46px;
  cursor: pointer;
  margin-top: 20px;
  border-left: 4px solid #fff;
  border-right: 4px solid #fff;
  box-sizing:border-box;
  -webkit-box-sizing:border-box;
}
.asideLeft .wrapper a.active, .asideLeft .wrapper a:hover {
  border-left-color: #ff4555;
}
.asideLeft .wrapper a i {
  color: #999;
  font-size: 26px;
  display: inline-block;
  width: 26px;
  height: 26px;
  margin: 0 auto;
}
.asideLeft .wrapper a .text {
  color: #666;
  font-size: 12px;
  margin-top: 4px;
}
.asideLeft .wrapper .active i , .asideLeft .wrapper .active .text, .asideLeft .wrapper a:hover i, .asideLeft .wrapper a:hover .text{color: #ff4555;}
</style>