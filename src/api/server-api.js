import request from '../utils/request'

export function loadIntelligentQuestion(params) {
    return request({
        url: '/changsha/intelligentData/execSqlMock',
        method: 'get',
        params: params
    })
}