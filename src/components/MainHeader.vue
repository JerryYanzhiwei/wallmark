<template>
  <div class="main_header_container">
    <div @click="toModule" class="left_txt">
      沃尔玛大赛
    </div>
    <div class="right">
      <span class="btn" @click="$router.push('/main')">{{userData.username}}</span>
      <span class="line">|</span>
      <div class="btn exit_btn"
        @click="exitLogin">退出</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userData () {
      return this.getUser() || {}
    }
  },
  data () {
    return {
      logo: require('../assets/images/logo.png')
    }
  },
  methods: {
    exitLogin () {
      this.$router.push('/')
    },
    toModule () {
      this.$router.push('/moduleSelect')
    }
  }
}
</script>

<style lang="scss" scoped>
.main_header_container {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .left_txt {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #fff;
    .line {
      margin: 0 20px;
    }
    .btn {
      cursor: pointer;
    }
    .exit_btn {
    }
  }
}
</style>
