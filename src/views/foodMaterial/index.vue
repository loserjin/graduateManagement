<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input"><el-input v-model="input" placeholder="请输入内容" /></span>
        <span><el-button type="primary" @click="handleSearch">搜索</el-button></span>
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
        prop="id"
        label="饭堂ID"
        width="120"
        align="center"
      />
      <el-table-column
        prop="floor"
        label="楼层"
        width="80"
        align="center"
      />
      <el-table-column
        prop="type"
        label="类别"
        width="150"
        align="center"
      />
      <el-table-column
        prop="name"
        label="材料名称"
        width="120"
        align="center"
      />
      <el-table-column
        prop="picture"
        label="材料数量（斤）"
        width="120"
        align="center"
      />
      <el-table-column
        prop="money"
        label="单价"
        width="120"
        align="center"
      />
      <el-table-column
        prop="material"
        label="总价"
        width="150"
        align="center"
      />
      <el-table-column
        prop="date"
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
          <el-button type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tips">默认显示最新食材进货数据，可根据日期选择当天食材进货数据</div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      date: '',
      form: {
        name: ''
      },
      changeVisible: false,
      tableData: [{
        id: '1001',
        floor: '1',
        date: '2016-05-02',
        name: '王小虎',
        type: '南北风味',
        province: '上海',
        money: '11',
        material: '白菜，猪肉'
      }, {
        id: '1002',
        floor: '2',
        type: '南北风味',
        money: '11',
        date: '2016-05-04',
        name: '王小虎',
        material: '白菜，猪肉'
      }, {
        id: '1003',
        floor: '3',
        type: '南北风味',
        date: '2016-05-01',
        money: '11',
        name: '王小虎',
        material: '白菜，猪肉'
      }, {
        id: '1004',
        floor: '4',
        date: '2016-05-03',
        type: '南北风味',
        name: '王小虎',
        money: '11',
        material: '白菜，猪肉'
      }]
    }
  },
  methods: {
    changeDialogClose() {
      this.changeVisible = false
    },
    handleClick(row) {
      this.changeVisible = true
      console.log(row)
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
