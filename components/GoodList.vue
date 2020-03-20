<template>
  <div class="flex flex-row flex-wrap">
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="`${span === 1 ? 'w-full' : 'w-1/' + span}`"
    >
      <el-card class="m-4">
        <nuxt-link :to="`/good/${item.id}`">
          <el-image
            :src="item.image || 'http://iph.href.lu/200x200?text=image'"
            fit="fit"
            class="w-full"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
          <div class="text-base">
            <div class="line-2">{{ item.name }}</div>
            <div :class="span > 3 ? 'p-2' : ''" class="flex justify-between">
              <div class="time text-red-700 font-bold">￥{{ item.price }}</div>
              <div
                v-if="span > 1"
                class="time text-gray-700 line-through text-sm"
              >
                ￥{{ item.org_price }}
              </div>
              <!-- <el-button type="text" class="button">查看</el-button> -->
            </div>
            <div v-if="item.good_properties && item.good_properties.length > 0">
              <el-tag
                v-for="(type, idx) in item.good_properties"
                :key="idx"
                class="mr-2"
                >{{ type.good_type.name }}</el-tag
              >
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
  },
  mounted() {}
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
