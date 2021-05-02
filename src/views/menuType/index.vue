<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="input"
            placeholder="请输入菜系类型ID"
            @onChange="inputChange"
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
              prop="ID"
            >
              <el-input v-model.number="form.departmentId" />
            </el-form-item>
            <el-form-item
              label="饭堂名称"
              prop="name"
            >
              <el-input v-model="form.departmentName" />
            </el-form-item>
            <el-form-item label="楼层ID">
              <el-input v-model.number="form.departmentfloorId" />
            </el-form-item>
            <el-form-item label="楼层名称">
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
  </div>
</template>

<script>
import { getMenusType, changeMenuType, deleteMenuType } from '@/api/menuType.js'
export default {

  data() {
    return {
      diaTitle: '',
      form: {
        typeId: '',
        typeName: '',
        departmentId: '',
        departmentName: '',
        departmentfloorId: '',
        departmentfloorName: ''
      },
      input: '',
      isAdd: false,
      isChange: false,
      visible: false,
      changeVisible: false,
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(data) {
      this.loading = true
      await getMenusType(data ? { adminId: data } : null).then(response => {
        this.tableData = response.data.records
      })
      this.loading = false
    },
    changeDialogClose(changeForm) {
      this.$refs[changeForm].validate((valid) => {
        if (valid) {
          const { typeName, departmentId, departmentNamem, departmentfloorId, departmentfloorName } = this.form
          const data = { typeName, departmentId, departmentNamem, departmentfloorId, departmentfloorName }
          changeMenuType(data).then(res => {
            if (res.code === 200) {
              this.$message('新增成功！')
            }
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
        typeId: '',
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
      }
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
        center: true,
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
