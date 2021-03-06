<template>
  <div class="app-container">
    <h1>用户录入</h1>
    <search-bar ref="searchBar" @onSearch="searchResult" />
    <student-info-dialog ref="userDetail" />
    <el-table
      ref="user"
      v-loading="listLoading"
      :data="users"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        type="selection"
        width="55"
      />
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
      <el-table-column
        label="主角色"
        min-width="50"
        align="center"
        :filters="[{text:'学生',value:1},{text:'老师',value:2},{text:'家长',value:3},{text:'访客',value:4},{text:'管理员',value:5}]"
        :filter-method="filterRole"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.mainRole|formatRole">{{ scope.row.mainRole | formatRole }}</el-tag>
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
      <el-table-column label="主班级" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.className }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" min-width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="userDetail(scope.row)">用户详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" style="margin : 50px " @click="addStu">录入班级</el-button>

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
import { qryClass, addUser } from '@/api/schoolClass'
import { qryUsersPage } from '@/api/user'
import studentInfoDialog from '@/views/schoolClass/studentInfoDialog'
import SearchBar from '@/views/schoolClass/SearchBar'
export default {
  filters: {
    formatSex(sex) {
      const sexMap = {
        1: '男',
        2: '女'
      }
      return sexMap[sex]
    },
    formatRole(role) {
      const roleMap = {
        1: '学生',
        2: '老师',
        3: '家长',
        4: '访客',
        5: '管理员'
      }
      return roleMap[role]
    }
  },
  components: { studentInfoDialog, SearchBar },
  data() {
    return {
      classList: [{
        classId: '',
        className: '',
        classGrade: '',
        createTime: '',
        userAmount: '',
        name: ''
      }],
      users: [],
      selectedClass: '',
      listLoading: true,
      total: 0,
      size: 10,
      currentPage: 1,
      uname: '',
      name: ''
    }
  },
  mounted() {
    this.fetchClassList()
    this.fetchUserList()
  },
  methods: {
    fetchClassList() {
      qryClass().then(response => {
        console.log(response)
        this.classList = response.retList
        this.$refs.searchBar.classList = this.classList
      }).catch(fail => {
        console.log(fail)
      })
    },
    fetchUserList() {
      qryUsersPage({ 'current': this.currentPage, 'size': this.size,
        'name': this.name, 'uname': this.uname
      })
        .then(response => {
          console.log(response)
          this.users = response.retList
          this.total = response.totalRow
        }).catch(fail => {
          console.log(fail)
        })
      this.listLoading = false
    },

    clear() {
      this.selectedClass = ''
      this.$refs.user.clearSelection()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      console.log(page)
      this.listLoading = true
      this.fetchUserList()
    },
    addStu() {
      if (this.selectedClass === '') {
        this.$message.warning('请先选择班级')
        return
      }
      const selectedUser = this.$refs.user.selection
      var uids = []
      for (var i = 0; i < selectedUser.length; i++) {
        uids[i] = selectedUser[i].id
      }
      addUser({ 'cid': this.selectedClass, uids }).then(response => {
        console.log(response)
        this.$message.success(response.retMsg)
        this.fetchUserList()
      }).catch(fail => {
        console.log(fail)
      })
      this.clear()
    },
    filterRole(value, row) {
      return row.mainRole === value
    },
    userDetail(data) {
      console.log(data)
      this.$refs.userDetail.form = {
        id: data.id,
        name: data.name,
        uname: data.uname,
        sex: data.sex,
        age: data.age,
        birthday: data.birthday,
        className: data.className,
        photoUrl: data.photoUrl
      }
      this.$refs.userDetail.dialogFormVisible = true
    },
    searchResult() {
      this.selectedClass = this.$refs.searchBar.selectedClass
      this.name = this.$refs.searchBar.name
      this.uname = this.$refs.searchBar.uname
      this.fetchUserList()
    }
  }
}
</script>
