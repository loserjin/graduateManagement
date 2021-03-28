import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      config.headers['Authorization'] = `Bearer${store.state.user.token}`
      // config.headers['X-Token'] = getToken()
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
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已经处于非登录状态，请重新登录', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
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
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
