<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="inputId"
            placeholder="请输入饭堂ID"
          />
        </span>
        <span class="input">
          <el-input
            v-model="text"
            placeholder="请输入公告内容"
          />
        </span>
        <span>
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
        </span>
      </div>
      <div>
        <span>
          <el-button
            type="primary"
            @click="handleAdd"
          >新增</el-button>
        </span>
      </div>
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
            label-width="150px"
          >
            <el-form-item
              v-if="isChange"
              label="公告ID"
              prop="noticeId"
              :rules="[
                {required: true,message:'公告ID不能为空'}
              ]"
            >
              <el-input
                v-model.trim="form.noticeId"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="饭堂ID"
              prop="departmentId"
              :rules="[
                {required: true,message:'饭堂ID不能为空'}
              ]"
            >
              <el-input v-model.trim="form.departmentId" />
            </el-form-item>
            <el-form-item
              label="饭堂名称"
              prop="departmentName"
              :rules="[
                {required: true,message:'饭堂名称不能为空'}
              ]"
            >
              <el-input v-model.trim="form.departmentName" />
            </el-form-item>
            <el-form-item
              label="公告标题"
              prop="noticeTitle"
              :rules="[
                {required: true,message:'公告标题不能为空'},
              ]"
            >
              <el-input v-model.trim="form.noticeTitle" />
            </el-form-item>
            <el-form-item
              label="公告内容"
              prop="noticeText"
              :rules="[
                {required: true,message:'公告内容不能为空'},
              ]"
            >
              <el-input
                v-model.trim="form.noticeText"
                type="textarea"
              />
            </el-form-item>
            <el-form-item
              label="公告状态"
              prop="noticeState"
              :rules="[
                {required: true,message:'公告状态不能为空'},
              ]"
            >
              <el-select
                v-model="form.noticeState"
                placeholder="请选择"
                :disabled="isChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
        label=""
        width="50"
        fixed
      >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="noticeId"
        label="公告ID"
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
        prop="noticeState"
        label="公告状态"
        align="center"
      />
      <el-table-column
        prop="noticeCreatime"
        label="发布时间"
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
            @click="handleChange(scope.row)"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleCheck(scope.row)"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
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
          title="查看公告信息"
          :visible.sync="checkVisible"
          width="50%"
          :before-close="handleClose"
        >
          <div>
            <p>标题：{{ noticeTitle||'' }}</p>
            <span>内容：{{ noticeText||'' }}</span>
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
import { getPublicityList, deletePublicit, editPublicity } from '@/api/publicity.js'
export default {

  data() {
    return {
      date: '',
      form: {},
      inputId: '',
      text: '',
      title: '',
      isAdd: false,
      isChange: false,
      checkVisible: false,
      changeVisible: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false,
      noticeText: '',
      noticeTitle: '',
      options: [{
        value: 1,
        label: '立即发布'
      }, {
        value: 0,
        label: '暂时不发布'
      }],
      value: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      try {
        getPublicityList().then(response => {
          this.tableData = response.data.records
          this.total = response.data.total
        })
      } catch {
        return false
      }
      this.loading = false
    },
    handleCheck(row) {
      this.noticeText = row.noticeTitle
      this.noticeTitle = row.noticeTitle
      this.checkVisible = true
    },
    handleAdd() {
      this.title = '增加公示'
      this.form = {
        departmentId: '',
        noticeText: '',
        noticeTitle: '',
        noticeState: '',
        departmentName: ''
      }
      this.isAdd = true
      this.changeVisible = true
    },
    changeDialogClose() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          try {
            editPublicity(this.form).then(response => {
              this.$message({
                showClose: true,
                message: '变更成功',
                type: 'success'
              })
            }).catch(() => {
              this.$message.error('变更失败！')
            })
            this.isAdd = false
            this.changeVisible = false
          } catch {
            return false
          }
        }
      })
    },
    handleClose() {
      this.checkVisible = false
      this.changeVisible = false
      this.isChange = false
      this.isAdd = false
    },
    handleChange(row) {
      this.title = '修改公告信息'
      this.form = row
      this.isChange = true
      this.changeVisible = true
    },

    async handleSearch() {
      if (!this.inputId && !this.text) {
        this.$message('请输入信息')
        return
      }
      const obj = {}
      if (this.text) { obj.text = this.text }
      if (this.inputId) { obj.inputId = this.inputId }
      try {
        this.loading = true
        getPublicityList(obj).then(response => {
          this.tableData = response.data.records
          this.total = response.data.total
        })
      } catch {
        return false
      }
      this.loading = false
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePublicit({ noticeId: row.noticeId }).then(() => {
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
          message: '已取消'
        })
      })
    },
    async changeData(current, size, input) {
      if (input) {
        this.loading = true
        await getPublicityList(Object.assign({ current, size }, input)).then(res => {
          this.tableData = res.data.records
        })
        this.loading = false
      }
      this.loading = true
      await getPublicityList({ current, size }).then(res => {
        this.tableData = res.data.records
      })
      this.loading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      if (this.text || this.inputId) {
        const obj = {}
        if (this.text) { obj.text = this.text }
        if (this.inputId) { obj.inputId = this.inputId }
        this.changeData(this.currentPage, val, obj)
        return
      }
      this.changeData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.text || this.inputId) {
        const obj = {}
        if (this.text) { obj.text = this.text }
        if (this.inputId) { obj.inputId = this.inputId }
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
  }
}
.dialog_check {
  .el-form-item {
    margin-bottom: 8px;
    font-size: 17px;
  }
}
</style>
