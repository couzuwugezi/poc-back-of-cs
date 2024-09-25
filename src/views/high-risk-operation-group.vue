<template>
  <div class="container">
    <!-- 柱状图展示 tag_name agent_connect_ip cmd login_user -->
    <div id="high-risk-operation-tag_name" ref="chart_tag-name" class="chart"></div>
    <div id="high-risk-operation-agent_connect_ip" ref="chart_agent-connect-ip" class="chart"></div>
    <div id="high-risk-operation-cmd" ref="chart_cmd" class="chart"></div>
    <div id="high-risk-operation-login_user" ref="chart_login-user" class="chart"></div>
  </div>
</template>

<script>
import {securityAnalysisGroup} from "@/api/server-api";

export default {
  name: "high-risk-operation-group",
  data() {
    return {
      chartsData: {
        "tag-name": {xAxisData: [], seriesData: []},
        "agent-connect-ip": {xAxisData: [], seriesData: []},
        "cmd": {xAxisData: [], seriesData: []},
        "login-user": {xAxisData: [], seriesData: []},
      },
      chartRefs: ["chart_tag-name", "chart_agent-connect-ip", "chart_cmd", "chart_login-user"],
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
      await Promise.all([
        this.initChartData("tag-name"),
        this.initChartData("agent-connect-ip"),
        this.initChartData("cmd"),
        this.initChartData("login-user"),
      ]);
      this.chartRefs.forEach(ref => this.initChart(ref));
    },

    async initChartData(type) {
      const id = this.$route.params.id || "";
      const data = (await securityAnalysisGroup({query: id, type: type.replaceAll("-", "_")})) || {};
      this.chartsData[type].xAxisData = Object.keys(data);
      this.chartsData[type].seriesData = Object.values(data);
    },

    initChart(ref) {
      const chartDom = this.$refs[ref];
      const chartInstance = this.$echarts.init(chartDom);
      const type = ref.split("_")[1]; // 获取数据类型
      const {xAxisData, seriesData} = this.chartsData[type];

      const option = {
        title: {text: type.replaceAll("_", "-")},
        tooltip: {},
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {rotate: 45},
        },
        yAxis: {type: "value"},
        series: [{name: "", type: "bar", data: seriesData}],
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
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh; /* 使容器充满整个屏幕 */
  box-sizing: border-box;
}

.chart {
  flex: 0 0 50%; /* 每个 div 占据50%宽度 */
  height: 50vh; /* 每个 div 高度占屏幕高度的一半 */
  width: 50%;
  box-sizing: border-box;
  padding: 10px; /* 给 div 一点内边距，避免内容靠得太紧 */
}

/* 可选：给每个 div 设置一个背景色以便区分 */
#high-risk-operation-tag_name {
  background-color: #f0f0f0;
}

#high-risk-operation-agent_connect_ip {
  background-color: #e0e0e0;
}

#high-risk-operation-cmd {
  background-color: #d0d0d0;
}

#high-risk-operation-login_user {
  background-color: #c0c0c0;
}
</style>