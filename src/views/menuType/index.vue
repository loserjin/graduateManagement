<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="input"
            placeholder="请输入饭堂名称"
            @onChange="inputChange"
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
        :title="diaTitle"
        :visible.sync="changeVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <el-form
            ref="changeForm"
            label-width="120px"
            :model="form"
          >
            <el-form-item
              v-if="isChange"
              label="类型ID"
              prop="typeId"
              :rules="[{ required: true, message: '类型ID不能为空' }]"
            >
              <el-input
                v-model.number="form.typeId"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="类型名称"
              prop="typeName"
              :rules="[{ required: true, message: '类型名称不能为空' }]"
            >
              <el-input v-model="form.typeName" />
            </el-form-item>
            <el-form-item
              label="饭堂ID"
              prop="departmentId"
            >
              <el-input v-model.number="form.departmentId" />
            </el-form-item>
            <el-form-item
              label="饭堂名称"
              prop="departmentName"
            >
              <el-input v-model.trim="form.departmentName" />
            </el-form-item>
            <el-form-item
              label="楼层ID"
              prop="departmentfloorId"
            >
              <el-input v-model.number="form.departmentfloorId" />
            </el-form-item>
            <el-form-item
              label="楼层名称"
              prop="departmentfloorName"
            >
              <el-input v-model="form.departmentfloorName" />
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
            @click="changeDialogClose('changeForm')"
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
        prop="typeId"
        label="类型ID"
        align="center"
      />
      <el-table-column
        prop="typeName"
        label="类型名称"
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
        label="饭堂楼层ID"
        align="center"
      />
      <el-table-column
        prop="departmentfloorName"
        label="饭堂楼层名称"
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
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleChange(scope.row,'changeForm')"
          >修改</el-button>
          <el-button
            type="text"
            class="delete_btn"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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
import { getMenusType, changeMenuType, deleteMenuType } from '@/api/menuType.js'
export default {

  data() {
    return {
      diaTitle: '',
      form: {},
      input: '',
      isAdd: false,
      isChange: false,
      visible: false,
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
    async getData(data) {
      this.loading = true
      await getMenusType(data ? { departmentName: data } : null).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
      })
      this.loading = false
    },
    changeDialogClose(changeForm) {
      this.$refs[changeForm].validate((valid) => {
        if (valid) {
          const { typeName, departmentId, departmentName, departmentfloorId, departmentfloorName } = this.form
          const data = { typeName, departmentId, departmentName, departmentfloorId, departmentfloorName }
          changeMenuType(data).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '新增成功！',
                type: 'success'
              })
              this.getData()
            }
          }).catch(() => {
            this.$notify.error({
              title: '错误',
              message: '新增失败！'
            })
          })
          this.changeVisible = false
        }
      })
    },
    handleChange(row, changeForm) {
      this.diaTitle = '修改菜系信息'
      this.form = row
      this.changeVisible = true
      this.isChange = true
      this.$refs[changeForm].validate((valid) => {
        if (valid) {
          const { typeName, departmentId, departmentNamem, departmentfloorId, departmentfloorName, typeId } = this.form
          const data = { typeName, departmentId, departmentNamem, departmentfloorId, departmentfloorName, typeId }
          changeMenuType(data).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
            }
          }).catch(() => {
            this.$message({
              message: '修改失败，请稍后重试！',
              type: 'warning'
            })
          })
          this.changeVisible = false
        }
      })
    },
    handleClose() {
      this.changeVisible = false
      this.isAdd = false
      this.isChange = false
    },
    handleAdd() {
      this.isAdd = true
      this.diaTitle = '新增菜系'
      this.form = {
        typeName: '',
        departmentId: '',
        departmentName: '',
        departmentfloorId: '',
        departmentfloorName: ''
      }
      this.changeVisible = true
    },

    handleSearch() {
      if (this.input) {
        this.getData(this.input)
      } else {
        this.$message('请输入饭堂名称')
      }
    },
    handleClear() {
      this.input = ''
      this.getData()
    },
    inputChange() {
      if (!this.input && this.tableData.length <= 1) {
        this.getData()
      }
    },
    handleDelete(row) {
      this.$alert('确定删除该菜系？', '', {
        confirmButtonText: '确定删除',
        distinguishCancelAndClose: true,
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            deleteMenuType({ typeId: +row.typeId }).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                })
                this.getData()
              }
            }).catch(() => {
              this.$message({
                message: '删除失败！',
                type: 'warning'
              })
            })
            this.visible = false
          }
        }
      })
    },
    async changeData(currentPage, pageSize, inputData) {
      this.loading = true
      if (inputData) {
        await getMenusType({ size: pageSize, current: currentPage, departmentName: inputData }).then(response => {
          this.tableData = response.data.records
          this.total = response.data.total
        })
      }
      await getMenusType({ size: pageSize, current: currentPage }).then(response => {
        this.tableData = response?.data?.records
        this.total = response?.data?.total
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
    .clear_btn {
      margin-left: 10px;
    }
  }
}
.delete_btn {
  color: red;
}
</style>
