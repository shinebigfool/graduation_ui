<template>
  <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
    <el-input
      v-model="title"
      placeholder="根据书名搜索..."
      prefix-icon="el-icon-search"
      size="small"
      style="width: 200px;margin-right: 5px"
      @keyup.enter.native="searchClick"
    />
    <el-input
      v-model="name"
      placeholder="根据上传者/作者搜索..."
      prefix-icon="el-icon-search"
      size="small"
      style="width: 200px;margin-right: 5px"
      @keyup.enter.native="searchClick"
    />
    <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    <el-button size="small" type="primary" icon="el-icon-search" @click="refresh">重置</el-button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      title: '',
      name: ''
    }
  },
  methods: {
    searchClick() {
      this.$emit('onSearch')
    },
    refresh() {
      this.title = ''
      this.name = ''
      this.searchClick()
    }
  }
}
</script>

<style scoped>

</style>
