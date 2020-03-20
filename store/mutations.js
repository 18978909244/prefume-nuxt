import Cookies from 'js-cookie'

export default {
  logout(state) {
    // Store.set('token', '')
    Cookies.set(`${state.projectName}-token`, '')
    state.token = ''
    state.user_info = null
  },
  setData(state, obj) {
    Object.keys(obj).forEach(item => {
      state[item] = obj[item]
    })
  }
}
