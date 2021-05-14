import { getAdminInfo } from '@/api/administrator.js'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { login, logout } from '@/api/administrator.js'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    adminId: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ADMINID: (state, adminId) => {
    state.adminId = adminId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { adminName, adminPwd, adminRole } = userInfo
    return new Promise((resolve, reject) => {
      login({
        adminName: adminName.trim(),
        adminPwd: adminPwd.trim(),
        adminRole: adminRole
      })
        .then(response => {
          const { res, token } = response
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('personalMess', res.data)
          sessionStorage.setItem('adminRole', res.data.adminRole)
          sessionStorage.setItem('adminName', res.data.adminName)
          sessionStorage.setItem('adminId', res.data.adminId)
          commit('SET_TOKEN', token)
          commit('SET_ADMINID', res.data.adminId)
          commit('SET_NAME', res.data.adminName)
          setToken(token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    const mess = sessionStorage.getItem('personalMess')
    const adminRole = mess?.adminRole
    return new Promise((resolve, reject) => {
      const hasInfo = 'hasInfo'
      sessionStorage.setItem('hasInfo', hasInfo)
      const data = { hasInfo, adminRole }
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('adminId')
          sessionStorage.removeItem('adminName')
          sessionStorage.removeItem('personalMess')
          sessionStorage.removeItem('hasInfo')
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
