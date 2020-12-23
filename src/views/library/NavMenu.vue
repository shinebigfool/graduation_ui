<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px"
  >
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>

    <i class="el-icon-switch-button" style="float:right;font-size: 40px;color: #222;padding-top: 8px" @click="logout" />
    <span style="position: absolute;padding-top: 20px;right: 37%;font-size: 20px;font-weight: bold">幼儿园共建共享绘本图书馆管理平台</span>
  </el-menu>
</template>

<script>

export default {
  name: 'NavMenu',
  data() {
    return {
      navList: [
        { name: '/index', navItem: '首页' },
        { name: '/jotter', navItem: '笔记本' },
        { name: '/library', navItem: '图书馆' },
        { name: '/admin', navItem: '个人中心' }
      ]
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }

  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
  span {
    pointer-events: none;
  }
</style>

