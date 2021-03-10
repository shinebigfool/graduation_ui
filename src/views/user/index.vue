/* eslint-disable no-irregular-whitespace */
<template>
  <div class="app-container">
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible"
      @close="clear"
    >
      <el-form ref="dataForm" v-model="form" style="text-align: left">
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
            <el-checkbox v-for="(role,i) in allRoles" :key="i" :label="role.id">{{ role.nameZh }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <user-search-bar ref="searchBar" @onSearch="searchResult" />
    <el-table
      v-loading="listLoading"
      :data="users"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="用户账户" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.uname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="50" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sex|formatSex">{{ scope.row.sex | formatSex }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="年龄" min-width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="生日" min-width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="上次登录时间" min-width="150">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.loginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="disableUser(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" round @click="modifyUser(scope.row)">修改</el-button><br>
          <el-button type="text" size="small" round @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 0 50px 0">
      <el-pagination
        background
        style="float:right;"
        layout="total, prev, pager, next, jumper"
        :page-size="size"
        :total="total"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<script>
import userSearchBar from '@/views/user/userSearchBar'
import ImgUpload from '@/views/table/ImgUpload'
import { blackList, deleteUser, listRoles, modUser, qryUsersPage } from '@/api/user'

export default {
  components: { userSearchBar, ImgUpload },
  filters: {
    formatSex(sex) {
      const sexMap = {
        1: '男',
        2: '女'
      }
      return sexMap[sex]
    }
  },
  data() {
    return {
      users: [{
        name: '',
        uname: '',
        email: '',
        loginTime: '',
        phone: '',
        enable: true,
        id: 0,
        roles: [],
        sex: '',
        adminRoles: '',
        age: '',
        birthday: ''
      }],
      dialogFormVisible: false,
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
        birthday: ''
      },
      formLabelWidth: '120px',
      allRoles: [],
      listLoading: true,
      total: 0,
      size: 10,
      currentPage: 1
    }
  },
  created() {
    this.fetchData()
    this.listRoles()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      qryUsersPage({ 'current': this.currentPage, 'size': this.size }).then(response => {
        // console.log(response.retList)
        this.users = response.retList
        this.total = response.totalRow
        console.log(this.users)
        this.listLoading = false
      })
    },
    listRoles() {
      listRoles().then(response => {
        console.log(response.retList)
        this.allRoles = response.retList
      })
    },
    handleCurrentChange(page) {
      console.log(page)
      this.currentPage = page
      this.listLoading = true
      var keyword = this.$refs.searchBar.keywords
      console.log(keyword)
      if (keyword === '' || keyword === undefined || keyword == null) {
        qryUsersPage({ 'current': page, 'size': this.size }).then(response => {
          console.log(response.retList)
          this.users = response.retList
          this.total = response.totalRow
          this.listLoading = false
        })
      } else {
        qryUsersPage({ 'current': page, 'size': this.size, 'name': keyword, 'uname': keyword, 'cid': keyword }).then(response => {
          console.log(response.retList)
          this.users = response.retList
          this.total = response.totalRow
          this.listLoading = false
        })
      }
    },
    searchResult() {
      this.listLoading = true
      var keyword = this.$refs.searchBar.keywords
      qryUsersPage({ 'current': 1, 'size': this.size, 'name': keyword, 'uname': keyword, 'cid': keyword }).then(response => {
        console.log(response)
        this.users = response.retList
        this.total = response.totalRow
        this.listLoading = false
      })
    },
    disableUser(user) {
      console.log(user)
      this.$confirm('此操作将改变该用户账号状态，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(user.id)
        blackList({ id: user.id }).then(response => {
          console.log(response)
          this.fetchData()
          this.$message.success('操作成功')
        })
      }).catch(() => {
        user.enabled = !user.enabled
        this.$message.info('已取消')
      })
    },
    deleteUser(user) {
      this.$confirm('此操作将永久删除该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: user.id }).then(response => {
          console.log(response)
          this.fetchData()
          this.$message.success('删除用户成功')
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    modifyUser(user) {
      this.form = user
      this.dialogFormVisible = true
    },
    onSubmit() {
      console.log(this.form)
      modUser(this.form).then(response => {
        this.$message.success(response.retMsg)
        this.dialogFormVisible = false
        this.fetchData()
      }).catch(fail => {
        this.$message.error(fail.retMsg)
      })
    },
    uploadImg() {
      this.form.photoUrl = this.$refs.imgUpload.url
    },
    clear() {
      this.form = {
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
        age: ''
      }
    }
  }
}
</script>
