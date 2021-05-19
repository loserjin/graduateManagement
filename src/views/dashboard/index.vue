<template>
  <div class="dashboard-container">
    <div
      id="mainCanteen"
      class="mainCanteen"
      style="width: 600px;height:400px;"
    />

    <div
      id="mainUser"
      class="mainUser"
      style="width: 600px;height:400px;"
    />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getCanteensMess, getUsersList } from '@/api/dashboard.js'

export default {
  data() {
    return {
      chart: null,
      canteen: []
    }
  },
  mounted() {
    this.initChart()
    this.canteenEchart()
  },
  methods: {
    // 性别比例表
    async initChart() {
      const myEcharts = echarts?.init(document.getElementById('mainUser'))
      let girl = 0
      let boy = 0
      await getUsersList().then(res => {
        girl = res.womanNumber
        boy = res.manNumber
      })
      const option = {
        title: {
          text: '用户男女比例',
          subtext: '根据实际数据生成',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1, name: '男生' },
              { value: 1, name: '女生' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myEcharts?.setOption(option)
    },
    // 饭堂楼层分布表
    async canteenEchart() {
      const canteenEchart = echarts?.init(document.getElementById('mainCanteen'))
      let canteenArr = []
      const canteens = []
      const canteenFloor = []
      await getCanteensMess().then(res => {
        canteenArr = res.data.splice(1)
      })
      canteenArr.forEach(item => {
        if (!canteens.includes(item.departmentName)) {
          canteens.push(item.departmentName)
        }
      })
      canteens.forEach(item => {
        const arr = canteenArr.filter(item => {
          item.departmentName === item
        })
        canteenFloor.push(arr.length)
      })
      const option = {
        title: {
          text: '饭堂楼层信息'
        },
        xAxis: {
          type: 'category',
          data: canteens
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: canteenFloor,
          type: 'bar',
          showBackground: true,
          label: {
            normal: {
              show: true, // 显示数值
              position: 'top', //  位置设为top
              valueAnimation: true
            }
          },
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }],
        legend: {
          show: true
        }
      }
      canteenEchart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  .canteen_Wrapper {
    display: flex;
  }
  .mainUser {
    margin-left: 20px;
    width: 400px;
    height: 400px;
  }
}
</style>

