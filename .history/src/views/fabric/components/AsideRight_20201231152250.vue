<template>
  <div class="asideRight">
    <div class="title">
      <i class="fa fa-vimeo-square"></i>
      VIP会员所有文字可放心商用
    </div>
    <div class="content">
      <div class="design-font" v-if="designType === 'text'">
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
            <div class="colorIcon"></div>
            <div class="choiceColor" :style="'background:' + activeFontColor"></div>
          </div>
          <div class="con">
            <Chrome v-model="activeFontColor"/>
            <Twitter v-model="activeFontColor"/>
          </div>
        </div>
      </div>
      <div class="basic-info" v-else>
        <p style="font-size: 12px;color: #999;padding: 20px 0 2px;line-height: 1.4;text-align: justify;">
          <span style="color: rgb(255, 69, 85)">*</span> 依据国家相关法律法规，禁止上传包含色情、违法、侵权等性质内容，违规内容将会删除处理
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { Chrome, Twitter } from 'vue-color'
export default {
  name: 'AsideRight',
  props: {
    designType: {
      type: String,
      default: ''
    }
  },
  watch: {
    designType(val) {
      this.designType = val
    }
  },
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

      activeFontColor: '#ff0000'
    }
  },
  methods: {
    showFontFamily() {
      // 是否显示字体列表
      this.openedFontFamily = !this.openedFontFamily
    },
    selectFontFamily(obj) {
      // 选择字体
      if(obj.fontName === this.activeFontFamily){
        this.openedFontFamily = false
        return false
      } 
      this.activeFontFamily = obj.fontName
      this.$emit('setFontFamily', obj.fontFamily)
      this.openedFontFamily = false
    },
    showFontSize() {
      // 是否显示字号列表
      this.openedFontSize = !this.openedFontSize
    },
    selectFontSize(size) {
      // 设置字号
      if(this.activeFontSize === size) return false
      this.activeFontSize = size
      this.$emit('setFontSize', this.activeFontSize)
      this.openedFontSize = false
    },
    setAddFont() {
      this.activeFontSize = this.activeFontSize + 1
      this.$emit('setFontSize', this.activeFontSize)
    },
    setMinusFont() {
      if(this.activeFontSize < 9) return false
      this.activeFontSize = this.activeFontSize - 1
      this.$emit('setFontSize', this.activeFontSize)
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

.design-font{padding-top:20px;}
.set-fontfamily{position: relative;margin-bottom:20px;}
.set-fontfamily .showtext{
  height: 38px;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
  line-height: 38px;
  cursor: pointer;
  position: relative;
}
.set-fontfamily .showtext p{line-height:38px;padding:0 10px;overflow: hidden;box-sizing:border-box;}
.set-fontfamily .showtext i{
  position: absolute;
  top: 50%;
  margin-top:-8px;
  color: #333;
  right: 6px;
  font-size: 16px;
}
.set-fontfamily .showtext:hover{border:1px solid #ff4555;}
.set-fontfamily .showtext:hover i{color:#ff4555}

.set-fontfamily .con{
  width: 100%;
  background: #fff;
  position: absolute;
  top: 40px;
  left: 0;
  -webkit-box-shadow: 0 2px 6px 2px #e4e9ee;
  box-shadow: 0 2px 6px 2px #e4e9ee;
  overflow: hidden;
  z-index: 50;
  border-radius: 2px;
}
.set-fontfamily .con p{
  width: 100%;
  height: 38px;
  line-height:38px;
  padding:0 10px;
  cursor: pointer;
}
.set-fontfamily .con p:hover{background-color:#efefef;}

.set-fontsize{position: relative;margin-bottom:20px;}
.set-fontsize .showtext{
  height: 38px;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
  line-height: 38px;
  cursor: pointer;
  position: relative;
}
.set-fontsize .showtext p{line-height:38px;padding:0 10px;overflow: hidden;box-sizing:border-box;}
.set-fontsize .showtext .box{
  width:40px;
  height:100%;
  position:absolute;
  top:0;
  right:0;
  z-index:1;
  background-color:#fff;
  border-left:1px solid #e6e6e6;
}
.set-fontsize .showtext .box div{width:100%;height:19px;line-height:19px;text-align:center;color:#111}
.set-fontsize .showtext .box div:first-child{border-bottom:1px solid #e6e6e6}
.set-fontsize .showtext:hover{border:1px solid #ff4555;}

.set-fontsize .con{
  width: 100%;
  background: #fff;
  position: absolute;
  top: 40px;
  left: 0;
  -webkit-box-shadow: 0 2px 6px 2px #e4e9ee;
  box-shadow: 0 2px 6px 2px #e4e9ee;
  height:300px;
  overflow-y: scroll;
  z-index: 50;
  border-radius: 2px;
}
.set-fontsize .con p{
  width: 100%;
  height: 38px;
  line-height:38px;
  padding:0 10px;
  cursor: pointer;
  color:#333;
  font-size:14px;
}
.set-fontsize .con p:hover{background-color:#efefef;}

.set-fontColor{position:relative;}
.set-fontColor .showColor{
  height: 38px;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
  line-height: 38px;
  cursor: pointer;
}
.set-fontColor .showColor:hover{border:1px solid #ff4555;}
.set-fontColor .colorIcon{
  position:absolute;
  top: 0;
  right: 10px;
  width: 30px;
  height: 36px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAEhklEQVRYw8WZX2hbVRzHP/cuDbj2Vli3uNarvuhqGcjoFgobttlAuoXa4YvdXGAo2j/qmikImgcfVOrAh1HX1rbIxBHt3gYyO0XY0qrD2gVGoKwbPujsVt3WCU26zCbN9eHeq2l677lJSeoX8pDz++bcT36593fO70RiFUruPSkDXmA3sAPYAjwMlBuWhfT9UzeAa8Al4AIwqUQimUKvJRUIpgKvAYeAR0Te9P1TuUO/A18A/UokMlNUwOTek1XAe8DLgDufz1gAmloEPgXeVSKROad55DzgngemgVfzhXOQ25hrOu7zta06gyF/wgWcaNKmOhu1qYIpBBnM1SBwRIlE0lZBywyG/In1wBmgc0zayri0tQiJs1UncCbu863PC9DI3AjQYo6tAWQLMPL3mw2u3IDLwtwHtOYOjhmAOT/3EvC98boK3DLGPUAt8LTxWudE6K5Ptrrrk31GRv/Vsnsw5E+0AadFEzVpUzRqU/PAx8DAA9+8NCvyx32+avSHohuotIHDXZ80374gBWIjKwBD/kQV+tO60eHLftekTR1uPtcwSwEyQD8HnhHAAdwFnpQCsduw/B78IA+448C+QuEAlEhkFthnzGEHB7ABeH9ZBkP+xKPAL0CZ4BrHekYr3ikUzCabH7rrk29bwJlKAY9Lgdh1M4NdDnBngVAx4ABivx4OueuTZwWWMoMJKeRPyMBvgGpjngfqekYrbhYLEEALP1UDXMHmwQFmgMfMXYkqmKu32HAAUiB2E70S2EkFvDKwR2BaAgaKDZelASAtiO+Wge0Cww89oxV/lIpOCsRmgR8Flh0yesW301ip4LI0LojVuoBqgWG65Hj7y64IotUyoAgMd0sOCKJNq+I6ppbnPdP/IRmIC+Ib1oChShCLy4BoXRU9QMVSnSA2K6Pv4+zkWwPARkHsqgxEBYZdcru2uVRkWnz7ZmCXwHJJRm+q7eTCWLRLpC6sd/WmLsjAz+gLs52Oyu2aqFauSj/91VwNHBVYZoBJOTMsZYCwwFgJDMvtWkGnECL13gpIE6lNQxPpjZUCW1hSohlzP9iP3vHbqQXoKWICe4BnJ1KbmEhbbuIXDab/ehK5XetHb25EOq56U29df8W9tMrMrQM+At7IHm8ou02D60720KCkRLtyAavQS45t4VS9KVRv6lvgxYvbygvqS3pvBaqBz4Bmq3gW5BxQKynRuWWABuQB9KbdDs58Ow/0Ap84gRpgXeht54MirwF5SFKiX5pjK258uV0bBDoEcNkyG/dx9LPAP43xh4AngKa2mo68GndDw0FPeNm1rWpQN/oWrNUBDuPCPoqz4nwFHFmRsNyBzLC0CBwEzjnAFVNfAweDnvCKSmJ5upUZlu6p3tR+1ZsaWgO4IeC5oCd8zyroWHx3Xl44AJzA+dTBUm01HXahO0B30BMeEX3e8YT14rby0+hbokHExTxfLRpz1TnBQYGH6DsvL6jA60AA/VTfUVkZvIG+pPYFPeHiHqJbgJoN/x70tnULeqNdYVgS6Iv9tbaajihwHpgMesIF/w3xDz1gT8CribUHAAAAAElFTkSuQmCC") 50% no-repeat;
  background-size: 20px;
}
.set-fontColor .choiceColor{border: 1px solid #e6e6e6;
  background: pink;
  cursor: pointer;
  width: 180px;
  height: 20px;
  margin: 8px 0 0 14px;
}
.set-fontcolor .con{
  padding:5px;
  width: 100%;
  background: #fff;
  position: absolute;
  top: 60px;
  left: 0;
  -webkit-box-shadow: 0 2px 6px 2px #e4e9ee;
  box-shadow: 0 2px 6px 2px #e4e9ee;
  overflow: hidden;
  z-index: 50;
  border-radius: 2px;
}

</style>