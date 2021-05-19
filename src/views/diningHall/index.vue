<template>
  <div>
    <div class="header">
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
            label-width="80px"
          >
            <el-form-item
              v-if="isAdd==false"
              label="饭堂ID"
            >
              <el-input
                v-model="form.departmentId"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="饭堂名称"
              prop="departmentName"
              :rules="[
                {required: true, message: '饭堂名称不可为空'}
              ]"
            >
              <el-input
                v-model.trim="form.departmentName"
                :disabled="disable"
              />
            </el-form-item>
            <el-form-item
              label="饭堂图片"
              prop="departmentPic"
            >
              <el-upload
                v-if="!isCheck"
                ref="upload"
                action="http://159.75.3.52:8090/upload"
                :before-upload="beforePicUpload"
                list-type="picture-card"
                :limit="limit"
                :on-success="uploadPicSucc"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog
                :visible.sync="dialogImgVisible"
                prop="departmentPic"
              >
                <img
                  width="100%"
                  :src="form.departmentPic"
                  alt="菜图"
                >
              </el-dialog>
              <el-image
                v-if="isCheck"
                style="width: 100px; height: 100px"
                :src="form.departmentPic"
              />
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
        prop="departmentId"
        label="饭堂ID"
        align="center"
      />
      <el-table-column
        prop="departmentName"
        label="饭堂"
        align="center"
      />
      <el-table-column
        label="饭堂图片"
        align="center"
      >
        <template scope="scope">
          <img
            :src="scope.row.departmentPic"
            width="50"
            height="40"
            class="head_pic"
          >
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        heck
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleCheck(scope.row)"
          >查看</el-button>
          <template>
            <el-popconfirm
              title="您确定删除该饭堂吗？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button
                slot="reference"
                type="text"
                class="deleteBtn"
              >删除</el-button>
            </el-popconfirm>
          </template>
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
import { getDiningHall, deleteDiningHall, addDiningHall } from '@/api/diningHallFloor.js'
export default {
  data() {
    return {
      date: '',
      form: {
        deparmentName: '',
        deparmentId: ''
      },
      isAdd: false,
      isEdit: false,
      isCheck: false,
      disable: false,
      title: '',
      changeVisible: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false,
      dialogImgVisible: false,
      limit: 1
    }
  },
  mounted() {
    this.getDiningHallList()
  },
  methods: {
    async getDiningHallList() {
      this.loading = true
      await getDiningHall().then(response => {
        this.tableData = response.data.records
        this.total = response?.data?.total || 0
      })
      this.loading = false
    },
    changeDialogClose() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            addDiningHall({ departmentName: this.form.departmentName }).then(res => {
              if (res.code === 200) {
                this.$message({
                  showClose: true,
                  message: '新增成功',
                  type: 'success'
                })
                this.$refs?.upload?.clearFiles()
                this.getDiningHallList()
              } else {
                this.$message.error('新增失败，请重试')
              }
            })
          } else if (this.isEdit) {
            addDiningHall(this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.$refs?.upload?.clearFiles()
                this.getDiningHallList()
              } else {
                this.$message.error('修改失败，请重试')
              }
            })
          }
          this.changeVisible = false
          this.isEdit = false
          this.isAdd = false
          this.isCheck = false
        } else {
          return false
        }
      })
    },
    uploadPicSucc(response, file, fileList) {
      this.form.departmentPic = response.data
    },
    beforePicUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isLt2M
    },
    handleEdit(row) {
      this.changeVisible = true
      this.title = '编辑饭堂信息'
      this.disable = false
      this.isEdit = true
      this.form = row
    },
    handleCheck(row) {
      this.isCheck = true
      this.changeVisible = true
      this.title = '查看饭堂信息'
      this.disable = true
      this.form = row
    },
    handleAdd() {
      this.isAdd = true
      this.changeVisible = true
      this.title = '新增饭堂'
      this.form = {
        deparmentName: ''
      }
      this.disable = false
    },
    handleDelete(row) {
      deleteDiningHall({ departmentId: row.departmentId }).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getDiningHallList()
        } else {
          this.$message.error('删除失败，请重试')
        }
      })
    },
    handleClose() {
      this.changeVisible = false
      this.isEdit = false
      this.isAdd = false
      this.isCheck = false
    },
    async changeData(current, size, input) {
      this.loading = true
      if (input) {
        await getDiningHall({ current, size, text: input }).then(res => {
          this.tableData = res.data.records
          this.total = res?.data?.total || 0
        })
        this.loading = false
        return
      }

      await getDiningHall({ current, size }).then(res => {
        this.tableData = res.data.records
        this.total = res?.data?.total || 0
      })
      this.loading = false
    },
    diaClose() {
      this.userDetail = false
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
  text-align: right;
  margin: 10px 80px;
}
.deleteBtn {
  margin-left: 10px;
  color: red;
}
</style>
