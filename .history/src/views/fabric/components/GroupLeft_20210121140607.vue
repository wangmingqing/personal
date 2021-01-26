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
        
      </div>
      <a href="javascript:;" class="btn-openAside">
        <i class="fa fa-chevron-left"></i>
      </a>
    </div>
    <el-dialog
      title="自定义尺寸"
      :visible.sync="dialogVisible"
      width="50%">
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible = false">新建设计</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'GroupLeft',
    data() {
      return {
        showDrawer: true,
        navList: [{
          type: 'new',
          icon: 'fa-plus',
          text: '新建'
        }],
        dialogVisible: false
      }
    },
    methods: {
      selectTab(type) {
        console.log(type)
        if(type === 'new') {
          this.dialogVisible = true
        }
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
</style>