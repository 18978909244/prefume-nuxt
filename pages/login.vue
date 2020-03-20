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
            @submit.native.prevent
            status-icon
            class="demo-ruleForm"
          >
            <el-form-item
              ><h1>
                登录
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
            <el-form-item label="验证码" prop="captcha">
              <el-input v-model="ruleForm.captcha" autocomplete="off">
                <template slot="append">
                  <el-image
                    :src="captcha.img"
                    @click="initCaptchaImg"
                    fit="contain"
                    class="w-16 h-4"
                  ></el-image>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              ><el-button
                @click="submitForm('ruleForm')"
                type="primary"
                size="medium"
                style="width:100%"
                >登录</el-button
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
import { mapGetters, mapActions } from 'vuex'
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
      githubLoginUrl: '',
      redirect: null,
      captcha: {
        img: '',
        result: ''
      },
      ruleForm: {
        name: '',
        password: '',
        captcha: ''
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
        ],
        captcha: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.captcha.result) {
                callback(new Error('请输入正确验证码'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getName', 'is_login', 'is_mobile'])
  },
  async asyncData(context) {},
  created() {
    this.redirect = this.$route.query.redirect
    if (this.is_login && this.is_mobile) {
      this.$router.push(this.redirect || '/')
    }
  },
  mounted() {
    window.addEventListener('keyup', this.keyupEnter, false)
    this.initCaptchaImg()
    this.githubLoginUrl = `http://localhost:3001/shop/github/login?return_uri=${encodeURIComponent(
      window.location.origin + (this.redirect || '/')
    )}`
  },
  methods: {
    ...mapActions(['asyncLogin']),
    async initCaptchaImg() {
      const captcha = await this.$axios.$post('common/captcha')
      this.captcha = captcha
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.asyncLogin(this.ruleForm)
          if (this.redirect) {
            this.$router.push(this.redirect)
          } else {
            this.$router.push('/')
          }
        } else {
          return false
        }
      })
    },
    keyupEnter() {
      if (window.event.keyCode === 13) {
        this.submitForm('ruleForm')
      }
    }
  }
}
</script>

<style scoped></style>
