/* eslint-disable no-irregular-whitespace */
<template>
  <div class="app-container">
    <h1>超期管理</h1>
    <log-detail ref="logDetail" @onSubmit="fetchData" />
    <search-bar ref="searchBar" @onSearch="searchResult" />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="showLogDetail"
    >
      <el-table-column label="用户账户" min-width="70" align="center">
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
        :filters="[{text:'人格',value:1},{text:'情绪',value:2},
                   {text:'生活习惯',value:3},{text:'社会行为',value:4},
                   {text:'认知',value:5},{text:'创造',value:6},]"
        :filter-method="filterCid"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.cid | formatCid">{{ scope.row.cid | formatCid }}</el-tag>
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
      <el-table-column label="超期时长" min-width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.overDue }}
        </template>
      </el-table-column>
      <el-table-column label="预计扣除积分数" min-width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.point }}
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
import { getPersonnelLog, getLogDetail } from '@/api/borrowLog'
import SearchBar from '@/views/affair/SearchBar'
import LogDetail from '@/views/affair/logDetail'
export default {
  components: { SearchBar, LogDetail },
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
        1: '人格',
        2: '情绪',
        3: '生活习惯',
        4: '社会行为',
        5: '认知',
        6: '创造'
      }
      return categoryMap[cid]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      size: 10,
      currentPage: 1,
      title: '',
      name: '',
      cid: '',
      borrowState: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPersonnelLog({ 'current': this.currentPage, 'size': this.size,
        'title': this.title, 'author': this.name, 'uploadPerson': this.name, 'cid': this.cid,
        'borrowState': this.borrowState, 'overDue': 1
      }).then(response => {
        console.log(response.retList)
        this.list = response.retList
        this.listLoading = false
        this.total = response.totalRow
      }).catch(error => {
        this.$message.error(error.retMsg)
        this.listLoading = false
      })
      this.listLoading = false
    },
    filterStatus(value, row) {
      return row.state === value
    },
    filterCid(value, row) {
      return row.cid === value
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    searchResult() {
      this.currentPage = 1
      this.cid = this.$refs.searchBar.cid
      this.name = this.$refs.searchBar.name
      this.title = this.$refs.searchBar.title
      this.borrowState = this.$refs.searchBar.borrowState
      this.fetchData()
    },
    showLogDetail(log) {
      console.log(log.state)
      getLogDetail({ 'id': log.id }).then(response => {
        const book = response
        this.$refs.logDetail.dialogFormVisible = true
        this.$refs.logDetail.form = {
          id: book.id,
          cover: book.cover,
          author: book.author,
          title: book.title,
          press: book.press,
          abs: book.abs,
          cid: book.cid,
          publishDate: book.publishDate,
          uploadPerson: book.uploadPerson,
          insertDate: book.insertDate,
          examineState: book.examineState,
          examinePerson: book.examinePerson,
          examineNote: book.examineNote,
          updateDate: book.updateDate,
          favorite: book.favorite,
          availableState: book.availableState,
          ifReturn: log.state,
          borrowPerson: book.borrowPerson,
          onlineUrl: book.onlineUrl
        }
      }).catch(fail => {
        console.log(fail)
      })
    }
  }
}
</script>
