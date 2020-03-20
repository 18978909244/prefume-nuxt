import { Message } from 'element-ui'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading
} from './axiosInitHelper'

export default function({ store, redirect, app: { $axios } }) {
  $axios.defaults.withCredentials = true
  $axios.defaults.baseURL =
    process.env.NODE_ENV === 'production'
      ? `http://47.105.144.181:3001/${store.state.projectName}`
      : `http://localhost:3001/${store.state.projectName}`
  $axios.defaults.timeout = 10000
  $axios.interceptors.request.use(
    config => {
      const token = `${store.state.projectName}-token`
      // config.withCredentials = true
      config.headers[token] = store.state.token
      config.headers['client-type'] = 1
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  $axios.interceptors.response.use(
    function(response) {
      tryHideFullScreenLoading()
      const res = response.data
      if (res.code !== 200) {
        Message.error(res.data)
        return Promise.reject(res.data)
      }
      // 对响应数据做点什么
      return response.data
    },
    function(error) {
      console.log(error)
      Message({
        message: '遇到错误了',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
    showFullScreenLoading()
  })

  $axios.onError(error => {
    console.log(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
