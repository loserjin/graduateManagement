import request from '@/utils/request'

// 获取菜单列表
export function getBurdenList(params) {
  return request({
    url: '/component/infos',
    method: 'GET',
    params: { params }
  })
}

// 删除菜单
export function deleteMenuList(data) {
  return request({
    url: '/type/delect',
    method: 'POST',
    data
  })
}

// 菜单模糊查询
export function searchMenu(params) {
  return request({
    url: '/type/infos',
    method: 'GET',
    params: { params }

  })
}

// 菜单修改
export function changeMenu(data) {
  return request({
    url: '/type/edit',
    method: 'POST',
    data
  })
}
