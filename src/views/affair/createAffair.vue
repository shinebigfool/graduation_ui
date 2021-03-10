<template>
  <div class="app-container">
    <p style="font-size: 30px;font-weight: bold;text-align:center;">新建事务</p>
    <el-card style="width:800px;position:relative;left:15%;">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
      />
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {

      },
      formLabelWidth: '120px'
    }
  }
}
</script>
