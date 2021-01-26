<template>
  <div class="asideRight">
    <div class="title">
      <i class="fa fa-vimeo-square"></i>
      VIP会员所有文字可放心商用
    </div>
  </div>
</template>
<script>
  export default {
    name: 'TextRight',
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