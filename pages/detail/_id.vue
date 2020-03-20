<template>
  <el-container v-if="detail">
    <el-header>
      <TopMenu />
    </el-header>
    <el-divider></el-divider>
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ detail.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-main>
      <el-container>
        <el-aside width="500px">
          <el-carousel
            height="500px"
            autoplay
            indicator-position="none"
            arrow="never"
          >
            <el-carousel-item>
              <el-image :src="detail.image" fit="fit"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-aside>
        <el-main class="main">
          <el-row>
            <el-col :span="24">
              <h1 class="text-2xl font-black">{{ detail.name }}</h1>
            </el-col>
          </el-row>
          <el-row class="flex"> 浏览：{{ detail.views_number }} </el-row>
          <div></div>
          <el-row>
            <el-divider></el-divider>
          </el-row>

          <div>
            <div class="flex pt-2 mb-2">
              <div class="mr-2 bg-green-500 text-white rounded px-1">
                气味
              </div>
              <div>{{ detail.smell ? detail.smell : '暂无' }}</div>
            </div>
            <div class="flex pt-2 mb-2">
              <div class="mr-2 bg-green-500 text-white rounded px-1">
                前调
              </div>
              <div>
                {{ detail.before_smell ? detail.before_smell : '暂无' }}
              </div>
            </div>
            <div class="flex pt-2 mb-2">
              <div class="mr-2 bg-green-500 text-white rounded px-1">
                中调
              </div>
              <div>
                {{ detail.middle_smell ? detail.middle_smell : '暂无' }}
              </div>
            </div>
            <div class="flex pt-2 mb-2">
              <div class="mr-2 bg-green-500 text-white rounded px-1">
                后调
              </div>
              <div>{{ detail.after_smell ? detail.after_smell : '暂无' }}</div>
            </div>

            <div v-if="is_login">
              <div class="border-l-4 border-green-500 pl-2 mt-8">
                评论：
              </div>
              <div class="my-4">
                <el-rate v-model="comment_score"> </el-rate>
              </div>
              <div class="my-4">
                <el-input
                  v-model="comment_detail"
                  type="textarea"
                  placeholder="请输入你的评论"
                ></el-input>
              </div>
              <div class="flex justify-end">
                <el-button @click="submitComment">提交</el-button>
              </div>
            </div>
            <div v-else>
              <div
                @click="$router.push('../login')"
                class="border-l-4 border-green-500 pl-2 mt-8"
              >
                登录后可评论（点击登录)
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
      <el-divider></el-divider>
      <div class="border-l-4 border-green-500 pl-2 mb-4">
        评论
        {{
          detail.perfume_comments.length > 0
            ? `  (${detail.perfume_comments.length})`
            : ''
        }}
      </div>
      <div class="flex flex-wrap flex-end">
        <div
          v-for="(item, index) in detail.perfume_comments"
          :key="index"
          class="w-1/3"
        >
          <div class="flex flex-col border rounded shadow m-4 p-2">
            <div class="flex justify-between p-4 border-b">
              <div>{{ item.user.name }}</div>
              <div>
                {{ moment(item.created_at).format('YYYY-MM-DD HH:mm') }}
              </div>
            </div>
            <div class="pt-4">
              <div class="flex">
                <div class="mr-2 bg-green-500 text-white rounded px-1">
                  评分
                </div>
                <el-rate v-model="item.score" disabled> </el-rate>
                <!-- <div>{{ item.score }}</div> -->
              </div>
              <div class="mt-2">" {{ item.detail }} "</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <el-container>
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
      </el-container> -->
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
// import axios from 'axios'
// import { Message } from 'element-ui'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
// import vueTimerCountdown from 'vue-timer-countdown'

import TopMenu from '~/components/TopMenu.vue'
import Footer from '~/components/Footer.vue'
// import GoodList from '~/components/GoodList.vue'
export default {
  components: {
    TopMenu,
    Footer
    // GoodList,
    // vueTimerCountdown
  },
  data() {
    return {
      comment_detail: '',
      comment_score: 0,
      detail: null,
      moment,
      number: 1,
      dialogVisible: true,
      activeIndex: '1',
      skuList: [],
      selectList: []
    }
  },
  computed: {
    ...mapState(['user_info']),
    ...mapGetters(['is_login'])
  },
  // async asyncData(context) {
  //   const {
  //     params: { id },
  //     store
  //   } = context
  //   // if (payload) {
  //   //   return {
  //   //     detail: payload
  //   //   }
  //   // }
  //   const detail = await store.dispatch('asyncGetGoodDetail', Number(id))
  //   if (!detail)
  //     return context.error({ statusCode: 404, message: 'Page not found' })
  //   return {
  //     goods: store.getters.getRecommandGoodList(),
  //     detail,
  //     id: Number(id)
  //   }
  // },
  created() {
    this.id = Number(this.$route.params.id)
    this.initData()
    // this.initSku(Number(this.id))
    // const id = Number(this.id)
    // this.$axios.$post('good/findOne', {
    //   where: {
    //     id: 2
    //   }
    // })
  },
  methods: {
    ...mapMutations(['setData']),
    ...mapActions(['asyncInitData']),
    async initData() {
      const detail = await this.$axios.$post('perfume/findOne', {
        where: {
          id: this.id
        },
        include: (app => {
          return [
            {
              model: app.model.perfume_comment,
              include: [
                {
                  model: app.model.user
                }
              ]
            }
          ]
        }).toString()
      })
      this.detail = detail
      await this.asyncInitData()
    },
    async submitComment() {
      await this.$axios.$post('perfume_comment/upsert', {
        perfume_id: this.id,
        detail: this.comment_detail,
        score: this.comment_score,
        user_id: this.user_info.id
      })
      this.initData()
      this.comment_detail = ''
      this.comment_score = 0
    }
  }
}
</script>

<style lang="less" scoped></style>
