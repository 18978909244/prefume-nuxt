<template>
  <el-container>
    <el-header>
      <TopMenu :logo="false" />
    </el-header>
    <el-main class="flex flex-col">
      <TopSearch />
      <el-divider></el-divider>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>搜索：{{ word }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-container>
        <el-main class="main">
          <div v-if="perfumes.length > 0" class="flex flex-wrap">
            <div
              v-for="(item, index) in perfumes"
              :key="index"
              @click="$router.push(`../detail/${item.id}`)"
              class="w-1/3"
            >
              <div class="flex flex-col border rounded shadow m-4 p-2">
                <div class="text-center p-4 border-b">
                  <el-image :src="item.image" class="w-32 h-32"></el-image>
                </div>
                <div class="text-center font-bold pt-2 h-20">
                  {{ item.name }}
                </div>
                <!-- <div class="flex pt-2">
                  <div class="mr-2 bg-green-500 text-white rounded px-1">
                    气味
                  </div>
                  <div>{{ item.smell ? item.smell : '暂无' }}</div>
                </div>
                <div class="flex pt-2">
                  <div class="mr-2 bg-green-500 text-white rounded px-1">
                    前调
                  </div>
                  <div>
                    {{ item.before_smell ? item.before_smell : '暂无' }}
                  </div>
                </div>
                <div class="flex pt-2">
                  <div class="mr-2 bg-green-500 text-white rounded px-1">
                    中调
                  </div>
                  <div>
                    {{ item.middle_smell ? item.middle_smell : '暂无' }}
                  </div>
                </div>
                <div class="flex pt-2">
                  <div class="mr-2 bg-green-500 text-white rounded px-1">
                    后调
                  </div>
                  <div>{{ item.after_smell ? item.after_smell : '暂无' }}</div>
                </div> -->
              </div>
            </div>
          </div>
          <div v-else class="flex justify-center items-center h-64">
            搜索不到产品
          </div>
        </el-main></el-container
      >
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
// import _ from 'lodash'
import TopMenu from '~/components/TopMenu.vue'
import Footer from '~/components/Footer.vue'
import TopSearch from '~/components/TopSearch.vue'

export default {
  components: {
    Footer,
    TopMenu,
    TopSearch
  },
  data() {
    return {
      dialogVisible: true,
      bannerHeight: 0,
      search: '',
      currentSort: 0,
      name: '',
      perfumes: [],
      word: ''
    }
  },
  computed: {
    ...mapState(['counter', 'setting']),
    ...mapGetters(['getName', 'getList']),
    count: function() {
      return JSON.stringify(this.$store)
    }
  },
  // async asyncData(context) {
  //   const {
  //     app: { $axios },
  //     params: { id },
  //     store
  //   } = context
  //   const category = await $axios.$post('category/findOne', {
  //     where: {
  //       id
  //     },
  //     include: (app => [
  //       {
  //         model: app.model.perfume
  //       }
  //     ]).toString()
  //   })
  //   if (!category)
  //     return context.error({ statusCode: 404, message: 'Page not found' })
  //   return {
  //     goods: store.getters.getRecommandGoodList(),
  //     category,
  //     categoryGoodsList: category.goods
  //   }
  // },
  created() {
    this.word = this.$route.params.id
    this.initData()
  },
  methods: {
    ...mapMutations(['increment']),
    async initData() {
      const list = await this.$axios.$post('perfume/search', {
        word: this.word
      })
      this.perfumes = list
    },
    clickButton() {
      // console.
    },
    async imageLoaded() {
      await this.$nextTick()
      if (
        this.$refs.image &&
        this.$refs.image[0] &&
        this.$refs.image[0].imageHeight &&
        this.$refs.image[0].imageHeight > 0
      ) {
        this.bannerHeight = (this.$refs.image[0].imageHeight * 1080) / 960
      }
    },
    async searchGood(name) {
      await this.$axios.$post('good/findAll', {
        where: {
          name
        }
      })
    },
    async switchSort(index) {
      if (this.currentSort === index) return
      this.currentSort = index
      if (this.id) {
        const list = await this.$axios.$post('category/findOne', {
          where: {
            id: this.id
          },
          include: (app => [
            {
              model: app.model.good
            }
          ]).toString()
        })
        const fn = this.sortList[this.currentSort].fn
        console.log(fn, list)
        this.categoryGoodsList = list.goods.sort(
          this.sortList[this.currentSort].fn
        )
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
