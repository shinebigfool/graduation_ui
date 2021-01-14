<template>
  <div class="app-container">
    <search-tools ref="searchTools" @onSearch="searchResult" />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="操作者账号" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operationPerson }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图书编号" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作类型"
        min-width="80"
        align="center"
        :filters="[{text:'新增',value:1},{text: '审批',value: 2},
                   {text: '下架',value: 3}]"
        :filter-method="filterOpType"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | formatType">{{ scope.row.type | formatType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="操作状态"
        min-width="80"
        align="center"
        :filters="[{text:'成功',value:1},{text: '异常',value: 0}]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | formatStata }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作时间" min-width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createDate }}</span>
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
        :current-page="current"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>
<script>
import { qryLog } from '@/api/operationLog'
import SearchTools from '@/views/operatelog/SearchTools'
export default {
  components: { SearchTools },
  filters: {
    formatType(type) {
      const typeMap = {
        1: '新增图书',
        2: '审批图书',
        3: '下架图书'
      }
      return typeMap[type]
    },
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[status]
    },
    formatStata(status) {
      const statusMap = {
        1: '成功',
        0: '异常'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      size: 10,
      current: 1,
      date: '',
      type: '',
      state: '',
      opName: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      qryLog({ 'current': this.current, 'size': this.size, 'date': this.date,
        'type': this.type, 'state': this.state, 'opName': this.opName }).then(response => {
        this.list = response.retList
        this.total = response.totalRow
      }).catch(fail => {
        this.list = fail.retList
        this.total = fail.totalRow
        this.$message.error(fail.retMsg)
      })
      this.listLoading = false
    },
    filterOpType(value, row) {
      return row.type === value
    },
    filterStatus(value, row) {
      return row.status === value
    },
    handleCurrentChange(page) {
      this.current = page
      this.listLoading = true
      this.fetchData()
    },
    searchResult() {
      this.current = 1
      this.listLoading = true
      this.opName = this.$refs.searchTools.opName
      this.date = this.$refs.searchTools.date
      this.type = this.$refs.searchTools.type
      this.fetchData()
    }
  }
}
</script>
