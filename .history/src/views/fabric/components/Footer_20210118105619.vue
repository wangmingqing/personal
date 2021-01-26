<template>
  <div class="canvas-footer clearfix">
    <div class="fr clearfix">
      <div class="name-box fl">
        <input type="text" v-model="pictureName" @change="changePictureName">
        <a href="javascript:;">修改</a>
      </div>
      <div class="size-box fl">
        <i class="el-icon-remove" @click="minus"></i>
        <span>{{percent}}</span>
        <i class="el-icon-circle-plus" @click="plus"></i>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Footer',
    props: {
      percent: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        pictureName: '这是一张图片'
      }
    },
    watch: {
      percent(val) {
        this.percent = val
      }
    },
    methods: {
      setPictureName() {
        if(this.pictureName === '') this.pictureName = '这是一张图片'
        this.$emit('getPictureName', this.pictureName)
      },
      plus() {
        this.$emit('plus')
      },
      minus() {
        this.$emit('minus')
      }
    }
  }
</script>
<style scoped>
.canvas-footer{
  position:fixed;
  bottom:20px;
  left:0;
  right:0;
  padding-right:300px;
}
.canvas-footer .name-box{
  padding:5px 20px;
  background-color:#fff;
  -webkit-box-shadow: 0 0 4px 0 rgba(0,0,0,.12);
  box-shadow: 0 0 4px 0 rgba(0,0,0,.12);
  background-color:#fff;
  margin-right:20px;
  border-radius: 14px;
  margin-top: 4px;
}
.canvas-footer .name-box input{border:none;outline:none;font-size: 12px;}
.canvas-footer .name-box a{
  display:inline-block;
  font-size: 12px;
  color: #409EFF;
  padding-left:10px;
}
.canvas-footer .size-box{
  line-height:40px;
  background-color:#fff;
  -webkit-box-shadow: 0 0 4px 0 rgba(0,0,0,.12);
  box-shadow: 0 0 4px 0 rgba(0,0,0,.12);
  background-color:#fff;
  padding:0 12px;
  border-radius: 4px;
}
.canvas-footer .size-box i{cursor:pointer;font-size:16px;}
.canvas-footer .size-box i:hover{color:#ff4555;}
.canvas-footer .size-box span{font-size:12px;width:50px;text-align:center;}
.canvas-footer .size-box i,
.canvas-footer .size-box span{display:inline-block;padding: 0 5px;}
</style>