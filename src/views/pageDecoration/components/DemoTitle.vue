<template>
  <div class="article-demo">
    <div class="title"><i class="icon"></i>{{info.config.title}}</div>
  </div>
</template>

<script>
export default {
  name: "DemoTitle",
  props: ["info"]
}
</script>

<style>
.article-demo{padding:5px 0;}
.article-demo .title{
    background-color:#FEF8CD;
    height:21px;
    line-height:21px;
    color:#434343;
    position: relative;
    font-size:16px;
    padding-left:35px;
}
.article-demo .title .icon{
    display:inline-block;
    width:25px;height:25px;
    background-image:url("https://applet.yzbtrip.com/saler/images/icon-title-tips.png");
    background-repeat:no-repeat;
    background-size:25px;
    position: absolute;
    bottom:0;
    left:5px;
}
</style>