import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers['Authorization'] = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (window.navigator.onLine) {
        return Promise.reject('网络未连接，请联网！')
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      if (response.headers.authorization) {
        return {
          token: response.headers.authorization,
          res
        }
      }
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
