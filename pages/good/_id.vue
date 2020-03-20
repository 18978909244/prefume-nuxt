<template>
  <el-container>
    <el-header>
      <TopMenu />
    </el-header>
    <el-divider></el-divider>
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="detail.category_id && detail.category.name">
          <nuxt-link :to="`/category/${detail.category_id}`"
            >{{ detail.category && detail.category.name }}
          </nuxt-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ detail.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-main>
      <el-container>
        <el-aside width="500px">
          <el-carousel
            v-if="detail.image_list.length > 0"
            height="500px"
            autoplay
            indicator-position="none"
          >
            <el-carousel-item v-for="item in detail.image_list" :key="item">
              <el-image :src="item" fit="fit"></el-image>
            </el-carousel-item>
          </el-carousel>
          <el-carousel
            v-else
            height="500px"
            autoplay
            indicator-position="none"
            arrow="never"
          >
            <el-carousel-item>
              <el-image :src="detail.image" fit="fit"></el-image>
            </el-carousel-item>
          </el-carousel>
          <div
            v-if="detail.good_properties && detail.good_properties.length > 0"
          >
            <el-divider></el-divider>
            <div>
              <el-tag
                v-for="(type, idx) in detail.good_properties"
                :key="idx"
                class="mr-2"
                >{{ type.good_type.name }}</el-tag
              >
            </div>
          </div>
          <div v-if="detail.good_services && detail.good_services.length > 0">
            <el-divider></el-divider>
            <div class="flex flex-col">
              <div
                v-for="(service, idx) in detail.good_services"
                :key="idx"
                class="flex items-center mb-2"
              >
                <el-image
                  :src="service.service_type.image"
                  class="w-8 h-8"
                ></el-image>
                <span class="text-sm ml-2">{{
                  service.service_type.name
                }}</span>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main class="main">
          <el-row>
            <el-col :span="24">
              <h1 class="text-2xl font-black">{{ detail.name }}</h1>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h3>{{ detail.desc }}</h3>
            </el-col>
          </el-row>
          <el-row v-if="detail.merchant">
            <el-card
              ><div
                slot="header"
                class="clearfix flex items-center justify-between"
              >
                <span class="flex items-center"
                  ><el-image
                    :src="detail.merchant.avatar"
                    class="w-8 h-8 mr-2"
                  ></el-image
                  >{{ detail.merchant.name }}</span
                >
                <el-button
                  @click="$router.push(`/merchant/${detail.merchant.id}`)"
                  class="inline-block"
                  type="text"
                  >进入店铺</el-button
                >
              </div>
              <div>{{ detail.merchant.desc }}</div></el-card
            >
          </el-row>
          <el-row class="flex justify-between">
            <div class="w-1/3">运费：免运费</div>
            <div class="w-1/3">浏览：{{ detail.views_number }}</div>
            <div class="w-1/3">已售：{{ detail.sales_number }} 件</div>
          </el-row>
          <el-row>
            <el-divider></el-divider>
          </el-row>
          <el-row
            v-if="detail.sale && countTime.type !== 2"
            type="flex"
            align="middle"
            class="flex flex-col border"
          >
            <div
              class="w-full p-2 flex justify-end bg-red-600 text-white font-bold content-center items-center"
            >
              <div>
                <vueTimerCountdown
                  :ignore-day="false"
                  :deadline="countTime.time"
                  v-slot="time"
                  v-if="countTime.type === 0"
                >
                  距秒杀开始还剩 {{ time.day }}天 {{ time.hour }}时
                  {{ time.minute }}分 {{ time.second }}秒
                </vueTimerCountdown>
              </div>
              <div>
                <vueTimerCountdown
                  :ignore-day="false"
                  :deadline="countTime.time"
                  v-slot="time"
                  v-if="countTime.type === 1"
                >
                  距秒杀结束还剩 {{ time.day }}天 {{ time.hour }}时
                  {{ time.minute }}分 {{ time.second }}秒
                </vueTimerCountdown>
              </div>
            </div>
            <div class="w-full p-2 flex items-center">
              <div class="text-gray-500">秒杀价</div>
              <div class="text-red-600 font-bold ml-8">
                ￥
                <span class="text-lg">{{ sale_price | priceFilter }}</span>
              </div>
            </div>
          </el-row>

          <el-row type="flex" align="middle">
            <el-col :span="24">
              <h4 class="price">
                ￥
                {{ select_price | priceFilter }}
              </h4>
              <del class="org_price">￥ {{ detail.org_price }}</del>
            </el-col>
          </el-row>
          <el-row v-for="(sku, index) in skuList" :key="index">
            {{ sku.name }} :
            <el-radio-group v-model="sku.selected" size="small">
              <el-radio-button
                v-for="(item, idx) in sku.list"
                :key="idx"
                :label="item"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </el-row>
          <el-row>
            购买数量：
            <el-input-number
              v-model="number"
              :min="1"
              :max="10"
              @change="handleChange"
              label="描述文字"
            ></el-input-number>
          </el-row>
          <el-row>
            <el-button
              v-if="isCollect"
              @click="handleCollect"
              :type="isCollect ? 'primary' : 'info'"
              size="medium"
              icon="iconfont icon-round_favor_fill"
            >
              取消收藏</el-button
            >
            <el-button
              v-else
              @click="handleCollect"
              :type="isCollect ? 'primary' : 'info'"
              size="medium"
              icon="iconfont icon-round_favor_fill"
            >
              收藏</el-button
            >

            <el-button @click="handleAddCart" size="medium" type="warning"
              >加入购物车</el-button
            >

            <el-button @click="handleDirectBuy" size="medium" type="primary"
              >购买</el-button
            >

            <el-button v-if="isGroup" type="warn" size="medium"
              >我要拼团</el-button
            >
          </el-row>
        </el-main>
      </el-container>
      <el-divider></el-divider>
      <el-container>
        <el-aside width="200px">
          <GoodList :data="goods" :span="Number(1)" />
        </el-aside>
        <el-main class="main">
          <el-menu
            :default-active="activeIndex"
            @select="handleSelect"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-menu-item index="1">产品详情</el-menu-item>
            <el-menu-item v-if="detail.good_comments.length > 0" index="2"
              >评论{{
                detail.good_comments.length > 0
                  ? '(' + detail.good_comments.length + ')'
                  : ''
              }}</el-menu-item
            >
          </el-menu>
          <div class="line"></div>
          <div v-show="activeIndex === '1'" class="w-full p-2">
            <div class="flex text-gray-800 w-full flex-wrap m-4">
              <div
                v-for="(item, index) in uniqueAttributes"
                :key="index"
                class="flex w-1/4"
              >
                <div class="w-1/3">{{ item.attribute.name }}:</div>
                <div class="w-2/3">{{ item.name }}</div>
              </div>
            </div>
            <el-divider v-if="uniqueAttributes.length > 0"></el-divider>
            <div v-html="detail.intro_content"></div>
          </div>
          <div v-show="activeIndex === '2'" class="w-full p-2">
            <div class="flex flex-col">
              <el-card
                v-for="(item, index) in detail.good_comments"
                :key="index"
                class="box-card m-4"
              >
                <div slot="header" class="flex items-center justify-start">
                  <el-image
                    :src="item.user.avatar"
                    class="w-8 h-8 rounded-full mr-2"
                  ></el-image>
                  <div class="mr-2">{{ item.user.name }}</div>
                  <div class="text-red-500">{{ item.sku }}</div>
                </div>
                <div class="flex flex-row justify-between items-stretch">
                  <div class="flex">
                    <div class="text-red-500 font-bold">
                      {{ item.comment_type.name }}
                    </div>
                    <div class="ml-2">“ {{ item.detail }} ”</div>
                  </div>
                  <div class="">
                    {{ moment(item.created_at).format('YY-MM-DD HH:mm:ss') }}
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
// import axios from 'axios'
import { Message } from 'element-ui'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
import vueTimerCountdown from 'vue-timer-countdown'

