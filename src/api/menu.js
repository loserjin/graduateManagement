import request from '@/utils/request'

// 获取菜单列表
export function getMenuList(params) {
  return request({
    url: '/menu/infos',
    method: 'GET',
    params: { params }
  })
}

// 删除菜单
export function deleteMenuList(data) {
  return request({
    url: '/menu/delect',
    method: 'POST',
    params: data
  })
}

// 菜单修改
export function changeMenu(data) {
  return request({
    url: '/menu/edit',
    method: 'POST',
    data
  })
}

// 增加每日菜单
export function addDailyMenu(data) {
  return request({
    url: '/dailymenu/edit',
    method: 'POST',
    params: data
  })
}
