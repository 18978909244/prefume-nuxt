export default function({ store, route, redirect, req }) {
  // const whiteList = [
  //   '/login',
  //   '/detail',
  //   '/discuss',
  //   '/search',
  //   '/register',
  //   '/category',
  //   '/topic',
  //   '/'
  // ]
  // const routePath = route.path
  // store.commit('setData', {
  //   currentPage: routePath
  // })
  // const is_login = store.getters.is_login
  // if (
  //   !is_login &&
  //   routePath !== '/' &&
  //   !whiteList.some(link => routePath.includes(link))
  // ) {
  //   return redirect('../login?redirect=' + routePath)
  // }
  // return true
}
