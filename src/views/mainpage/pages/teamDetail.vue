<template>
  <div class="team_info_container">
    <!-- <PublicTitle color="#333" title="队伍信息" />
    <div class="leader_contain">
      <div class="leader_top">
        <div class="item">
          <span class="item_name">编号: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.teamNo" placement="top-start">
            <span class="item_detail">{{teamInfo.teamNo}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">队伍: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.teamName" placement="top-start">
            <span class="item_detail">{{teamInfo.teamName}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">队长: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captain" placement="top-start">
            <span class="item_detail">{{teamInfo.captain}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">赛区: </span>
          <el-tooltip class="item" effect="dark" :content="getZone(teamInfo.matchZone)" placement="top-start">
            <span class="item_detail">{{getZone(teamInfo.matchZone)}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">省份: </span>
          <el-tooltip class="item" effect="dark" :content="getProvince(teamInfo.matchZone, teamInfo.province)" placement="top-start">
            <span class="item_detail">{{getProvince(teamInfo.matchZone, teamInfo.province)}}</span>
          </el-tooltip>
        </div>
        <div class="item">
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
        </div>
        <div class="item">
          <span class="item_name">队长电话: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captainPhone" placement="top-start">
            <span class="item_detail">{{teamInfo.captainPhone}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">指导老师: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.instructor" placement="top-start">
            <span class="item_detail">{{teamInfo.instructor}}</span>
          </el-tooltip>
        </div>
      </div>
      <div class="leader_bottom">
        <div class="item">
          <span class="item_name">组队中</span>
        </div>
        <div class="item">
          <el-button size="mini">完成组队</el-button>
        </div>
      </div>
      <div class="sign_out">
        <el-button size="mini">退出队伍</el-button>
      </div>
    </div> -->
    <PublicTitle color="#333" title="队伍成员" />
    <div v-if="teamInfo" class="exit_team">
      <el-button size="mini" @click="exitTeam">退出队伍</el-button>
    </div>
    <div v-if="!teamInfo" class="no_data">
      <p>暂未加入任何队伍</p>
      <p @click="toCreate" class="create_team">快来创建队伍吧!</p>
    </div>
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
            <span class="title">专业: </span>
            <span class="detail">{{item.profession}}</span>
          </p>
          <p class="item_detail">
            <span class="title">学历: </span>
            <span class="detail">{{filterDegree(item.degree)}}</span>
          </p>
        </div>
      </div>
    </div>
    <PublicTitle v-if="teamInfo && teamInfo.attachments" color="#333" title="作品列表" />
    <div v-if="teamInfo && teamInfo.attachments" class="work_list">
      <div v-for="(item, index) in teamInfo.attachments" :key="index">
        {{
          item.attachmentFileName
        }}
        <i @click="downLoad(item)" class="iconfont icon-xiazai1"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicTitle from '@/components/public_title.vue'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      teamInfo: null
    }
  },
  created () {
    this.getTeamInfo()
  },
  methods: {
    ...mapActions(['GET_TEAM_INFO', 'GET_DOWNLOAD_FILE', 'PUT_EXIT_TEAM']),
    async getTeamInfo () {
      const res = await this.GET_TEAM_INFO()
      console.log(res)
      if (res.result === '0' && res.data) {
        this.teamInfo = res.data
      }
    },
    toCreate () {
      this.$router.push('/main/createTeam')
    },
    async exitTeam () {
      this.$confirm('是否确定退出队伍？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.PUT_EXIT_TEAM()
        if (res.result === '0') {
          this.$router.go(0)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    async downLoad (file) {
      this.GET_DOWNLOAD_FILE(file.attachmentId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .team_info_container {
    .exit_team {
      text-align: right;
    }
    .no_data {
      width: 100%;
      text-align: center;
      padding: 20px 0;
      .create_team {
        margin-top: 10px;
        color: #1989fa;
        cursor:  pointer;
      }
    }
    .iconfont {
      font-size: 13px;
    }
    .leader_contain {
      margin-top: 20px;
      margin-bottom: 50px;
      padding: 20px 0;

      background: white;
      // box-shadow: 1px 2px 5px 1px $border_color;
      box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
      border: 2px solid $border_color;
      background-color: $card_bg_color;
      color: #333;
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

            width: 120px;
            margin-right: 5px;

            color: #333;
            text-align: right;
          }
          .item_detail {
            color: #333;
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

            color: #dc1e32;
            text-align: right;
          }
          .item_detail {
            color: rgb(51, 51, 51);
          }
        }
      }
      .sign_out {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 20px;
      }
    }
    .member_contain {
      display: flex;
      flex-wrap: wrap;

      margin-bottom: 50px;
      .member_item {
        width: 31%;
        margin-top: 30px;
        overflow: hidden;
        margin-left: 3.3%;

        background-color: $card_bg_color;
        border: 2px solid $border_color;
        box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        transition: all .2s linear;
        color: #333;
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
            color: #333;
          }
        }
        .btn_contain {
          height: 40px;
          line-height: 40px;
          text-align: center;

          background: #dc1e32;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .work_list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      margin-top: 30px;

      padding: 10px 20px;

      box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      div {
        width: 33%;

        text-align: left;
        color: #dc1e32;
        font-weight: bold;
        .icon-xiazai1 {
          cursor: pointer;
        }
      }
    }
  }
</style>

<style lang="scss">
.team_info_container {
  .leader_contain {
    .sign_out {
      .el-button {
        font-size: 16px;
        color: #333;
      }
    }
  }
}
</style>
