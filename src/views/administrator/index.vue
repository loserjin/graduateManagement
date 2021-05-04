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
        label="用户名"
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
                class="deleteBtn"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-if="total"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 35]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

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
            label-width="140px"
          >
            <el-form-item
              label="ID"
              prop="adminId"
              :rules="[
                { required: true, message: 'ID不能为空'},
                { type: 'number', message: 'ID必须为数字值'}
              ]"
            >
              <el-input
                v-model.number.trim="form.adminId"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="姓名"
              prop="adminName"
              :rules="[
                { required: true, message: '姓名不能为空'},
              ]"
            >
              <el-input
                v-model.trim="form.adminName"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="性别"
              prop="adminSex"
              :rules="[
                { required: true, message: '性别必选'},
              ]"
            >
              <el-radio-group
                v-model="form.adminSex"
                :disabled="isCheck"
              >
                <el-radio
                  label="男"
                  value="男"
                />
                <el-radio
                  label="女"
                  value="女"
                />
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="邮箱"
              props="adminEmail"
              :rules="[
                { validator: emailValidator, trigger: 'blur'}
              ]"
            >
              <el-input
                v-model.trim="form.adminEmail"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              prop="adminPwd"
              :rules="[
                { required: true, message: '密码不能为空'},
              ]"
              label="密码"
            >
              <el-input
                v-model.trim="form.adminPwd"
                :disabled="isCheck"
                placeholder="密码需包括字母数字"
              />
            </el-form-item>
            <el-form-item
              prop="adminIdcard"
              :rules="[
                { required: true, message: '身份证号码不能为空'},
                { validator: cardValidator, trigger: 'blur'}
              ]"
              label="身份证号码"
            >
              <el-input
                v-model.trim="form.adminIdcard"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              prop="adminRole"
              :rules="[
                { required: true, message: '管理员类型必选'},
              ]"
              label="管理员类型"
            >
              <el-select
                v-model="form.adminRole"
                prop="adminId"
                :disabled="isCheck"
                placeholder="请选择"
              >
                <el-option
                  label="普通管理员"
                  :value="0"
                />
                <el-option
                  v-if="isCheck"
                  :value="1"
                  label="超级管理员"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="departmentName"
              :rules="[
                { required: true, message: '所属餐厅名称不能为空'},
              ]"
              label="所属餐厅名称"
            >
              <el-input
                v-model.trim="form.departmentName"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              prop="departmentId"
              :rules="[
                { required: true, message: '所属餐厅ID不能为空'},
              ]"
              label="所属餐厅ID"
            >
              <el-input
                v-model.trim="form.departmentId"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              prop="departmentfloorId"
              :rules="[
                { required: true, message: '所属餐厅楼层ID不能为空'},
              ]"
              label="所属餐厅楼层ID"
            >
              <el-input
                v-model.number.trim="form.departmentfloorId"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              prop="departmentfloorName"
              :rules="[
                { required: true, message: '所属餐厅楼层名称不能为空'},
              ]"
              label="所属餐厅楼层名称"
            >
              <el-input
                v-model.trim="form.departmentfloorName"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              prop="adminTel"
              :rules="[
                { required: true, message: '联系方式不能为空'},
                { validator: telValidator, trigger: 'blur'}
              ]"
              label="联系方式"
            >
              <el-input
                v-model.number.trim="form.adminTel"
                :disabled="isCheck"
              />
            </el-form-item>
            <template
              v-if="regTimeShow"
              prop="adminCreatime"
              :rules="[
                { required: true, message: '注册时间不能为空'},
              ]"
            >
              <el-form-item label="注册时间">
                <el-input
                  v-model.trim="form.adminCreatime"
                  disabled
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
  </div>
</template>

<script>
import { addRegister, getAdminList, deleteAdmin, changeAdminInfo, searchAdmin } from '@/api/administrator.js'
export default {
  name: 'Administrator',
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
      super: 1,
      common: 0,
      form: {},
      diaTitle: '管理员详情',
      isCheck: false,
      isAdd: false,
      isChange: false,
      regTimeShow: true,
      changeCheckVisible: false,
      tableData: [{}],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false
    }
  },
  mounted() {
    this.RegetAdminList()
  },
  methods: {
    async RegetAdminList() {
      this.loading = true
      await getAdminList().then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
      this.loading = false
    },

    formatterRole(row, columns, value) {
      const adminRole = row[columns.property]
      if (adminRole === 0) {
        return '管理员'
      } else if (adminRole === 1) {
        return '超级管理员'
      }
    },

    handleSearch() {
      const obj = {
        adminName: this.search
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
      this.form = {
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
        departmentId: ''
      }
      this.isCheck = false
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
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.RegetAdminList()
        } else {
          this.$message.error('删除失败，请重试')
        }
      })
    },
    // 校验表单
    emailValidator(rule, value, callback) {
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value) {
        if (emailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱！'))
        }
      }
    },
    pwdValidator(rule, value, callback) {
      const pwdReg = /^[A-Za-z0-9]+$/
      if (value) {
        if (pwdReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入带有字母和数字的密码'))
        }
      }
    },
    cardValidator(rule, value, callback) {
      const cardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
      if (value) {
        if (cardReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的身份证号码'))
        }
      }
    },
    telValidator(rule, value, callback) {
      const telReg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
      if (value) {
        if (telReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的联系方式'))
        }
      }
    },

    changeCheckDiaClose() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isChange) {
            changeAdminInfo(this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.changeCheckVisible = false
                this.RegetAdminList()
              } else {
                this.$message.error('修改失败，请重试')
              }
              this.isChange = false
            })
          } else if (this.isAdd) {
            addRegister(this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '增加成功',
                  type: 'success'
                })
                this.changeCheckVisible = false
                this.RegetAdminList()
              } else {
                this.$message.error('增加失败，请重试')
              }
            })
            this.isAdd = false
          } else {
            this.isCheck = false
            this.regTimeShow = true
          }
        } else {
          return false
        }
      })
    },
    async changeData(current, size, input) {
      if (input) {
        this.loading = true
        await getAdminList({ current, size, text: input }).then(res => {
          this.tableData = res.data.records
        })
        this.loading = false
      }
      this.loading = true
      await getAdminList({ current, size }).then(res => {
        this.tableData = res.data.records
      })
      this.loading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      if (this.search) {
        this.changeData(this.currentPage, val, this.search)
        return
      }
      this.changeData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.search) {
        this.changeData(this.currentPage, val, this.search)
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
      width: 20rem;
      margin-right: 2rem;
    }
  }
}
.pagination {
  margin-top: 15px;
  text-align: center;
}
.deleteBtn {
  margin-left: 10px;
  color: red;
}
</style>
