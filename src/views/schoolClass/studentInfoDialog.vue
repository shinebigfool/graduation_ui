<template>
  <el-dialog
    title="用户详情"
    :visible.sync="dialogFormVisible"
    @close="clear"
  >
    <el-form ref="dataForm" v-model="form" style="text-align: left">
      <el-form-item style="text-align: center">
        <img :src="form.photoUrl" alt="头像">
      </el-form-item>
      <el-form-item label="用户账号" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="登录用账号" :readonly="true" />
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="uname">
        <el-input v-model="form.uname" autocomplete="off" :readonly="true" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
        <el-tag :type="form.sex|sexFilter">{{ form.sex|formatSex }}</el-tag>
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
        <el-input v-model="form.age" autocomplete="off" :readonly="true" />
      </el-form-item>
      <el-form-item label="出生日期" :label-width="formLabelWidth">
        <el-col :span="11">
          <el-date-picker v-model="form.birthday" type="date" placeholder="" style="width: 100%;" :readonly="true" />
        </el-col>
      </el-form-item>
      <el-form-item label="所在班级" :label-width="formLabelWidth" prop="className">
        <el-input v-model="form.className" autocomplete="off" :readonly="true" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  filters: {
    sexFilter(id) {
      const sexMap = {
        1: 'success',
        2: 'danger'
      }
      return sexMap[id]
    },
    formatSex(id) {
      const sexMap = {
        1: '男',
        2: '女'
      }
      return sexMap[id]
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        uname: '',
        sex: '',
        age: '',
        birthday: '',
        className: '',
        photoUrl: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear() {

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
