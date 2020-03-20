<template>
  <el-row>
    <el-col :span="8">
      <el-menu class="el-menu-demo" mode="horizontal"
        ><el-menu-item
          ><nuxt-link v-if="logo" to="/">
            <el-image
              :src="getName('logo_img')"
              fit="fill"
              class="w-24 h-8"
            ></el-image> </nuxt-link
        ></el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="16"
      ><el-menu
        @select="handleSelect"
        class="el-menu-demo"
        style="float:right"
        mode="horizontal"
      >
        <el-menu-item v-if="is_login">
          你好 ，{{ user_info.name }}</el-menu-item
        >
        <el-menu-item v-if="is_login"
          ><div @click="handleLogout">退出</div></el-menu-item
        >
        <el-menu-item v-if="!is_login"
          ><nuxt-link to="/login">登录</nuxt-link></el-menu-item
        ><el-menu-item v-if="!is_login"
          ><nuxt-link to="/register">注册</nuxt-link></el-menu-item
        >
      </el-menu></el-col
    >
  </el-row>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'
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
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters(['getName', 'getLanguage', 'is_login']),
    ...mapState(['user_info', 'locale', 'languageList', 'currentPage']),
    language: function() {
      return _.groupBy(this.languageList, 'lang_id')
    },
    current: function() {
      const list = _.groupBy(this.languageList, 'lang.key')
      return (
        list[this.locale] &&
        list[this.locale][0] &&
        list[this.locale][0].lang.name
      )
    }
  },
  methods: {
    ...mapMutations(['logout', 'setData']),
    handleSelect(key, keyPath) {},
    handleCommandLanguage(lang) {
      this.setData({
        locale: lang
      })
      this.$i18n.locale = lang
    },
    handleLogout() {
      this.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>
