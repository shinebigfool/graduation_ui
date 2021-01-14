<template>
  <div>
    <div style="margin-left: 320px;font-size:50px;float: left;">收藏榜</div>
    <div style="margin-left: 400px;font-size:50px;float: left;">借阅榜</div>
    <div class="rank">
      <ul>
        <li v-for="(item,index) in favoriteCount" :key="index" style="list-style-type:decimal;" class="rank-item" @click="showBook(item)">
          <!-- <div>{{ index+1 }}</div> -->
          <div class="rank-media">
            <img :src="item.cover">
            <span class="listen-count">{{ item.favoriteCount }}🧡</span>
          </div>
          <div class="rank-info">
            <p class="rank-title">{{ item.title }}</p>
            <p style="font-size:5px">{{ item.author }}</p>
            <div style="font-size:10px;white-space: nowrap;text-overflow: ellipsis;">{{ item.abs }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="rankRight">
      <ul>
        <li v-for="(item,index) in lendCount" :key="index" class="rank-item" @click="showBook(item)">
          <div class="rank-media">
            <img :src="item.cover">
            <span class="listen-count">{{ item.lendCount }}☑</span>
          </div>
          <div class="rank-info">
            <p class="rank-title">{{ item.title }}</p>
            <p style="font-size:5px">{{ item.author }}</p>
            <div style="font-size:10px;white-space: nowrap;text-overflow: ellipsis;">{{ item.abs }}</div>
          </div>
        </li>
      </ul>
    </div>
    <borrow-form ref="borrowForm" @onSubmit="fetchData()" />
  </div>
</template>
<script>
import { favoriteCount, lendCount, showBookDetail } from '@/api/table'
import BorrowForm from '@/views/library/BorrowForm'
export default {
  components: {
    BorrowForm
  },
  data() {
    return {
      favoriteCount: [],
      lendCount: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      favoriteCount().then(response => {
        this.favoriteCount = response.retList
      })
      lendCount().then(response => {
        this.lendCount = response.retList
      })
    },
    showBook(item) {
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
    }
  }
}
</script>
<style scoped>
  .rankRight {
    float: left;
    margin-left: 150px;
    width: 30%;
  }
  .rank {
    float: left;
    margin-left: 200px;
    width: 30%;
  }

  ul {
    margin-top: 60px;
    padding: 10px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    /* list-style-type: decimal; */
  }
  .rank-item {
    display: flex;
    flex-direction: row;
    height: 150px;
    background: #fff;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #DDD;
    border-radius: 5px;
    overflow: hidden;
    cursor:pointer;
  }

  .rank-item .rank-media {
    width: 100px;
    height: 150px;
    position: relative;
  }

  .rank-item .rank-media img {
    width: 100px;
    height: 150px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    z-index: 0;
  }

  .rank-item .rank-media .listen-count {
    position: absolute;
    bottom: 3px;
    left: 5px;
    color: rgb(245, 3, 3);
    font-size: 12px;
  }

  .rank-item .rank-info {
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }

  .rank-item .rank-info .rank-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .rank-item .rank-info .rank-songs {
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .rank-item .rank-info .rank-singername {
    color: #8f8f8f;
  }
  /* img {
    width: 100px;
    height: 100px;

  } */
</style>
