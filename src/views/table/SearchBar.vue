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
      <el-option label="人格" :value="1" />
      <el-option label="情绪" :value="2" />
      <el-option label="生活习惯" :value="3" />
      <el-option label="社会行为" :value="4" />
      <el-option label="认知" :value="5" />
      <el-option label="创造" :value="6" />
    </el-select>
    <el-select v-model="examineState" placeholder="按审核状态..." size="small" style="width: 200px;margin-right: 15px">
      <el-option label="待审核" :value="0" />
      <el-option label="已过审" :value="1" />
      <el-option label="未过审" :value="2" />
    </el-select>
    <el-select v-model="availableState" placeholder="按可用状态..." size="small" style="width: 200px;margin-right: 15px">
      <el-option label="可借" :value="1" />
      <el-option label="不可借" :value="0" />
      <el-option label="已下架" :value="3" />
    </el-select>
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
      name: '',
      cid: '',
      examineState: '',
      availableState: ''
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
      this.examineState = ''
      this.availableState = ''
      this.searchClick()
    }
  }
}
</script>

<style scoped>

</style>
