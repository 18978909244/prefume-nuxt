<template>
  <el-container>
    <el-header>
      <TopMenu />
    </el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            status-icon
            class="demo-ruleForm"
          >
            <el-form-item
              ><h1>
                注册
              </h1></el-form-item
            >
            <el-form-item label="账号" prop="name">
              <el-input
                v-model="ruleForm.name"
                type="text"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              ><el-button
                @click="submitForm('ruleForm')"
                type="primary"
                size="medium"
                style="width:100%"
                >注册</el-button
              ></el-form-item
            >
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script>
// import axios from 'axios'
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'

import { Message } from 'element-ui'
import TopMenu from '~/components/TopMenu.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Footer,
    TopMenu
    // Logo
  },
  data() {
    return {
      redirect: null,
      ruleForm: {
        name: '',
        password: '',
        mobile: '',
        code: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getName'])
  },
  async asyncData(context) {},
  created() {
    this.redirect = this.$route.query.redirect
  },
  methods: {
    ...mapActions(['asyncRegister']),
    async sendMsg(formName) {
      if (!this.ruleForm.mobile) return Message.error('请输入手机号')
      await this.$axios.$post(
        'common/sendMessage',
        _.pick(this.ruleForm, ['mobile'])
      )
      Message.success('验证码发送成功，请查收')
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.asyncRegister(this.ruleForm)
          if (this.redirect) {
            this.$router.push(this.redirect)
          } else {
            this.$router.push('/')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped></style>
