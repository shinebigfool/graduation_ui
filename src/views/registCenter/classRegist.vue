<template>
  <div class="app-container">
    <p style="font-size: 30px;font-weight: bold;text-align:center;">
      班级注册
    </p>
    <el-card
      style="width:800px;position:relative;left:15%;"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="班号" prop="classId" :label-width="formLabelWidth">
          <el-input v-model="form.classId" type="text" placeholder="班号" />
        </el-form-item>

        <el-form-item label="班级名" :label-width="formLabelWidth" prop="className">
          <el-input v-model="form.className" autocomplete="off" placeholder="班级名" />
        </el-form-item>

        <el-form-item label="年级" :label-width="formLabelWidth" prop="classGrade">
          <el-select v-model="form.classGrade" placeholder="请选择班级年级">
            <el-option label="小班" value="小班" />
            <el-option label="中班" value="中班" />
            <el-option label="大班" value="大班" />
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

import { registClass } from '@/api/schoolClass'
export default {
  data() {
    return {
      form: {
        classId: '',
        className: '',
        classGrade: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      registClass(this.form).then(response => {
        this.$message.success(response.retMsg)
        this.onClear()
      }).catch(fail => {
        this.$message.error(fail.retMsg)
        this.onClear()
      })
    },
    onClear() {
      this.form = {
        classId: '',
        className: '',
        classGrade: ''
      }
    }
  }
}
</script>
