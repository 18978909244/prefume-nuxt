import Vue from 'vue'
import request from './axios'

export default ({ app, store, req }) => {
  Vue.prototype.$http = request
  app.$http = request
}
