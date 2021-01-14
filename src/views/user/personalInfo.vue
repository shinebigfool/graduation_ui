<template>
  <el-card
    v-loading="listLoading"
    style="width:800px;position:relative;left:15%;"
  >
    <el-form ref="dataForm" v-model="form" style="text-align: left">
      <el-form-item style="text-align: center">
        <img :src="form.photoUrl" alt="头像">
      </el-form-item>

      <el-form-item label="账户" prop="name">
        <el-input v-model="form.name" type="text" placeholder="登录时账号" disabled />
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
      <el-form-item label="所在班级">
        <el-input v-model="form.className" type="text" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker v-model="form.birthday" type="datetime" placeholder="Pick a date" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy-MM-dd" />
        </el-col>
      </el-form-item>

      <el-form-item label="头像上传" prop="cover">
        <el-input v-model="form.photoUrl" autocomplete="off" placeholder="图片 URL" />
        <img-upload ref="imgUpload" @onUpload="uploadImg" />
      </el-form-item>
      <el-form-item
        label="用户身份"
      >
        <el-checkbox-group v-model="form.roles">
          <el-checkbox v-for="(role,i) in allRoles" :key="i" :label="role.id" disabled>{{ role.nameZh }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-button type="primary" @click="onSubmit">修 改</el-button>

    </el-form>
  </el-card>
</template>
<script>
import ImgUpload from '@/views/table/ImgUpload'
import { listRoles, modUser, getWholeUser } from '@/api/user'
import { getToken } from '@/utils/auth'
export default {
  components: { ImgUpload },
  data() {
    return {
      allRoles: [],
      form: {
        name: '',
        uname: '',
        email: '',
        phone: '',
        enable: true,
        id: 0,
        roles: [],
        sex: '',
        photoUrl: '',
        adminRoles: [],
        age: '',
        birthday: '',
        className: ''
      },
      listLoading: false
    }
  },
  created() {
    this.listRoles()
    this.fetchData()
  },
  methods: {
    listRoles() {
      listRoles().then(response => {
        console.log(response.retList)
        this.allRoles = response.retList
      })
    },
    fetchData() {
      getWholeUser({ 'current': 1, 'size': 1, 'name': getToken() }).then(response => {
        console.log(response.retList[0])

        this.form = response.retList[0]
      }).catch(fail => {
        console.log(fail)
      })
    },
    uploadImg() {
      this.form.photoUrl = this.$refs.imgUpload.url
    },
    onSubmit() {
      console.log(this.form)
      modUser(this.form).then(response => {
        this.$message.success(response.retMsg)
        this.fetchData()
      }).catch(fail => {
        this.$message.error(fail.retMsg)
      })
    }
  }
}
</script>
<style scoped>
  img {
    width: 230px;
    height: 230px;
    /*margin: 0 auto;*/
  }
</style>
