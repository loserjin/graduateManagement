import request from '@/utils/request'

// 获取公示列表
export function getPublicityList(data) {
  return request({
    url: '/notice/infos',
    method: 'GET',
    params: data
  })
}

// 删除公示
export function deletePublicit(data) {
  return request({
    url: '/notice/delect',
    method: 'POST',
    params: data
  })
}

// 查询单个公示信息
export function getPublicity(data) {
  return request({
    url: '/notice/infos',
    method: 'GET',
    params: data
  })
}

// 编辑公示信息
export function editPublicity(data) {
  return request({
    url: '/notice/edit',
    method: 'POST',
    data
  })
}
