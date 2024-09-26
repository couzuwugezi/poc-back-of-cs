<template>
  <el-descriptions class="margin-top" title="" :column="3" border>
    <!--    <template slot="extra">-->
    <!--      <el-button type="primary" size="small">操作</el-button>-->
    <!--    </template>-->
    <el-descriptions-item>
      <template slot="label">接口名称</template>
      {{ formData.actionAlias }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">事物 ID</template>
      {{ formData.actionId }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">请求类型</template>
      {{ formData.actionType }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">应用模块</template>
      {{ formData.applicationName }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">业务系统名称</template>
      {{ formData.bizSystemName }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">实例名称</template>
      {{ formData.instanceName }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">APM 数据</template>
      {{ formData.apmData }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { faultmanageDetail } from "@/api/server-api.js";
export default {
  name: "trouble-emergency-treatment",
  data() {
    return {
      formData: {
        actionAlias: "",
        actionId: "",
        actionType: "",
        applicationName: "",
        bizSystemName: "",
        instanceName: "",
        apmData: ""
      }
    };
  },
  async created() {
    let data = await faultmanageDetail();
    console.log("faultmanageDetail", data);
    this.formData = data;
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped></style>
