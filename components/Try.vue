<template>
  <el-select :value="value">
    <el-option
      v-for="option in list.a"
      :key="option.id"
      :label="option.name"
      :value="option.id"
    />
  </el-select>
</template>

<script>
// import { mapGetters } from 'vuex'
const sleep = time => new Promise(resolve => setTimeout(resolve, time * 1000))
export default {
  data() {
    return {
      value: '',
      list: {}
    }
  },
  async created() {
    await sleep(2)
    // this.$forceUpdate()
    this.list.a = [
      {
        name: '男',
        id: 1
      }
    ]
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
