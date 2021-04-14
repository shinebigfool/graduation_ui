<template>
  <el-menu
    class="categories"
    default-active="0"
    active-text-color="red"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <i class="el-icon-menu" />
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="el-icon-menu" />
      <span slot="title">人格</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu" />
      <span slot="title">情绪</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-menu" />
      <span slot="title">生活习惯</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-menu" />
      <span slot="title">社会行为</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-menu" />
      <span slot="title">认知</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-menu" />
      <span slot="title">创造</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      cid: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.cid = key
      this.$emit('indexSelect')
    }
  }
}
</script>

<style scoped>
  .categories {
    position: fixed;
    margin-left: 50%;
    left: -600px;
    top: 100px;
    width: 150px;
  }
</style>
