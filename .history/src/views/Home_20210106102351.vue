<template>
  <div class="home">
    <div id="echartsDemo" style="width:1000px;height: 500px;"></div>
    <p @click="goFabric" style="cursor:pointer">前往绘图</p>
    <p @click="goHTMLPoster" style="cursor:pointer">goHTMLPoster</p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let elementById = document.getElementById('echartsDemo')
      let echartsDemo = this.$echarts.init(elementById)
      var xAxisData = [];
      var data1 = [];
      var data2 = [];
      for (var i = 0; i < 200; i++) {
          xAxisData.push('类目' + i);
          data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
          data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
      }

      let option = {
          title: {
              text: '柱状图动画延迟'
          },
          legend: {
              data: ['bar', 'bar2'],
              align: 'left'
          },
          toolbox: {
              // y: 'bottom',
              feature: {
                  magicType: {
                      type: ['stack', 'tiled']
                  },
                  dataView: {},
                  saveAsImage: {
                      pixelRatio: 2
                  }
              }
          },
          tooltip: {},
          xAxis: {
              data: xAxisData,
              silent: false,
              splitLine: {
                  show: false
              }
          },
          yAxis: {
          },
          series: [{
              name: 'bar',
              type: 'bar',
              data: data1,
              animationDelay: function (idx) {
                  return idx * 10;
              }
          }, {
              name: 'bar2',
              type: 'bar',
              data: data2,
              animationDelay: function (idx) {
                return idx * 10 + 100;
              }
          }],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
              return idx * 5;
          }
      };
      echartsDemo.setOption(option)
    },
    goFabric() {
      let id = 1;
      const { href } = this.$router.resolve({
        name: `fabric`,
        params: {
          id: id
        }
      })
      window.open(href, "_blank")
    },
    goHTMLPoster() {
      let id = 1;
      const { href } = this.$router.resolve({
        name: `htmlPoster`,
        params: {
          id: id
        }
      })
      window.open(href, "_blank")
    }
  }
}
</script>
