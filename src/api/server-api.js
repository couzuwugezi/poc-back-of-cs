import request from "../utils/request";

export function loadIntelligentQuestion(params) {
  return request({
    url: "/changsha/intelligentData/execSql",
    method: "get",
    params: params
  });
}

export function securityAnalysis(params) {
  return request({
    url: "/changsha/intelligentData/securityAnalysis",
    method: "get",
    params: params
  });
}

export function securityAnalysisGroup(params) {
  return request({
    url: "/changsha/intelligentData/securityAnalysisGroup",
    method: "get",
    params: params
  });
}
