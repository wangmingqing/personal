<template>
  <div class="asideLeft" :class="showDrawer?'opened':''">
    <div class="wrapper">
      <a href="javascript:;" v-for="(item, index) in navList" :key="index" class="btn-aside" :class="asideType === item.type?'active':''" @click="selectNav(item.type)">
        <i class="fa" :class="item.icon"></i>
        <div class="text">{{item.text}}</div>
      </a>
    </div>
    <div class="container" v-if="showDrawer">
      <div class="item" v-for="(item, index) in fontStyle" :key="index" @click="selectFont(item.style)">
        <div class="img">
          <img :src="item.src" alt="">
        </div>
        <p class="name">{{item.name}}</p>
      </div>
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
        }],
        fontStyle: [
          {style: 'normal', name: '常规', src: require('@/assets/img/normal.png')},
          {style: 'shadow', name: '阴影', src: require('@/assets/img/shadow.png')},
          {style: 'solid', name: '立体', src: require('@/assets/img/solid.png')},
          {style: 'neon', name: '霓虹', src: require('@/assets/img/neon.png')},
          {style: 'fault', name: '故障风', src: require('@/assets/img/fault.png')},
          {style: 'gradient', name: '渐变', src: require('@/assets/img/gradient.png')}
        ],
      }
    },
    methods: {
      selectFont(style) {
        console.log(style)
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
.asideLeft .container{
  width:280px;
  height:100%;
  position: absolute;
  right:0;
  top:58px;
  bottom:0;
  background-color:#fff;
  box-shadow: 0 5px 5px #ccc;
  -webkit-box-shadow: 0 5px 5px #ccc;
}
.asideLeft .btn-openAside{
  height: 85px;
  text-align: center;
  line-height: 85px;
  color: #fff;
  width: 20px;
  position: absolute;
  top: 50%;
  right: -20px;
  margin-top: -43px;
  cursor: pointer;
  border-radius: 24px 0 0 24px;
  background: linear-gradient(135deg,#ffa383,#f25b4a);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.asideLeft .btn-box{padding:20px 0;}
.asideLeft .btn-box a{
  display:inline-block;
  padding:8px 20px;
  border: 1px solid #d6dbe1;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  -webkit-transition: all .28s;
  transition: all .28s;
  margin: 0 5px;
  font-size: 12px;
  color: #202020;
}
.font-wrapper .btn-box a.active{
  color: #fff;
  background: #ff4555;
  border-color: #ff4555;
}
.font-wrapper .con .item{
  width:50%;
  float: left;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  cursor: pointer;
}
.font-wrapper img{display:block;width:100%;}
.font-wrapper p{padding-top:5px;font-size:13px;}
</style>