import { logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { login } from '@/api/administrator.js'

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
  RESET_STATE: (state) => {
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
      login({ adminName: adminName.trim(), adminPwd: adminPwd, adminRole: adminRole }).then(response => {
        const { res, token } = response
        commit('SET_TOKEN', token)
        commit('SET_ADMINID', res.data.adminId)
        commit('SET_NAME', res.data.adminName)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.adminId).then(response => {
        const { data } = this.$store.getters
        if (!data) {
          return reject('账号密码错误，请重新登录.')
        }
        const { name, avatar, adminId } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ADMINID', adminId)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
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

