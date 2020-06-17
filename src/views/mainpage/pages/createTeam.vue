<template>
  <div class="create_team_contain">
    <PublicTitle title="队伍名称" color="#333" />
    <div class="team_name_contain">
      <el-input placeholder="请输入队伍名称" size="mini" v-model="teamName" maxlength="20" type="text"/>
      <el-button class="create_btn" size="mini" @click="createMyTeam('teamForm')">创建队伍</el-button>
    </div>
    <PublicTitle title="队伍成员" color="#333" />
    <div class="member_contain">
      <el-form :model="formData" ref="teamForm" class="member_form" style="width:100%;">
        <div v-for="(item, index) in formData.teamMembers" :key="index" class="member_item">
          <span @click="delMember(index)" class="el-icon-close"></span>
          <el-form-item label="姓名"
            :prop="'teamMembers.' + index + '.username'"
            :rules="{
              required: true, message: '姓名不能为空', trigger: 'blur'
            }">
            <el-input v-model="item.username" size="mini"/>
          </el-form-item>

          <el-form-item label="手机"
            :prop="'teamMembers.' + index + '.phone'"
            :rules="{
              required: true, message: '手机不能为空', trigger: 'blur'
            }">
            <el-input v-model="item.phone" size="mini"/>
          </el-form-item>

          <el-form-item label="邮箱"
            :prop="'teamMembers.' + index + '.email'"
            :rules="{
              required: true, message: '邮箱不能为空', trigger: 'blur'
            }">
            <el-input v-model="item.email" size="mini"/>
          </el-form-item>

          <el-form-item label="学校"
            :prop="'teamMembers.' + index + '.school'"
            :rules="{
              required: true, message: '学校不能为空', trigger: 'blur'
            }">
            <el-input v-model="item.school" size="mini"/>
          </el-form-item>

          <el-form-item label="专业"
            :prop="'teamMembers.' + index + '.profession'"
            :rules="{
              required: true, message: '专业不能为空', trigger: 'blur'
            }">
            <el-input v-model="item.profession" size="mini"/>
          </el-form-item>
          <el-form-item label="学历"
            :prop="'teamMembers.' + index + '.degree'"
            :rules="{
              required: true, message: '学历不能为空', trigger: 'blur'
            }">
             <el-select size="mini" v-model="item.degree" placeholder="请选择">
              <el-option
                v-for="item in DegreeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="formData.teamMembers.length < 4" @click="addMember" class="member_item add_member">
          <i class="el-icon-plus"></i>
          <p>添加队员</p>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import PublicTitle from '@/components/public_title.vue'
import DegreeData from '@/config/degree.js'
import { mapActions } from 'vuex'

export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      DegreeData,
      teamName: '',
      formData: {
        teamMembers: [
          {
            username: '',
            phone: '',
            email: '',
            school: '',
            profession: '',
            degree: ''
          },
          {
            username: '',
            phone: '',
            email: '',
            school: '',
            profession: '',
            degree: ''
          },
          {
            username: '',
            phone: '',
            email: '',
            school: '',
            profession: '',
            degree: ''
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['POST_CREATE_TEAM']),

    // 删除成员
    delMember (index) {
      this.formData.teamMembers.splice(index, 1)
    },
    // 添加成员
    addMember () {
      this.formData.teamMembers.push({
        username: '',
        phone: '',
        email: '',
        school: '',
        profession: '',
        degree: ''
      })
    },
    // 创建队伍
    async createMyTeam (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          for (let i = 0; i < this.formData.teamMembers.length; i++) {
            if (!this.validatePhone(this.formData.teamMembers[i].phone)) {
              this.$message.error(`请输入队员${this.formData.teamMembers[i].username}正确的手机号码`)
              return
            }
            if (!this.validateEmail(this.formData.teamMembers[i].email)) {
              this.$message.error(`请输入队员${this.formData.teamMembers[i].username}正确的邮箱`)
              return
            }
          }
          try {
            this.formData.teamName = this.teamName
            const res = await this.POST_CREATE_TEAM(this.formData)
            console.log(res)
            if (res.result === '0' && res.data) {
              this.$message.success('创建队伍成功')
              this.$router.push('/main/teamDetail')
            } else {
              this.$message.error('创建队伍失败')
            }
          } catch (e) {
            console.log(e)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.create_team_contain {
  .team_name_contain {
    display: flex;
    padding-top: 15px;
    width: 30%;
    margin-bottom: 30px;
    .create_btn {
      margin-left: 10px;
    }
  }
  .member_contain {
    .member_form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    .member_item {
      padding: 20px;
      width: 30%;
      margin-right: 3%;
      margin-top: 20px;
      border-radius: 8px;
      box-shadow:1px 2px 10px 0px rgba(0, 0, 0, 0.3);
      position: relative;
      p {
        margin-bottom: 10px;
        span {
          display: block;
          margin-bottom: 5px;
        }
      }
      .el-icon-close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 15px;

        cursor: pointer;
      }
      &.add_member {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 355px;
        cursor: pointer;
        .el-icon-plus {
          font-size: 50px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.create_team_contain {
  .member_contain {
    .el-input {
      width: 100%;
    }
    .el-form-item__content {
      line-height:36px;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-form-item__label {
      line-height:20px;
    }
    .el-form-item__error {
      padding-top:2px;
    }
  }
}
.el-select {
  width: 100%;
}
</style>
