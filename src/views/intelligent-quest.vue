<template>
  <div id="intelligent-quest" ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import {loadIntelligentQuestion} from "@/api/server-api";

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
  async created() {
    let data = await this.initData();
    // eslint-disable-next-line no-debugger
    debugger;
    let {X, Y} = data;
    this.option.xAxis.data = X;
    this.option.series[0].data = Y;
    this.drawBar(this.option);
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart); // 窗口大小调整时，重新调整图表大小
  },
  methods: {
    drawBar(option) {
      this.$nextTick(()=>{
        const chartDom = this.$refs.chart;
        this.myChart = this.$echarts.init(chartDom);
        this.myChart.setOption(option);
      })
    },
    async initData() {
      return await loadIntelligentQuestion({query: ''});
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
#intelligent-quest {
  width: 100%;
  height: 100%;
}
</style>