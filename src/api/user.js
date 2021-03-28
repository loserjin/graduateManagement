import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/admin/info',
    method: 'GET',
    params: { params }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'GET'
  })
}

// 查看用户信息
export function checkUserInfo(data) {
  return request({
    url: '',
    method: ''
  })
}
