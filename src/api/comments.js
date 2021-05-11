import request from '@/utils/request'

// 评论列表
export function getCommentsList(data) {
  return request({
    url: '/discuss/infos',
    method: 'GET',
    params: data
  })
}

// 删除评论
export function deleteComment(data) {
  return request({
    url: '/discuss/infos',
    method: 'POST',
    data
  })
}
