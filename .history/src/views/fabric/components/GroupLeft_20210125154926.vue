<template>
  <div>
    <div class="asideLeft" :class="showDrawer?'opened':''">
      <div class="wrapper">
        <a href="javascript:;" v-for="(item, index) in navList" :key="index" @click="selectTab(item.type)">
          <i class="fa" :class="item.icon"></i>
          <div class="text">{{item.text}}</div>
        </a>
      </div>
      <div class="container" v-if="showDrawer">
        <div class="list" v-if="type==='font'">
          <el-row>
            <el-col :span="12" v-for="(item, index) in fontList" :key="index">
              <div class="item" @click="selectFont(item.data)">
                <div class="img">
                  <img :src="item.image" alt="">
                </div>
                <p class="name">{{item.name}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="list" v-if="type==='material'">
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
          <div class="upload-container">
            <a href="javascript:;">
              点击上传
              <input type="file" accept="image/jpeg, image/png"  @change="uploadMaterial">
            </a>
          </div>
        </div>
        <div class="list" v-if="type==='background'">
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
      <a href="javascript:;" class="btn-openAside">
        <i class="fa fa-chevron-left"></i>
      </a>
    </div>
    <el-dialog
      title="自定义尺寸"
      :visible.sync="dialogVisible"
      width="30%">
      <el-row :gutter="50">
        <el-col :span="8"><el-input v-model="newWidth" placeholder="宽" @input="validateWidth" @focus="getSelectAll($event)"></el-input></el-col>
        <el-col :span="8"><el-input v-model="newHeight" placeholder="高" @input="validateHeight" @focus="getSelectAll($event)"></el-input></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newDesign">新建设计</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import fontList from './font'
  let reg = /^\d+$/
  export default {
    name: 'GroupLeft',
    data() {
      return {
        showDrawer: true,
        navList: [{
          type: 'new',
          icon: 'fa-plus',
          text: '新建'
        },{
          type: 'font',
          icon: 'fa-font',
          text: '文本'
        },{
          type: 'material',
          icon: 'fa-file-image-o',
          text: '素材'
        },{
          type: 'background',
          icon: 'fa-th-large',
          text: '背景'
        }],
        dialogVisible: false,

        newWidth: '',
        newHeight: '',

        type: 'font',
        fontList: fontList

      }
    },
    methods: {
      getSelectAll(event) {
        // 聚焦是选中文本框
        event.currentTarget.select()
      },
      selectTab(type) {
        if(type === 'new') {
          this.dialogVisible = true
        }
        this.type = type
      },
      validateWidth() {
        if(!reg.test(this.newWidth)) {
          this.newWidth = ''
        }
      },
      validateHeight() {
        if(!reg.test(this.newHeight)) {
          this.newHeight = ''
        }
      },
      newDesign() {
        // 新建设计
        this.$emit('newDesign', this.newWidth, this.newHeight)
        this.dialogVisible = false
      },
      selectFont(data) {
        // 选择文字类型
        this.$emit('selectFont', data)
      },
      selectMaterial(url) {
        // 选择素材
        this.$emit('selectMaterial',url)
      },
      uploadMaterial(event) {
        var file = event.target.files[0]
        var url = URL.createObjectURL(file)
        this.$emit('selectMaterial',url)
      },
      selectBackground(url) {
        this.$emit('setBackgroundImage',url)
      },
      uploadBackground(event) {
        var file = event.target.files[0]
        var url = URL.createObjectURL(file)
        this.$emit('setBackgroundImage',url)
      },
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

.list .item{
  padding:10px;
  cursor: pointer;
  position:relative;
}
.list .item img{display:block; width:100%;}
.list .item p{color:#666;font-size:14px;}

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
</style>