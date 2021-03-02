<template>
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
</template>

<script>
export default {

  data() {
    return {
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
    handleChec(row) {
      console.log(row)
    }
  }
}
</script>
