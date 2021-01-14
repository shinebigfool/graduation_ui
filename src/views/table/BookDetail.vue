<template>
  <div>
    <el-dialog
      title="添加/修改图书"
      :visible.sync="dialogFormVisible"
      @close="clear"
    >
      <el-form ref="dataForm" v-model="form" style="text-align: left">
        <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="不加《》" />
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off" />
        </el-form-item>
        <el-form-item label="出版日期" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-date-picker v-model="form.publishDate" type="date" placeholder="Pick a date" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" prop="press">
          <el-input v-model="form.press" autocomplete="off" />
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL" />
          <img-upload ref="imgUpload" @onUpload="uploadImg" />
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
          <el-input v-model="form.abs" type="textarea" autocomplete="off" :autosize="{minRows:4,maxRows:8}" />
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
        <el-form-item label="入库日期" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-date-picker v-model="form.insertDate" type="datetime" placeholder="Pick a date" style="width: 100%;" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" />
          </el-col>
        </el-form-item>
        <el-form-item label="上传者" :label-width="formLabelWidth" prop="uploadPerson">
          <el-input v-model="form.uploadPerson" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="审批人" :label-width="formLabelWidth" prop="uploadPerson">
          <el-input v-model="form.examinePerson" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="审核意见" :label-width="formLabelWidth" prop="abs">
          <el-input v-model="form.examineNote" type="textarea" autocomplete="off" :autosize="{minRows:4,maxRows:8}" disabled />
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input v-model="form.id" type="hidden" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
import { modifyBook } from '@/api/table'
import { mapGetters } from 'vuex'
export default {
  name: 'BookDetail',
  components: { ImgUpload },
  component(id) {
    ImgUpload
  },
  data() {
    return {
      dialogFormVisible: false,
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
        updateDate: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
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
        updateDate: ''
      }
    },
    onSubmit() {
      console.log(this.form)
      modifyBook({ id: this.form.id,
        title: this.form.title,
        author: this.form.author,
        publishDate: this.form.publishDate,
        press: this.form.press,
        cover: this.form.cover,
        abs: this.form.abs,
        cid: this.form.cid,
        uploadPerson: this.form.uploadPerson,
        insertDate: this.form.insertDate
      }).then(response => {
        console.log(response)
        if (response.retCode === '000000') {
          this.dialogFormVisible = false
          this.$message.success('更新成功')
          this.$emit('onSubmit')
        }
      }).catch(() => {
        this.dialogFormVisible = false
      })
    },
    uploadImg() {
      this.form.cover = this.$refs.imgUpload.url
    }
  }
}
</script>

<style scoped>
  .myCircle_input{
    background: #ffffff;
    border-radius: 4px;
    padding: 12px 15px 7px;
    overflow: hidden;
    color:#333;
    line-height: 1.2;
    height: 200px;
    word-break: break-all;
    box-sizing: border-box;
  }
</style>
