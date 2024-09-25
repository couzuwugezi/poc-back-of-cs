<template>
  <el-table :data="tableData" style="width: 100%; height: 100%" class="full-height-table">
    <el-table-column prop="id" label="id" v-show="false"></el-table-column>
    <el-table-column prop="timestamp" label="时间"></el-table-column>
    <el-table-column prop="actionAlias" label="请求名称"></el-table-column>
    <el-table-column prop="response" label="响应时间"></el-table-column>
<!--    <el-table-column prop="" label="状态"></el-table-column>-->
    <el-table-column prop="instanceName" label="入口实例"></el-table-column>
<!--    <el-table-column prop="" label="交易结果"></el-table-column>-->
    <el-table-column prop="icopSit" label="icop_sit_流水"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "trouble-emergency-treatment",
  data(){
    return {
      tableData: [],
    }
  },
  mounted() {

  },
  methods:{
  }
}
</script>



<style scoped>

</style>