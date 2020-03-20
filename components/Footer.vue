<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col v-for="category in getFootList" :key="category.id" :span="6">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix text-center">
              <b>{{ category.name }}</b>
            </div>
            <div
              v-for="article in category.articles"
              :key="article.id"
              class="text item text-center"
            >
              <nuxt-link :to="`../article/${article.id}`">{{
                article.name
              }}</nuxt-link>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <el-footer>
      <el-row type="flex" class="row-bg" justify="center">
        {{ getName('copyright') }}
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters(['getName', 'getFootList'])
  },
  methods: {
    handleSelect(key, keyPath) {}
  }
}
</script>

<style scoped>
.row-bg {
  padding-top: 50px;
}
.el-card {
  border: none;
}
</style>
