<template>
  <div>
    <div class="header">
      <div>
        <span><el-button type="primary" @click="handleAdd">新增</el-button></span>
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
          <el-form ref="form" :model="form" label-width="80px">
            <template v-show="!isEdit">
              <el-form-item label="饭堂ID">
                <el-input v-model="form.departmentId" :disabled="disable" />
              </el-form-item>
            </template>
            <el-form-item label="饭堂名称">
              <el-input v-model="form.departmentName" :disabled="disable" />
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
        label="饭堂"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        heck
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleCheck(scope.row)">查看</el-button>
          <template>
            <el-popconfirm
              title="您确定删除该饭堂吗？"
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
      tableData: []
    }
  },
  mounted() {
    this.getDiningHallList()
  },
  methods: {
    getDiningHallList() {
      getDiningHall().then(response => {
        console.log(response)
        this.tableData = response.data.records
      })
    },
    changeDialogClose() {
      if (this.isAdd) {
        addDiningHall({ departmentName: this.form.departmentName }).then(res => {
          if (res.code === 200) {
            this.$message('新增成功')
            this.getDiningHallList()
          } else {
            this.$message('新增失败，请重试')
          }
        })
        this.isAdd = false
      } else if (this.isEdit) {
        addDiningHall(this.form).then(res => {
          if (res.code === 200) {
            this.$message('修改成功')
            this.getDiningHallList()
          } else {
            this.$message('修改失败，请重试')
          }
        })
        this.isEdit = false
      }
      this.changeVisible = false
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
      console.log(row)
      deleteDiningHall({ departmentId: row.departmentId }).then(res => {
        if (res.code === 200) {
          this.$message('删除成功')
          this.getDiningHallList()
        } else {
          this.$message('删除失败，请重试')
        }
      })
    },
    handleClose() {
      this.changeVisible = false
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
