import moment from 'moment'
import _ from 'lodash'

const getters = {
  cookieName: state => `${state.projectName}-token`,
  is_login: state => state.user_info !== null,
  is_mobile: state => state.user_info && state.user_info.mobile,
  is_email: state =>
    state.user_info &&
    state.user_info.user_email &&
    state.user_info.user_email.is_avaiable,
  is_github: state => state.user_info && state.user_info.github_user,
  getName: state => type => {
    return state.setting.length > 0
      ? state.setting.find(i => i.code === type)
        ? state.setting.find(i => i.code === type).value
        : `{{${type}}}`
      : `{{${type}}}`
  },
  getList: state => type => {
    return state.setting.length > 0
      ? state.setting.find(i => i.code === type)
        ? state.setting.filter(
            item =>
              item.parent_id === state.setting.find(i => i.code === type).id
          )
        : []
      : []
  },
  getLanguage: state => {
    const result = _(state.languageList)
      .groupBy('lang.key')
      .mapValues(list => {
        return _.fromPairs(list.map(item => [item.key, item.value]))
      })
      .value()
    return result
  },
  getPropertyGoodList: state => {
    const property = _.groupBy(state.propertyList, 'good_type_id')
    const result = Object.keys(property).map(item => {
      const key = property[item][0].good_type
      return {
        ...key,
        list: property[item]
      }
    })
    return result
  },
  getRecommandGoodList: state => (number = 5) => {
    const recomandList = state.goodsList.filter(
      item => item.is_recommand === true
    )
    return _.shuffle(recomandList).slice(0, number)
  },
  getRecommandMerchantList: state => (number = 5) => {
    const recomandList = state.merchantList.filter(
      item => item.is_recommand === true
    )
    return _.shuffle(recomandList).slice(0, number)
  },
  getFootList: state => {
    const group = _.groupBy(state.footList, 'article_category_id')
    return Object.keys(group).map(id => {
      return {
        id,
        name: group[id][0].article_category.name,
        articles: group[id]
      }
    })
  },
  getGoodIsCollect: state => id => {
    return state.collectList.find(item => item.good_id === id)
  },
  getMerchantIsCollect: state => id => {
    return state.collectList.find(item => item.merchant_id === id)
  },
  getCartList: state => {
    const result = state.cartList
      .filter(item => item.number > 0)
      .map(item => {
        if (item.cart_goods && item.cart_goods.length > 0) {
          item.sku = item.cart_goods.map(c => c.sku.name).join('/')
          item.price = item.cart_goods.reduce(
            (a, b) => a + Number(b.sku.diff_price),
            item.good.price
          )
        } else {
          item.price = item.good.price
        }
        console.log(item)
        // if (item.good.sale && item.good.sale.is_avaiable) {
        //   item.price += Number(item.good.sale.diff_price)
        // }
        return item
      })
    return result
  },
  getCartListByMerchant: (state, getters) => {
    const group = _.groupBy(getters.getCartList, 'good.merchant_id')
    return Object.keys(group).map(id => {
      return {
        id,
        name: group[id][0].good.merchant
          ? group[id][0].good.merchant.name
          : '自营',
        list: group[id]
      }
    })
  },
  getAddressById: state => id => {
    return state.addressList.find(item => item.id === id)
  },
  getMainAddress: state => {
    return state.addressList.find(item => item.is_default === true)
  },
  getTypeOrderList: state => {
    const sortOrder = (a, b) => b.id - a.id
    const result = state.orderStatusList
      .sort((a, b) => a.id - b.id)
      .map(item => {
        return {
          ...item,
          list: state.orderList.filter(
            order => order.order_status_id === item.id
          )
          // .sort(sortOrder)
        }
      })
    return [
      {
        id: 0,
        name: '全部',
        list: state.orderList.sort(sortOrder)
      },
      ...result
    ]
  },
  getAvaiableCouponList: state => {
    return state.couponList.filter(
      item => item.is_avaiable === true && item.order_id === 0
    )
  },
  getAvaiableSaleList: state => {
    return state.saleList.filter(
      item => !(moment().diff(moment(item.end_time), 'days') > 0)
    )
  },
  getAvaiableGroupList: state => {
    return state.groupList.filter(
      item => !(moment().diff(moment(item.end_time), 'days') > 0)
    )
  },
  getSaleList: state => {
    return state.saleList.filter(item => item.is_avaiable <= 1)
  },
  getMyBalance: state => {
    return state.balanceList.reduce((a, b) => a + b.change_price, 0)
  },
  getMyIntegral: state => {
    return state.integralList.reduce((a, b) => a + b.change_integral, 0)
  },
  getLastPayType: state => {
    return state.orderList.length > 0 ? state.orderList[0].pay_type_id : null
  },
  getTodaySign: state => {
    return state.signList.some(
      item =>
        moment(moment(item.created_at).format('YYYY-MM-DD')).diff(
          moment(),
          'days'
        ) === 0
    )
  }
}
export default getters
