<template>
  <div class="container">
    <!-- 柱状图展示 tag_name agent_connect_ip cmd login_user -->
    <div id="high-risk-operation-tag_name" ref="chart_tag_name" class="chart"></div>
    <div id="high-risk-operation-agent_connect_ip" ref="chart_agent_connect_ip" class="chart"></div>
    <div id="high-risk-operation-cmd" ref="chart_cmd" class="chart"></div>
    <div id="high-risk-operation-login_user" ref="chart_login_user" class="chart"></div>
  </div>
</template>

<script>
import {securityAnalysisGroup} from '@/api/server-api'

export default {
  name: "high-risk-operation-group",
  data() {
    return {
      xAxisData_tag_name: [],
      seriesData_tag_name: [],

      xAxisData_agent_connect_ip: [],
      seriesData_agent_connect_ip: [],

      xAxisData_cmd: [],
      seriesData_cmd: [],

      xAxisData_login_user: [],
      seriesData_login_user: []
    };
  },
  async mounted() {
    await this.initChart_tag_name();
    await this.initChart_agent_connect_ip();
    await this.initChart_cmd();
    await this.initChart_login_user();
    window.addEventListener('resize', this.resizeChart); // 监听窗口大小变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart); // 移除监听
  },
  methods: {
    async initChartData_tag_name() {
      const id = this.$route.params.id || '';
      let data = await securityAnalysisGroup({query: id, type: 'tag_name'}) || [];
      this.xAxisData_tag_name = Object.keys(data);
      this.seriesData_tag_name = Object.values(data);
    },
    async initChartData_agent_connect_ip() {
      const id = this.$route.params.id || '';
      let data = await securityAnalysisGroup({query: id, type: 'agent_connect_ip'}) || [];
      this.xAxisData_agent_connect_ip = Object.keys(data);
      this.seriesData_agent_connect_ip = Object.values(data);
    },
    async initChartData_cmd() {
      const id = this.$route.params.id || '';
      let data = await securityAnalysisGroup({query: id, type: 'cmd'}) || [];
      this.xAxisData_cmd = Object.keys(data);
      this.seriesData_cmd = Object.values(data);
    },
    async initChartData_login_user() {
      const id = this.$route.params.id || '';
      let data = await securityAnalysisGroup({query: id, type: 'login_user'}) || [];
      this.xAxisData_login_user = Object.keys(data);
      this.seriesData_login_user = Object.values(data);
    },
    async initChart_tag_name() {
      await this.initChartData_tag_name();

      const chartDom = this.$refs.chart_tag_name;
      this.chart_tag_name = this.$echarts.init(chartDom);

      const xAxisData = this.xAxisData_tag_name;
      const seriesData = this.seriesData_tag_name;

      // ECharts 配置
      const option = {
        title: {
          text: 'tag_name',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            rotate: 45, // 旋转 x 轴标签，避免过长重叠
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: seriesData,
          },
        ],
      };

      // 设置图表选项
      this.chart_tag_name.setOption(option);
    },
    async initChart_agent_connect_ip() {
      await this.initChartData_agent_connect_ip();

      const chartDom = this.$refs.chart_agent_connect_ip;
      this.chart_agent_connect_ip = this.$echarts.init(chartDom);

      const xAxisData = this.xAxisData_agent_connect_ip;
      const seriesData = this.seriesData_agent_connect_ip;

      // ECharts 配置
      const option = {
        title: {
          text: 'agent_connect_ip',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            rotate: 45, // 旋转 x 轴标签，避免过长重叠
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: seriesData,
          },
        ],
      };

      // 设置图表选项
      this.chart_agent_connect_ip.setOption(option);
    },
    async initChart_cmd() {
      await this.initChartData_cmd();

      const chartDom = this.$refs.chart_cmd;
      this.chart_cmd = this.$echarts.init(chartDom);

      const xAxisData = this.xAxisData_cmd;
      const seriesData = this.seriesData_cmd;

      // ECharts 配置
      const option = {
        title: {
          text: 'cmd',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            rotate: 45, // 旋转 x 轴标签，避免过长重叠
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: seriesData,
          },
        ],
      };

      // 设置图表选项
      this.chart_cmd.setOption(option);
    },
    async initChart_login_user() {
      await this.initChartData_login_user();

      const chartDom = this.$refs.chart_login_user;
      this.chart_login_user = this.$echarts.init(chartDom);

      const xAxisData = this.xAxisData_login_user;
      const seriesData = this.seriesData_login_user;

      // ECharts 配置
      const option = {
        title: {
          text: 'login_user',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            rotate: 45, // 旋转 x 轴标签，避免过长重叠
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: seriesData,
          },
        ],
      };

      // 设置图表选项
      this.chart_login_user.setOption(option);
    },
    resizeChart() {
      if (this.chart_tag_name) {
        this.chart_tag_name.resize(); // 窗口大小调整时，重绘图表
      }
      if (this.chart_agent_connect_ip) {
        this.chart_agent_connect_ip.resize(); // 窗口大小调整时，重绘图表
      }
      if (this.chart_cmd) {
        this.chart_cmd.resize(); // 窗口大小调整时，重绘图表
      }
      if (this.chart_login_user) {
        this.chart_login_user.resize(); // 窗口大小调整时，重绘图表
      }
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
  height: 50vh;  /* 每个 div 高度占屏幕高度的一半 */
  width: 50%;
  box-sizing: border-box;
  padding: 10px; /* 给 div 一点内边距，避免内容靠得太紧 */
}

/* 可选：给每个 div 设置一个背景色以便区分 */
#high-risk-operation-tag_name { background-color: #f0f0f0; }
#high-risk-operation-agent_connect_ip { background-color: #e0e0e0; }
#high-risk-operation-cmd { background-color: #d0d0d0; }
#high-risk-operation-login_user { background-color: #c0c0c0; }
</style>