<template>
  <div class="app-container">
    <p style="font-size: 30px;font-weight: bold;text-align:center;">
      新增用户
    </p>

    <el-card
      v-loading="listLoading"
      style="width:800px;position:relative;left:15%;"
    >

      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="账户" prop="name">
          <el-input v-model="form.name" type="text" placeholder="登录时账号" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.uname" type="text" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="电话号">
          <el-input v-model="form.phone" type="text" placeholder="电话号" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" type="text" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker v-model="form.birthday" type="date" placeholder="请选择出生日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="form.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item prop="cpassword" label="确认密码">
          <el-input v-model="form.cpassword" type="password" auto-complete="off" placeholder="确认密码" />
        </el-form-item>
        <el-form-item label="头像上传" prop="cover">
          <el-input v-model="form.photoUrl" autocomplete="off" placeholder="图片 URL" />
          <img-upload ref="imgUpload" @onUpload="uploadImg" />
        </el-form-item>
        <el-form-item
          label="用户身份"
        >
          <el-checkbox-group v-model="form.roles">
            <el-checkbox label="9" name="type">学生</el-checkbox>
            <el-checkbox label="10" name="type">教师</el-checkbox>
            <el-checkbox label="11" name="type">家长</el-checkbox>
            <el-checkbox label="3" name="type">访客</el-checkbox>
            <el-checkbox label="管理员" name="type" disabled />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
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
import { regist } from '@/api/user'
export default {
  name: 'UserRegist',
  components: { ImgUpload },
  data() {
    return {
      listLoading: false,
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        cpassword: [{ required: true, message: '请确认密码', trigger: 'blur' }]
      },
      form: {
        name: '',
        password: '',
        uname: '',
        sex: '',
        phone: '',
        email: '',
        cpassword: '',
        roles: [],
        photoUrl: '',
        birthday: ''
      }
    }
  },
  methods: {
    onSubmit() {
      const _this = this
      this.$refs.form.validate(validate => {
        if (validate && this.form.cpassword === this.form.password) {
          this.listLoading = true
          console.log(this.form)
          regist({ name: this.form.name,
            password: this.form.password,
            uname: this.form.uname,
            sex: this.form.sex,
            phone: this.form.phone,
            email: this.form.email,
            roles: this.form.roles,
            photoUrl: this.form.photoUrl,
            birthday: this.form.birthday
          }).then(response => {
            console.log(response)
            _this.$message.success('操作成功')
          })
          this.onClear()
          this.listLoading = false
        } else {
          this.$message.error('带\' * \'的字段为空或者两次密码不一致')
          console.log('error submit')
        }
      })
    },
    onClear() {
      console.log('clear')
      this.form = {
        name: '',
        password: '',
        uname: '',
        sex: '',
        phone: '',
        email: '',
        cpassword: '',
        roles: [],
        photoUrl: '',
        birthday: ''
      }
    },
    uploadImg() {
      this.form.photoUrl = this.$refs.imgUpload.url
    },
    temp() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(valid, 'submit')
        } else {
          console.log(valid, 'no submit')
        }
      })
    }

  }
}
</script>
