<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input"><el-input v-model="input" placeholder="请输入内容" /></span>
        <span><el-button type="primary" @click="handleSearch">搜索</el-button></span>
      </div>
      <div>
        <span><el-button type="primary" @click="handleAdd">新增</el-button></span>
      </div>
      <div class="date">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
        />
      </div>
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
      v-loading="loading"
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
        width="120"
        align="center"
      />
      <el-table-column
        prop="departmentfloorId"
        label="楼层"
        width="80"
        align="center"
      />
      <el-table-column
        prop="purchaseType"
        label="类别"
        width="150"
        align="center"
      />
      <el-table-column
        prop="purchaseName"
        label="材料名称"
        width="120"
        align="center"
      />
      <el-table-column
        prop="purchaseTotal"
        label="材料数量（斤）"
        width="120"
        align="center"
      />
      <el-table-column
        prop="purchaseMoney"
        label="单价"
        width="120"
        align="center"
      />
      <el-table-column
        prop="purchaseTotalmoney"
        label="总价"
        width="150"
        align="center"
      />
      <el-table-column
        prop="purchaseCreatime"
        label="日期"
        width="120"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tips">默认显示最新食材进货数据，可根据日期选择当天食材进货数据</div>
  </div>
</template>

<script>
import { getMaterialList, changeMaterial, deleteMaterial, searchMaterial, addMaterial } from '@/api/material.js'
export default {

  data() {
    return {
      date: '',
      form: {
        name: ''
      },
      input: '',
      isAdd: false,
      changeVisible: false,
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      await getMaterialList().then(response => {
        this.tableData = response.data.records
      })
      this.loading = false
    },
    changeDialogClose() {
      this.changeVisible = false
      if (this.isAdd) {
        addMaterial().then(response => {
          console.log(response)
        })
      } else {
        changeMaterial().then(response => {
          console.log(response)
        })
      }
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

    handleSearch() {
      searchMaterial().then(res => {
        console.log(res)
      })
    },

    hanldeDelete(row) {
      deleteMaterial().then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .header{
    display:flex;
    margin: 10px 1rem;
    justify-content:space-between;
    .search{
      display: flex;
      .input{
        width: 20rem;
        margin-right: 2rem;
      }
    }
    .date{
    }
  }
  .tips{
    margin-left: 2rem;
    color:grey;
  }
</style>
