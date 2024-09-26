<template>
  <div id="high-risk-operation" ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import { securityAnalysisGroup } from "@/api/server-api";

export default {
  name: "high-risk-operation-group",
  data() {
    return {
      xAxisData: [],
      seriesData: [],
      chartRefs: ["chart"]
    };
  },
  async mounted() {
    await this.initCharts();
    window.addEventListener("resize", this.resizeCharts);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeCharts);
  },
  methods: {
    async initCharts() {
      const type = this.$route.query.type || "";
      await this.initChartData(type);
      this.chartRefs.forEach(ref => this.initChart(ref));
    },

    async initChartData(type) {
      const id = this.$route.params.id || "";
      const data = (await securityAnalysisGroup({ query: id, type })) || {};
      this.xAxisData = Object.keys(data);
      this.seriesData = Object.values(data);
    },

    initChart(ref) {
      const chartDom = this.$refs[ref];
      const chartInstance = this.$echarts.init(chartDom);
      const type = ref.split("_")[1]; // 获取数据类型
      const xAxisData = this.xAxisData;
      const seriesData = this.seriesData;

      const option = {
        title: { text: type },
        tooltip: {},
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: { rotate: 45 }
        },
        yAxis: { type: "value" },
        series: [{ name: "", type: "bar", data: seriesData }]
      };

      chartInstance.setOption(option);
      chartDom.__chartInstance__ = chartInstance; // 保存实例
    },

    resizeCharts() {
      this.chartRefs.forEach(ref => {
        const chartDom = this.$refs[ref];
        if (chartDom && chartDom.__chartInstance__) {
          chartDom.__chartInstance__.resize();
        }
      });
    }
  }
};
</script>

<style>
/* 确保 html 和 body 高度为 100% */
html,
body,
#app {
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
