import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    mainRole: ''
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
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MAINROLE: (state, mainRole) => {
    state.mainRole = mainRole
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ 'account': username.trim(), 'password': password, 'isRememberMe': true }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', username)
        setToken(username)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        console.log('获取当前登录用户信息', response)
        if (!response) {
          reject('系统异常，请重新登录')
        }

        const { roles, name, avatar, mainRole } = response
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('您当前无权限，请联系管理员注册权限')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        const roleMap = {
          1: '学生',
          2: '老师',
          3: '家长',
          4: '访客',
          5: '管理员'
        }
        console.log('mainRole', mainRole)
        console.log('mainRoleMap', roleMap[mainRole])
        commit('SET_MAINROLE', roleMap[mainRole])
        resolve(response)
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

