<template>
  <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
    <el-input
      v-model="opName"
      placeholder="操作员账号搜索..."
      prefix-icon="el-icon-search"
      size="small"
      style="width: 200px;margin-right: 5px"
      @keyup.enter.native="searchClick"
    />
    <el-select v-model="type" placeholder="按操作类型搜索..." size="small" style="width: 200px;margin-right: 15px">
      <el-option label="新增图书" value="1" />
      <el-option label="审核图书" value="2" />
      <el-option label="下架图书" value="3" />
    </el-select>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="按时间搜索..."
      style="width: 200px;margin-right: 10px"
      size="small"
      value-format="yyyy-MM-dd HH:mm"
      format="yyyy-MM-dd HH:mm"
    />
    <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    <el-button size="small" type="primary" icon="el-icon-search" @click="refresh">重置</el-button>
  </div>
</template>

<script>
export default {
  name: 'SearchTools',
  data() {
    return {
      opName: '',
      date: '',
      type: ''
    }
  },
  methods: {
    searchClick() {
      this.$emit('onSearch')
    },
    refresh() {
      this.opName = ''
      this.date = ''
      this.type = ''
      this.searchClick()
    }
  }
}
</script>

<style scoped>

</style>
