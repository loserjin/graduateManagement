import request from '@/utils/request'

// 获取订单列表
export function getOrderList(data) {
  return request({
    url: '/userorder/infos',
    method: 'GET',
    params: data
  })
}

// 获取订单列表
export function getOrderLDetail(data) {
  return request({
    url: '/userorderdetail/infos',
    method: 'GET',
    params: data
  })
}
