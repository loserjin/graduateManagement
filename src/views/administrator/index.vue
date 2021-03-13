<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input"><el-input v-model="search" placeholder="请输入内容" /></span>
        <span><el-button type="primary" @click="handleSearch">搜索</el-button></span>
      </div>
      <div>
        <span><el-button type="primary" @click="handleAdd">新增</el-button></span>
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
        prop="id"
        label="ID"
        width="120"
        align="center"
      />
      <el-table-column
        prop="floor"
        label="姓名"
        width="80"
        align="center"
      />
      <el-table-column
        prop="type"
        label="性别"
        width="150"
        align="center"
      />
      <el-table-column
        prop="name"
        label="年龄"
        width="120"
        align="center"
      />
      <el-table-column
        prop="picture"
        label="管理员类型"
        width="120"
        align="center"
      />
      <el-table-column
        prop="money"
        label="单联系方式"
        width="120"
        align="center"
      />
      <el-table-column
        prop="material"
        label="注册时间"
        width="150"
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
          <el-button type="text" size="small" @click="handleDelete(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="dialog">
      <el-dialog
        :title="diaTitle"
        :visible.sync="changeCheckVisible"
        width="50%"
      >
        <div>
          <el-form ref="form" :model="form">
            <el-form-item label="ID" label-width="120px">
              <el-input v-model="form.adminId" :disabled="isCheck" />
            </el-form-item>
            <el-form-item label="姓名" label-width="120px">
              <el-input v-model="form.dminName" :disabled="isCheck" />
            </el-form-item>
            <el-form-item label="性别" label-width="120px">
              <el-input v-model="form.name" :disabled="isCheck" />
            </el-form-item>
            <el-form-item label="年龄" label-width="120px">
              <el-input v-model="form.name" :disabled="isCheck" />
            </el-form-item>
            <el-form-item label="管理员类型" label-width="120px">
              <el-input v-model="form.adminRole" :disabled="isCheck" />
            </el-form-item>
            <el-form-item label="联系方式" label-width="120px">
              <el-input v-model="form.adminTel" :disabled="isCheck" />
            </el-form-item>
            <el-form-item label="注册时间" label-width="120px">
              <el-input v-model="form.adminCreatime" :disabled="isCheck" />
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeCheckVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeCheckDiaClose">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      search: '',
      form: {
        name: '',
        adminId: '',
        adminRole: '',
        adminName: '',
        adminPwd: '',
        adminTel: '',
        adminIdcard: '',
        adminEmail: '',
        departmentId: '',
        adminCreatime: '',
        adminStatus: ''

      },
      diaTitle: '管理员详情',
      isCheck: false,
      changeCheckVisible: false,
      tableData: [{}],
      listLoading: true
    }
  },
  created() {
  },
  methods: {
    handleSearch() {
      console.log('s')
    },
    handleAdd() {
      console.log('d')
      this.changeCheckVisible = true
      this.diaTitle = '增加管理员'
      this.isCheck = false
    },
    handleCheck() {
      console.log('查看')
      this.changeCheckVisible = true
      this.diaTitle = '查看管理员详情'
      this.isCheck = true
    },
    handleChange() {
      console.log('修改')
      this.diaTitle = '修改管理员详情'
      this.isCheck = false
      this.changeCheckVisible = true
    },
    handleDelete() {
      console.log('移除')
    },
    changeCheckDiaClose() {
      this.changeCheckVisible = false
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
