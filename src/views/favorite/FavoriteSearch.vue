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
    <el-select v-model="cid" placeholder="按种类搜索..." size="small" style="width: 200px;margin-right: 15px">
      <el-option label="文学" :value="1" />
      <el-option label="流行" :value="2" />
      <el-option label="文化" :value="3" />
      <el-option label="生活" :value="4" />
      <el-option label="经管" :value="5" />
      <el-option label="科技" :value="6" />
    </el-select>
    <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    <el-button size="small" type="primary" icon="el-icon-search" @click="refresh">重置</el-button>
  </div>
</template>

<script>
export default {
  name: 'FavoriteSearch',
  data() {
    return {
      title: '',
      name: '',
      cid: ''
    }
  },
  methods: {
    searchClick() {
      this.$emit('onSearch')
    },
    refresh() {
      this.title = ''
      this.name = ''
      this.cid = ''
      this.searchClick()
    }
  }
}
</script>

<style scoped>

</style>
