<template>
  <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
    <el-input
      v-model="keywords"
      placeholder="根据用户账户、所在班级或者用户昵称搜索..."
      prefix-icon="el-icon-search"
      size="small"
      style="width: 400px;margin-right: 10px"
      @keyup.enter.native="searchClick"
    />
    <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      keywords: ''
    }
  },
  methods: {
    searchClick() {
      this.$emit('onSearch')
    }
  }
}
</script>

<style scoped>

</style>

