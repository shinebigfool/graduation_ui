/* eslint-disable no-irregular-whitespace */
<template>
  <div class="app-container">
    <search-bar ref="searchBar" @onSearch="searchResult" />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="借阅人" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="书名" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bookTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传者" min-width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.uploadPerson }}
        </template>
      </el-table-column>
      <el-table-column
        label="图书类型"
        min-width="80"
        align="center"
        :filters="[{text:'文学',value:1},{text: '流行',value: 2},
                   {text: '文化',value: 3},{text: '生活',value: 4},
                   {text: '经营',value: 5},{text: '科技',value: 6}]"
        :filter-method="filterCid"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.cid | formatCid">{{ scope.row.cid | formatCid }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="借阅状态"
        min-width="80"
        align="center"
        :filters="[{text:'已还',value:1},{text: '阅读中',value: 2}]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state | formatStata }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="借出时间" min-width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.borrowDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="预计归还时间" min-width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.needReturnDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="实际归还时间" min-width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.returnDate }}</span>
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
import { getBorrowLog } from '@/api/borrowLog'
import SearchBar from '@/views/borrowlog/SearchBar'

export default {
  components: { SearchBar },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'message'
      }
      return statusMap[status]
    },
    formatStata(status) {
      const statusMap = {
        1: '已还',
        2: '阅读中'
      }
      return statusMap[status]
    },
    formatCid(cid) {
      const categoryMap = {
        1: '文学',
        2: '流行',
        3: '文化',
        4: '生活',
        5: '经营',
        6: '科技'
      }
      return categoryMap[cid]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      size: 10,
      currentPage: 1,
      title: '',
      name: '',
      cid: '',
      borrowName: '',
      borrowState: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getBorrowLog({ 'current': this.currentPage, 'size': this.size,
        'title': this.title, 'author': this.name, 'uploadPerson': this.name, 'cid': this.cid,
        'name': this.borrowName, 'borrowState': this.borrowState
      }).then(response => {
        console.log(response.retList)
        this.list = response.retList
        this.total = response.totalRow
        this.listLoading = false
      }).catch(fail => {
        this.$message.error(fail.retMsg)
      })
    },
    filterStatus(value, row) {
      // console.log(value + typeof (value))
      // console.log(row.examineState + typeof (row.examineState))
      // console.log(row.examineState === value)
      // console.log('=================')

      return row.state === value
    },
    filterCid(value, row) {
      return row.cid === value
    },
    handleCurrentChange(page) {
      console.log(page)
      this.currentPage = page
      this.fetchData()
    },
    searchResult() {
      this.currentPage = 1
      this.borrowName = this.$refs.searchBar.borrowName
      this.cid = this.$refs.searchBar.cid
      this.name = this.$refs.searchBar.name
      this.title = this.$refs.searchBar.title
      this.borrowState = this.$refs.searchBar.borrowState
      this.fetchData()
    }
  }
}
</script>
