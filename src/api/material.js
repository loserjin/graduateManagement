import request from '@/utils/request'

// 获取全部食材进货数据
export function getMaterialList(data) {
  return request({
    url: '/purchase/infos',
    method: 'GET',
    params: data
  })
}

// 获取单个食材进货数据
export function getMaterial(data) {
  return request({
    url: '/purchase/info',
    method: 'GET',
    params: data
  })
}

// 增加食材进货数据
export function addMaterial(data) {
  return request({
    url: '/purchase/edit',
    method: 'POST',
    data
  })
}

// 修改食材进货数据
export function changeMaterial(data) {
  return request({
    url: '/purchase/edit',
    method: 'POST',
    data
  })
}

// 删除食材进货数据
export function deleteMaterial(data) {
  return request({
    url: '/purchase/delect',
    method: 'POST',
    data
  })
}

// 食材搜索
export function searchMaterial(data) {
  return request({
    url: 'purchase/info',
    method: 'GET',
    params: data
  })
}
