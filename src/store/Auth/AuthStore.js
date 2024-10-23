// src/store/Auth/AuthStore.js

import {
  resetPassword,
  setPassword,
  login,
  register,
  registerBusiness
} from '../../Services/Auth/AuthService'
const state = () => ({
  loading: false,
  successMessage: '',
  errorMessage: '',
  token: localStorage.getItem('token') || null,
  user: { role: null, userId: null }
})
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  LOGOUT(state) {
    state.token = null
    state.user = { role: null, userId: null } // Reset user state

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  RESET_PASSWORD_REQUEST(state) {
    state.loading = true
    state.successMessage = ''

    state.errorMessage = ''
  },
  RESET_PASSWORD_SUCCESS(state, message) {
    state.loading = false
    state.successMessage = message
  },
  RESET_PASSWORD_FAILURE(state, error) {
    state.loading = false
    state.errorMessage = error
  },
  SET_PASSWORD_REQUEST(state) {
    state.loading = true
    state.successMessage = ''
    state.errorMessage = ''
  },

  SET_PASSWORD_SUCCESS(state, message) {
    state.loading = false
    state.successMessage = message
  },
  SET_PASSWORD_FAILURE(state, error) {
    state.loading = false
    state.errorMessage = error
  },

  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  CLEAR_MESSAGES(state) {
    state.successMessage = ''
    state.errorMessage = ''
  }
}
const actions = {
  async forgotPassword({ commit }, email) {
    commit('RESET_PASSWORD_REQUEST')

    try {
      const response = await resetPassword(email)

      console.log(response)

      commit(
        'RESET_PASSWORD_SUCCESS',
        response.message || 'Password reset link has been sent to your email.'
      )
    } catch (error) {
      commit('RESET_PASSWORD_FAILURE', error.message || 'An error occurred. Please try again.')
    }
  },

  async setPassword({ commit }, payload) {
    commit('SET_PASSWORD_REQUEST')

    try {
      const response = await setPassword(payload)

      console.log(response)

      commit('SET_PASSWORD_SUCCESS', response.message || 'Your password has been successfully set.')
    } catch (error) {
      commit('SET_PASSWORD_FAILURE', error.message || 'An error occurred. Please try again.')
    }
  },
  async login({ commit }, credentials) {
    try {
      const { access_token, role, permissions } = await login(credentials) // Call the login service
      commit('SET_TOKEN', access_token)
      commit('SET_USER', { role, permissions }) // Store role and permissions in the user state
      return { role, permissions: permissions || [] }
    } catch (error) {
      console.error('Login error:', error.message)
      throw new Error(error.message)
    }
  },
  async register({ commit }, formData) {
    try {
      const { access_token, user } = await register(formData)
      commit('SET_TOKEN', access_token)
      commit('SET_USER', user)
      return user
    } catch (error) {
      console.error('Registration error:', error.message)
      throw new Error(error.message)
    }
  },
  async registerBusiness({ commit }, formData) {
    try {
      const response = await registerBusiness(formData)
      return response // Return the response if needed
    } catch (error) {
      console.error('Business registration error:', error.message)
      throw new Error(error.message)
    }
  },
  logout({ commit }) {
    commit('LOGOUT')
  }
}

const getters = {
  isLoading: (state) => state.loading,
  successMessage: (state) => state.successMessage,
  errorMessage: (state) => state.errorMessage,
  isAdmin: (state) => state.user.role === 'Admin',
  isCustomer: (state) => state.user.role === 'Customer',
  isRestaurantOwner: (state) => state.user.role === 'Restaurant Owner'
}

export default {
  namespaced: true,

  state,

  mutations,

  actions,

  getters
}
