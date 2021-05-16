<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="inputDing"
            placeholder="请输入饭堂ID"
          />
        </span>
        <span class="input">
          <el-input
            v-model="inputFloor"
            placeholder="请输入楼层ID"
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
    </div>
    <div class="dialog">
      <el-dialog
        title="评论详情"
        :visible.sync="checkVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <span>{{ comment||'' }}</span>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="handleClose">取 消</el-button>
          <el-button
            type="primary"
            @click="handleClose"
          >确 定</el-button>
        </span>
      </el-dialog>
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
        prop="discussId"
        label="评论ID"
        align="center"
      />
      <el-table-column
        prop="discussStart"
        label="星级"
        align="center"
      />
      <el-table-column
        prop="discussName"
        label="评论者"
        align="center"
      />
      <el-table-column
        prop="departmentId"
        label="饭堂ID"
        align="center"
      />
      <el-table-column
        prop="departmentName"
        label="饭堂名称"
        align="center"
      />
      <el-table-column
        prop="departmentfloorId"
        label="楼层ID"
        align="center"
      />
      <el-table-column
        prop="departmentfloorName"
        label="楼层名称"
        align="center"
      />
      <el-table-column
        prop="discussCreatime"
        label="评论时间"
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
  </div>
</template>

<script>
import { getCommentsList } from '@/api/comments.js'
export default {

  data() {
    return {
      date: '',
      title: '',
      checkVisible: false,
      changeVisible: false,
      tableData: [],
      inputFloor: '',
      inputDing: '',
      total: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false,
      comment: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取全部评论
    async getData() {
      this.loading = true
      try {
        await getCommentsList().then(response => {
          this.tableData = response.data.records
          this.total = response.data.total
        })
      } catch {
        return false
      }
      this.loading = false
    },
    // 关闭弹窗
    handleClose() {
      this.checkVisible = false
    },
    // 点击查看事件
    handleCheck(row) {
      this.comment = row.discussText
      this.checkVisible = true
    },
    // 重置按钮点击事件
    handleClear() {
      this.inputDing = ''
      this.inputFloor = ''
      this.getData()
    },
    // 搜索点击事件
    async handleSearch() {
      // 判空，避免多余接口请求
      if (!this.inputFloor && !this.inputDing) {
        this.$message('请输入信息')
        return
      }
      const obj = {}
      if (this.inputDing) { obj.departmentId = this.inputDing }
      if (this.inputFloor) { obj.departmentfloorId = this.inputFloor }
      try {
        this.loading = true
        getCommentsList(obj).then(response => {
          this.tableData = response.data.records
          this.total = response.data.total
        })
      } catch {
        return false
      }
      this.loading = false
    },
    // 分页数据改变
    async changeData(current, size, input) {
      if (input) {
        this.loading = true
        await getCommentsList(Object.assign({ current, size }, input)).then(res => {
          this.tableData = res.data.records
        })
        this.loading = false
      }
      this.loading = true
      await getCommentsList({ current, size }).then(res => {
        this.tableData = res.data.records
      })
      this.loading = false
    },
    // 分页页数大小改变
    handleSizeChange(val) {
      this.pageSize = val
      if (this.inputDing || this.inputFloor || this.date) {
        const obj = {}
        if (this.inputDing) { obj.departmentName = this.inputDing }
        if (this.inputFloor) { obj.departmentfloorName = this.inputFloor }
        this.changeData(this.currentPage, val, obj)
        return
      }
      this.changeData(this.currentPage, val)
    },
    // 分页直接跳转
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.inputDing || this.inputFloor || this.date) {
        const obj = {}
        if (this.inputDing) { obj.departmentName = this.inputDing }
        if (this.inputFloor) { obj.departmentfloorName = this.inputFloor }
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
.dialog_check {
  .el-form-item {
    margin-bottom: 8px;
    font-size: 17px;
  }
}
</style>
