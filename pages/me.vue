<template>
  <el-container>
    <el-header>
      <TopMenu :logo="false" />
    </el-header>
    <el-main>
      <TopSearch />
      <el-divider />
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import _ from 'lodash'
import TopMenu from '~/components/TopMenu.vue'
import TopSearch from '~/components/TopSearch.vue'
import Footer from '~/components/Footer.vue'
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
      title: '首页'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  },
  computed: {
    ...mapState(['setting']),
    ...mapGetters(['getName', 'getList'])
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
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
</style>
