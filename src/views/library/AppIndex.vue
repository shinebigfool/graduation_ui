<template>
  <div class="card">
    <el-timeline>
      <el-timeline-item timestamp="Mar 15, 2021" placement="top">
        <el-card>
          <h4>角色信息接口新增主角色信息，图书新增线上阅读地址</h4>
          <p>倪鑫彦 committed on 15 Mar 2021</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Mar 12, 2021" placement="top">
        <el-card>
          <h4>修复了一个脑溢血的bug</h4>
          <p>倪鑫彦 committed on 12 Mar 2021</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Mar 10, 2021" placement="top">
        <el-card>
          <h4>针对Linux服务器部署代码调整，本地：dev，打包部署：prod</h4>
          <p>倪鑫彦 committed on 10 Mar 2021</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Jan 14, 2021" placement="top">
        <el-card>
          <h4>新增榜单接口，修正部分接口功能逻辑</h4>
          <p>倪鑫彦 committed on 14 Jan 2021</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Jan 4, 2021" placement="top">
        <el-card>
          <h4>操作日志相关接口，班级，登录模块部分bug修复</h4>
          <p>倪鑫彦 committed on 4 Jan 2021</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Dec 24, 2020" placement="top">
        <el-card>
          <h4>新增图表相关接口</h4>
          <p>倪鑫彦 committed on 24 Dec 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Dec 22, 2020" placement="top">
        <el-card>
          <h4>新增班级模块，新增模糊查收藏图书接口</h4>
          <p>倪鑫彦 committed on 22 Dec 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Dec 18, 2020" placement="top">
        <el-card>
          <h4>修改接口迎合前端需求，升级规则引擎</h4>
          <p>倪鑫彦 committed on 18 Dec 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Dec 14, 2020" placement="top">
        <el-card>
          <h4>修复若干post，delete请求接口的bug</h4>
          <p>倪鑫彦 committed on 14 Dec 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Dec 12, 2020" placement="top">
        <el-card>
          <h4>搭载规则引擎，实现图书收藏夹功能</h4>
          <p>倪鑫彦 committed on 12 Dec 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Dec 1, 2020" placement="top">
        <el-card>
          <h4>完善图书审批，借阅，下架，修改流程</h4>
          <p>倪鑫彦 committed on 1 Dec 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Nov 25, 2020" placement="top">
        <el-card>
          <h4>新增收藏夹部分功能，修复人员黑名单bug</h4>
          <p>倪鑫彦 committed on 25 Nov 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Nov 19, 2020" placement="top">
        <el-card>
          <h4>新增mybatis-plus主键自增注解，新增全局异常处理，新增自定义异常</h4>
          <p>倪鑫彦 committed on 19 Nov 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Nov 17, 2020" placement="top">
        <el-card>
          <h4>新增用户角色信息查询接口，实现与前端对接</h4>
          <p>倪鑫彦 committed on 17 Nov 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Nov 13, 2020" placement="top">
        <el-card>
          <h4>实现图书借阅归还功能，修复shiro RememberMe Bug</h4>
          <p>倪鑫彦 committed on 13 Nov 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Nov 12, 2020" placement="top">
        <el-card>
          <h4>新增图书模块，借书模块，新增AOP注解，删除多余文件</h4>
          <p>倪鑫彦 committed on 12 Nov 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Nov 11, 2020" placement="top">
        <el-card>
          <h4>更新用户模块</h4>
          <p>倪鑫彦 committed on 11 Nov 2020</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="Nov 9, 2020" placement="top">
        <el-card>
          <h4>初始化项目，项目模块化</h4>
          <p>倪鑫彦 committed on 9 Nov 2020</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

  </div>
</template>

<script>
export default {
  name: 'Appindex'
}
</script>

<style scoped>
.el-card {
    width:600px;
  }
.card{
  margin-left:25%;
}
</style>
