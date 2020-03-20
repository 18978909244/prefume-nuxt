<template>
  <div>
    <el-row
      v-for="(row, rowIndex) in goods"
      :key="rowIndex"
      :gutter="Number(30)"
      type="flex"
      class="row-bg"
      justify="start"
    >
      <el-col
        v-for="(item, colIndex) in row"
        :key="colIndex"
        :span="24 / span"
        style="margin-bottom:40px"
      >
        <nuxt-link :to="`/good/${item.id}`">
          <el-card :body-style="{ paddingTop: '20px' }">
            <el-image
              :src="item.image || 'http://iph.href.lu/200x200?text=image'"
              fit="fit"
            >
            </el-image>
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ item.price }}</time> -->
                <el-button type="text" class="button">查看</el-button>
              </div>
            </div>
          </el-card></nuxt-link
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
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
  data() {
    return {
      goods: _.chunk(this.data, this.span),
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {}
  }
}
</script>

<style>
.row-bg {
  /* padding-top: 50px; */
}
/* .image {
  width: 100%;
  display: block;
} */
</style>
