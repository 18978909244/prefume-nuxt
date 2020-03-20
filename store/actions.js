import Cookies from 'js-cookie'
import moment from 'moment'
import _ from 'lodash'

import { Message } from 'element-ui'

export default {
  async nuxtServerInit({ dispatch, commit, state }, { req }) {
    // function getCookie(name) {
    //   if (req.headers.cookie) {
    //     let arr
    //     const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    //     if ((arr = req.headers.cookie.match(reg))) return unescape(arr[2])
    //     else return null
    //   } else {
    //     return null
    //   }
    // }
    // function getQueryParam(name) {
    //   if (req._parsedUrl && req._parsedUrl.query) {
    //     let arr
    //     const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    //     if ((arr = req._parsedUrl.query.match(reg))) return unescape(arr[2])
    //     else return null
    //   } else {
    //     return null
    //   }
    // }
    // const token =
    //   getCookie(`${state.projectName}-token`) ||
    //   getQueryParam(`${state.projectName}-token`) ||
    //   ''
    // console.log('token --> ', token)
    // commit('setData', {
    //   token,
    //   currentPage: req.url
    // })
    // await dispatch('asyncInitData')
    // if (token) {
    //   await dispatch('asyncCheckLogin')
    // }
    // if (state.user_info) {
    //   await dispatch('asyncInitMyData')
    // }
  },
  async asyncSign({ dispatch, commit, state }) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    let continue_days = 1
    if (state.signList.length > 0) {
      const lastSign = state.signList[0]
      const days = moment(
        moment(lastSign.created_at).format('YYYY-DD-MM')
      ).diff(moment(moment().format('YYYY-DD-MM')), 'days')
      if (days === -1) {
        continue_days += 1
      } else if (days === 0) {
        return Promise.reject(new Error('今日已签'))
      }
    }
    await this.$axios.$post('sign_record/upsert', {
      user_id: state.user_info.id,
      continue_days
    })
    await dispatch('asyncInitMyData')
  },
  async asyncPayOrder({ dispatch, commit, state }, { pay_type_id, id }) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    const result = await this.$axios.$post('order/pay', {
      id,
      pay_type_id
    })
    await dispatch('asyncInitMyData')
    return result
  },
  async asyncFinishOrder({ dispatch, commit, state }, id) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    const result = await this.$axios.$post('order/finish', {
      id
    })
    await dispatch('asyncInitMyData')
    return result
  },
  async asyncGetExpress({ state, commit }, no) {
    if (state.express[no]) {
      return state.express[no]
    }
    const result = await this.$axios.$post('express/get', {
      no
    })
    commit('setData', {
      express: {
        ...state.express,
        [no]: result
      }
    })
    return result
  },
  async asyncGetGoodDetail({ state, commit, dispatch }, id) {
    console.log(id)
    const result = await this.$axios.$post('good/findOne', {
      where: {
        id
      },
      include: (app => {
        return [
          { model: app.model.sale },
          { model: app.model.group },
          {
            model: app.model.sku,
            include: [
              {
                model: app.model.attribute
              }
            ]
          },
          {
            model: app.model.good_service,
            include: {
              model: app.model.service_type
            }
          },
          {
            model: app.model.good_property,
            include: {
              model: app.model.good_type
            }
          },
          {
            model: app.model.good_comment,
            include: [
              {
                model: app.model.user
              },
              {
                model: app.model.comment_type
              }
            ],
            limit: 10,
            order: [['created_at', 'DESC']]
          }
        ]
      }).toString()
    })
    return result
  },
  async asyncGetArticleDetail({ state, commit, dispatch }, id) {
    const result = await this.$axios.$post('article/findOne', {
      where: {
        id
      }
    })
    return result
  },
  async asyncGetInformationDetail({ state, commit, dispatch }, id) {
    const result = await this.$axios.$post('information/findOne', {
      where: {
        id
      }
    })
    return result
  },
  async asyncGetOrderDetail({ state, commit, dispatch }, id) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    const result = await this.$axios.$post('order/findOne', {
      where: {
        id
      },
      include: (app => {
        return [
          {
            model: app.model.order_good,
            include: [
              {
                model: app.model.good
              }
            ]
          },
          {
            model: app.model.order_record,
            include: [
              {
                model: app.model.order_status
              }
            ]
          },
          {
            model: app.model.good_comment
          }
        ]
      }).toString()
    })
    return result
  },
  async asyncSendComment({ state, commit, dispatch }, obj) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    await this.$axios.$post('good_comment/add', {
      ...obj,
      user_id: state.user_info.id
    })
    await dispatch('asyncInitMyData')
  },
  async asyncAddOrder(
    { state, commit, dispatch },
    { address, orderGoodList, orderGoodPrice, selectCoupon, pay_type_id }
  ) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    await this.$axios.$post('order/add', {
      user_id: state.user_info.id,
      address,
      orderGoodList,
      orderGoodPrice,
      selectCoupon,
      pay_type_id
    })
    await dispatch('asyncInitMyData')
  },
  async asyncDeleteOrder({ dispatch, commit, state }, id) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    await this.$axios.$post('order/destroy', {
      id
    })
    await dispatch('asyncInitMyData')
  },
  async asyncUpdateAddress({ state, commit, dispatch }, payLoad) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    if (!payLoad.user_id) {
      payLoad.user_id = state.user_info.id
    }
    if (payLoad.name) {
      await this.$axios.$post('address/upsert', payLoad)
    } else {
      await this.$axios.$post('address/destroy', {
        id: payLoad.id
      })
    }
    await dispatch('asyncInitMyData')
  },
  async asyncSelectCartItem({ state, commit, dispatch }, item) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    await this.$axios.$post('cart/upsert', {
      id: item.id,
      number: item.number,
      good_id: item.good_id,
      is_selected: !item.is_selected
    })
  },
  async asyncUpdateCart({ state, commit, dispatch }, item) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }

    await this.$axios.$post('cart/upsert', {
      ...item,
      user_id: state.user_info.id
    })
    await dispatch('asyncInitMyData')
  },
  async asyncAddCart(
    { state, commit, rootState, dispatch },
    { good_id, user_id, sku_id, number, sale_id, is_selected }
  ) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    await this.$axios.$post('cart/add', {
      good_id,
      user_id,
      number,
      sku_id,
      sale_id,
      is_selected
    })
    await dispatch('asyncInitMyData')
  },
  async asyncCollect(
    { commit, dispatch, state },
    { id, good_id, user_id, merchant_id, flag }
  ) {
    if (!state.user_info) {
      this.$router.push('/login')
      return
    }
    if (!state.user_info.mobile) {
      this.$router.push('/bangding')
      return
    }
    if (flag) {
      await this.$axios.$post(
        'collect/upsert',
        _.omitBy(
          {
            good_id,
            user_id,
            merchant_id
          },
          _.isUndefined
        )
      )
    } else {
      await this.$axios.$post('collect/destroy', {
        id
      })
    }

    await dispatch('asyncInitMyData')
  },
  async asyncCheckLogin({ state, commit, dispatch }) {
    const { token, user } = await this.$axios.$post('user/checkLogin')
    Cookies.set(`${state.projectName}-token`, token)
    commit('setData', {
      user_info: user,
      token
    })
    dispatch('asyncInitMyData')
  },
  async asyncLogin({ state, commit, dispatch }, payLoad) {
    const { token, user } = await this.$axios.$post('user/login', payLoad)
    Message.success('登录成功')
    Cookies.set(`${state.projectName}-token`, token)
    commit('setData', {
      user_info: user,
      token
    })
    await dispatch('asyncInitMyData')
  },
  async asyncRegister({ commit, state }, payLoad) {
    const { token, user } = await this.$axios.$post('user/register', payLoad)
    Message.success('注册成功')
    Cookies.set(`${state.projectName}-token`, token)
    commit('setData', {
      user_info: user,
      token
    })
  },
  async asyncInitMyData({ commit, state, dispatch }, excludes = []) {
    if (!state.user_info) {
      commit('setData', {
        orderList: [],
        cartList: [],
        collectList: [],
        addressList: [],
        couponList: [],
        historyList: [],
        balanceList: [],
        integralList: [],
        signList: []
      })
      return
    }
    const data = {
      where: {
        user_id: state.user_info.id
      }
    }
    const result = await this.$axios.$post('system/initData', {
      includes: {
        signList: {
          url: 'sign/findAll',
          data
        }
      },
      excludes
    })
    commit('setData', {
      ...result
    })
  },
  async asyncInitData({ commit, state }, excludes = []) {
    const result = await this.$axios.$post('system/initData', {
      includes: {
        setting: {
          url: 'setting/findAll',
          data: {
            attributes: {
              exclude: ['created_at', 'updated_at']
            }
          }
        },
        categoryList: {
          url: 'category/findAll',
          data: {
            attributes: {
              exclude: ['created_at', 'updated_at']
            }
          }
        },
        prefumeRankList: {
          url: 'perfume/findAll',
          data: {
            limit: 12,
            order: [['views_number', 'DESC']]
          }
        }
      },
      excludes
    })
    commit('setData', {
      ...result
      // categoryList: toTreeData(result.categoryList)
    })
  }
}
