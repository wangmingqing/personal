import request from '@/utils/request'

// 测试接口
export function test(){
    return request({
        url: '/string',
        method: 'GET'
    })
}