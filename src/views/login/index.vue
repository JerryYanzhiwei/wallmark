<template>
  <div class="login_container">
    <!-- 登录 -->
    <div v-if="isLogin && deviceType === 1" class="login_content">
      <p class="login_txt">登录</p>
      <div class="form_item">
        <span class="label_title">手机号</span>
        <el-input type="number" v-model="loginForm.phone" size="mini"></el-input>
      </div>
      <div v-if="!loginType" class="form_item">
        <span class="label_title">密码</span>
        <el-input type="password" v-model="loginForm.password" size="mini"></el-input>
      </div>
      <div v-else class="form_item msg_input">
        <span class="label_title">验证码</span>
        <el-input v-model="loginForm.verificationCode" size="mini"></el-input>
        <span v-if="!showLoginCode" @click="sendLoginCode" class="send_msg">发送验证码</span>
        <span v-else class="send_msg">{{loginCode}}</span>
      </div>
      <div class="btn_contain">
        <!-- 隐藏登录 -->
        <!-- <span @click="isLogin = false">注册</span> -->
        <span v-if="false" @click="isLogin = false">注册</span>
        <el-button v-if="!loginType" @click="passwordLogin">登录</el-button>
        <el-button v-if="loginType" @click="codeLogin">登录</el-button>
        <span @click="changeLoginType">
          {{
            !loginType ? '验证码登录' : '密码登录'
          }}
        </span>
      </div>
    </div>
    <!-- 注册 -->
    <div v-else class="registry_content">
      <p class="registry_txt">
        <span v-if="deviceType === 1" @click="isLogin = true">返回登录</span>
        注册
      </p>
      <div class="login_form_contain">
        <el-form
          :model="registryForm"
          ref="registryForm"
          :rules="rules"
          >
          <!-- 姓名 -->
          <el-form-item
            prop="username"
            label="姓名">
            <el-input
              v-model="registryForm.username"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item
            prop="phone"
            label="手机号">
            <el-input
              type="number"
              v-model="registryForm.phone"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item
            prop="verificationCode"
            label="验证码">
            <el-input
              v-model="registryForm.verificationCode"
              size="mini"
              >
            </el-input>
            <span v-if="!showCount" @click="getRegistryCode" class="get_code">获取验证码</span>
            <span v-if="showCount" class="get_code">{{count}}</span>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item
            prop="password"
            label="密码">
            <el-input
              type="password"
              v-model="registryForm.password"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item
            prop="email"
            label="邮箱">
            <el-input
              v-model="registryForm.email"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 学校 -->
          <el-form-item
            prop="school"
            label="学校">
            <el-input
              v-model="registryForm.school"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 学历 -->
          <el-form-item
            prop="degree"
            label="学历">
            <el-select size="mini" v-model="registryForm.degree" placeholder="请选择">
              <el-option
                v-for="item in DegreeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 专业 -->
          <el-form-item
            prop="profession"
            label="专业">
            <el-input
              v-model="registryForm.profession"
              size="mini"
              >
            </el-input>
          </el-form-item>
          <!-- 省份 -->
          <el-form-item
            prop="province"
            label="学校所在省份">
            <el-select
              class="city_select"
              @change="changeProvince"
              size="mini"
              v-model="registryForm.province"
              placeholder="请选择">
              <el-option
                v-for="item in ProvinceData"
                :key="item.value"
                :label="item.labelZh"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 城市 -->
          <el-form-item
            prop="city"
            label="学校所在城市">
            <el-select class="city_select" size="mini" v-model="registryForm.city" placeholder="请选择">
              <el-option
                v-for="item in cityData"
                :key="item.value"
                :label="item.labelZh"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="intention_contain">
          <p>是否对沃尔玛秋招/实习招募感兴趣？</p>
          <el-select size="mini" v-model="registryForm.intention" placeholder="请选择">
            <el-option
              v-for="item in [{label: '是', value: '0'}, {label: '否', value: '1'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="agree_rules">
        <el-checkbox v-model="checked">我已阅读并同意 <span @click="toAgreement">《个人信息保护政策》
</span> </el-checkbox>
      </div>
      <!-- 隐藏注册 -->
      <!-- <div class="btn_contain"> -->
      <div v-if="false" class="btn_contain">
        <el-button @click="submitRegistry" size="mini">注册</el-button>
      </div>
      <div class="phone_tips" v-if="deviceType === 2">
        报名成功后,请登录大赛网站 <a class="link_style" href="http://walmart-bc.zhaopin.com">walmart-bc.zhaopin.com</a> ,完成团队组建、作品提交等后续操作
      </div>
    </div>
    <!-- 抽奖 -->
    <!-- <div v-if="drawVisibel" class="prize_contain">
      <p class="luck_draw_txt">点击抽奖</p>
      <div class="prize_items">
        <div @click="touchPrize" class="prize_detail" v-for="(item, index) in [1, 2, 3]" :key="index">
          <img class="prize_cover front" :src="prizeCover" alt="">
          <img class="prize_cover back" :src="prizeBack" alt="">
          <img class="hidden" :src="prizeCover" alt="">
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import bg from '@/assets/bg.png'
import ProvinceData from '@/config/province.js'
import DegreeData from '@/config/degree.js'

