<template>
  <div>
    <div class="header">
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
            label-width="80px"
          >
            <el-form-item
              v-if="isAdd==false"
              label="楼层ID"
            >
              <el-input
                v-model.trim="form.departmentfloorId"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="楼层名称"
              prop="departmentfloorName"
              :rules="[
                {required: true, message: '饭楼层名称不可为空'}
              ]"
            >
              <el-input
                v-model.trim="form.departmentfloorName"
                :disabled="disable"
              />
            </el-form-item>
            <el-form-item
              label="饭堂ID"
              prop="departmentId"
              :rules="[
                {required: true, message: '饭堂ID不可为空'},
                { type: 'number', message: '饭堂ID必须为数字值'}
              ]"
            >
              <el-input
                v-model.number.trim="form.departmentId"
                :disabled="disable"
              />
            </el-form-item>
            <el-form-item
              label="楼层图片"
              prop="departmentfloorPic"
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
                prop="departmentfloorPic"
              >
                <img
                  width="100%"
                  :src="form.departmentfloorPic"
                  alt="菜图"
                >
              </el-dialog>
              <el-image
                v-if="isCheck"
                style="width: 100px; height: 100px"
                :src="form.departmentfloorPic"
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
        label="饭堂名称"
        align="center"
      />
      <el-table-column
        prop="departmentfloorId"
        label="饭堂楼层ID"
        align="center"
      />
      <el-table-column
        prop="departmentfloorName"
        label="饭堂楼层名称"
        align="center"
      />
      <el-table-column
        label="楼层图片"
        align="center"
      >
        <template scope="scope">
          <img
            :src="scope.row.departmentfloorPic"
            width="50"
            height="40"
            class="head_pic"
          >
        </template>
      </el-table-column>
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
          <el-button
            type="text"
            size="small"
            @click="handleChange(scope.row)"
          >修改</el-button>
          <template>
            <el-popconfirm
              title="您确定删除该饭堂楼层吗？"
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
import { getDiningFloor, addDiningFloor, deleteDiningFloor } from '@/api/diningHallFloor.js'
export default {

  data() {
    return {
      date: '',
      form: {
        departmentfloorId: '',
        departmentfloorName: '',
        departmentId: '',
        departmentName: ''
      },
      title: '',
      isAdd: false,
      isEdit: false,
      isCheck: false,
      disable: false,
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
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      await getDiningFloor().then(response => {
        this.tableData = response.data.records
        this.total = response?.data?.total || 0
      })
      this.loading = false
    },
    changeDialogClose() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            const data = this.form
            delete data.departmentfloorId
            addDiningFloor(data).then(res => {
              if (res.code === 200) {
                this.$message({
                  showClose: true,
                  message: '新增成功',
                  type: 'success'
                })
                this.$refs?.upload?.clearFiles()
                this.getData()
              } else {
                this.$message.error('新增失败，请重试')
              }
            })
          } else if (this.isEdit) {
            addDiningFloor(this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.$refs?.upload?.clearFiles()
                this.getData()
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
      this.form.departmentfloorPic = response.data
    },
    beforePicUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isLt2M
    },
    handleCheck(row) {
      this.title = '查看饭堂楼层信息'
      this.isCheck = true
      this.disable = true
      this.form = row
      this.changeVisible = true
    },
    handleChange(row) {
      this.isEdit = true
      this.title = '修改饭堂楼层信息'
      this.disable = false
      this.form = row
      this.changeVisible = true
    },
    handleAdd() {
      this.title = '增加饭堂楼层信息'
      this.form = {
        departmentfloorName: '',
        departmentId: '',
        departmentName: ''
      }
      this.disable = false
      this.isAdd = true
      this.changeVisible = true
    },
    handleDelete(row) {
      deleteDiningFloor({ departmentfloorId: row.departmentfloorId }).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getData()
        }
      }).catch(() => {
        this.$message.error('删除失败!')
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
        await getDiningFloor({ current, size, text: input }).then(res => {
          this.tableData = res.data.records
          this.total = res?.data?.total || 0
        })
        this.loading = false
        return
      }

      await getDiningFloor({ current, size }).then(res => {
        this.tableData = res.data.records
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
