<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch />
      <side-menu ref="sideMenu" @indexSelect="listByCategory" />
    </el-aside>
    <el-main>
      <book ref="booksArea" class="books-area" />
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from '@/views/library/SideMenu'
import Book from '@/views/library/Book'
import { getList } from '@/api/table'
export default {
  name: 'LibraryIndex',
  components: { Book, SideMenu },
  data() {
    return {
      cid: 0
    }
  },
  methods: {
    listByCategory() {
      console.log(this.$refs.sideMenu.cid)
      var _this = this
      this.cid = this.$refs.sideMenu.cid
      getList({ 'cid': this.cid, 'current': 1, 'size': 1000 }).then(response => {
        console.log(response)
        _this.$refs.booksArea.updateBooks(response.retList, response.totalRow)
      })
    }
  }
}
</script>

<style scoped>
  .books-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

