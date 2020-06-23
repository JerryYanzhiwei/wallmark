<template>
  <el-menu class="side_menu_container"
    text-color="#80799e"
    background-color="#0b2338"
    active-text-color="#fff"
    mode="vertical"
    :router="true"
    :default-active="$route.path">
    <template v-for="(item, index) in menuData">
      <el-menu-item
        v-if="item.flag"
        :key="index"
        :index="item.path"
        :route="item.path">{{item.title}}</el-menu-item>
    </template>
    </el-menu>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  watch: {
    $route: async function (val) {
      console.log(111)
      await this.getUserInfo()
    }
  },
  computed: {
    menuData () {
      console.log(this.userInfo, 123)
      return [
        {
          path: '/main/userInfo',
          title: '我的信息',
          flag: true
        },
        {
          path: '/main/teamDetail',
          title: '队伍中心',
          flag: !this.userInfo.captainFlag
        },
        {
          path: '/main/teamInfo',
          title: '队伍信息',
          flag: this.userInfo.captainFlag
        },
        {
          path: '/main/worksSubmit',
          title: '作品提交',
          flag: this.userInfo.captainFlag
        }
      ]
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['GET_USER_INFO']),
    async getUserInfo () {
      const res = await this.GET_USER_INFO()
      if (res.result === '0' && res.data) {
        this.userInfo = res.data
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.side_menu_container {
  padding-top: 20px;
  height: 100%;
  background-color: $bg_color;
  .el-menu-item:hover {
    background-color: unset;
  }
}
</style>
