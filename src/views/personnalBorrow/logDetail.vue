<template>
  <div>
    <el-dialog
      title="借书日志"
      :visible.sync="dialogFormVisible"
      @close="clear"
    >
      <el-form ref="dataForm" v-model="form" style="text-align: left">
        <el-form-item style="text-align: center">
          <img :src="form.cover" alt="封面">
        </el-form-item>
        <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="不加《》" :readonly="true" />
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off" :readonly="true" />
        </el-form-item>
        <el-form-item label="是否可借" :label-width="formLabelWidth" prop="availableState">
          <el-tag :type="form.availableState|borrowFilter">{{ form.availableState|formatBorrow }}</el-tag>
        </el-form-item>
        <el-form-item label="出版日期" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-date-picker v-model="form.publishDate" type="date" placeholder="Pick a date" style="width: 100%;" :readonly="true" />
          </el-col>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" prop="press">
          <el-input v-model="form.press" autocomplete="off" :readonly="true" />
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
          <el-select v-model="form.cid" placeholder="请选择分类" disabled>
            <el-option label="文学" :value="1" />
            <el-option label="流行" :value="2" />
            <el-option label="文化" :value="3" />
            <el-option label="生活" :value="4" />
            <el-option label="经管" :value="5" />
            <el-option label="科技" :value="6" />
          </el-select>
        </el-form-item>
        <el-form-item label="阅览地址" :label-width="formLabelWidth" prop="onlineUrl">
          <a :href="form.onlineUrl" target="_blank">传送门</a>
        </el-form-item>
        <el-form-item label="上传者" :label-width="formLabelWidth" prop="uploadPerson">
          <el-input v-model="form.uploadPerson" autocomplete="off" :readonly="true" />
        </el-form-item>

        <el-form-item prop="id" style="height: 0">
          <el-input v-model="form.id" type="hidden" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="form.favorite==1" type="danger" icon="el-icon-star-on" @click="removeFavorite">取消收藏</el-button>
        <el-button v-else-if="form.favorite==0" icon="el-icon-star-off" @click="addFavorite">收 藏</el-button>
        <el-button v-if="form.ifReturn==1" type="primary" @click="borrowBook">借 阅</el-button>
        <el-button v-if="form.ifReturn==2" type="primary" @click="returnBook">归 还</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addFavoriteBook, lendBook, removeFavoriteBook } from '@/api/table'
import { returnBook } from '@/api/borrowLog'
export default {
  name: 'LogDetail',
  filters: {
    examineFilter(id) {
      const statusMap = {
        1: 'success',
        0: 'message',
        2: 'danger'
      }
      return statusMap[id]
    },
    formatExamine(id) {
      const statusMap = {
        0: '待审核',
        1: '已过审',
        2: '未过审'
      }
      return statusMap[id]
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
      dialogFormVisible: false,
      readOnly: true,
      form: {
        id: '',
        title: '',
        author: '',
        publishDate: '',
        press: '',
        cover: '',
        abs: '',
        cid: '',
        uplodaPerson: '',
        insertDate: '',
        examineState: '',
        examinePerson: '',
        examineNote: '',
        updateDate: '',
        favorite: '',
        availableState: '',
        ifReturn: '',
        borrowPerson: '',
        onlineUrl: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    addFavorite() {
      this.form.favorite = 1
      addFavoriteBook(this.form).then(response => {
        this.$message.success(response.retMsg)
      })
    },
    removeFavorite() {
      this.form.favorite = 0
      removeFavoriteBook(this.form).then(response => {
        this.$message.success(response.retMsg)
      })
    },
    clear() {
      this.form = {
        id: '',
        title: '',
        author: '',
        publishDate: '',
        press: '',
        cover: '',
        abs: '',
        cid: '',
        uplodaPerson: '',
        insertDate: '',
        examineState: '',
        examinePerson: '',
        examineNote: '',
        updateDate: '',
        favorite: '',
        availableState: '',
        ifReturn: '',
        borrowPerson: ''
      }
    },
    borrowBook() {
      lendBook(this.form).then(response => {
        console.log(response)
        this.$message.success(response.retMsg)
        this.dialogFormVisible = false
        this.$emit('onSubmit')
      }).catch(fail => {
        this.$message.error(fail)
        this.dialogFormVisible = false
      })
    },
    returnBook() {
      console.log(this.form)
      returnBook({ 'bid': this.form.id, 'name': this.form.borrowPerson }).then(response => {
        this.$message.success('归还成功')
        this.dialogFormVisible = false
        this.$emit('onSubmit')
      }).catch(fail => {
        console.log(fail)
      })
    }
  }
}
</script>
<style scoped>
  img {
    width: 230px;
    height: 344px;
    /*margin: 0 auto;*/
  }
    a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
