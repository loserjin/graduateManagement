import request from '@/utils/request'

// 首页饭堂信息获取
export function getCanteensMess(data) {
  return request({
    url: '/info/departmentinfos',
    method: 'GET',
    params: data
  })
}

// 首页用户信息获取
export function getUsersList(data) {
  return request({
    url: '/info/userinfos',
    method: 'GET',
    params: data
  })
}
