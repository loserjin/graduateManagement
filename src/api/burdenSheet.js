import request from '@/utils/request'

// 获取菜谱配料列表
export function getBurdenList(params) {
  return request({
    url: '/component/infos',
    method: 'GET',
    params: { params }
  })
}

// 删除菜单配料
export function deleteBurden(data) {
  return request({
    url: '/component/delect',
    method: 'POST',
    data
  })
}

// 菜单配料模糊查询
export function searchBurden(params) {
  return request({
    url: '/component/info',
    method: 'GET',
    params: { params }
  })
}

// 菜单配料修改
export function changeBurden(data) {
  return request({
    url: 'component/edit',
    method: 'POST',
    data
  })
}
