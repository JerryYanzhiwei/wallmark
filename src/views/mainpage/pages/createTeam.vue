<template>
  <div class="create_team_contain">
    <PublicTitle title="队伍名称" color="#333" />
    <div class="team_name_contain">
      <el-input placeholder="请输入队伍名称" size="mini" v-model="createTeam.teamName" maxlength="20" type="text"/>
    </div>
    <PublicTitle title="队伍成员" color="#333" />
    <div class="member_contain">
      <div v-for="(item, index) in teamMember" :key="index" class="member_item">
        <span @click="delMember(index)" class="el-icon-close"></span>
        <p>
          <span>姓名</span>
          <el-input v-model="item.username" size="mini"/>
        </p>
        <p>
          <span>手机</span>
          <el-input v-model="item.phone" size="mini"/>
        </p>
        <p>
          <span>邮箱</span>
          <el-input v-model="item.email" size="mini"/>
        </p>
        <p>
          <span>学校</span>
          <el-input v-model="item.school" size="mini"/>
        </p>
        <p>
          <span>专业</span>
          <el-input v-model="item.profession" size="mini"/>
        </p>
      </div>
      <div v-if="teamMember.length < 5" @click="addMember" class="member_item add_member">
        <i class="el-icon-plus"></i>
        <p>添加队员</p>
      </div>
    </div>
  </div>
</template>

<script>
import PublicTitle from '@/components/public_title.vue'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      createTeam: {},
      teamMember: [
        {
          username: '',
          phone: '',
          email: '',
          school: '',
          profession: ''
        },
        {
          username: '',
          phone: '',
          email: '',
          school: '',
          profession: ''
        },
        {
          username: '',
          phone: '',
          email: '',
          school: '',
          profession: ''
        }
      ]
    }
  },
  methods: {
    // 删除成员
    delMember (index) {
      this.teamMember.splice(index, 1)
    },
    // 添加成员
    addMember () {
      this.teamMember.push({
        username: '',
        phone: '',
        email: '',
        school: '',
        profession: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.create_team_contain {
  .team_name_contain {
    padding-top: 15px;
    width: 30%;
    margin-bottom: 30px;
  }
  .member_contain {
    display: flex;
    flex-wrap: wrap;
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
