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
            <p class="btn-family-item" v-for="(item, index) in fontFamily" :key="index" :style="'font-family:'+item.fontFamily" @click="selectFontFamily(item)">
              {{item.fontName}}
            </p>
          </div>
        </div>
        <!-- 设置字号 -->
        <!-- <div class="set-fontsize">
          <div class="showtext">
            <p>14</p>
            <i class="fa fa-caret-down"></i>
          </div>
          <div class="con">
            <p class="btn-size-item" data-size="14">14</p>
            <p class="btn-size-item" data-size="20">20</p>
            <p class="btn-size-item" data-size="50">50</p>
            <p class="btn-size-item" data-size="100">100</p>
          </div>
        </div> -->
        <!-- 设置文字颜色 -->
        <!-- <div class="set-fontcolor">
          <div class="commonSelect colorsArea">
            <div class="__moreColorsPreinstall">
              <div class="__moreColorIcon" style="position: relative; float: right;"></div>
            </div>
            <div class="choiceColor" style="background: rgb(74, 74, 74);"></div>
          </div>
          <div class="con clearfix" style="display:none;">
            <div class="btn-color-item active" style="background: rgb(0, 0, 0);"></div>
            <div class="btn-color-item" style="background: rgb(51, 51, 51);"></div>
            <div class="btn-color-item" style="background: rgb(102, 102, 102);"></div>
            <div class="btn-color-item" style="background: rgb(153, 153, 153);"></div>
            <div class="btn-color-item" style="background: rgb(204, 204, 204);"></div>
            <div class="btn-color-item" style="background: rgb(255, 255, 255);"></div>
            <div class="btn-color-item" style="background: rgb(182, 29, 28);"></div>
            <div class="btn-color-item" style="background: rgb(221, 16, 16);"></div>
            <div class="btn-color-item" style="background: rgb(244, 67, 54);"></div>
            <div class="btn-color-item" style="background: rgb(239, 154, 154);"></div>
            <div class="btn-color-item" style="background: rgb(255, 205, 211);"></div>
            <div class="btn-color-item" style="background: rgb(255, 235, 238);"></div>
            <div class="btn-color-item" style="background: rgb(136, 14, 79);"></div>
            <div class="btn-color-item" style="background: rgb(194, 24, 91);"></div>
            <div class="btn-color-item" style="background: rgb(233, 31, 98);"></div>
            <div class="btn-color-item" style="background: rgb(244, 143, 177);"></div>
            <div class="btn-color-item" style="background: rgb(248, 187, 208);"></div>
            <div class="btn-color-item" style="background: rgb(253, 228, 236);"></div>
            <div class="btn-color-item" style="background: rgb(74, 20, 140);"></div>
            <div class="btn-color-item" style="background: rgb(123, 31, 162);"></div>
            <div class="btn-color-item" style="background: rgb(156, 38, 176);"></div>
            <div class="btn-color-item" style="background: rgb(206, 147, 216);"></div>
            <div class="btn-color-item" style="background: rgb(225, 190, 231);"></div>
            <div class="btn-color-item" style="background: rgb(243, 229, 245);"></div>
            <div class="btn-color-item" style="background: rgb(49, 27, 146);"></div>
            <div class="btn-color-item" style="background: rgb(81, 45, 168);"></div>
            <div class="btn-color-item" style="background: rgb(103, 58, 183);"></div>
            <div class="btn-color-item" style="background: rgb(179, 157, 219);"></div>
            <div class="btn-color-item" style="background: rgb(208, 196, 233);"></div>
            <div class="btn-color-item" style="background: rgb(237, 231, 246);"></div>
            <div class="btn-color-item" style="background: rgb(26, 35, 126);"></div>
            <div class="btn-color-item" style="background: rgb(48, 64, 159);"></div>
            <div class="btn-color-item" style="background: rgb(62, 81, 181);"></div>
            <div class="btn-color-item" style="background: rgb(159, 168, 218);"></div>
            <div class="btn-color-item" style="background: rgb(197, 202, 233);"></div>
            <div class="btn-color-item" style="background: rgb(232, 234, 246);"></div>
            <div class="btn-color-item" style="background: rgb(13, 71, 161);"></div>
            <div class="btn-color-item" style="background: rgb(25, 118, 210);"></div>
            <div class="btn-color-item" style="background: rgb(33, 150, 243);"></div>
            <div class="btn-color-item" style="background: rgb(144, 202, 249);"></div>
            <div class="btn-color-item" style="background: rgb(187, 222, 251);"></div>
            <div class="btn-color-item" style="background: rgb(227, 242, 253);"></div>
            <div class="btn-color-item" style="background: rgb(1, 96, 100);"></div>
            <div class="btn-color-item" style="background: rgb(0, 151, 167);"></div>
            <div class="btn-color-item" style="background: rgb(3, 188, 212);"></div>
            <div class="btn-color-item" style="background: rgb(129, 212, 250);"></div>
            <div class="btn-color-item" style="background: rgb(178, 234, 242);"></div>
            <div class="btn-color-item" style="background: rgb(224, 247, 250);"></div>
            <div class="btn-color-item" style="background: rgb(0, 77, 63);"></div>
            <div class="btn-color-item" style="background: rgb(0, 121, 107);"></div>
            <div class="btn-color-item" style="background: rgb(0, 150, 136);"></div>
            <div class="btn-color-item" style="background: rgb(127, 222, 234);"></div>
            <div class="btn-color-item" style="background: rgb(178, 223, 219);"></div>
            <div class="btn-color-item" style="background: rgb(225, 242, 241);"></div>
            <div class="btn-color-item" style="background: rgb(27, 94, 32);"></div>
            <div class="btn-color-item" style="background: rgb(55, 142, 60);"></div>
            <div class="btn-color-item" style="background: rgb(76, 175, 80);"></div>
            <div class="btn-color-item" style="background: rgb(165, 214, 167);"></div>
            <div class="btn-color-item" style="background: rgb(199, 230, 201);"></div>
            <div class="btn-color-item" style="background: rgb(233, 244, 233);"></div>
            <div class="btn-color-item" style="background: rgb(51, 105, 30);"></div>
            <div class="btn-color-item" style="background: rgb(105, 159, 56);"></div>
            <div class="btn-color-item" style="background: rgb(139, 195, 73);"></div>
            <div class="btn-color-item" style="background: rgb(197, 225, 165);"></div>
            <div class="btn-color-item" style="background: rgb(221, 237, 200);"></div>
            <div class="btn-color-item" style="background: rgb(240, 248, 233);"></div>
            <div class="btn-color-item" style="background: rgb(130, 119, 24);"></div>
            <div class="btn-color-item" style="background: rgb(175, 180, 42);"></div>
            <div class="btn-color-item" style="background: rgb(205, 220, 56);"></div>
            <div class="btn-color-item" style="background: rgb(230, 238, 156);"></div>
            <div class="btn-color-item" style="background: rgb(240, 244, 195);"></div>
            <div class="btn-color-item" style="background: rgb(248, 251, 231);"></div>
            <div class="btn-color-item" style="background: rgb(245, 127, 22);"></div>
            <div class="btn-color-item" style="background: rgb(251, 191, 46);"></div>
            <div class="btn-color-item" style="background: rgb(254, 235, 60);"></div>
            <div class="btn-color-item" style="background: rgb(255, 245, 157);"></div>
            <div class="btn-color-item" style="background: rgb(255, 249, 196);"></div>
            <div class="btn-color-item" style="background: rgb(255, 253, 231);"></div>
            <div class="btn-color-item" style="background: rgb(255, 111, 0);"></div>
            <div class="btn-color-item" style="background: rgb(254, 160, 1);"></div>
            <div class="btn-color-item" style="background: rgb(255, 193, 3);"></div>
            <div class="btn-color-item" style="background: rgb(255, 204, 128);"></div>
            <div class="btn-color-item" style="background: rgb(255, 236, 178);"></div>
            <div class="btn-color-item" style="background: rgb(255, 248, 225);"></div>
            <div class="btn-color-item" style="background: rgb(230, 81, 0);"></div>
            <div class="btn-color-item" style="background: rgb(245, 124, 0);"></div>
            <div class="btn-color-item" style="background: rgb(255, 152, 0);"></div>
            <div class="btn-color-item" style="background: rgb(255, 204, 128);"></div>
            <div class="btn-color-item" style="background: rgb(255, 236, 178);"></div>
            <div class="btn-color-item" style="background: rgb(255, 248, 225);"></div>
            <div class="btn-color-item" style="background: rgb(191, 54, 13);"></div>
            <div class="btn-color-item" style="background: rgb(230, 73, 25);"></div>
            <div class="btn-color-item" style="background: rgb(255, 119, 82);"></div>
            <div class="btn-color-item" style="background: rgb(255, 171, 145);"></div>
            <div class="btn-color-item" style="background: rgb(255, 204, 188);"></div>
            <div class="btn-color-item" style="background: rgb(251, 233, 232);"></div>
            <div class="btn-color-item" style="background: rgb(62, 39, 35);"></div>
            <div class="btn-color-item" style="background: rgb(93, 64, 55);"></div>
            <div class="btn-color-item" style="background: rgb(121, 85, 72);"></div>
            <div class="btn-color-item" style="background: rgb(188, 170, 164);"></div>
            <div class="btn-color-item" style="background: rgb(215, 204, 201);"></div>
            <div class="btn-color-item" style="background: rgb(239, 235, 233);"></div>
            <div class="btn-color-item" style="background: rgb(38, 50, 56);"></div>
            <div class="btn-color-item" style="background: rgb(69, 90, 100);"></div>
            <div class="btn-color-item" style="background: rgb(96, 125, 139);"></div>
            <div class="btn-color-item" style="background: rgb(144, 163, 174);"></div>
            <div class="btn-color-item" style="background: rgb(207, 216, 221);"></div>
            <div class="btn-color-item" style="background: rgb(237, 239, 241);"></div></div>
        </div> -->
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
      openedFontFamily: false
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
.set-fontfamily{position: relative;}
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

