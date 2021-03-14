import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 增加管理员
export function addRegister(data) {
  return request({
    url: '/admin/edit',
    method: 'post',
    data
  })
}

// 获取管理员个人信息
export function getAdminInfo(data) {
  return request({
    url: '/admin/infos',
    method: 'get',
    params: { data }
  })
}

// 获取管理员列表
export function getAdminList(data) {
  return request({
    url: '',
    method: ''

  })
}

// 删除管理员
export function deleteAdmin(data) {
  return request({
    url: '',
    method: ''
  })
}

// 修改管理员信息
export function changeAdminInfo(data) {
  return request({
    url: '',
    method: ''
  })
}

// 管理员模糊搜索
export function searchAdmin(data) {
  return request({
    url: '',
    method: ''
  })
}
