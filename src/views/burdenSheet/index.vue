<template>
  <div>
    <div class="header">
      <span><el-button type="primary" @click="handleAdd">新增</el-button></span>
    </div>
    <div class="dialog">
      <el-dialog
        title="修改食材订单信息"
        :visible.sync="changeVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="饭堂ID">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="楼层">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="类别">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="材料名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="材料数量">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="单价">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="总价">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="日期">
              <el-input v-model="form.name" />
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
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBurdenList } from '@/api/burdenSheet.js'
export default {

  data() {
    return {
      form: {
        name: ''
      },
      isAdd: false,
      changeVisible: false,
      tableData: []
    }
  },
  mounted() {
    getBurdenList().then(response => {
      this.tableData = response.data.records
    })
  },
  methods: {
    changeDialogClose() {
      this.changeVisible = false
    },

    handleClick(row) {
      this.changeVisible = true
      console.log(row)
    },

    handleAdd() {
      this.changeVisible = true
      this.isAdd = true
      console.log('d')
    },
    hanldeDelete(row) {

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
