<template>
  <div class="app-container">
    <el-dialog
      title="修改班级信息"
      :visible.sync="dialogFormVisible"
      @close="clear"
    >
      <el-form ref="dataForm" v-model="form" style="text-align: left">
        <el-form-item label="班号" :label-width="formLabelWidth">
          <el-input v-model="form.classId" type="text" placeholder="班号" />
        </el-form-item>
        <el-form-item label="班名" :label-width="formLabelWidth">
          <el-input v-model="form.className" type="text" placeholder="班名" />
        </el-form-item>
        <el-form-item label="班级人数" :label-width="formLabelWidth">
          <el-input v-model="form.userAmount" type="text" placeholder="班级人数" disabled />
        </el-form-item>
        <el-form-item label="创建日期" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-date-picker v-model="form.createTime" type="datetime" placeholder="创建日期" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy-MM-dd" />
          </el-col>
        </el-form-item>
        <el-form-item label="年级" :label-width="formLabelWidth" prop="classGrade">
          <el-select v-model="form.classGrade" placeholder="请选择班级年级">
            <el-option label="小班" value="小班" />
            <el-option label="中班" value="中班" />
            <el-option label="大班" value="大班" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <h1>班级详情</h1>
    <el-table
      v-loading="listLoading"
      :data="classes"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-click="classUser"
    >
      <el-table-column
        label="年级"
        min-width="70"
        align="center"
        :filters="[{text:'小班',value:'小班'},{text: '中班',value: '中班'},{text: '大班',value: '大班'}]"
        :filter-method="filterClass"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.classGrade }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班号" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.classId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班名" min-width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级人数" min-width="70" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间" min-width="100">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" round @click.native.stop="modifyClass(scope.row)">详细信息</el-button><br>
          <el-button type="text" size="small" round @click.native.stop="delClass(scope.row)">删除班级</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-row>
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="size"
        :total="classes.length"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>
<script>
import { qryClass, modClass, delClass } from '@/api/schoolClass'
export default {
  data() {
    return {
      classes: [{
        classId: '',
        className: '',
        classGrade: '',
        createTime: '',
        userAmount: ''
      }],
      form: {
        classId: '',
        className: '',
        classGrade: '',
        createTime: '',
        userAmount: ''
      },
      listLoading: true,
      total: 0,
      size: 10,
      currentPage: 1,
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      qryClass().then(response => {
        console.log(response)
        this.classes = response.retList
      }).catch(fail => {
        this.$message.error(fail.retMsg)
      })
      this.listLoading = false
    },
    filterClass(value, row) {
      return row.classGrade === value
    },
    modifyClass(data) {
      console.log(data)
      this.form = data
      this.dialogFormVisible = true
    },
    clear() {
      this.form = {
        classId: '',
        className: '',
        classGrade: '',
        createTime: '',
        userAmount: ''
      }
    },
    onSubmit() {
      console.log(this.form)
      modClass(this.form).then(response => {
        this.$message.success(response.retMsg)
        this.fetchData()
      }).catch(fail => {
        this.$message.error(fail.retMsg)
      })
      this.dialogFormVisible = false
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    classUser(data) {
      this.$router.push({
        path: '/edu/userInClass',
        query: {
          cid: data.id
        }
      })
    },
    delClass(data) {
      this.$confirm('确定删除该班级？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delClass({ 'id': data.id }).then(response => {
          this.$message.success('删除成功')
        }).catch(fail => {
          this.$message.error(fail.retMsg)
        })
        this.fetchData()
      }).catch(() => {
        this.$message.info('已取消')
      })
    }
  }
}
</script>
