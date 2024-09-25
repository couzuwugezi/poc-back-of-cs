<template>
  <div id="intelligent-quest" ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import { loadIntelligentQuestion } from "@/api/server-api";
import { exportExcel } from "@/utils/excelUtil";
import moment from "moment";

export default {
  name: "IntelligentQuestion",
  components: {},
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        yAxis: {
          type: "value"
        },
        xAxis: {
          data: []
        },
        series: [{ type: "bar", data: [] }],
        toolbox: {
          feature: {
            // dataView: {show: true, readOnly: true},
            myCustomTool: {
              show: true,
              title: "下载",
              icon: "path://M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zM649.4 473.6L549.1 574v-366.2c0-17.7-14.3-32-32-32s-32 14.3-32 32V574L362.6 473.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0zM192 704c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32s-14.3-32-32-32H224c-17.7 0-32 14.3-32 32z",
              onclick: this.downloadChart
            }
          }
        }
      }
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart); // 在销毁组件时移除监听
  },
  async created() {
    let data = await this.initData();
    let { X, Y } = data;
    this.option.xAxis.data = X;
    this.option.series[0].data = Y;
    this.drawBar(this.option);
  },
  mounted() {
    window.addEventListener("resize", this.resizeChart); // 窗口大小调整时，重新调整图表大小
  },
  methods: {
    async downloadChart() {
      const t = "营销场景智能问数" + moment().format("YYYY-MM-DD");

      const tableColumnExport = [
        {
          title: "类型",
          dataIndex: "type",
          key: "type"
        },
        {
          title: "数值",
          dataIndex: "value",
          key: "value"
        }
      ];

      let list = [];

      let data = await this.initData();
      let { X, Y } = data;
      X.forEach((item, index) => {
        list.push({ type: item, value: Y[index] });
      });

      exportExcel(tableColumnExport, list, `${t}.xlsx`, {
        key: "key"
      });
    },
    drawBar(option) {
      this.$nextTick(() => {
        const chartDom = this.$refs.chart;
        this.myChart = this.$echarts.init(chartDom);
        this.myChart.setOption(option);
      });
    },
    async initData() {
      const id = this.$route.params.id || "";
      return await loadIntelligentQuestion({ query: id });
    },
    resizeChart() {
      // 当窗口尺寸发生变化时，ECharts 会自动调整大小
      if (this.myChart) {
        this.myChart.resize();
      }
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
