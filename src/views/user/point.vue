/* eslint-disable no-irregular-whitespace */
<template>
  <div class="app-container">
    <h1>积分详情</h1>
    <h2>当前积分：{{ point }}</h2>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >

      <el-table-column label="账号" min-width="90">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="变更明细" min-width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column>
      <el-table-column label="剩余积分" min-width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.point }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="发生时间" min-width="100">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 0 50px 0">
      <el-pagination
        background
        style="float:right;"
        layout="total, prev, pager, next, jumper"
        :page-size="size"
        :total="total"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>
<script>
import { getPointLog, getPoint } from '@/api/point'
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      size: 10,
      currentPage: 1,
      point: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPoint({}).then(response => {
        this.point = response.data
      })
      getPointLog({ 'current': this.currentPage, 'size': this.size }).then(response => {
        this.list = response.retList
        this.total = response.totalRow
        this.listLoading = false
      }).catch(fail => {
        this.$message.error(fail.retMsg)
        this.listLoading = false
      })
    },
    handleCurrentChange(page) {
      console.log(page)
      this.currentPage = page
      this.fetchData()
    }
  }

}
</script>
