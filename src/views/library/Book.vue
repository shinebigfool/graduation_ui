<template>
  <div>
    <el-row
      style="height: 840px;"
    >
      <search-bar ref="searchBar" @onSearch="searchResult" />
      <el-tooltip
        v-for="item in books.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        :key="item.id"
        effect="dark"
        placement="right"
      >
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{ item.title }}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{ item.author }}</span> /
          <span>{{ item.date }}</span> /
          <span>{{ item.press }}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{ item.abs }}</p>
        <el-card
          style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px"
          class="book"
          body-style="padding:10px"
          shadow="hover"
        >
          <div class="cover" @click="showBookDetail(item)">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="" target="_blank">{{ item.title }}</a>
            </div>
          </div>
          <div class="author">{{ item.author }}</div>
        </el-card>
      </el-tooltip>
      <borrow-form ref="borrowForm" @onSubmit="loadBooks()" />
    </el-row>
    <el-row>
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>
<script>
import SearchBar from '@/views/table/SearchBar'
import BorrowForm from '@/views/library/BorrowForm'
import { getList } from '@/api/table'
import { showBookDetail } from '@/api/table'
export default {
  name: 'Book',
  components: { BorrowForm, SearchBar },
  data() {
    return {
      books: [],
      currentPage: 1,
      pageSize: 18,
      total: 0,
      cid: 0
    }
  },

  mounted() {
    this.loadBooks()
  },
  methods: {
    loadBooks() {
      getList({ 'cid': this.cid, 'current': 1, 'size': 1000 }).then(response => {
        this.books = response.retList
        this.total = response.totalRow
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    searchResult() {
      const keyword = this.$refs.searchBar.keywords
      getList({ 'current': 1, 'size': 1000, 'title': keyword, 'author': keyword, 'uploadPerson': keyword }).then(response => {
        this.books = response.retList
      })
    },
    showBookDetail(item) {
      showBookDetail({ 'id': item.id }).then(response => {
        console.log(response)
        const book = response
        this.$refs.borrowForm.dialogFormVisible = true
        this.$refs.borrowForm.form = {
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
          availableState: book.availableState
        }
      }).catch(() => {
        this.dialogFormVisible = false
      })
    },
    updateBooks(books, total) {
      console.log('update')
      this.books = books
      this.total = total
    }
  }
}
</script>
<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }

</style>
