<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="input"
            placeholder="请输入配料ID"
          />
        </span>
        <span>
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
        </span>
      </div>
      <span>
        <el-button
          type="primary"
          @click="handleAdd"
        >新增</el-button>
      </span>
    </div>
    <div class="dialog">
      <el-dialog
        :title="title"
        :visible.sync="changeVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
          >
            <el-form-item
              v-if="isChange"
              label="材料ID"
            >
              <el-input
                v-model="form.componentId"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="材料名称"
              prop="componentName"
              :rules="[
                {required: true,message: '材料名称不能为空'}
              ]"
            >
              <el-input v-model.trim="form.componentName" />
            </el-form-item>
            <el-form-item
              label="材料价格(元)"
              prop="componentMoney"
              :rules="[
                {required: true,message: '材料价格不能为空'},
                { type: 'number', message: '材料价格必须为数字值'}
              ]"
            >
              <el-input v-model.number.trim="form.componentMoney" />
            </el-form-item>
          </el-form>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="changeVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="changeDialogClose"
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
        label="序号"
        width="60"
        fixed
      >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="componentId"
        label="配料ID"
        align="center"
      />
      <el-table-column
        prop="componentName"
        label="配料名称"
        align="center"
      />
      <el-table-column
        prop="componentMoney"
        label="配料价钱"
        align="center"
      />
      <el-table-column
        prop="componentPic"
        label="配料图片"
        align="center"
      />
      <el-table-column
        prop="adminId"
        label="管理员ID"
        align="center"
      />
      <el-table-column
        prop="adminName"
        label="管理员名称"
        align="center"
      />
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleChange(scope.row)"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            class="delete_btn"
            @click="handleDelete(scope.row)"
          >移除</el-button>
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
import { getBurdenList, changeBurden, deleteBurden } from '@/api/burdenSheet.js'
export default {

  data() {
    return {
      form: {
        name: ''
      },
      isAdd: false,
      isChange: false,
      input: '',
      title: '',
      changeVisible: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      try {
        await getBurdenList().then(response => {
          this.tableData = response.data.records
          this.total = response.data.total
          this.loading = false
        })
      } catch {
        this.loading = false
        return false
      }
      this.loading = false
    },
    changeDialogClose() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          changeBurden(this.form).then(res => {
            this.getData()
            this.$message({
              showClose: true,
              message: '变更成功！',
              type: 'success'
            })
          }).catch(() => {
            this.$message.error('变更失败！')
          })
          this.changeVisible = false
          this.isAdd = false
          this.isChange = false
        }
      })
    },
    handleSearch() {
      if (this.input) {
        try {
          this.loading = true
          getBurdenList({ componentId: this.input }).then(response => {
            this.tableData = response.data.records
            this.total = response.data.total
          })
        } catch {
          return false
        }
        this.loading = false
      } else {
        this.$message({
          message: '请输入配料id',
          type: 'warning'
        })
      }
    },
    handleChange(row) {
      this.title = '修改菜谱配料信息'
      this.form = row
      this.isChange = true
      this.changeVisible = true
    },

    handleAdd() {
      this.title = '修改食材订单信息'
      this.form = {
        componentName: '',
        componentMoney: ''
      }
      this.changeVisible = true
      this.isAdd = true
    },
    handleClose() {
      this.changeVisible = false
      this.isAdd = false
      this.isChange = false
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该配料信息, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBurden({ componentId: row.componentId }).then(() => {
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败！'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async changeData(current, size, input) {
      this.loading = true
      if (input) {
        await getBurdenList({ current, size, text: input }).then(res => {
          this.tableData = res.data.records
          this.total = res?.data?.total || 0
        })
        this.loading = false
        return
      }

      await getBurdenList({ current, size }).then(res => {
        this.tableData = res.data.records
        this.total = res?.data?.total || 0
      })
      this.loading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      if (this.input) {
        this.changeData(this.currentPage, val, this.input)
        return
      }
      this.changeData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.input) {
        this.changeData(this.currentPage, val, this.input)
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
.delete_btn {
  color: red;
}
</style>
