<template>
  <el-container>
    <el-header>
      <TopMenu />
    </el-header>
    <el-divider></el-divider>
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>讨论区</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-main>
      <div class="flex">
        <div class="w-2/3">
          <div
            v-for="(item, index) in list"
            :key="index"
            @click="$router.push(`../topic/${item.id}`)"
          >
            <div class="shadow border rounded p-4 mb-4">
              <div class="flex justify-between border-b py-2 items-center">
                <div class="font-bold text-lg">{{ item.name }}</div>
                <div>回复 ({{ item.topic_comments.length }})</div>
              </div>

              <div class="flex justify-between py-2">
                <div>来自 - {{ item.user.name }}</div>
                <div>
                  发表时间:
                  {{ moment(item.created_at).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/3">
          <div class="ml-4">
            <div v-if="is_login">
              <div class="border-l-4 border-green-500 pl-2">
                发布主题：
              </div>
              <div class="my-4">
                <el-input v-model="name" placeholder="请输入主题"></el-input>
              </div>
              <div class="my-4">
                <el-input
                  v-model="detail"
                  :rows="10"
                  type="textarea"
                  placeholder="请输入内容"
                ></el-input>
              </div>
              <div class="flex justify-end">
                <el-button @click="submitTopic">提交</el-button>
              </div>
            </div>
            <div v-else>
              <div
                @click="$router.push('../login')"
                class="border-l-4 border-green-500 pl-2 mt-8"
              >
                登录后可发表主题（点击登录)
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import TopMenu from '~/components/TopMenu.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Footer,
    TopMenu
    // Logo
  },
  data() {
    return {
      moment,
      list: [],
      name: '',
      detail: ''
    }
  },
  computed: {
    ...mapState(['user_info']),
    ...mapGetters(['is_login'])
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      this.list = await this.$axios.$post('topic/findAll', {
        limit: 20,
        order: [['created_at', 'DESC']],
        include: (app => {
          return [
            {
              model: app.model.topic_comment
            }
          ]
        }).toString()
      })
    },
    async submitTopic() {
      await this.$axios.$post('topic/upsert', {
        name: this.name,
        detail: this.detail,
        user_id: this.user_info.id
      })
      this.initData()
      this.name = ''
      this.detail = ''
    }
  }
}
</script>
