<template>
  <div style="width: 100%; height: 100%;">
    <!-- 使用 Switch 切换表格和图表 -->
    <el-row style="margin-bottom: 20px;">
      <el-col :span="24">
        <el-switch
            v-model="isTableView"
            active-text="表格展示"
            inactive-text="图表展示"
            @change="handleSwitchChange"
        ></el-switch>
      </el-col>
    </el-row>

    <!-- 表格展示 -->
    <el-table v-if="isTableView" :data="tableData" style="width: 100%; height: 100%" class="full-height-table">
      <el-table-column prop="logtime" label="操作时间"></el-table-column>
      <el-table-column prop="cmd" label="命令内容"></el-table-column>
      <el-table-column prop="agentConnectIP" label="操作主机 IP"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="tagname" label="标签"></el-table-column>
      <el-table-column prop="loginuser" label="登录用户"></el-table-column>
      <el-table-column prop="loginIP" label="登录 IP"></el-table-column>
    </el-table>

    <!-- 柱状图展示 -->
    <div v-if="!isTableView" id="high-risk-operation" ref="chart" class="full-height-chart"></div>
  </div>
</template>

<script>
export default {
  name: "high-risk-operation",
  data() {
    return {
      isTableView: false, // 控制是否展示表格
      tableData: [
        {
          logtime: '2024-09-13 12:00:00',
          cmd: 'ls -l',
          agentConnectIP: '192.168.1.1',
          remark: '查看目录',
          tagname: 'Web Server',
          loginuser: 'admin',
          loginIP: '192.168.1.100',
        },
        {
          logtime: '2024-09-13 12:05:00',
          cmd: 'mkdir test',
          agentConnectIP: '192.168.1.2',
          remark: '创建目录',
          tagname: 'Database Server',
          loginuser: 'root',
          loginIP: '192.168.1.101',
        }
      ],
    };
  },
  mounted() {
    this.initChart(); // 初始化图表
    window.addEventListener('resize', this.resizeChart); // 监听窗口大小变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart); // 移除监听
  },
  methods: {
    handleSwitchChange(value) {
      if (!value) {
        // 如果切换到图表视图，重新渲染图表
        this.$nextTick(() => {
          this.initChart();
        });
      }
    },
    initChart() {
      if (this.isTableView) return; // 切换到图表时才初始化

      const chartDom = this.$refs.chart;
      this.myChart = this.$echarts.init(chartDom);

      const xAxisData = this.tableData.map(item => item.logtime); // 使用 logtime 作为 x 轴数据
      const seriesData = this.tableData.map(item => item.cmd.length); // 用命令长度作为示例数据

      // ECharts 配置
      const option = {
        title: {
          text: '',
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
            name: '命令长度',
            type: 'bar',
            data: seriesData,
          },
        ],
      };

      // 设置图表选项
      this.myChart.setOption(option);
    },
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize(); // 窗口大小调整时，重绘图表
      }
    },
  },
};
</script>

<style>
html, body, #app {
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