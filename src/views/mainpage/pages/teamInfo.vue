<template>
  <div class="team_info_container">
    <PublicTitle title="队伍信息" />
    <div v-if="teamInfo" class="leader_contain">
      <div class="leader_top">
        <!-- <div class="item">
          <span class="item_name">编号: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.teamNo" placement="top-start">
            <span class="item_detail">{{teamInfo.teamNo}}</span>
          </el-tooltip>
        </div> -->
        <div class="item">
          <span class="item_name">队伍: </span>
          <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.teamName"></el-input>
        </div>
        <div class="item">
          <span class="item_name">队长: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captainName" placement="top-start">
            <span class="item_detail">{{teamInfo.captainName}}</span>
          </el-tooltip>
        </div>
        <!-- <div class="item">
          <span class="item_name">赛区: </span>
          <el-tooltip class="item" effect="dark" :content="getZone(teamInfo.matchZone)" placement="top-start">
            <span class="item_detail">{{getZone(teamInfo.matchZone)}}</span>
          </el-tooltip>
        </div> -->
        <!-- <div class="item">
          <span class="item_name">省份: </span>
          <el-tooltip class="item" effect="dark" :content="getProvince(teamInfo.matchZone, teamInfo.province)" placement="top-start">
            <span class="item_detail">{{getProvince(teamInfo.matchZone, teamInfo.province)}}</span>
          </el-tooltip>
        </div> -->
        <!-- <div class="item">
          <span class="item_name">方向: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.opusDirection" placement="top-start">
            <span class="item_detail">{{teamInfo.opusDirection}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">课题: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.subject" placement="top-start">
            <span class="item_detail">{{teamInfo.subject}}</span>
          </el-tooltip>
        </div> -->
        <div class="item">
          <span class="item_name">电话: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captainPhone" placement="top-start">
            <span class="item_detail">{{teamInfo.captainPhone}}</span>
          </el-tooltip>
        </div>
        <!-- <div class="item">
          <span class="item_name">进度: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captainPhone" placement="top-start">
            <span class="item_detail">{{getProgress(teamInfo.progress)}}</span>
          </el-tooltip>
        </div> -->
        <!-- <div class="item">
          <span class="item_name">指导老师: </span>
            <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.instructor"></el-input>
        </div>
        <div class="item">
          <span class="item_name">老师电话: </span>
            <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.instructorPhone"></el-input>
        </div>
        <div class="item">
          <span class="item_name">团队介绍: </span>
            <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.teamIntroduction"></el-input>
        </div>
        <div class="item">
          <span class="item_name">招募需求: </span>
            <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.recruitmentDemand"></el-input>
        </div> -->
      </div>
      <div class="leader_bottom">
        <div class="item">
          <el-button size="mini"
            @click="dissolution"
            >解散队伍</el-button>
        </div>
        <div class="item">
          <el-button size="mini"
          @click="addTeam"
            >添加队员</el-button>
        </div>
        <!-- <div class="item">
          <el-button size="mini"
            @click="editTeamStatus(teamInfo.teamState)"
            >{{
            teamInfo.teamState === 1 && '发布组队' ||
            teamInfo.teamState === 0 && '组队完成'
            }}</el-button>
        </div> -->
        <div class="item">
          <el-button size="mini"
            @click="editTeamName(teamInfo.teamNo)"
            >{{
              !canEdit ? '编辑信息' : '保存'
            }}</el-button>
        </div>
      </div>
    </div>
    <PublicTitle title="队伍成员" />
    <div v-if="teamInfo" class="member_contain">
      <!-- 队伍成员 -->
      <div v-for="(item, index) in teamInfo.teamMembers" :key="index" class="member_item">
        <div class="member_name">
          <i class="iconfont icon-shouhuoren"></i>
          {{item.username}}
        </div>
        <div class="item_contain">
          <p class="item_detail">
            <span class="title">手机号: </span>
            <span class="detail">{{item.phone}}</span>
          </p>
          <p class="item_detail">
            <span class="title">邮箱: </span>
            <span class="detail">{{item.email}}</span>
          </p>
          <p class="item_detail">
            <span class="title">学校: </span>
            <span class="detail">{{item.school}}</span>
          </p>
          <p class="item_detail">
            <span class="title">学历: </span>
            <span class="detail">{{item.profession}}</span>
          </p>
          <p class="item_detail">
            <span class="title">专业: </span>
            <span class="detail"> {{filterDegree(item.degree)}}</span>
          </p>
        </div>
        <div class="btn_contain">
          <span @click="editMember(item)">编辑</span>
          <span @click="removeMember(item)">移除</span>
        </div>
      </div>
    </div>

    <!-- 弹层 -->
    <el-dialog :title="isAdd ? '添加队员':'编辑队员'" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addForm" label-width="80px">
        <el-form-item label="姓名"
          prop="username"
          :rules="{
            required: true, message: '姓名不能为空', trigger: 'blur'
          }">
          <el-input v-model="form.username" size="mini"/>
        </el-form-item>

        <el-form-item label="手机"
          v-if="isAdd"
          prop="phone"
          :rules="{
            required: true, message: '姓名不能为空', trigger: 'blur'
          }">
          <el-input v-model="form.phone" size="mini"/>
        </el-form-item>

        <el-form-item label="邮箱"
          prop="email"
          :rules="{
            required: true, message: '邮箱不能为空', trigger: 'blur'
          }">
          <el-input v-model="form.email" size="mini"/>
        </el-form-item>

        <el-form-item label="学校"
          prop="school"
          :rules="{
            required: true, message: '学校不能为空', trigger: 'blur'
          }">
          <el-input v-model="form.school" size="mini"/>
        </el-form-item>

        <el-form-item label="专业"
          prop="profession"
          :rules="{
            required: true, message: '专业不能为空', trigger: 'blur'
          }">
          <el-input v-model="form.profession" size="mini"/>
        </el-form-item>
        <el-form-item label="学历"
          prop="degree"
          :rules="{
            required: true, message: '学历不能为空', trigger: 'blur'
          }">
            <el-select size="mini" v-model="form.degree" placeholder="请选择">
            <el-option
              v-for="item in DegreeData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicTitle from '@/components/public_title.vue'
