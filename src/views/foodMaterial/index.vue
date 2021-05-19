<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="inputDing"
            placeholder="请输入饭堂名称"
          />
        </span>
        <span class="input">
          <el-input
            v-model="inputFloor"
            placeholder="请输入楼层名称"
          />
        </span>
        <span>
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
        </span>
      </div>
      <!-- <div>
        <span>
          <el-button
            type="primary"
            @click="handleExport"
          >导出</el-button>
        </span>
      </div> -->
      <div class="date">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        />
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
              label="进货类型"
              prop="purchaseType"
              :rules="[
                {required: true,message:'进货类型不能为空'}
              ]"
            >
              <el-input v-model.trim="form.purchaseType" />
            </el-form-item>
            <el-form-item
              label="进货名称"
              prop="purchaseName"
              :rules="[
                {required: true,message:'进货类型不能为空'}
              ]"
            >
              <el-input v-model.trim="form.purchaseName" />
            </el-form-item>
            <el-form-item
              label="购买总量（斤）"
              prop="purchaseTotal"
              :rules="[
                {required: true,message:'购买总量不能为空'},
                { type: 'number', message: '购买总量必须为数字值'}
              ]"
            >
              <el-input v-model.number.trim="form.purchaseTotal" />
            </el-form-item>
            <el-form-item
              label="单价"
              prop="purchaseMoney"
              :rules="[
                {required: true,message:'单价不能为空'},
                { type: 'number', message: '单价必须为数字值'}
              ]"
            >
              <el-input v-model.number.trim="form.purchaseMoney" />
            </el-form-item>
            <el-form-item
              label="总价"
              prop="purchaseTotalmoney"
              :rules="[
                {required: true,message:'总价不能为空'},
                { type: 'number', message: '总价必须为数字值'}
              ]"
            >
              <el-input v-model.number.trim="form.purchaseTotalmoney" />
            </el-form-item>
            <el-form-item
              label="饭堂ID"
              prop="departmentId"
              :rules="[
                {required:isAdd,message:'饭堂ID不能为空'},
                { type: 'number', message: '饭堂ID必须为数字值'}
              ]"
            >
              <el-input v-model.number.trim="form.departmentId" />
            </el-form-item>
            <el-form-item
              label="饭堂名称"
              prop="departmentName"
              :rules="[
                {required:isAdd,message:'饭堂名称不能为空'},
              ]"
            >
              <el-input v-model.trim="form.departmentName" />
            </el-form-item>
            <el-form-item
              label="楼层ID"
              prop="departmentfloorId"
              :rules="[
                {required:isAdd,message:'楼层ID不能为空'},
                { type: 'number', message: '楼层ID必须为数字值'}
              ]"
            >
              <el-input v-model.number.trim="form.departmentfloorId" />
            </el-form-item>
            <el-form-item
              label="楼层名称"
              prop="departmentfloorName"
              :rules="[
                {required:isAdd,message:'楼层名称不能为空'},
              ]"
            >
              <el-input v-model.trim="form.departmentfloorName" />
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
        prop="componentNum"
        label="配料数量"
        align="center"
      />
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
          title="查看进货单信息"
          :visible.sync="checkVisible"
          width="50%"
          :before-close="handleClose"
        >
          <div>
            <el-form
              ref="form"
              :model="purchaseDetail"
              label-width="150px"
            >
              <el-form-item label="进货ID：">
                <span>{{ purchaseDetail.purchaseId }}</span>
              </el-form-item>
              <el-form-item label="进货类型：">
                <span>{{ purchaseDetail.purchaseType }}</span>
              </el-form-item>
              <el-form-item label="进货名称：">
                <span>{{ purchaseDetail.purchaseName }}</span>
              </el-form-item>
              <el-form-item label="购买总量（斤）：">
                <span>{{ purchaseDetail.purchaseTotal }}</span>
              </el-form-item>
              <el-form-item label="单价：">
                <span>{{ purchaseDetail.purchaseMoney }}</span>
              </el-form-item>
              <el-form-item label="总价：">
                <span>{{ purchaseDetail.urchaseTotalmoney }}</span>
              </el-form-item>
              <el-form-item label="饭堂ID：">
                <span>{{ purchaseDetail.departmentId }}</span>
              </el-form-item>
              <el-form-item label="饭堂名称：">
                <span>{{ purchaseDetail.departmentName }}</span>
              </el-form-item>
              <el-form-item label="楼层ID：">
                <span>{{ purchaseDetail.departmentfloorId }}</span>
              </el-form-item>
              <el-form-item label="楼层名称：">
                <span>{{ purchaseDetail.departmentfloorName }}</span>
              </el-form-item>
              <el-form-item label="录入管理员Id：">
                <span>{{ purchaseDetail.adminId }}</span>
              </el-form-item>
              <el-form-item label="录入管理员名称：">
                <span>{{ purchaseDetail.adminName }}</span>
              </el-form-item>
              <el-form-item label="录入日期：">
                <span>{{ purchaseDetail.purchaseCreatime }}</span>
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
import { getMaterialList, changeMaterial, deleteMaterial, addMaterial } from '@/api/material.js'
export default {

  data() {
    return {
      date: '',
      form: {},
      inputDing: '',
      inputFloor: '',
      title: '',
      isAdd: false,
      isCheck: false,
      isChange: false,
      disable: false,
      checkVisible: false,
      changeVisible: false,
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false,
      purchaseDetail: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      try {
        getMaterialList().then(response => {
          this.tableData = response.data.records
          this.total = response.data.total
        })
      } catch {
        return false
      }
      this.loading = false
    },
    changeDialogClose() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          try {
            if (this.isAdd) {
              addMaterial(this.form).then(response => {
                this.$message({
                  showClose: true,
                  message: '新增成功',
                  type: 'success'
                })
              }).catch(() => {
                this.$message.error('新增失败！')
              })
            } else {
              changeMaterial(this.form).then(response => {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
              }).catch(() => {
                this.$message.error('修改失败！')
              })
            }
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
      this.title = '修改食材订单信息'
      this.isChange = true
      this.changeVisible = true
    },
    handleCheck() {
      this.checkVisible = true
    },
    handleExport() {
      // console.log(11)
    },
    async handleSearch() {
      const obj = {}
      if (this.inputDing) { obj.departmentId = this.inputDing }
      if (this.inputFloor) { obj.departmentfloorId = this.inputFloor }
      if (this.date) { obj.date = this.date }
      try {
        this.loading = true
        getMaterialList(obj).then(response => {
          this.tableData = response.data.allcompoent
          this.total = response.data.total
        })
      } catch {
        return false
      }
      this.loading = false
    },

    hanldeDelete(row) {
      deleteMaterial().then(res => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message.error('删除失败！')
      })
    },
    async changeData(current, size, input) {
      if (input) {
        this.loading = true
        await getMaterialList(Object.assign({ current, size }, input)).then(res => {
          this.tableData = res.data.records
        })
        this.loading = false
      }
      this.loading = true
      await getMaterialList({ current, size }).then(res => {
        this.tableData = res.data.records
      })
      this.loading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      if (this.inputDing || this.inputFloor || this.date) {
        const obj = {}
        if (this.inputDing) { obj.departmentName = this.inputDing }
        if (this.inputFloor) { obj.departmentfloorName = this.inputFloor }
        if (this.date) { obj.data = this.date }
        this.changeData(this.currentPage, val, obj)
        return
      }
      this.changeData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.inputDing || this.inputFloor || this.date) {
        const obj = {}
        if (this.inputDing) { obj.departmentName = this.inputDing }
        if (this.inputFloor) { obj.departmentfloorName = this.inputFloor }
        if (this.date) { obj.data = this.date }
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
