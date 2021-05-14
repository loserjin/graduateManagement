import request from '@/utils/request'

// 获取饭堂信息
export function getDiningHall(params) {
  return request({
    url: '/department/infos',
    method: 'GET',
    params: params
  })
}

// 增加饭堂
export function addDiningHall(data) {
  return request({
    url: '/department/edit',
    method: 'POST',
    data
  })
}

// 删除饭堂
export function deleteDiningHall(data) {
  return request({
    url: '/department/delect',
    method: 'POST',
    params: data
  })
}

// 获取饭堂楼层信息
export function getDiningFloor(params) {
  return request({
    url: '/departmentfloor/infos',
    method: 'GET',
    params: params
  })
}

// 增加或编辑饭堂楼层信息
export function addDiningFloor(data) {
  return request({
    url: '/departmentfloor/edit',
    method: 'POST',
    data
  })
}

// 移除删除饭堂楼层信息
export function deleteDiningFloor(data) {
  return request({
    url: '/departmentfloor/delect',
    method: 'POST',
    params: data
  })
}
