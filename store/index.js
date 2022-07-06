import axios from 'axios'

export const state = () => ({
  counter: 0,
  idToken: null,
})

export const getters = {
  idToken: (state) => state.idToken,
}

export const mutations = {
  increment(state) {
    state.counter++
  },
  updateIdToken(state, idToken) {
    state.idToken = idToken
  },
}

export const actions = {
  login({ commit }, authData) {
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHkzcPsloeu2piH2dCB78kZNW_PeLF0tc',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        commit('updateIdToken', response.data.idToken)
      })
  },
  register({ commit }, authData) {
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHkzcPsloeu2piH2dCB78kZNW_PeLF0tc',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        commit('updateIdToken', response.data.idToken)
      })
  },
}
