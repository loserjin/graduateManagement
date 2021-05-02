<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="search"
            placeholder="请输入管理员姓名"
            @change="inputChange"
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
        prop="adminId"
        label="ID"
        width="120"
        align="center"
      />
      <el-table-column
        prop="adminName"
        label="姓名"
        width="120"
        align="center"
      />
      <el-table-column
        prop="adminSex"
        label="性别"
        width="150"
        align="center"
      />
      <el-table-column
        prop="departmentName"
        label="单位"
        width="120"
        align="center"
      />
      <el-table-column
        prop="adminRole"
        label="管理员类型"
        width="120"
        align="center"
        :formatter="formatterRole"
      />
      <el-table-column
        prop="adminTel"
        label="联系方式"
        align="center"
      />
      <el-table-column
        prop="adminCreatime"
        label="注册时间"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleCheck(scope.row)"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleChange(scope.row)"
          >修改</el-button>
          <template>
            <el-popconfirm title="您确定删除该管理员吗？">
              <el-button
                slot="reference"
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </el-popconfirm>
          </template>
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
          <el-form
            ref="form"
            :model="form"
          >
            <el-form-item
              label="ID"
              label-width="120px"
            >
              <el-input
                v-model="form.adminId"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="姓名"
              label-width="120px"
            >
              <el-input
                v-model="form.adminName"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="性别"
              label-width="120px"
            >
              <el-input
                v-model="form.adminSex"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="邮箱"
              label-width="120px"
            >
              <el-input
                v-model="form.adminEmail"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="密码"
              label-width="120px"
            >
              <el-input
                v-model="form.adminPwd"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="身份证号码"
              label-width="120px"
            >
              <el-input
                v-model="form.adminIdcard"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="管理员类型"
              label-width="120px"
            >
              <el-input
                v-model="form.adminRole"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="所属餐厅"
              label-width="120px"
            >
              <el-input
                v-model="form.departmentName"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="所属餐厅楼层"
              label-width="120px"
            >
              <el-input
                v-model="form.departmentFoor"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="所属餐厅楼层ID"
              label-width="120px"
            >
              <el-input
                v-model="form.departmentfloorId"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="所属餐厅楼层名称"
              label-width="120px"
            >
              <el-input
                v-model="form.departmentfloorName"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="联系方式"
              label-width="120px"
            >
              <el-input
                v-model="form.adminTel"
                :disabled="isCheck"
              />
            </el-form-item>
            <template v-if="regTimeShow">
              <el-form-item
                label="注册时间"
                label-width="120px"
              >
                <el-input
                  v-model="form.adminCreatime"
                  :disabled="isCheck"
                />
              </el-form-item>
            </template>
          </el-form>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="changeCheckVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="changeCheckDiaClose"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <WordTips />
  </div>
</template>

<script>
import WordTips from '@/components/tips/index'
import { addRegister, getAdminList, deleteAdmin, changeAdminInfo, searchAdmin } from '@/api/administrator.js'
export default {
  name: 'Administrator',
  components: { WordTips },
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
        adminId: '',
        adminRole: '',
        adminName: '',
        adminSex: '',
        adminPwd: '',
        adminTel: '',
        adminIdcard: '',
        adminEmail: '',
        departmentName: '',
        departmentfloorId: '',
        departmentId: '',
        departmentFoor: '',
        adminCreatime: ''
      },
      diaTitle: '管理员详情',
      isCheck: false,
      isAdd: false,
      isChange: false,
      regTimeShow: true,
      changeCheckVisible: false,
      tableData: [{}],
      listLoading: true
    }
  },
  mounted() {
    this.RegetAdminList()
  },
  methods: {
    RegetAdminList() {
      getAdminList().then(res => {
        this.tableData = res.data.records
      })
    },

    formatterRole(row, columns, value) {
      const adminRole = row[columns.property]
      if (adminRole === 0) {
        return '管理员'
      } else if (adminRole === 1) {
        return '超级管理员'
      }
      return ''
    },
    handleSearch() {
      const obj = {
        adminName: this.searchAdmin
      }
      searchAdmin(obj).then(res => {
        this.tableData = res.data.records
      })
    },
    // 当input值为空 重置数据
    inputChange() {
      if (this.search === '') {
        this.RegetAdminList()
      }
    },
    handleAdd() {
      this.isAdd = true
      this.regTimeShow = false
      this.changeCheckVisible = true
      this.diaTitle = '增加管理员'
      this.isCheck = false
      addRegister().then(res => {
        if (res.code === 200) {
          this.$message('增加成功')
        } else {
          this.$message('增加失败，请重试！')
        }
      })
    },
    handleCheck(message) {
      this.isCheck = true
      this.form = message
      this.changeCheckVisible = true
      this.diaTitle = '查看管理员详情'
      this.isCheck = true
    },
    handleChange(message) {
      this.isChange = true
      this.diaTitle = '修改管理员详情'
      this.isCheck = false
      this.form = message
      this.changeCheckVisible = true
    },
    handleDelete(message) {
      deleteAdmin({ 'adminId': message.adminId }).then(res => {
        if (res.code === 200) {
          this.$message('删除成功')
          this.RegetAdminList()
        } else {
          this.$message('删除失败，请重试')
        }
      })
    },
    changeCheckDiaClose() {
      if (this.isChange) {
        changeAdminInfo(this.form).then(res => {
          if (res.code === 200) {
            this.$message('修改成功')
            this.RegetAdminList()
          } else {
            this.$message('修改失败，请重试')
          }
          this.isChange = false
        })
      } else if (this.isAdd) {
        addRegister(this.form).then(res => {
          if (res.code === 200) {
            this.$message('增加成功')
            this.RegetAdminList()
          } else {
            this.$message('增加失败，请重试')
          }
        })
        this.isAdd = false
      } else {
        this.isCheck = false
      }
      this.changeCheckVisible = false
      this.regTimeShow = true
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
</style>
