<template>
  <el-row type="flex" align="middle" justify="center">
    <el-col :span="6">
      <nuxt-link to="/"
        ><el-image
          :src="getName('logo_img')"
          fit="fill"
          class="w-24 h-8"
        ></el-image
      ></nuxt-link>
    </el-col>
    <el-col :span="12">
      <el-input
        v-model="search"
        @keyup.enter.native="searchGood(search)"
        placeholder="请输入香水名称"
        class="input-with-select"
      >
        <el-button
          slot="append"
          @click="searchGood(search)"
          icon="el-icon-search"
        ></el-button>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    logo: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      search: '',
      disabled: false
    }
  },
  computed: {
    ...mapState(['counter', 'setting']),
    ...mapGetters(['getName', 'getList', 'getCartList', 'is_login']),
    getCartListLimit: function() {
      return this.getCartList.filter((item, index) => {
        return index < 3
      })
    }
  },
  methods: {
    ...mapMutations(['logout']),
    handleSelect(key, keyPath) {},
    searchGood(name) {
      if (!name) {
        this.$message.error('请输入关键词')
        return
      }
      this.$router.push(`../search/${name}`)
    }
  }
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>
