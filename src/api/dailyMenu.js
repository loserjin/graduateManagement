import request from '@/utils/request'

// 获取日常菜单
export function getMaterialList(params) {
  return request({
    url: '/dailymenu/infos',
    method: 'GET',
    params: { params }
  })
}

// 增加日常菜单
export function dailyMenu(data) {
  return request({
    url: '/dailymenu/edits',
    method: 'POST',
    data
  })
}

// 移除日常菜单
export function deleteDailyMenu(data) {
  return request({
    url: '/dailymenu/delect',
    method: 'POST',
    data
  })
}

// 日常菜单模糊搜索
export function searchDailyMenu(params) {
  return request({
    url: '/dailymenu/infos',
    method: 'GET',
    params: { params }
  })
}
