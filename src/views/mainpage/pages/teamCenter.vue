<template>
  <div class="team_cener_container">
    <PublicTitle title="我的队伍" color="#333" />
    <div class="team_contain added_contain">
      <div v-if="!teamInfo" class="no_data">
        <p>暂未加入任何队伍</p>
        <p @click="toCreate" class="create_team">快来创建队伍吧!</p>
      </div>
      <div
        v-if="teamInfo"
        @click="toDetail(teamInfo)"
        class="team_item">
        <div class="team_name">
          <i class="iconfont icon-tuandui"></i>
          <b class="name">{{teamInfo.teamName}}</b>
          <span>{{teamInfo.teamNo}}</span>
        </div>
        <div class="item_contain">
          <div class="item_detail">
            <div class="title">队长: </div>
            <div class="detail">{{teamInfo.captainName}}</div>
          </div>
          <div class="item_detail">
            <div class="title">电话: </div>
            <div class="detail">{{teamInfo.captainPhone}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicTitle from '@/components/public_title.vue'

import { mapActions } from 'vuex'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      teamInfo: null,
      dialogVisible: true
    }
  },
  created () {
    this.getTeamInfo()
  },
  methods: {
    ...mapActions(['GET_TEAM_INFO']),
    // 去创建队伍
    toCreate () {
      this.$router.push('/main/createTeam')
    },
    // 查询申请列表 type 1: 已加入 2: 拒绝/申请中
    async getTeamInfo () {
      const res = await this.GET_TEAM_INFO()
      console.log(res)
      if (res.result === '0' && res.data) {
        this.teamInfo = res.data
      }
    },
    // 跳转队伍详情
    toDetail (data) {
      this.$router.push({
        path: 'teamDetail',
        query: {
          id: data.teamId
        }
      })
    },
    // 修改队员信息
    updateInfo (data) {},
    // 移除队员
    removeTeam (data) {}
  }
}
</script>

<style lang="scss" scoped>
  .team_cener_container {
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
      font-size: 18px;
    }
    .team_contain {
      display: flex;
      flex-wrap: wrap;
      &.added_contain {
        margin-bottom: 30px;
      }
      .team_item {
        width: 31%;
        padding: 20px 0;
        padding-top: 10px;
        margin-top: 30px;
        overflow: hidden;
        margin-left: 3.3%;

        background-color: $card_bg_color;
        border: 2px solid $border_color;
        box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        cursor: pointer;
        &.apply_contain {
          position: relative;
          cursor: default;

          .apply_state {
            position: absolute;
            top: 10px;
            left: 10px;
            color: #333;
          }
        }
        transition: all .2s linear;
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
        &:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,.1);
          transform: translate3d(0,-2px,0);
        }
        .team_name {
          height: 40px;
          line-height: 40px;

          text-align: center;
          font-size: 16px;
          font-weight: bold;
          i {
            color: #333;
          }
          span {
            font-size: 12px;
            font-weight: normal;
            color: #333;
          }
          .name {
            color: #333;
          }
        }
        .item_contain {
          padding: 0 20px;

          .item_detail {
            display: flex;
            margin-bottom: 15px;

            font-size: 14px;
            color: #333;
            .title {
              width: 30%;
              padding-right: 5px;

              text-align: right;

              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .detail {
              width: 78%;

              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }

          .btn_contain {
            text-align: right;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .el-tooltip__popper {
    max-width: 300px;
  }
</style>
