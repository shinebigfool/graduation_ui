/* eslint-disable no-irregular-whitespace */
<template>
  <div class="app-container">
    <book-detail ref="detail" @onSubmit="fetchData" />
    <examine-book-detail ref="examine_detail" @onSubmit="fetchData" />
    <search-bar ref="searchBar" @onSearch="searchResult" />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="checkDetail"
    >
      <el-table-column type="expand" min-width="30">
        <template slot-scope="scope">
          <el-form label-position="left" inline>
            <el-form-item>
              <span>{{ scope.row.abs }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="标题(展开查看摘要)" min-width="90">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="作者" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="种类"
        min-width="50"
        align="center"
        :filters="[{text:'文学',value:1},{text:'流行',value:2},
                   {text:'文化',value:3},{text:'生活',value:4},
                   {text:'经营',value:5},{text:'科技',value:6},]"
        :filter-method="filterCata"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.cid|cataFilter">{{ scope.row.cid | formatCata }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="出版社" min-width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.press }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="审核状态"
        min-width="80"
        align="center"
        :filters="[{text:'已过审',value:1},{text: '未过审',value: 2},{text: '待审核',value: 0}]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.examineState | statusFilter">{{ scope.row.examineState | formatStata }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="可用状态"
        min-width="60"
        align="center"
        :filters="[{text:'不可借',value:0},{text:'可借',value:1},{text:'已下架',value:3}]"
        :filter-method="filterBorrow"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.availableState|borrowFilter">{{ scope.row.availableState | formatBorrow }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="入库时间" min-width="100">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.insertDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" @click.native.stop="checkDetail(scope.row)">详情</el-button>
          <el-button type="text" @click.native.stop="examineBook(scope.row)">审批</el-button>
          <el-button type="text" @click.native.stop="deleteBook(scope.row)">下架</el-button>
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
import { getList } from '@/api/table'
import BookDetail from '@/views/table/BookDetail'
import SearchBar from '@/views/table/SearchBar'
import ExamineBookDetail from '@/views/table/ExamineBookDetail'
import { deleteBook } from '@/api/table'
export default {
  components: { SearchBar, BookDetail, ExamineBookDetail },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'message',
        2: 'danger'
      }
      return statusMap[status]
    },
    formatStata(status) {
      const statusMap = {
        0: '待审核',
        1: '已过审',
        2: '未过审'
      }
      return statusMap[status]
    },
    // 对种类不做颜色区分
    cataFilter(cid) {

    },
    formatCata(cid) {
      const cataMap = {
        1: '文学',
        2: '流行',
        3: '文化',
        4: '生活',
        5: '经营',
        6: '科技'
      }
      return cataMap[cid]
    },
    borrowFilter(id) {
      const statusMap = {
        1: 'success',
        3: 'danger',
        0: 'info'
      }
      return statusMap[id]
    },
    formatBorrow(id) {
      const borrowMap = {
        0: '不可借',
        1: '可借',
        3: '已下架'
      }
      return borrowMap[id]
    }

  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      size: 10,
      currentPage: 1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({ 'current': this.currentPage, 'size': this.size }).then(response => {
        console.log(response.retList)
        this.list = response.retList
        this.total = response.totalRow
        this.listLoading = false
      })
    },
    filterStatus(value, row) {
      return row.examineState === value
    },
    filterCata(value, row) {
      return row.cid === value
    },
    checkDetail(book) {
      console.log(book)
      this.$refs.detail.dialogFormVisible = true
      this.$refs.detail.form = {
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
        updateDate: book.updateDate
      }
    },
    examineBook(book) {
      console.log(book)
      this.$refs.examine_detail.dialogFormVisible = true
      this.$refs.examine_detail.form = {
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
        updateDate: book.updateDate
      }
    },
    deleteBook(book) {
      deleteBook({ 'bid': book.id }).then(response => {
        this.$message.success(response.retMsg)
        this.fetchData()
      }).catch(fail => {
        this.$message.error(fail.retMsg)
        console.log(fail)
        this.fetchData()
      })
      console.log(book)
    },
    handleCurrentChange(page) {
      console.log(page)
      this.currentPage = page
      this.listLoading = true
      var keyword = this.$refs.searchBar.keywords
      console.log(keyword)
      if (keyword === '' || keyword === undefined || keyword == null) {
        getList({ 'current': page, 'size': this.size }).then(response => {
          console.log(response.retList)
          this.list = response.retList
          this.total = response.totalRow
          this.listLoading = false
        })
      } else {
        getList({ 'current': page, 'size': this.size, 'title': keyword, 'author': keyword, 'uploadPerson': keyword }).then(response => {
          console.log(response.retList)
          this.list = response.retList
          this.total = response.totalRow
          this.listLoading = false
        })
      }
    },
    searchResult() {
      this.listLoading = true
      var keyword = this.$refs.searchBar.keywords
      getList({ 'current': 1, 'size': this.size, 'title': keyword, 'author': keyword, 'uploadPerson': keyword }).then(response => {
        console.log(response.retList)
        this.list = response.retList
        this.total = response.totalRow
        this.listLoading = false
      })
    },
    filterBorrow(value, row) {
      return row.availableState === value
    }
  }
}
</script>