import DegreeData from '@/config/degree.js'

export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      DegreeData,
      isAdd: false,
      form: {},
      dialogFormVisible: false,
      canEdit: false,
      teamInfo: {
        teamNo: '',
        teamName: '',
        teamMembers: [
          {
            phone: '',
            email: '',
            school: '',
            profession: '',
            grade: ''
          }
        ]
      }
    }
  },
  created () {
    this.getTeamInfo()
  },
  methods: {
    ...mapActions(['PUT_EDIT_TEAM_NAME', 'PUT_TEAM_EDIT', 'POST_TEAM_ADD', 'GET_MY_TEAM_INFO', 'PUT_REMOVE_MEMBER', 'PUT_TEAM_COMPLETE', 'PUT_MY_TEAM_INFO', 'POST_DISMISS_TEAM']),
    async getTeamInfo () {
      const res = await this.GET_MY_TEAM_INFO()
      if (res.result === '0' && res.data) {
        this.teamInfo = res.data
      }
    },
    async editTeamInfo (teamNo) {
      if (!this.canEdit) {
        this.canEdit = !this.canEdit
        return
      }
      if (!this.teamInfo.teamName) {
        this.$message.error('请填写队伍名称')
        return
      }
      if (!this.teamInfo.instructor) {
        this.$message.error('请填写指导老师')
        return
      }
      if (!this.teamInfo.instructorPhone) {
        this.$message.error('请填写老师电话')
        return
      }
      if (!this.teamInfo.teamIntroduction) {
        this.$message.error('请填写团队介绍')
        return
      }
      if (!this.teamInfo.recruitmentDemand) {
        this.$message.error('请填写招募需求')
        return
      }
      const res = await this.PUT_MY_TEAM_INFO({
        instructor: this.teamInfo.instructor,
        instructorPhone: this.teamInfo.instructorPhone,
        teamNo: this.teamInfo.teamNo,
        teamIntroduction: this.teamInfo.teamIntroduction,
        recruitmentDemand: this.teamInfo.recruitmentDemand,
        teamName: this.teamInfo.teamName
      })
      if (res.result === '0' && res.data) {
        this.$message.success('修改成功')
        this.canEdit = !this.canEdit
        this.getTeamInfo()
      }
    },
    // 移除
    async removeMember (data) {
      const res = await this.PUT_REMOVE_MEMBER({
        teamMemberId: data.teamMemberId,
        teamId: this.teamInfo.teamId
      })
      if (res.result === '0' && res.data) {
        this.$message.success('移除成功')
        this.getTeamInfo()
      }
    },
    async editTeamStatus (status) {
      const res = await this.PUT_TEAM_COMPLETE({
        teamNo: this.teamInfo.teamNo,
        teamState: status ? 0 : 1
      })
      console.log(res)
    },
    // 编辑队伍名称
    async editTeamName () {
      if (!this.canEdit) {
        this.canEdit = !this.canEdit
        return
      }
      if (!this.teamInfo.teamName) {
        this.$message.error('请填写队伍名称')
        return
      }
      try {
        const params = {
          teamId: this.teamInfo.teamId,
          teamName: this.teamInfo.teamName
        }
        const res = await this.PUT_EDIT_TEAM_NAME(params)
        if (res.result === '0' && res.data) {
          this.$message.success('修改成功')
          this.canEdit = false
        } else {
          this.$message.error('修改失败')
        }
      } catch (e) {
        this.$message.error('修改失败')
        console.lg(e)
      }
    },
    // 编辑队员
    editMember (item) {
      this.form = {}
      this.isAdd = false
      this.dialogFormVisible = true
      this.form = JSON.parse(JSON.stringify(item))
    },
    // 解散队伍
    async dissolution () {
      const res = await this.POST_DISMISS_TEAM({ teamId: this.teamInfo.teamId })
      if (res.result === '0' && res.data) {
        this.$message.success('解散成功')
        this.$router.push('userInfo')
      }
    },
    // 添加队员
    addTeam () {
      this.form = {}
      this.isAdd = true
      this.dialogFormVisible = true
    },
    // 编辑或者新增队员
    async submit () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          if (!this.validatePhone(this.form.phone)) {
            this.$message.error('请输入正确的手机号码')
            return
          }
          if (!this.validateEmail(this.form.email)) {
            this.$message.error('请输入正确的邮箱')
            return
          }
          if (this.isAdd) {
            // 新增
            try {
              const list = []
              list.push(this.form)
              const params = {
                teamId: this.teamInfo.teamId,
                teamMembers: list
              }
              console.log(params)
              const res = await this.POST_TEAM_ADD(params)
              if (res.result === '0' && res.data) {
                this.dialogFormVisible = false
                this.$message.success('新增队员成功')
                this.getTeamInfo()
              } else {
                this.$message.error('新增队员失败')
              }
              // 查询
            } catch (e) {
              console.log(e)
            }
          } else {
            // 编辑
            try {
              const obj = {
                degree: this.form.degree,
                email: this.form.email,
                profession: this.form.profession,
                school: this.form.school,
                username: this.form.username
              }
              const params = {
                accountId: this.form.accountId,
                params: obj
              }
              console.log(params)
              const res = await this.PUT_TEAM_EDIT(params)
              if (res.result === '0' && res.data) {
                this.dialogFormVisible = false
                this.$message.success('编辑队员成功')
                this.getTeamInfo()
              } else {
                this.$message.error('编辑队员失败')
              }
            } catch (e) {
              console.log(e)
            }
          }
        }
      })
    },
    // 进度
    getProgress (data) {
      let value = ''
      switch (data) {
        case 0:
          value = '组队中'
          break
        case 1:
          value = '初赛'
          break
        case 2:
          value = '复赛'
          break
        case 3:
          value = '决赛'
          break
        case 4:
          value = '淘汰'
          break
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
  .team_info_container {
    .iconfont {
      font-size: 13px;
    }
    .leader_contain {
      margin-top: 20px;
      margin-bottom: 50px;
      padding: 20px 0;

      background: white;
      box-shadow: 1px 2px 5px 1px $border_color;
      border-radius: 5px;
      border: 2px solid $border_color;
      background-color: $card_bg_color;
      box-shadow:1px 2px 10px 0px rgba(0, 0, 0, 0.3);
      .leader_top {
        display: flex;
        flex-wrap: wrap;

        padding: 0 30px;

        .item {
          width: 33%;
          margin-top: 10px;
          font-size: 16px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-child(n > 3) {
          }
          .item_name {
            display: inline-block;

            width: 80px;
            margin-right: 5px;

            color: $card_font_color;
            text-align: right;
          }
          .item_detail {
            color: $card_font_color;
          }
        }
      }
      .leader_bottom {
        display: flex;
        justify-content: space-around;

        padding: 20px 30px;
        padding-bottom: 0;
        .item {
          font-size: 16px;
          .item_name {
            display: inline-block;

            width: 80px;
            margin-right: 5px;

            color: $card_font_color;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item_detail {
            color: $card_font_color;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .member_contain {
      display: flex;
      flex-wrap: wrap;

      .member_item {
        width: 31%;
        margin-top: 30px;
        overflow: hidden;
        margin-left: 3.3%;

        background-color: #fff;
        border-radius: 10px;
        box-shadow:1px 2px 10px 0px rgba(0, 0, 0, 0.3);
        transition: all .2s linear;
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
        &:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,.1);
          transform: translate3d(0,-2px,0);
        }
        .member_name {
          height: 40px;
          line-height: 40px;

          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }
        .item_contain {
          padding: 0 20px;

          .item_detail {
            margin-bottom: 10px;

            font-size: 14px;
            color: #666;
          }
        }
        .btn_contain {
          display: flex;
          justify-content: space-between;

          height: 40px;
          line-height: 40px;
          text-align: center;

          background: #dc1e32;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          span {
            width: 50%;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .leader_top {
    .el-input {
      width: 60%;
    }
  }
  .team_info_container {
    .el-dialog__wrapper {
      .el-dialog__body {
        .el-form {
          justify-content: space-between;
          display: flex;
          flex-wrap: wrap;
          .el-form-item {
            width: 50%;
          }
        }
      }
    }
  }
</style>
