<template>
  <div class="flex flex-row flex-wrap">
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="`${span === 1 ? 'w-full' : 'w-1/' + span}`"
    >
      <el-card class="m-4">
        <div slot="header" v-if="item.countTime">
          <vueTimerCountdown
            :ignore-day="false"
            :deadline="item.countTime.time"
            v-slot="time"
            v-if="item.countTime.type === 0"
          >
            距秒杀开始还剩 {{ time.day }}天 {{ time.hour }}时
            {{ time.minute }}分 {{ time.second }}秒
          </vueTimerCountdown>

          <vueTimerCountdown
            :ignore-day="false"
            :deadline="item.countTime.time"
            v-slot="time"
            v-if="item.countTime.type === 1"
          >
            距秒杀结束还剩 {{ time.day }}天 {{ time.hour }}时
            {{ time.minute }}分 {{ time.second }}秒
          </vueTimerCountdown>
        </div>
        <nuxt-link :to="`/good/${item.good.id}`">
          <el-image :src="item.good.image" fit="fit" class="w-full"> </el-image>
          <div class="text-base">
            <div class="line-2">{{ item.good.name }}</div>
            <div class="">
              <time class="time text-red-700 font-bold"
                >秒杀价 ￥
                {{ (item.good.price + item.diff_price) | priceFilter }}</time
              >
              <!-- <el-button type="text" class="button">查看</el-button> -->
            </div>
          </div>
        </nuxt-link>
      </el-card>
    </div>
  </div>
</template>

<script>
import vueTimerCountdown from 'vue-timer-countdown'

export default {
  components: {
    vueTimerCountdown
  },
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
  created() {}
}
</script>

<style></style>
