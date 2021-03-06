<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input"><el-input v-model="input" placeholder="请输入内容" /></span>
        <span><el-button type="primary" @click="handleSearch">搜索</el-button></span>
      </div>
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
        align="center"
        prop="id"
        label="用户ID"
        width="150"
      />
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        align="center"
        prop="sex"
        label="性别"
        width="80"
      />
      <el-table-column
        align="center"
        prop="age"
        label="年龄"
        width="80"
      />
      <el-table-column
        align="center"
        prop="email"
        label="邮箱"
        width="200"
      />
      <el-table-column
        align="center"
        prop="phone"
        label="联系方式"
        width="180"
      />
      <el-table-column
        align="center"
        prop="regTime"
        label="注册时间"
        width="210"
      />
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleCheck(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <el-dialog
        title="用户详情"
        :visible.sync="userDetail"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <div class="dia_item">
            <span>用户ID:</span>
            <span>1</span>
          </div>
          <div class="dia_item">
            <span>性名:</span>
            <span>1</span>
          </div>
          <div class="dia_item">
            <span>性别:</span>
            <span>1</span>
          </div>
          <div class="dia_item">
            <span>年龄:</span>
            <span>1</span>
          </div>
          <div class="dia_item">
            <span>邮箱:</span>
            <span>1</span>
          </div>
          <div class="dia_item">
            <span>联系方式:</span>
            <span>1</span>
          </div>
          <div class="dia_item">
            <span>注册时间:</span>
            <span>1</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userDetail = false">取 消</el-button>
          <el-button type="primary" @click="diaClose">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {

  data() {
    return {
      input: '',
      userDetail: false,
      tableData: [{
        regTime: '2016-05-02',
        name: '王小虎',
        phone: '15115478986',
        age: '22',
        id: '123434343',
        email: '454@163.com'
      }]
    }
  },
  methods: {
    handleCheck(row) {
      console.log(row)
      this.userDetail = true
    },
    handleSearch() {
      console.log('d')
    },
    handleClose() {
      console.log('close')
    },
    diaClose() {
      this.userDetail = false
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
</style>
