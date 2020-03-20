<template>
  <div>
    <div class="flex justify-between">
      <div class="flex">
        <div
          v-for="(item, index) in categoryList"
          :key="index"
          class="mx-4 bg-green-500 text-gray-100 px-2 rounded font-bold text-xl"
        >
          <nuxt-link :to="`/category/${item.id}`">{{ item.name }}</nuxt-link>
        </div>
      </div>
      <div @click="$router.push('../discuss')">讨论区</div>
    </div>
    <div class="line"></div>
  </div>
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
      activeIndex: ''
    }
  },
  computed: {
    ...mapGetters(['getName', 'is_login']),
    ...mapState(['user_info', 'categoryList'])
  },
  created() {},
  methods: {
    ...mapMutations(['logout']),
    initData() {
      console.log(this.categoryList)
    }
  }
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>