export default {
  data () {
    return {
      logo: require('../../assets/images/title.jpg'),
      prizeCover: require('../../assets/images/cover1.png'),
      prizeBack: require('../../assets/images/cover2.png'),
      ProvinceData,
      DegreeData,
      cityData: '',
      bg,
      checked: false,
      showCount: false,
      count: 0,
      timer: null,
      loginTimer: null,
      showLoginCode: false,
      loginCode: 0,
      deviceType: null, // 1: PC 2: phone
      // 是否可抽奖
      canDraw: true,
      // 抽奖弹框
      drawVisibel: false,
      // true: 登录  false: 注册
      isLogin: true,
      // false: 密码登录  true: 验证码登录
      loginType: false,
      studentCard: null,
      fileName: '',
      loginForm: {
        phone: '',
        password: '',
        verificationCode: ''
      },
      registryForm: {
        city: '',
        degree: '',
        intention: '',
        username: '',
        phone: '',
        verificationCode: '',
        password: '',
        email: '',
        school: '',
        profession: '',
        province: ''
      },
      postForm: null,
      sexArr: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        }
      ]
    }
  },
  computed: {
    rules () {
      return {
        username: [
          { required: true, message: '', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '', trigger: 'blur' }
        ],
        profession: [
          { required: true, message: '', trigger: 'blur' }
        ],
        degree: [
          { required: true, message: '', trigger: 'blur' }
        ],
        intention: [
          { required: true, message: '', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.deviceType = document.body.clientWidth > 500 ? 1 : 2
  },
  methods: {
    ...mapActions(['login', 'POST_GET_CODE', 'POST_REGISTRY', 'LOGIN_CODE', 'CODE_LOGIN']),
    // 跳转协议
    toAgreement () {
      this.$router.push('/agreement')
    },
    // 选择省份 根据省份过滤城市
    changeProvince (data) {
      this.registryForm.city = ''
      const arr = ProvinceData.filter((item) => item.value === data)
      this.cityData = arr[0].children
    },
    // 获取登录验证码
    async sendLoginCode () {
      const res = await this.LOGIN_CODE({
        phone: this.loginForm.phone
      })
      if (res.result === '0' && res.data) {
        this.$message.success('发送成功')
        this.loginCode = 60
        this.showLoginCode = true
        this.loginTimer = setInterval(() => {
          this.loginCode--
          if (this.loginCode === 0) {
            clearInterval(this.loginTimer)
            this.loginTimer = null
            this.showLoginCode = false
            this.loginCode = 60
          }
        }, 1000)
      }
    },
    // 抽奖
    touchPrize ($el) {
      if (this.canDraw) {
        $el.target.style.transform = 'rotateY(-180deg)'
        $el.target.nextSibling.style.transform = 'rotateY(-360deg)'
        this.canDraw = false
        setTimeout(() => {
          location.reload()
        }, 3000)
      }
    },
    // 密码登录
    async passwordLogin () {
      if (!this.validatePhone(this.loginForm.phone)) {
        this.$message.error('请输入正确的手机号码')
        return
      }
      const res = await this.login(this.loginForm)
      if (res.result === '0') {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        this.$router.push('/main/userInfo')
      }
      console.log('密码登录', res)
    },
    async codeLogin () {
      const res = await this.CODE_LOGIN(this.loginForm)
      if (res.result === '0') {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        this.$router.push('/main/userInfo')
      }
      console.log('验证码登录', res)
    },
    // 切换登录方式
    changeLoginType () {
      this.loginType = !this.loginType
      const dom = this.$refs.file2
      dom.value = ''
      this.studentCard = null
      this.fileName = ''
    },
    // 获取注册验证码
    async getRegistryCode () {
      const res = await this.POST_GET_CODE({
        phone: this.registryForm.phone
      })
      if (res.result === '0' && res.data) {
        this.$message.success('发送成功')
        this.count = 60
        this.showCount = true
        this.timer = setInterval(() => {
          this.count--
          console.log(this.count, 111)
          if (this.count === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.showCount = false
            this.count = 60
          }
        }, 1000)
      }
    },
    // 注册账号
    submitRegistry () {
      this.$refs.registryForm.validate(async (valid) => {
        if (valid) {
          if (!this.validatePhone(this.registryForm.phone)) {
            this.$message.error('请输入正确的手机号码')
            return
          }
          if (!this.validateEmail(this.registryForm.email)) {
            this.$message.error('请输入正确的邮箱')
            return
          }
          if (this.registryForm.intention === '') {
            this.$message.error('请选择是否有意向加入沃尔玛')
            return
          }
          if (!this.checked) {
            this.$message.error('阅读并同意《个人信息保护政策》')
            return
          }
          this.postForm = new FormData()
          for (var key in this.registryForm) {
            this.postForm.append(key, this.registryForm[key])
          }
          const res = await this.POST_REGISTRY(this.postForm)
          if (res.result === '0' && res.data) {
            if (this.deviceType === 2) {
              this.$dialog.alert({
                message: '报名成功,请登录大赛网站walmart-bc.zhaopin.com,完成团队组建、作品提交等后续操作'
              }).then(() => {
                location.reload()
              })
            } else {
              this.isLogin = true
            }
          }
          console.log('通过', res)
        } else {
          console.log(21321)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login_container{
    .link_style {
      color: #409EFF;
    }
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
    height: 100vh;
    background-image: url('../../assets/logobj.png');
    background-size: cover;
    background-repeat: no-repeat;
    .reload {
      font-size: 12px;
      color: #409EFF;
      cursor: pointer;
    }
    .login_content {
      width: 400px;
      padding: 20px;
      margin-right:13%;

      border-radius: 8px;
      box-shadow:1px 2px 10px 0px rgba(0, 0, 0, 0.3);
      .login_top {
        margin-bottom: 30px;
        text-align: center;
        img {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
      }
      background-color: #fff;
      .login_txt {
        text-align: center;
        font-size: 18px;
      }
      .form_item {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        margin-top: 20px;
        .label_title {
          width: 80px;
        }
        .send_msg {
          position: absolute;
          bottom: 5px;
          right: 40px;

          font-size: 12px;
          color: #409EFF;
          cursor: pointer;
        }
      }
      .btn_contain {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 30px;
        padding: 0 20px;
        span {
          font-size: 12px;
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
    .registry_content {
      width: 400px;
      padding: 20px;
      margin-right: 13%;
      margin-top: 10%;

      background-color: #fff;
      border-radius: 8px;
      box-shadow:1px 2px 10px 0px rgba(0, 0, 0, 0.3);
      .registry_txt {
        position: relative;

        margin-bottom: 10px;

        text-align: center;
        font-size: 18px;
        span {
          position: absolute;
          left: 0;
          top: 5px;

          font-size: 12px;
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
    .prize_contain {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      background-color: rgba(0, 0, 0, .8);
      .luck_draw_txt {
        margin-bottom: 10%;

        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
      .prize_items {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        width: 100%;
        .prize_detail {
          position: relative;
          width: 20%;
          perspective: 500;
          img.prize_cover {
            position: absolute;
            top: 0;
            left: 0;
            transition: all 1s;
            backface-visibility: hidden;
            perspective: 1000;
            border-radius: 10px;
            cursor: pointer;
            width: 100%;
            height: auto;
          }
          .hidden {
            width: 100%;
            height: auto;
            margin-bottom: 10%;
            visibility: hidden;
          }
          .back {
            transform: rotateY(-180deg);
          }
          // &:hover .front {
          //   transform: rotateY(-180deg);
          // }
          // &:hover .back {
          //   transform: rotateY(-360deg);
          // }
        }
      }
    }
    .btn_contain {
      margin-top: 15px;
      text-align: center;
    }
    .intention_contain {
      color: #606266;
      padding-left: 40px;
      p {
        margin-bottom: 10px;
      }
    }
    .agree_rules {
      padding-left: 40px;
      margin-top: 15px;
      color: #409eff;
      span {
        color: #dc1e32;
      }
    }
    .phone_tips {
      margin-top: 10px;
      margin-bottom: 10px;

      text-align: center;
      font-size: 12px;
      color: #333;
    }
  }
  @media screen and (max-width: 500px) {
    .login_container .login_content {
      box-shadow: unset;
      width: 100%;
    }
    .login_container .registry_content {
      width: 100%;
      height: 100%;
      margin-right: 0;
      margin-top: 0;
      box-shadow: unset;
      border-radius: 0;
    }
    .registry_content .el-input--mini {
      width: 70%;
    }
    .login_form_contain .el-form-item .get_code {
      right: 11%;
    }
    .login_container .prize_contain .prize_items .prize_detail {
      width: 40%;
    }
  }
</style>

<style lang="scss">
  .el-select {
    width: unset!important;
  }
  .el-input {
    width: 230px;
  }
  .msg_input {
    .el-input--mini .el-input__inner {
      padding-right: 80px;
    }
  }
  .login_form_contain {
    .el-form-item__label {
      min-width: 80px;
    }
    .el-form-item {
      position: relative;

      margin-bottom: 5px;
      .get_code {
        position: absolute;
        right: 60px;
        top: 2px;
        width: 60px;
        text-align: center;

        font-size: 12px;
        color: #409EFF;
        cursor: pointer;
      }
    }
  }
  .el-form-item__error {
    display: none;
  }
  @media screen and (max-width: 500px) {
    .login_container .registry_content {
      .el-select {
        width: 70% !important;
        .el-input {
          width: 100%;
        }
      }
      .city_select {
        width: 60%!important;
      }
      .intention_contain {
        .el-select {
          width: 94% !important;
        }
      }
    }
    .registry_content .el-input--mini {
      width: 70%;
    }
    .login_form_contain .el-form-item .get_code {
      right: 8%;
    }
    .login_container .prize_contain .prize_items .prize_detail {
      width: 40%;
    }
  }
</style>
