<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input"><el-input v-model="input" placeholder="请输入内容" /></span>
        <span><el-button type="primary" @click="handleSearch">搜索</el-button></span>
      </div>
      <div class="date">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
        />
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column align="center" label="" width="50" fixed>
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="120"
        align="center"
      />
      <el-table-column
        prop="id"
        label="用户ID"
        width="80"
        align="center"
      />
      <el-table-column
        prop="time"
        label="下单时间"
        width="150"
        align="center"
      />
      <el-table-column
        prop="name"
        label="预定进餐时间"
        width="120"
        align="center"
      />
      <el-table-column
        prop="picture"
        label="菜式"
        width="120"
        align="center"
      />
      <el-table-column
        prop="money"
        label="单价"
        width="100"
        align="center"
      />
      <el-table-column
        prop="material"
        label="选购数量"
        width="120"
        align="center"
      />
      <el-table-column
        prop="date"
        label="是否取餐"
        align="center"
        width="100"
      />
      <el-table-column
        prop="date"
        label="取餐时间"
        width="120"
        align="center"
      />
      <el-table-column
        prop="date"
        label="总价"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order.js'
export default {

  data() {
    return {
      tableData: [{
        id: '1001',
        floor: '1',
        date: '2016-05-02',
        name: '王小虎',
        type: '南北风味',
        province: '上海',
        money: '11',
        material: '白菜，猪肉'
      }, {
        id: '1002',
        floor: '2',
        type: '南北风味',
        money: '11',
        date: '2016-05-04',
        name: '王小虎',
        material: '白菜，猪肉'
      }, {
        id: '1003',
        floor: '3',
        type: '南北风味',
        date: '2016-05-01',
        money: '11',
        name: '王小虎',
        material: '白菜，猪肉'
      }, {
        id: '1004',
        floor: '4',
        date: '2016-05-03',
        type: '南北风味',
        name: '王小虎',
        money: '11',
        material: '白菜，猪肉'
      }]
    }
  },
  mounted() {
    getOrderList().then(res => {
      console.log(res)
    })
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
 .header{
    display:flex;
    margin: 10px 1rem;
    justify-content:space-between;
    .search{
      display: flex;
      .input{
        width: 20rem;
        margin-right: 2rem;
      }
    }
    .date{
    }
  }
</style>
