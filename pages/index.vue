<template>
  <el-container>
    <el-header>
      <TopMenu :logo="false" />
    </el-header>
    <el-main>
      <TopSearch />
      <el-divider />
      <CategoryMenu />
      <el-divider />
      <div class="w-full flex justify-between items-stretch">
        <div class="w-3/4">
          <el-carousel :interval="4000" :height="`${bannerHeight}px`">
            <el-carousel-item v-for="item in banners" :key="item.id">
              <nuxt-link :to="item.url">
                <el-image
                  ref="image"
                  :src="item.image"
                  @load="imageLoaded"
                  :style="`width:100%;height:${bannerHeight}px`"
                  fit="cover"
                ></el-image
                >{{ item.name }}</nuxt-link
              >
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="mt-4">
        <div class="my-title">香水排行</div>

        <div class="flex flex-wrap">
          <div
            v-for="(item, index) in prefumeRankList"
            :key="index"
            @click="$router.push(`../detail/${item.id}`)"
            class="w-1/3"
          >
            <div class="flex flex-col border rounded shadow m-4 p-2">
              <div class="text-center p-4 border-b">
                <el-image :src="item.image" class="w-32 h-32"></el-image>
              </div>
              <div class="text-center font-bold pt-2 h-20 overflow-hidden">
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
      </div>
    </el-main>
    <!-- <div v-for="(item, index) in getList('base')" :key="index">
      {{ item.name }}
    </div> -->
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import TopMenu from '~/components/TopMenu.vue'
import TopSearch from '~/components/TopSearch.vue'
import Footer from '~/components/Footer.vue'
import CategoryMenu from '~/components/CategoryMenu.vue'
import saleTime from '~/utils/saleTime'
export default {
  components: {
    Footer,
    TopMenu,
    TopSearch,
    CategoryMenu
  },
  filters: {
    filterColor(key) {
      let color = 'red'
      switch (key) {
        case 'hot':
          color = 'red'
          break
        case 'new':
          color = 'green'
          break
        case 'recommand':
          color = 'blue'
          break

        default:
          break
      }
      return `bg-${color}-500`
    }
  },
  data() {
    return {
      dialogVisible: true,
      bannerHeight: 0,
      search: '',
      title: '首页'
    }
  },
  computed: {
    ...mapState(['setting', 'prefumeRankList', 'bannerList', 'user_info']),
    ...mapGetters([
      'getName',
      'getList',
      'getPropertyGoodList',
      'is_login',
      'getTodaySign'
    ]),
    recommandPropertyGoodList: function() {
      return this.getPropertyGoodList
        .filter(item => item.is_recommand)
        .map(item => {
          return {
            ...item,
            list: item.list.map(obj => obj.good)
          }
        })
    }
  },
  asyncData(context) {
    const { store } = context

    return {
      information: store.state.informationList.filter(item => item.is_avaiable),
      banners: store.state.bannerList.filter(item => item.is_avaiable),
      goods: store.getters.getRecommandGoodList(8),
      saleGoods: store.getters.getSaleList.map(item => {
        return {
          ...item,
          countTime: saleTime(item)
        }
      })
    }
  },
  mounted() {
    window.addEventListener(
      'resize',
      () => {
        // this.bannerHeight = this.$refs.image[0].height
        // console.log(this.bannerHeight)
      },
      false
    )
  },
  created() {},
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['asyncSign']),
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
        this.bannerHeight = (this.$refs.image[0].imageHeight * 1080) / 1180
      }
    }
  }
}
</script>

<style scoped lang="less">
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item {
  background-color: transparent !important;
}
.el-carousel__mask {
  background-color: transparent !important;
}

.my-title {
  position: relative;
  width: 200px;
  height: 45px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  line-height: 45px;
  padding: 0 30px;
  margin: 0 auto 20px;
  overflow: hidden;
  color: #333;
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-size: 50px 20px;
    background-image: url('https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/sprite/floor_hd/sprite@2x.png');
    background-position: 0 0;
    width: 25px;
    height: 20px;
    top: 50%;
    margin-top: -10px;
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}
</style>