import saleTime from '~/utils/saleTime'
import TopMenu from '~/components/TopMenu.vue'
import Footer from '~/components/Footer.vue'
import GoodList from '~/components/GoodList.vue'
export default {
  components: {
    TopMenu,
    Footer,
    GoodList,
    vueTimerCountdown
  },
  data() {
    return {
      moment,
      number: 1,
      dialogVisible: true,
      activeIndex: '1',
      skuList: [],
      selectList: []
    }
  },
  head() {
    return {
      title: this.detail.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        },

        {
          hid: 'keywords',
          name: 'keywords',
          content: this.detail.name
        }
      ]
    }
  },
  computed: {
    ...mapState(['user_info', 'collectList']),
    ...mapGetters(['getRecommandGoodList', 'getGoodIsCollect']),
    isCollect: function() {
      return this.getGoodIsCollect(this.detail.id)
    },
    isGroup: function() {
      return this.detail.groups.length > 0
    },
    select_price: function() {
      return (
        this.detail.price +
        this.skuList
          .filter(item => item.selected)
          .reduce((a, b) => {
            return a + b.selected.diff_price
          }, 0) +
        (this.detail.sale && this.detail.sale.is_avaiable === 1
          ? this.detail.sale.diff_price
          : 0)
      )
    },
    sale_price: function() {
      return (
        this.detail.price +
        (this.skuList
          ? this.skuList
              .filter(item => item.selected)
              .reduce((a, b) => {
                return a + b.selected.diff_price
              }, 0)
          : 0) +
        this.detail.sale.diff_price
      )
    },
    countTime: function() {
      return saleTime(this.detail.sale)
    },
    uniqueAttributes: function() {
      return this.detail.skus && this.detail.skus.filter(item => item.is_unique)
    }
  },
  async asyncData(context) {
    const {
      params: { id },
      store
    } = context
    // if (payload) {
    //   return {
    //     detail: payload
    //   }
    // }
    const detail = await store.dispatch('asyncGetGoodDetail', Number(id))
    if (!detail)
      return context.error({ statusCode: 404, message: 'Page not found' })
    return {
      goods: store.getters.getRecommandGoodList(),
      detail,
      id: Number(id)
    }
  },
  created() {
    // this.initSku(Number(this.id))
    // const id = Number(this.id)
    // this.$axios.$post('good/findOne', {
    //   where: {
    //     id: 2
    //   }
    // })
    if (this.detail.skus && this.detail.skus.length > 0) {
      this.initSku(this.detail.skus.filter(item => !item.is_unique))
    }
  },
  methods: {
    ...mapMutations(['setData']),
    ...mapActions(['asyncAddCart', 'asyncCollect', 'fetchSku']),
    initSku(result) {
      // const result = await this.fetchSku(id)
      const group = _.groupBy(result, 'attribute_id')
      this.skuList = Object.keys(group).map(attribute_id => {
        return {
          ...group[attribute_id][0].attribute,
          list: group[attribute_id].map(obj => {
            return {
              ...obj,
              checked: false
            }
          })
        }
      })
    },
    handleSelect(key, keyPath) {
      this.activeIndex = keyPath[0]
    },
    handleDirectBuy() {
      if (!this.user_info) {
        this.$router.push(`/login?redirect=${this.$route.path}`)
        return
      }
      const avaiableBuy = this.skuList.every(item => item.selected)
      if (!avaiableBuy) {
        return Message.error('请选择属性')
      }
      const postData = {
        good: this.detail,
        good_id: this.detail.id,
        user_id: this.user_info.id,
        sku_id: this.skuList
          .map(item => {
            return item.selected
          })
          .map(item => item.id),
        sku: this.skuList
          .map(item => {
            return item.selected
          })
          .map(item => item.name)
          .join('/'),
        number: this.number,
        price: this.select_price,
        is_selected: true
      }
      this.setData({
        directBuy: postData
      })
      this.$router.push('/orderConfirm')
    },
    async handleCollect() {
      if (!this.user_info) {
        this.$router.push(`/login?redirect=${this.$route.path}`)
      }
      await this.asyncCollect({
        id: this.isCollect
          ? this.collectList.find(item => item.good_id === this.detail.id).id
          : null,
        user_id: this.user_info.id,
        good_id: this.detail.id,
        flag: !this.isCollect
      })
    },
    async handleAddCart() {
      if (!this.user_info) {
        this.$router.push(`/login?redirect=${this.$route.path}`)
        return
      }

      const avaiableBuy = this.skuList.every(item => item.selected)
      if (!avaiableBuy) {
        return Message.error('请选择属性')
      }
      const postData = {
        good_id: this.detail.id,
        user_id: this.user_info.id,
        sku_id: this.skuList
          .map(item => {
            return item.selected
          })
          .map(item => item.id),
        number: this.number,
        sale_id: this.detail.sale ? this.detail.sale.id : 0,
        is_selected: true
      }
      await this.asyncAddCart(postData)
      Message.success('加入购物车')
      this.$router.push('/cart')
    },
    handleChange() {}
  }
}
</script>

<style lang="less" scoped></style>
