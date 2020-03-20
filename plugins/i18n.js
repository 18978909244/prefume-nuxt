import VueI18n from 'vue-i18n'
import Vue from 'vue'
import { Message } from 'element-ui'

Vue.use(VueI18n)
export default ({ app, store }) => {
  Vue.config.errorHandler = function(err, vm, info) {
    Message.error(err.message)
  }
  app.i18n = new VueI18n({
    locale: store.state.locale,
    messages: store.getters.getLanguage,
    silentTranslationWarn: true
  })
}
