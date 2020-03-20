<template>
  <div class="flex flex-row flex-wrap">
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="`${span === 1 ? 'w-full' : 'w-1/' + span}`"
    >
      <el-card class="m-4">
        <nuxt-link :to="`/merchant/${item.id}`">
          <el-image :src="item.avatar" fit="fit" class="w-full"> </el-image>
          <div class="text-base">
            <div class="line-2">{{ item.name }}</div>
            <div class="">
              <!-- <time class="time text-red-700 font-bold"
                >￥ {{ item.price }}</time
              > -->
              <!-- <el-button type="text" class="button">查看</el-button> -->
            </div>
          </div>
        </nuxt-link>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    span: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  computed: {},
  created() {
    // console.log('this.data', this.data)
  }
}
</script>

<style lang="less">
.main {
  .el-row {
    text-align: left;
    margin-top: 20px;
  }
  h4.price {
    display: inline;
    color: red;
    font-size: 40px;
    font-weight: bold;
  }

  .org_price {
    font-size: 20px;
    line-height: 56px;
    color: #222;
  }
}
</style>