.set-fontsize{position: relative;}
.set-fontsize .showtext{
  height: 38px;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
  line-height: 38px;
  cursor: pointer;
  position: relative;
}
.set-fontsize .showtext p{line-height:38px;padding:0 10px;overflow: hidden;box-sizing:border-box;}
.set-fontsize .showtext i{
  position: absolute;
  top: 50%;
  margin-top:-8px;
  color: #333;
  right: 6px;
  font-size: 16px;
}
.set-fontsize .showtext:hover{border:1px solid #ff4555;}
.set-fontsize .showtext:hover i{color:#ff4555}

.set-fontsize .con{
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
.set-fontsize .con p{
  width: 100%;
  height: 38px;
  line-height:38px;
  padding:0 10px;
  cursor: pointer;
}
.set-fontsize .con p:hover{background-color:#efefef;}

.commonSelect{
  height: 38px;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
  line-height: 38px;
  cursor: pointer;
}
.commonSelect:hover{border:1px solid #ff4555;}
.__moreColorIcon{
  position:absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 36px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAEhklEQVRYw8WZX2hbVRzHP/cuDbj2Vli3uNarvuhqGcjoFgobttlAuoXa4YvdXGAo2j/qmikImgcfVOrAh1HX1rbIxBHt3gYyO0XY0qrD2gVGoKwbPujsVt3WCU26zCbN9eHeq2l677lJSeoX8pDz++bcT36593fO70RiFUruPSkDXmA3sAPYAjwMlBuWhfT9UzeAa8Al4AIwqUQimUKvJRUIpgKvAYeAR0Te9P1TuUO/A18A/UokMlNUwOTek1XAe8DLgDufz1gAmloEPgXeVSKROad55DzgngemgVfzhXOQ25hrOu7zta06gyF/wgWcaNKmOhu1qYIpBBnM1SBwRIlE0lZBywyG/In1wBmgc0zayri0tQiJs1UncCbu863PC9DI3AjQYo6tAWQLMPL3mw2u3IDLwtwHtOYOjhmAOT/3EvC98boK3DLGPUAt8LTxWudE6K5Ptrrrk31GRv/Vsnsw5E+0AadFEzVpUzRqU/PAx8DAA9+8NCvyx32+avSHohuotIHDXZ80374gBWIjKwBD/kQV+tO60eHLftekTR1uPtcwSwEyQD8HnhHAAdwFnpQCsduw/B78IA+448C+QuEAlEhkFthnzGEHB7ABeH9ZBkP+xKPAL0CZ4BrHekYr3ikUzCabH7rrk29bwJlKAY9Lgdh1M4NdDnBngVAx4ABivx4OueuTZwWWMoMJKeRPyMBvgGpjngfqekYrbhYLEEALP1UDXMHmwQFmgMfMXYkqmKu32HAAUiB2E70S2EkFvDKwR2BaAgaKDZelASAtiO+Wge0Cww89oxV/lIpOCsRmgR8Flh0yesW301ip4LI0LojVuoBqgWG65Hj7y64IotUyoAgMd0sOCKJNq+I6ppbnPdP/IRmIC+Ib1oChShCLy4BoXRU9QMVSnSA2K6Pv4+zkWwPARkHsqgxEBYZdcru2uVRkWnz7ZmCXwHJJRm+q7eTCWLRLpC6sd/WmLsjAz+gLs52Oyu2aqFauSj/91VwNHBVYZoBJOTMsZYCwwFgJDMvtWkGnECL13gpIE6lNQxPpjZUCW1hSohlzP9iP3vHbqQXoKWICe4BnJ1KbmEhbbuIXDab/ehK5XetHb25EOq56U29df8W9tMrMrQM+At7IHm8ou02D60720KCkRLtyAavQS45t4VS9KVRv6lvgxYvbygvqS3pvBaqBz4Bmq3gW5BxQKynRuWWABuQB9KbdDs58Ow/0Ap84gRpgXeht54MirwF5SFKiX5pjK258uV0bBDoEcNkyG/dx9LPAP43xh4AngKa2mo68GndDw0FPeNm1rWpQN/oWrNUBDuPCPoqz4nwFHFmRsNyBzLC0CBwEzjnAFVNfAweDnvCKSmJ5upUZlu6p3tR+1ZsaWgO4IeC5oCd8zyroWHx3Xl44AJzA+dTBUm01HXahO0B30BMeEX3e8YT14rby0+hbokHExTxfLRpz1TnBQYGH6DsvL6jA60AA/VTfUVkZvIG+pPYFPeHiHqJbgJoN/x70tnULeqNdYVgS6Iv9tbaajihwHpgMesIF/w3xDz1gT8CribUHAAAAAElFTkSuQmCC") 50% no-repeat;
  background-size: 20px;
}
.choiceColor{border: 1px solid #e6e6e6;
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
.set-fontcolor .con .btn-color-item {
  width: 32px;
  height: 22px;
  border-radius: 2px;
  border: 1px solid #eaecf3;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  float:left;
  margin:3px;
}
.set-fontcolor .con .btn-color-item.active:after{
  content: "";
  position: absolute;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAABoElEQVQ4T52TzWoTURTHf2PV1I8gVLCDi2Qu2V3O7IU8haviV9/AVty5KLa49bO16gN0ofgI3Upe4M4wi8DMzaJBQUTREoLayIGZMoRYiX8YLhz+8zsf99yA/1MAnAZOAb+A3xqYV/rPBeAycBb4CnyZF1RBwn6//yAMw2vNZvM6MJgHdAzJ83zDGLOaZdmutfYxcFCBFoAzwBHwE5hM9au+i8BynucPjTG3syx7Y619AnwEDtWgkKVGo7E0Ho8V8hn4XoNVkLCE3Mqy7LW19inwCfihXjXpwFqj0Wh/OBx+6HQ6j8osClNpJWFRFJtRFN1M0/SViDyrQ9RUXeNV59x9EVn33r81xmyWRm11uSiKrSiKbqRpuisiz6t26iNQkH7nNKtz7p6I3PXevzPGbGkm7/1Gu91WyEsReTELUlVUnec1u3NuXUTWBoPB+yAIjlqt1kqSJDtxHG//DVIHTcPWtE0NJkmyHcfxzkmQaVAddqXX692ZTCZBt9vdK+d1OGMtjrdk1kJqbBG4VM7vGzA6CTKrovoe6oNU6c39U38AQ6qXH07dNzMAAAAASUVORK5CYII=);
  width: 18px;
  height: 14px;
  top: 3px;
  left: 5px;
  z-index: 1;
}
</style>