<template>
  <div class="userInfo_container">
    <PublicTitle title="个人信息"/>
    <div class="user_contain">
      <div class="user_top">
        <div>
          <span>姓名: </span>
          <el-input v-model="userForm.username" size="mini"></el-input>
        </div>
        <div>
          <span>手机: </span>
          <el-input disabled="" v-model="userForm.phone" size="mini"></el-input>
        </div>
        <div>
          <span>邮箱: </span>
          <el-input v-model="userForm.email" size="mini"></el-input>
        </div>
        <div>
          <span>省份: </span>
          <el-select
            @change="changeProvince"
            size="mini"
            v-model="userForm.province"
            placeholder="请选择省份">
            <el-option
              v-for="item in provinceData"
              :key="item.value"
              :label="item.labelZh"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>城市: </span>
          <el-select size="mini" v-model="userForm.city" placeholder="请选择省份">
            <el-option
              v-for="item in getCityFromProvice(userForm.province)"
              :key="item.value"
              :label="item.labelZh"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>学校: </span>
          <el-input v-model="userForm.school" size="mini"></el-input>
        </div>
        <div>
          <span>专业: </span>
          <el-input v-model="userForm.profession" size="mini"></el-input>
        </div>
      </div>
      <div class="btn_contain">
        <el-button @click="editUserInfo" size="mini">修改</el-button>
      </div>
    </div>
    <PublicTitle title="资料包下载"/>
    <div class="user_contain ops_contain">
      <p>
        资料包下载
        <i class="iconfont icon-xiazai1 download_btn"
                @click="download(0)"></i>
      </p>
    </div>
  </div>
</template>

<script>
import PublicTitle from '@/components/public_title.vue'
import provinceData from '@/config/province.js'

import { mapActions } from 'vuex'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      provinceData,
      userForm: {
        city: '',
        email: '',
        intention: '',
        phone: '',
        profession: '',
        province: '',
        school: '',
        username: ''
      },
      dialogVisible: false,
      attachmentId: null,
      checked: false
    }
  },
  created () {
    this.getUserInfo()
    console.log(this.$route.path)
  },
  methods: {
    ...mapActions(['GET_USER_INFO', 'PUT_USER_INFO', 'GET_DOWNLOAD_TEMPLATE']),
    // modelDown () {
    //   if (!this.checked) {
    //     this.$message.error('请勾选同意条款')
    //     return
    //   }
    //   this.download(this.attachmentId)
    //   this.dialogVisible = false
    // },
    // // 打开弹框
    // openModel (attachmentId) {
    //   this.checked = false
    //   this.attachmentId = attachmentId
    //   this.dialogVisible = true
    // },
    // 更改省份
    changeProvince () {
      this.userForm.city = ''
    },
    // // 下载附件
    async download (attachmentId) {
      this.GET_DOWNLOAD_TEMPLATE(attachmentId)
    },
    async editUserInfo () {
      const params = this.userForm
      let status = true
      Object.keys(params).map(key => {
        if (params[key] === '') {
          console.log(key, params[key])
          this.$message.error('请填写完整资料')
          status = false
        }
      })
      if (!status) return
      const res = await this.PUT_USER_INFO(params)
      if (res.result === '0' && res.data) {
        this.$message.success('修改成功')
      }
      console.log(res)
    },
    async getUserInfo () {
      const res = await this.GET_USER_INFO()
      if (res.result === '0' && res.data) {
        this.userForm = res.data
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
      }
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo_container {
  width: 100%;
  min-height: 100vh;

  // background-color: #f4f5f8;
  .user_contain {
    margin-top: 30px;
    margin-bottom: 40px;
    padding: 20px 30px;

    background-color: #fff;
    box-shadow:0px 2px 6px rgba(0,0,0,0.2);
    border-radius: 8px;
    &.ops_contain {
      display: flex;
      p {
        margin-right: 20px;
        color: #dc1e32;
        .download_btn {
          margin-left: 5px;
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
    .user_top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      div {
        width: 50%;
        margin: 10px 0;

        text-align: center;
        span {
          display: inline-block;

          width: 85px;
          margin-right: 10px;

          text-align: right;
        }
      }
    }
    .btn_contain {
      margin-top: 10px;

      text-align: center;
    }
  }
}
</style>

<style lang="scss">
  .userInfo_container .user_contain .user_top div.el-textarea {
    vertical-align: top;
    margin: 0;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
  .tip_txt {
    margin-bottom: 10px;
  }
</style>
