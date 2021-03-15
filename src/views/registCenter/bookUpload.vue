<template>
  <div class="app-container">
    <p style="font-size: 30px;font-weight: bold;text-align:center;">
      新增图书
    </p>
    <el-card
      style="width:800px;position:relative;left:15%;"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="书名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.title" type="text" placeholder="书名，不加《》" />
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off" placeholder="作者名" />
        </el-form-item>
        <el-form-item label="出版日期" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-date-picker v-model="form.publishDate" type="date" placeholder="请选择出版日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" prop="press">
          <el-input v-model="form.press" autocomplete="off" placeholder="出版社" />
        </el-form-item>
        <el-form-item label="封面" prop="cover" :label-width="formLabelWidth">
          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL" />
          <img-upload ref="imgUpload" @onUpload="uploadImg" />
        </el-form-item>
        <el-form-item label="阅览地址" prop="onlineUrl" :label-width="formLabelWidth">
          <el-input v-model="form.onlineUrl" autocomplete="off" placeholder="线上阅览URL" />
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
          <el-input v-model="form.abs" type="textarea" autocomplete="off" :autosize="{minRows:4,maxRows:8}" placeholder="简介" />
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
          <el-select v-model="form.cid" placeholder="请选择分类">
            <el-option label="文学" :value="1" />
            <el-option label="流行" :value="2" />
            <el-option label="文化" :value="3" />
            <el-option label="生活" :value="4" />
            <el-option label="经管" :value="5" />
            <el-option label="科技" :value="6" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onClear">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ImgUpload from '../table/ImgUpload.vue'
import { addBook } from '@/api/table'
export default {
  components: { ImgUpload },
  data() {
    return {
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
        onlineUrl: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      addBook(this.form).then(response => {
        this.$message.success(response.retMsg)
        this.onClear()
      }).catch(fail => {
        this.$message.error(fail.retMsg)
        this.onClear()
      })
    },
    uploadImg() {
      this.form.cover = this.$refs.imgUpload.url
    },
    onClear() {
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
        onlineUrl: ''
      }
    }
  }
}
</script>
