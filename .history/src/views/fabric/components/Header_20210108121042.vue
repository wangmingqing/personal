<template>
  <header class="header">
    <div class="fl">
      <img class="logo" src="https://yzblines.yzbtrip.com/erp/image/9a32a69146d4a5d918a441a142131d67.png"/>
      <span class="firmname">游准备科技有限公司</span>
      <a href="javascript:;" class="btn-reply" :class="undoBtnStatus ? '' : 'disabled'" title="后退" @click="undo"><i class="el-icon-back"></i></a>
      <a href="javascript:;" class="btn-forward" :class="redoBtnStatus ? '' : 'disabled'" title="前进" @click="redo"><i class="el-icon-right"></i></a>
      <a href="javascript:;" class="btn-forward" title="重置" @click="reset"><i class="el-icon-refresh"></i></a>
      <a href="javascript:;" class="btn-save" title="保存" @click="save"><i class="el-icon-lock"></i></a>
    </div>
    <div class="fr">
      <a href="javascript:;" class="btn-review" @click="preview">
        <i class="fa fa-eye"></i>
        预览
      </a>
      <a href="javascript:;" class="btn-download" @click="download">
        <i class="fa fa-cloud-download"></i>
        <span>无水印下载</span>
      </a>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'Header',
    props: {
      undoBtnStatus: {
        type: Boolean,
        default: false
      },
      redoBtnStatus: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      undoBtnStatus(val) {
        this.undoStatus = val
      },
      redoBtnStatus(val) {
        this.redoStatus = val
      }
    },
    methods: {
      preview() {
        // 预览
        this.$emit('preview')
      },
      download() {
        // 下载
        this.$emit('download')
      },
      save() {
        // 保存
        this.$emit('save')
      },
      undo() {
        // 撤销
        if(!this.undoBtnStatus) return false
        this.$emit('undo')
      },
      reset() {
        // 重置
        this.$emit('reset')
      },
      redo() {
        // 恢复
        if(!this.redoBtnStatus) return false
        this.$emit('redo')
      }
    }
  }
</script>
<style scoped>
.header{
  width:100%;
  background-color:#fff;
  height:58px;
  line-height:58px;
  box-shadow: 0 0 5px #ccc;
  -webkit-box-shadow: 0 0 5px #ccc;
  position:fixed;
  top:0;
  left:0;
  z-index:2
}
.header .logo{
  margin-left:10px;
  margin-right:10px;
  width:40px;
  height: 40px;
  vertical-align:middle;
  margin-top:-5px;
}
.header .firmname{display:inline-block;font-size:18px;font-weight:bold;color:#666;margin-right:40px;}
.header .btn-reply,
.header .btn-forward,
.header .btn-save,
.header .btn-review{
  display:inline-block;
  padding:0 20px;
  color:#666;
  font-size:16px;
}
.header .btn-reply.disabled,
.header .btn-forward.disabled{cursor:not-allowed;color:#999;}
.header .btn-download{
  display:inline-block;
  color: #fff;
  background: #ff4555;
  padding:0 30px;
  text-align: center;
  -webkit-box-shadow: 3px 4px 8px 0 rgba(255,56,56,.35);
  box-shadow: 3px 4px 8px 0 rgba(255,56,56,.35);
  height: 58px;
}
.header .btn-download span{font-size:14px;}
</style>