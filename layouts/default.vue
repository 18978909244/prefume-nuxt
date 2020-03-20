<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
import Cookies from 'js-cookie'

import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['setting', 'projectName'])
  },
  created() {
    if (this.setting.length === 0) {
      this.asyncInitData()
    }
    const token = Cookies.get(`${this.projectName}-token`)
    if (token) {
      this.asyncCheckLogin()
    }
  },
  methods: {
    ...mapActions(['asyncInitData', 'asyncCheckLogin'])
  }
}
</script>
<style>
@import url('//cdn.bootcss.com/element-ui/2.12.0/theme-chalk/index.css');
@import url('//at.alicdn.com/t/font_1461794_qywvllxexv.css');
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  width: 1180px;
  margin: 0 auto;
  overflow: scroll !important;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

button a {
  color: #fff;
}
</style>
