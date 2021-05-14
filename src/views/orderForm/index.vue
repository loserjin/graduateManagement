<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="input"
            placeholder="请输入用户名称"
          />
        </span>
        <span>
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
        </span>
        <span class="clear_btn">
          <el-button @click="handleClear">重置</el-button>
        </span>
      </div>
      <div>
        <span>就餐时间：</span>
        <el-select
          v-model="value"
          placeholder="请选择时间段"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="date">
        <span>订单日期：</span>
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择就餐日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
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
        prop="dailymenuCreatime"
        label="就餐时间"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleCheck(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
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
    <div>
      <div class="dialog_check">
        <el-dialog
          title="查看用户订单信息"
          :visible.sync="checkVisible"
          width="50%"
          :before-close="handleClose"
        >
          <div class="checkWrapper">
            <el-form
              ref="form"
              :model="form"
              label-width="150px"
            >
              <el-form-item label="用户订单ID：">
                <span>{{ form.userorderId }}</span>
              </el-form-item>
              <el-form-item label="openID：">
                <span>{{ form.openId }}</span>
              </el-form-item>
              <el-form-item label="订单总金额(元)：">
                <span>{{ form.userorderSmoney }}</span>
              </el-form-item>
              <el-form-item label="订单应付订金(元)：">
                <span>{{ form.userorderFmoney }}</span>
              </el-form-item>
              <el-form-item label="支付订金状态：">
                <span>{{ form.userorderFStatus===0?'未支付':form.userorderFStatus===1?'已支付':'支付失败' }}</span>
              </el-form-item>
              <el-form-item label="订单应付尾款：">
                <span>{{ form.userorderMmoney }}</span>
              </el-form-item>
              <el-form-item label="支付尾款状态：">
                <span>{{ form.userorderMStatus===0?'未支付':'已支付' }}</span>
              </el-form-item>
              <el-form-item label="用户地址ID：">
                <span>{{ form.useraddressId }}</span>
              </el-form-item>
              <el-form-item label="联系方式：">
                <span>{{ form.useraddressTel }}</span>
              </el-form-item>
              <el-form-item label="饭堂名称：">
                <span>{{ form.departmentName }}</span>
              </el-form-item>
              <el-form-item label="地址：">
                <span>{{ form.useraddressName }}</span>
              </el-form-item>
              <el-form-item label="用户性别：">
                <span>{{ form.gender }}</span>
              </el-form-item>
              <el-form-item label="饭堂ID：">
                <span>{{ form.departmentId }}</span>
              </el-form-item>
              <el-form-item label="饭堂名称：">
                <span>{{ form.departmentName }}</span>
              </el-form-item>
              <el-form-item label="楼层ID：">
                <span>{{ form.departmentfloorId }}</span>
              </el-form-item>
              <el-form-item label="楼层名称：">
                <span>{{ form.departmentfloorName }}</span>
              </el-form-item>
              <el-form-item label="订单创建日期：">
                <span>{{ form.userorderCreatime }}</span>
              </el-form-item>
              <el-form-item label="用户就餐日期：">
                <span>{{ form.dailymenuCreatime }}</span>
              </el-form-item>
              <el-form-item label="用餐时间段：">
                <span>{{ form.dailymenuTime===0?'早上':form.dailymenuTime===1?'中午':'下午' }}</span>
              </el-form-item>

            </el-form>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="checkVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="checkVisible = false"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order.js'
export default {

  data() {
    return {
      input: '',
      options: [{
        value: 0,
        label: '早上'
      }, {
        value: 1,
        label: '中午'
      }, {
        value: 2,
        label: '下午'
      }],
      value: '',
      tableData: [],
      loading: false,
      checkVisible: false,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      date: '',
      form: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(mess) {
      try {
        this.loading = true
        if (mess) {
          await getOrderList(mess).then(response => {
            this.tableData = response.data.records
            this.total = response.data.total
          })
        } else {
          await getOrderList().then(response => {
            this.tableData = response.data.records
            this.total = response.data.total
          })
        }
      } catch {
        return false
      }
      this.loading = false
    },
    handleSearch() {
      const mess = {}
      if (this.input) {
        mess.name = this.input
      }
      if (this.date) {
        mess.date = this.date
      }
      if (this.value || this.value === 0) {
        mess.time = +this.value
      }
      this.getData(mess)
    },
    handleClear() {
      this.input = ''
      this.value = ''
      this.date = ''
      this.getData()
    },
    handleClose() {
      this.checkVisible = false
    },
    handleCheck(row) {
      this.checkVisible = true
      this.form = row
      console.log(row)
    },
    async changeData(current, size, mess) {
      if (mess) {
        this.loading = true
        await getOrderList(Object.assign({ current, size }, mess)).then(res => {
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
      if (this.input || this.date || this.value) {
        const obj = {}
        if (this.input) { obj.name = this.input }
        if (this.date) { obj.date = this.date }
        if (this.value) { obj.time = this.date }
        this.changeData(this.currentPage, val, obj)
        return
      }
      this.changeData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.input || this.date || this.value) {
        const obj = {}
        if (this.input) { obj.name = this.input }
        if (this.date) { obj.date = this.date }
        if (this.value) { obj.time = this.date }
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
      width: 10rem;
      margin-right: 2rem;
    }
    .clear_btn {
      margin-left: 10px;
    }
  }
}
.checkWrapper {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
