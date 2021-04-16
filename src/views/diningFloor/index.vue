<template>
  <div>
    <div class="header">
      <span><el-button type="primary" @click="handleAdd">新增</el-button></span>
    </div>
    <div class="dialog">
      <el-dialog
        :title="title"
        :visible.sync="changeVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item v-if="isAdd==false" label="楼层ID">
              <el-input v-model="form.departmentfloorId" :disable="disable" />
            </el-form-item>
            <el-form-item label="楼层名称">
              <el-input v-model="form.departmentfloorName" :disable="disable" />
            </el-form-item>
            <el-form-item label="饭堂ID">
              <el-input v-model="form.departmentId" :disable="disable" />
            </el-form-item>
            <el-form-item label="饭堂名称">
              <el-input v-model="form.departmentName" :disable="disable" />
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeDialogClose">确 定</el-button>
        </span>
      </el-dialog>
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
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleCheck(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleChange(scope.row)">修改</el-button>
          <template>
            <el-popconfirm
              title="您确定删除该饭堂楼层吗？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
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
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getDiningFloor().then(response => {
        this.tableData = response.data.records
      })
    },
    changeDialogClose() {
      if (this.isAdd) {
        const data = this.form
        delete data.departmentfloorId
        addDiningFloor(data).then(res => {
          if (res.code === 200) {
            this.$message('新增成功')
            this.getData()
          } else {
            this.$message('新增失败，请重试')
          }
        })
      } else if (this.isEdit) {
        addDiningFloor(this.form).then(res => {
          if (res.code === 200) {
            this.$message('修改成功')
            this.getData()
          } else {
            this.$message('修改失败，请重试')
          }
        })
      }
      this.changeVisible = false
      this.isEdit = false
      this.isAdd = false
      this.isCheck = false
    },
    handleCheck(row) {
      this.title = '查看食材订单信息'
      this.isCheck = true
      this.disable = true
      this.form = row
      this.changeVisible = true
    },
    handleChange(row) {
      this.isEdit = true
      this.title = '修改食材订单信息'
      this.disable = false
      this.form = row
      this.changeVisible = true
    },
    handleAdd() {
      this.title = '增加食材订单信息'
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
          this.$message('删除成功')
          this.getData()
        } else {
          this.$message('删除失败，请重试')
        }
      })
    },
    handleClose() {
      this.changeVisible = false
      this.isEdit = false
      this.isAdd = false
      this.isCheck = false
    }
  }
}
</script>
<style lang="scss" scoped>
 .header{
   text-align: right;
   margin:10px 80px;
  }
</style>
