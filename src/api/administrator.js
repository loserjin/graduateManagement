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
export function getAdminInfo(params) {
  console.log(params)
  return request({
    url: '/admin/info',
    method: 'get',
    params: params
  })
}

// 获取管理员列表
export function getAdminList(params) {
  return request({
    url: '/admin/infos',
    method: 'GET',
    params: { params }
  })
}

// 删除管理员
export function deleteAdmin(data) {
  return request({
    url: `/admin/delect`,
    method: 'POST',
    params: data
  })
}

// 修改管理员信息
export function changeAdminInfo(data) {
  return request({
    url: '/admin/edit',
    method: 'POST',
    data
  })
}

// 管理员模糊搜索
export function searchAdmin(params) {
  return request({
    url: '/admin/infos',
    method: 'GET',
    params: { params }
  })
}

// 管理员退出登录
export function logout(params) {
  return request({
    url: '/logout',
    method: 'GET',
    params: { params }
  })
}
