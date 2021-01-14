<template>
  <div>
    <!-- 统计图容器 -->
    <div id="main" style="width: 80%;height: 300px;margin:0 auto;" />
    <div id="grade" style="width: 80%;height: 300px;margin:0 auto;" />
  </div>
</template>
<script>
import { qryReadingAmountByClass, qryReadingAmountByGrade, qryReadingStuByClass, qryReadingStuByGrade } from '@/api/schoolClass'
export default {
  data() {
    return {
      ClassOption: {
        title: {
          text: '各班级阅读情况'
        },
        tooltip: {},
        legend: {
          data: ['阅读量', '活跃人数']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '阅读量',
          type: 'bar',
          data: []
        },
        {
          name: '活跃人数',
          type: 'bar',
          data: []
        }
        ]
      },
      GradeOption: {
        title: {
          text: '各年级阅读情况'
        },
        tooltip: {},
        legend: {
          data: ['阅读量', '活跃人数']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '阅读量',
          type: 'bar',
          data: []
        },
        {
          name: '活跃人数',
          type: 'bar',
          data: []
        }
        ]
      }
    }
  },
  mounted() {
    this.qryReadingAmountByClass()
    // this.qryReadingStuByClass()
    this.qryReadingAmountByGrade()
  },
  methods: {
    qryReadingAmountByClass() {
      qryReadingAmountByClass().then(response => {
        // console.log(response)
        var data = response.data
        for (var i = 0; i < data.length; i++) {
          this.ClassOption.xAxis.data[i] = data[i].class_name
          this.ClassOption.series[0].data[i] = data[i].readingAmount
        }
        this.qryReadingStuByClass()
      }).catch(fail => {
        console.log(fail)
      })
    },
    qryReadingAmountByGrade() {
      qryReadingAmountByGrade().then(response => {
        console.log(response)
        var data = response.data
        for (var i = 0; i < data.length; i++) {
          this.GradeOption.xAxis.data[i] = data[i].class_grade
          this.GradeOption.series[0].data[i] = data[i].readingAmount
        }
        this.qryReadingStuByGrade()
      }).catch(fail => {
        console.log(fail)
      })
    },
    qryReadingStuByClass() {
      qryReadingStuByClass().then(response => {
        // console.log(response)
        var data = response.data
        for (var i = 0; i < data.length; i++) {
          this.ClassOption.xAxis.data[i] = data[i].class_name
          this.ClassOption.series[1].data[i] = data[i].readingAmount
        }
        var echarts = require('echarts')
        // 初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'))
        myChart.setOption(this.ClassOption)
        console.log(this.ClassOption)
      }).catch(fail => {
        console.log(fail)
      })
    },
    qryReadingStuByGrade() {
      qryReadingStuByGrade().then(response => {
        console.log(response)
        var data = response.data
        for (var i = 0; i < data.length; i++) {
          this.GradeOption.xAxis.data[i] = data[i].class_grade
          this.GradeOption.series[1].data[i] = data[i].readingAmount
        }
        var echarts = require('echarts')
        // 初始化echarts实例
        var myChart = echarts.init(document.getElementById('grade'))
        myChart.setOption(this.GradeOption)
        console.log(this.ClassOption)
      }
      ).catch(fail => [
        console.log(fail)
      ])
    }
  }
}
</script>
