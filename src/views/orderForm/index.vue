<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="input"
            placeholder="请输入内容"
          />
        </span>
        <span>
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
        </span>
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
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label=""
        width="50"
        fixed
      >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="useraddressName"
        label="用户名"
        align="center"
      />
      <el-table-column
        prop="userorderId"
        label="订单ID"
        align="center"
      />

      <el-table-column
        prop="userorderFmoney"
        label="定金"
        align="center"
      />
      <el-table-column
        prop="userorderMmoney"
        label="应付尾款"
        align="center"
      />
      <el-table-column
        prop="departmentName"
        label="取餐饭堂"
        align="center"
      />
      <el-table-column
        prop="departmentfloorName"
        label="取餐饭堂楼层"
        align="center"
      />
      <el-table-column
        prop="userorderSmoney"
        label="总价"
        align="center"
      />
      <el-table-column
        prop="userorderCreatime"
        label="下单时间"
        align="center"
      />
    </el-table>
    <div
      class="pagination"
      style="width: 50%;margin: 10px auto;text-align:center;font-size:1.1rem"
    >
      <el-pagination
        v-if="total"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order.js'
export default {

  data() {
    return {
      input: '',
      tableData: [],
      loading: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      date: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        this.loading = true
        await getOrderList().then(response => {
          this.tableData = response.data.records
          this.total = response.data.total
        })
      } catch {
        return false
      }
      this.loading = false
    },
    handleSearch() {
      console.log(this.input)
    },
    handleClick(row) {
      console.log(row)
    },
    async changeData(current, size, input) {
      if (input) {
        this.loading = true
        await getOrderList(Object.assign({ current, size }, input)).then(res => {
          this.tableData = res.data.records
        })
        this.loading = false
      }
      this.loading = true
      await getOrderList({ current, size }).then(res => {
        this.tableData = res.data.records
      })
      this.loading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      if (this.inputDing || this.inputFloor || this.date) {
        const obj = {}
        if (this.inputDing) { obj.departmentName = this.inputDing }
        if (this.inputFloor) { obj.departmentfloorName = this.inputFloor }
        if (this.date) { obj.data = this.date }
        this.changeData(this.currentPage, val, obj)
        return
      }
      this.changeData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.inputDing || this.inputFloor || this.date) {
        const obj = {}
        if (this.inputDing) { obj.departmentName = this.inputDing }
        if (this.inputFloor) { obj.departmentfloorName = this.inputFloor }
        if (this.date) { obj.data = this.date }
        this.changeData(this.currentPage, val, obj)
        return
      }
      this.changeData(val, this.pageSize)
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  margin: 10px 1rem;
  justify-content: space-between;
  .search {
    display: flex;
    .input {
      width: 20rem;
      margin-right: 2rem;
    }
  }
}
</style>
