<template>
  <div class="dashboard-container">
    <p style="font-size: 30px;font-weight: bold;text-align:center;">
      借阅统计
    </p>
    <panel-group ref="panelGroup" @handleSetLineChartData="handleSetLineChartData" />
    <recent-book ref="book" />
  </div>

</template>

<script>
import { fetchRecentData } from '@/api/dashboard'
import { mapGetters } from 'vuex'
import PanelGroup from '@/views/dashboard/PanelGroup'
import RecentBook from '@/views/dashboard/RecentBook'
export default {
  name: 'Dashboard',
  components: { PanelGroup, RecentBook },
  data() {
    return {
      bookRecent: null
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.fetchReportData()
  },
  methods: {
    handleSetLineChartData(type) {
      console.log(type)
    },
    fetchReportData() {
      fetchRecentData().then(response => {
        console.log(response)
        this.$refs.panelGroup.dataGroup = {
          bookTotal: response.bookTotal,
          bookInHand: response.bookInHand,
          bookMonth: response.bookMonth,
          bookFavorite: response.bookFavorite
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
