<template>
  <div id="chart" ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
// import {loadIntelligentQuestion} from "@/api/server-api";

export default {
  name: 'IntelligentQuestion',
  components: {},
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        yAxis: {},
        xAxis: {
          data: []
        },
        series: [{type: 'bar', data: []}]
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart); // 在销毁组件时移除监听
  },
  created() {
    // eslint-disable-next-line no-debugger
    debugger;
    // let {
    //   xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //   yData = [23, 24, 18, 25, 27, 28, 25]
    // } = loadIntelligentQuestion();

    let xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let yData = [23, 24, 18, 25, 27, 28, 25]

    console.log("38", xData, yData)
    this.option.xAxis.data = xData;
    this.option.series[0].data = yData;
    console.log("41", this.option)
  },
  mounted() {
    console.log("44", this.option)
    this.drawBar(this.option);
    window.addEventListener('resize', this.resizeChart); // 窗口大小调整时，重新调整图表大小
  },
  methods: {
    drawBar(option) {
      const chartDom = this.$refs.chart;
      this.myChart = this.$echarts.init(chartDom);
      this.myChart.setOption(option);
    },
    resizeChart() {
      // 当窗口尺寸发生变化时，ECharts 会自动调整大小
      if (this.myChart) {
        this.myChart.resize();
      }
    }
  }
}
</script>
<style>
/* 确保 html 和 body 高度为 100% */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 设置组件根元素充满整个页面 */
#chart {
  width: 100%;
  height: 100%;
}
</style>