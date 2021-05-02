import request from '@/utils/request'

// 获取全部菜系数据
export function getMenusType(data) {
  return request({
    url: '/type/infos',
    method: 'GET',
    params: data
  })
}

// 获取单个菜系信息
export function getMenuType(data) {
  return request({
    url: '/type/info',
    method: 'GET',
    params: data
  })
}

// 菜系新增或编辑
export function changeMenuType(data) {
  return request({
    url: '/type/edit',
    method: 'POST',
    data
  })
}

// 菜系删除
export function deleteMenuType(data) {
  return request({
    url: '/type/delect',
    method: 'POST',
    data
  })
}
