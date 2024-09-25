<template>
  <div style="width: 100%; height: 100%">
    <!-- 表格展示 -->
    <el-table :data="tableData" style="width: 100%; height: 100%" class="full-height-table">
      <el-table-column prop="logTime" label="操作时间"></el-table-column>
      <el-table-column prop="cmd" label="命令内容"></el-table-column>
      <el-table-column prop="agentConnectIp" label="操作主机 IP"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="tagName" label="标签"></el-table-column>
      <el-table-column prop="loginUser" label="登录用户"></el-table-column>
      <el-table-column prop="loginIp" label="登录 IP"></el-table-column>
    </el-table>

    <!-- 柱状图展示 -->
    <div v-if="!isTableView" id="high-risk-operation" ref="chart" class="full-height-chart"></div>
  </div>
</template>

<script>
import { securityAnalysis, securityAnalysisGroup } from "@/api/server-api";

export default {
  name: "high-risk-operation",
  data() {
    return {
      isTableView: true,
      tableData: [],
      xAxisData: [],
      seriesData: []
    };
  },
  async mounted() {
    if (this.isTableView) {
      this.tableData = await this.initData();
    } else {
      await this.initChart(); // 初始化图表
    }
    window.addEventListener("resize", this.resizeChart); // 监听窗口大小变化
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart); // 移除监听
  },
  methods: {
    async handleSwitchChange(value) {
      if (!value) {
        // 如果切换到图表视图，重新渲染图表
        this.$nextTick(() => {
          this.initChart();
        });
      } else {
        this.tableData = await this.initData();
      }
    },
    async initData() {
      const id = this.$route.params.id || "";
      return await securityAnalysis({ query: id });
    },
    async initChartData() {
      const id = this.$route.params.id || "";
      const type = this.$route.query.type || "";
      console.log("id", id, "type", type);
      let data = (await securityAnalysisGroup({ query: id, type: type })) || [];
      this.xAxisData = Object.keys(data);
      this.seriesData = Object.values(data);
      console.log(this.xAxisData, this.seriesData);
    },
    async initChart() {
      if (this.isTableView) return; // 切换到图表时才初始化

      await this.initChartData();

      const chartDom = this.$refs.chart;
      this.myChart = this.$echarts.init(chartDom);

      const xAxisData = this.xAxisData; // 使用 logTime 作为 x 轴数据
      const seriesData = this.seriesData; // 用命令长度作为示例数据

      // ECharts 配置
      const option = {
        title: {
          text: ""
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {
            rotate: 45 // 旋转 x 轴标签，避免过长重叠
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "命令长度",
            type: "bar",
            data: seriesData
          }
        ]
      };

      // 设置图表选项
      this.myChart.setOption(option);
    },
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize(); // 窗口大小调整时，重绘图表
      }
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
}

.el-row {
  margin-bottom: 10px;
}

.full-height-table {
  flex: 1;
  overflow: auto;
}

.full-height-chart {
  width: 100%;
  flex: 1;
  height: 100%;
}
</style>
