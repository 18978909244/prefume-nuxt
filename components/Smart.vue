<template>
  <div>
    <div>
      <el-switch
        v-if="type === 'switch'"
        :value="value"
        @change="e => valueChange(e, keyName)"
      />
      <el-input
        v-else-if="type === 'input'"
        :value="value"
        :placeholder="`请输入${name}`"
        @input="e => valueChange(e, keyName)"
        :disabled="disabled"
      />
      <el-input
        v-else-if="type === 'text'"
        :value="value"
        :placeholder="`请输入${name}`"
        @input="e => valueChange(e, keyName)"
        :disabled="disabled"
        type="textarea"
      />
      <el-input
        v-else-if="type === 'password'"
        :value="value"
        :placeholder="`请输入${name}`"
        @input="e => valueChange(e, keyName)"
        :disabled="disabled"
        type="password"
      />
      <el-select
        :value="value"
        @change="e => valueChange(e, keyName)"
        :placeholder="`请选择${name}`"
        v-else-if="type === 'select'"
      >
        <el-option
          v-for="option in select[keyName]"
          :key="option.id"
          :label="option.name"
          :value="option.id"
        />
      </el-select>
      <div v-else-if="type === 'image'">
        <el-button>
          <input
            :id="keyName"
            :name="keyName"
            @change="e => uploadImage(e, keyName)"
            type="file"
            value="上传"
          />
          <el-image
            v-if="value"
            :src="value"
            style="width: 100px; height: 100px"
            fit="fit"
          />
          <i
            v-if="value"
            @click="deleteImage(keyName)"
            class="el-icon-delete"
          />
        </el-button>
      </div>
      <slot v-else :name="keyName"></slot>
    </div>
  </div>
</template>

<script>
const handleType = name => {
  console.log(name)
  if (name.startsWith('is_')) {
    return 'switch'
  } else {
    return ''
  }
}
export default {
  props: {
    keyName: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'input'
    },
    value: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: () => {
        return null
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempImage: '',
      select: {}
    }
  },
  computed: {
    componentType: function() {
      return this.type || handleType(this.keyName)
    }
  },
  async created() {
    if (this.type === 'select' && this.keyName) {
      const item = this.keyName.match(/(.*)_id/)[1]
      const result = await this.$axios.$post(`${item}/findAll`)
      this.select = {
        [this.keyName]: result
      }
    }
  },
  methods: {
    valueChange(e, keyName) {
      console.log({
        key: keyName,
        value: e
      })
      this.$emit('valueChange', {
        key: keyName,
        value: e
      })
    },
    deleteImage(keyName) {
      this.$emit('valueChange', {
        key: keyName,
        value: ''
      })
    },
    async uploadImage(e, keyName) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      const result = await this.$axios.$post('common/upload', formData, {
        'Content-Type': 'multipart/form-data'
      })
      this.$emit('valueChange', {
        key: keyName,
        value: result.url
      })
    }
  }
}
</script>

<style scoped></style>
