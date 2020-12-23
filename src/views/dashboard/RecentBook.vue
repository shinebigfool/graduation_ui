<template>

  <div>
    <p style="font-size: 30px;font-weight: bold;text-align:center;">
      推荐阅读

    </p>
    <el-button round @click="getSuggestBook">换一批</el-button>
    <log-detail ref="logDetail" @onSubmit="getSuggestBook" />
    <el-table
      v-loading="listLoading"
      :data="books"
      border
      fit
      highlight-current-row
      @row-click="showLogDetail"
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
        label="借出状态"
        min-width="50"
        align="center"
        :filters="[{text:'不可借',value:0},{text:'可借',value:1}]"
        :filter-method="filterBorrow"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.availableState|borrowFilter">{{ scope.row.availableState | formatBorrow }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="出版时间" min-width="100">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.publishDate }}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>

</template>

<script>
import { fetchSuggestBook } from '@/api/dashboard'
import { showBookDetail } from '@/api/table'
import LogDetail from '@/views/personnalBorrow/logDetail'
export default {
  components: { LogDetail },
  filters: {
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
      books: [],
      listLoading: true
    }
  },
  created() {
    this.getSuggestBook()
  },
  methods: {
    test() {
      console.log(this.books)
    },
    getSuggestBook() {
      fetchSuggestBook().then(response => {
        console.log(response)
        this.books = response.retList
        this.listLoading = false
      })
    },
    filterCata(value, row) {
      return row.cid === value
    },
    filterBorrow(value, row) {
      return row.availableState === value
    },
    showLogDetail(log) {
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
    }
  }
}
</script>

<style>

</style>
