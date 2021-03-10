<template>
  <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
    <el-select v-model="selectedClass" placeholder="请选择班级" size="small" style="width: 200px;margin-right: 15px" @change="selectChange">
      <el-option v-for="(item,index) in classList" :key="index" :label="item.name" :value="item.id" />
    </el-select>
    <el-input
      v-model="name"
      placeholder="根据用户账号搜索..."
      prefix-icon="el-icon-search"
      size="small"
      style="width: 200px;margin-right: 5px"
      @keyup.enter.native="searchClick"
    />
    <el-input
      v-model="uname"
      placeholder="根据用户名搜索..."
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
      uname: '',
      name: '',
      classList: [{
        classId: '',
        className: '',
        classGrade: '',
        createTime: '',
        userAmount: '',
        name: ''
      }],
      selectedClass: ''
    }
  },
  methods: {
    searchClick() {
      this.$emit('onSearch')
    },
    refresh() {
      this.uname = ''
      this.name = ''
      this.selectedClass = ''
      this.searchClick()
    },
    selectChange() {
      this.$emit('onSearch')
    }
  }
}
</script>

<style scoped>

</style>
