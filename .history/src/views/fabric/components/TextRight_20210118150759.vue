<template>
  <div class="asideRight">
    <div class="title">
      <i class="fa fa-vimeo-square"></i>
      VIP会员所有文字可放心商用
    </div>
    <div class="content">
      <!-- 设置字体 -->
      <div class="set-fontfamily">
        <div class="showtext" @click="showFontFamily">
          <p>{{activeFontFamily}}</p>
          <i class="fa fa-caret-down"></i>
        </div>
        <div class="con" v-if="openedFontFamily">
          <p v-for="(item, index) in fontFamily" :key="index" :style="'font-family:'+item.fontFamily" @click="selectFontFamily(item)">
            {{item.fontName}}
          </p>
        </div>
      </div>
      <!-- 设置字号 -->
      <div class="set-fontsize">
        <div class="showtext" @click="showFontSize">
          <p>{{activeFontSize}}</p>
          <div class="box">
            <div @click.stop="setAddFont"><i class="el-icon-plus"></i></div>
            <div @click.stop="setMinusFont"><i class="el-icon-minus"></i></div>
          </div>
        </div>
        <div class="con" v-if="openedFontSize">
          <p v-for="(item, index) in fontSize" :key="index" @click="selectFontSize(item)">{{item}}</p>
        </div>
      </div>
      <!-- 设置文字颜色 -->
      <div class="set-fontcolor">
        <div class="showColor">
          <div class="colorIcon" @click="showTwitter = !showTwitter"></div>
          <div class="choiceColor" @click="showChrome = !showChrome" :style="'background:' + activeFontColor"></div>
        </div>
        <div class="con">
          <Chrome v-model="activeFontColor" @input="selectFontColor" v-if="showChrome"/>
          <Twitter v-model="activeFontColor" @input="selectFontColor" v-if="showTwitter"/>
        </div>
      </div>
      <!-- 设置图层 -->
      <div class="set-Player">
        <div class="col">锁定</div>
        <div class="col">排序</div>
        <div class="col" @click="copyPlayer">复制</div>
        <div class="col" @click="delPlayer">删除</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Chrome, Twitter } from 'vue-color'
  export default {
    name: 'TextRight',
    components: {
      Chrome,
      Twitter 
    },
    data() {
      return {
        fontFamily: [
          {fontFamily: 'Microsoft YaHei', fontName: '微软雅黑体'},
          {fontFamily: 'KaiTi', fontName: '楷体'},
          {fontFamily: 'DFKai-SB', fontName: '标楷体-SB'},
          {fontFamily: 'SimHei', fontName: '黑体'},
          {fontFamily: 'SimSun', fontName: '宋体'},
          {fontFamily: 'webfont1', fontName: '杨任东竹石体-Bold'},
        ],
        activeFontFamily: '微软雅黑体',
        openedFontFamily: false,

        fontSize: [10, 12, 14, 16, 18, 20, 30, 40, 50, 60, 70, 100, 150, 200],
        activeFontSize: 14,
        openedFontSize: false,

        activeFontColor: '#ff0000',
        showChrome: false,
        showTwitter: false,

        editorType: [
          {type: 'bold', text: '加粗', icon:'fa-bold'},
          {type: 'italic', text: '斜体', icon:'fa-italic'},
          {type: 'underline', text: '下划线', icon:'fa-underline'},
          {type: 'left', text: '左对齐', icon: 'fa-align-left'},
          {type: 'center', text: '居中对齐', icon: 'fa-align-center'},
          {type: 'right', text: '右对齐', icon: 'fa-align-right'}
        ]
      }
    },
    methods: {
      copyPlayer() {
        this.$emit('copyPlayer')
      },
      delPlayer() {
        this.$emit('delPlayer')
      }
    }
  }
</script>
<style scoped>
.asideRight{
  padding:58px 0 20px 0;
  width:280px;
  height:100%;
  position: fixed;
  top:0;
  right:0;
  box-sizing:border-box;
  -webkit-box-sizing:border-box;
  box-shadow: 0 -5px 5px #ccc;
  -webkit-box-shadow: 0 -5px 5px #ccc;
  z-index:1;
  background-color:#fff;
}
.asideRight .title{
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #1e0a00;
  background: -webkit-gradient(linear,right top,left top,from(#eee1cf),to(#f9f3e9));
  background: linear-gradient(270deg,#eee1cf,#f9f3e9);
  cursor: pointer;
}
.asideRight .title i{
  text-align: center;
  width: 26px;
  line-height: 28px;
  height: 26px;
  display: inline-block;
  background: linear-gradient(135deg,#f2d2a6,#e8b557);
  border-radius: 4px;
  color: #fff;
  margin-right: 14px;
}
.asideRight .content{padding:0 20px;}
</style>