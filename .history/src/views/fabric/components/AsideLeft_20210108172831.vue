<template>
  <div class="asideLeft" :class="showDrawer?'opened':''">
    <div class="wrapper">
      <a href="javascript:;" v-for="(item, index) in navList" :key="index" class="btn-aside" :class="asideType === item.type?'active':''" @click="selectNav(item.type)">
        <i class="fa" :class="item.icon"></i>
        <div class="text">{{item.text}}</div>
      </a>
    </div>
    <div class="container" v-if="showDrawer">
      <div class="font-wrapper" v-if="asideType === 'font'">
        <p class="btn-box">
          <a href="javascript:;" :class="fontType === 1 ? 'active': ''" @click="fontSpecial">特效字</a>
          <a href="javascript:;" :class="fontType === 2 ? 'active': ''" @click="fontGroup">组合字</a>
        </p>
        <div class="con" v-if="fontType === 1">
          <div class="item" v-for="(item, index) in fontStyle" :key="index" @click="selectFont(item.style)">
            <div class="img">
              <img :src="item.src" alt="">
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
        <div class="con" v-else>
          <div class="item">
            <img src="data:image/jpeg;base64,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" alt="">
          </div>
        </div>
      </div>
      <div class="material-wrapper" v-if="asideType === 'material'">
        <el-row>
          <el-col :span="12">
            <div class="item" @click="selectMaterial(require('../../../assets/material1.png'))">
              <img src="../../../assets/material1.png" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item" @click="selectMaterial(require('../../../assets/material2.png'))">
              <img src="../../../assets/material2.png" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item" @click="selectMaterial(require('../../../assets/material3.png'))">
              <img src="../../../assets/material3.png" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item" @click="selectMaterial(require('../../../assets/material4.png'))">
              <img src="../../../assets/material4.png" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item" @click="selectMaterial(require('../../../assets/material5.png'))">
              <img src="../../../assets/material5.png" alt="">
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="background-wrapper" v-if="asideType === 'background'">
        <el-row>
          <el-col :span="12">
            <div class="item" @click="selectBackground(require('../../../assets/ning1.jpg'))">
              <img src="../../../assets/ning1.jpg" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item" @click="selectBackground(require('../../../assets/ning2.jpg'))">
              <img src="../../../assets/ning2.jpg" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item" @click="selectBackground(require('../../../assets/ning3.jpg'))">
              <img src="../../../assets/ning3.jpg" alt="">
            </div>
          </el-col>
        </el-row>
        <div class="upload-container">
          <a href="javascript:;">
            点击上传
            <input type="file" accept="image/jpeg, image/png"  @change="uploadBackground">
          </a>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="btn-openAside" @click="showContainer">
      <i class="fa fa-chevron-left"></i>
    </a>
  </div>
</template>
<script>
export default {
  name: 'AsideLeft',
  props: {
    canvasWidth: {
      type: Number,
      default: 750
    },
    canvasHeight: {
      type: Number,
      default: 0
    }
  },
  watch: {
    canvasWidth(val) {
      this.fontParams.width = val
    },
    canvasHeight(val) {
      this.fontParams.top = val / 2 + 20
    }
  },
  data() {
    return {
      showDrawer: true,
      navList: [
        {
          type: 'font',
          icon: 'fa-font',
          text: '文本'
        },
        {
          type: 'material',
          icon: 'fa-twitter-square',
          text: '素材'
        },
        {
          type: 'background',
          icon: 'fa-th-large',
          text: '背景'
        },
        {
          type: 'upload',
          icon: 'fa-cloud-upload',
          text: '上传'
        }
      ],
      asideType: 'font', // 菜单选中类型 默认选中font
      fontType: 1, // 文字类型 1特效文字 2组合文字
      fontStyle: [
        {style: 'normal', name: '常规', src: require('@/assets/img/normal.png')},
        {style: 'shadow', name: '阴影', src: require('@/assets/img/shadow.png')},
        {style: 'solid', name: '立体', src: require('@/assets/img/solid.png')},
        {style: 'neon', name: '霓虹', src: require('@/assets/img/neon.png')},
        {style: 'fault', name: '故障风', src: require('@/assets/img/fault.png')}
      ],
      fontParams: {
        left: 0,
        top: 0,
        text: '执子之手，方知子丑，泪流满面，子不走我走',
        textAlign: 'center',
        width:750,
        fontFamily: 'Microsoft YaHei',
        fontWeight: 'normal',
        fontSize: 14,
        fontStyle: 'normal',
        underline: false,
        fill: 'rgba(0,0,0,1)'
      }
    }
  },
  methods: {
    selectNav(type) {
      this.asideType = type
    },
    showContainer() {
      // 控制抽屉
      this.showDrawer = !this.showDrawer
      this.$store.dispatch('toggleOpened')
    },
    fontSpecial() {
      this.fontType = 1
    },
    fontGroup() {
      this.fontType = 2
    },
    // style 文字风格
    selectFont(style) {
      var params = JSON.parse(JSON.stringify(this.fontParams))
      if(style === 'shadow') params.shadow = '#333 3px 3px 2px'
      if(style === 'solid') params.shadow = '#fff -1px -1px, #333 -1px -1px'
      this.$emit('setFont', params)
    },
    selectBackground(url) {
      this.$emit('setBackgroundImage',url)
    },
    uploadBackground(event) {
      var file = event.target.files[0]
      var url = URL.createObjectURL(file)
      this.$emit('setBackgroundImage',url)
    },
    selectMaterial(url) {
      this.$emit('selectMaterialImage',url)
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
.background-wrapper{padding:5px;}
.background-wrapper .item{padding:5px;}
.background-wrapper img{display:block;width:100%;}
.upload-container a{
  display: inline-block;
  width: 200px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 16px;
  font-size: 12px;
  color: #fff;
  background: #f63;
  z-index: 10;
  -webkit-box-shadow: 0 1px 4px rgba(0,0,0,.4);
  box-shadow: 0 1px 4px rgba(0,0,0,.4);
  position:relative;
}
.upload-container a input{
  display: block;
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  opacity:0;
  background-color:transparent;
  cursor:pointer;
}

.material-wrapper{padding:5px;}
.material-wrapper .item{padding:5px;}
.material-wrapper img{display:block;width:100%;background-color:#f7f7f7;border-radius:4px;}
.material-wrapper img:hover{
  box-shadow: 0 0 5px #ccc;
  -webkit-box-shadow: 0 0 5px #ccc;
}
</style>