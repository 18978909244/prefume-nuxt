import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import moment from 'moment'

export default () => {
  Vue.use(Element, { locale })
  Vue.filter('priceFilter', price => {
    return price ? price.toFixed(2) : 0
  })

  Vue.filter('moment', (time, format) => {
    return moment(time).format(format || 'YYYY-MM-DD hh:mm:ss')
  })
}
