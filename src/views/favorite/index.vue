<template>
  <div class="app-container">
    <h1>收藏夹</h1>
    <log-detail ref="logDetail" @onSubmit="fetchData" />
    <favorite-search ref="FavoriteSearch" @onSearch="searchResult" />
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
          <el-button type="text" @click.native.stop="removeFavorite(scope.row)">取消收藏</el-button>
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
import { showBookDetail, removeFavoriteBook, qryFavroiteBooks } from '@/api/table'

import LogDetail from '@/views/personnalBorrow/logDetail'
import FavoriteSearch from '@/views/favorite/FavoriteSearch'

export default {
  components: { LogDetail, FavoriteSearch },
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
      current: 1,
      size: 10,
      title: '',
      name: '',
      cid: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      qryFavroiteBooks({ 'current': this.current, 'size': this.size,
        'title': this.title, 'author': this.name, 'uploadPerson': this.name, 'cid': this.cid
      }).then(response => {
        console.log(response.retList)
        this.list = response.retList
        this.total = response.totalRow
      }).catch(fail => {
        this.$message.error(fail.retMsg)
      })
      this.listLoading = false
    },
    checkDetail(log) {
      console.log(log)
      showBookDetail({ 'id': log.id }).then(response => {
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
          ifReturn: book.isInHand,
          borrowPerson: book.borrowPerson
        }
      }).catch(fail => {
        console.log(fail)
      })
    },
    removeFavorite(book) {
      removeFavoriteBook(book).then(response => {
        this.$message.success(response.retMsg)
        this.fetchData()
      }).catch(fail => {
        this.$message.error(fail.retMsg)
        this.fetchData()
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    filterStatus(value, row) {
      return row.examineState === value
    },
    filterCata(value, row) {
      return row.cid === value
    },
    filterBorrow(value, row) {
      return row.availableState === value
    },
    searchResult() {
      this.current = 1
      this.cid = this.$refs.FavoriteSearch.cid
      this.name = this.$refs.FavoriteSearch.name
      this.title = this.$refs.FavoriteSearch.title
      this.fetchData()
    }
  }
}
</script>

<style>

</style>
