<template>
  <div>
    <div class="header">
      <div class="header_left">
        <span class="input">
          <el-input
            v-model.trim="input"
            placeholder="请输入菜单名称"
          />
        </span>
        <span class="btn">
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
        </span>
        <span class="clear_btn">
          <el-button @click="handleClear">重置</el-button>
        </span>
      </div>
      <div class="header_right">
        <span class="addBtn">
          <el-button
            type="primary"
            @click="handleAdd"
          >新增</el-button>
        </span>
      </div>
    </div>
    <div class="dialog">
      <el-dialog
        :title="diaTitle"
        :visible.sync="changeAddVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
          >
            <el-form-item
              label="类别"
              prop="typeName"
              :rules="[
                {required: true,message:'类别不能为空'}
              ]"
            >
              <el-select
                v-model="form.typeName"
                placeholder="请选择"
                :disabled="isCheck"
                @change="selectChange"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeName"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="类别ID"
              prop="typeId"
              :rules="[
                {required: true,message:'类别ID不能为空'}
              ]"
            >
              <el-input
                v-model="form.typeId"
                disabled
              />
            </el-form-item>
            <el-form-item
              v-if="!isAdd"
              label="菜式ID"
              prop="menuId"
              :rules="[
                {required: true,message:'菜式ID不能为空'}
              ]"
            >
              <el-input
                v-model="form.menuId"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="菜名"
              prop="menuName"
              :rules="[
                {required: true,message:'菜名不能为空'}
              ]"
            >
              <el-input
                v-model="form.menuName"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="菜图"
              prop="menuPic"
            >
              <el-upload
                v-if="isAdd"
                action="http://159.75.3.52:8090/upload"
                :before-upload="beforePicUpload"
                list-type="picture-card"
                :limit="limit"
                :on-success="uploadPicSucc"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog
                :visible.sync="dialogImgVisible"
                prop="menuPic"
              >
                <img
                  width="100%"
                  :src="form.menuPic"
                  alt="菜图"
                >
              </el-dialog>
              <el-image
                v-if="!isAdd"
                style="width: 100px; height: 100px"
                :src="form.menuPic"
              />
            </el-form-item>
            <el-form-item
              label="定金"
              prop="menuFMoney"
              :rules="[
                {required: true,message:'定金不能为空'}
              ]"
            >
              <el-input
                v-model="form.menuFMoney"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="单价"
              prop="menuMoney"
              :rules="[
                {required: true,message:'单价不能为空'}
              ]"
            >
              <el-input
                v-model="form.menuMoney"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="饭堂ID"
              prop="departmentId"
              :rules="[
                {required: true,message:'饭堂ID不能为空'}
              ]"
            >
              <el-input
                v-model="form.departmentId"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="饭堂名称"
              prop="departmentName"
              :rules="[
                {required: true,message:'饭堂名称不能为空'}
              ]"
            >
              <el-input
                v-model="form.departmentName"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="楼层ID"
              prop="departmentfloorId"
              :rules="[
                {required: true,message:'楼层ID不能为空'}
              ]"
            >
              <el-input
                v-model="form.departmentfloorId"
                :disabled="isCheck"
              />
            </el-form-item>
            <el-form-item
              label="楼层名称"
              prop="departmentfloorName"
              :rules="[
                {required: true,message:'楼层名称不能为空'}
              ]"
            >
              <el-input
                v-model="form.departmentfloorName"
                :disabled="isCheck"
              />
            </el-form-item>
          </el-form>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="changeAddVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="changeAddDiaClose"
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
        prop="typeName"
        label="菜式类型"
        align="center"
      />
      <el-table-column
        prop="menuName"
        label="菜名"
        align="center"
      />
      <el-table-column
        prop="menuFMoney"
        label="定金"
        align="center"
        width="80"
      />
      <el-table-column
        prop="menuMoney"
        label="单价"
        align="center"
        width="80"
      />
      <el-table-column
        prop="departmentName"
        label="饭堂名称"
        align="center"
      />
      <el-table-column
        prop="departmentfloorName"
        label="楼层名称"
        align="center"
      />
      <el-table-column
        prop="menuCreatime"
        label="创建时间"
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
          <el-button
            type="text"
            size="small"
            @click="componentClick(scope.row)"
          >配料</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row)"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-if="total"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="选择配料操作"
      :visible.sync="componentDia"
      width="30%"
      :before-close="componentDiaClose"
    >
      <div class="component_btn">
        <span>
          <el-button
            type="primary"
            plain
            @click="addMenuComponent"
          >增加配料</el-button>
        </span>
        <span>
          <el-button
            type="success"
            plain
            @click="checkComponentClick"
          >查看配料</el-button>
        </span>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="componentDia = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--  -->
    <el-dialog
      title="增加配料"
      :visible.sync="addComponent"
      width="33%"
      :before-close=" componentOperateClose"
    >
      <el-form
        ref="componentForm"
        :model="componentForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="配料ID"
          prop="componentId"
          :rules="[
            { required: true, message: '配料ID不能为空'},
            { type: 'number', message: '配料ID为数字值'}
          ]"
        >
          <el-input
            v-model.number="componentForm.componentId"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="配料数量(克)"
          prop="componentNum"
          :rules="[
            { required: true, message: '配料数量不能为空'},
            { type: 'number', message: '配料数量必须为数字值'}
          ]"
        >
          <el-input
            v-model.number.trim="componentForm.componentNum"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="菜式ID"
          prop="menuId"
        >
          <el-input
            v-model.number="componentForm.menuId"
            autocomplete="off"
            disabled
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addComponent = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmAddComponent"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--  -->
    <el-dialog
      v-loading="loadingComponent"
      title="查看配料"
      :visible.sync="checkComponent"
      width="60%"
      :before-close=" componentOperateClose"
    >
      <el-table
        ref="multipleTable"
        :data="componentData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          prop="componentName"
          label="配料名称"
          align="center"
        />
        <el-table-column
          prop="componentMoney"
          label="配料价格"
          align="center"
        />
        <el-table-column
          prop="componentNum"
          label="配料数量(克)"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteComponent(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="checkComponent = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getMenuList, deleteMenuList, changeMenu, deleteMenuComponent, getMenuComponents, addMenuComponent } from '@/api/menu.js'
import { getMenusType } from '@/api/menuType.js'
export default {
  data() {
    return {
      input: '', // 模糊搜索输入框
      fileList: [], // 菜图
      typeOptions: [],
      TypeValue: '',
      changeAddVisible: false,
      dialogImgVisible: false,
      diaTitle: '',
      isCheck: false,
      isChange: false,
      isAdd: false,
      form: {},
      component: [],
      limit: 1,
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false,
      loadingComponent: false,
      componentRow: {},
      componentData: [],
      componentDia: false,
      addComponent: false,
      checkComponent: false,
      componentForm: {
        componentId: '',
        componentNum: ''
      }

    }
  },
  mounted() {
    this.getData()
    this.getMenuType()
  },
  methods: {
    async getMenuType() {
      let typeObj = {}
      if (sessionStorage.getItem('personalMess')) {
        const { departmentfloorId, departmentId } = sessionStorage.getItem('personalMess')
        typeObj = Object.assign(typeObj, { departmentfloorId, departmentId })
      }
      getMenusType(typeObj).then(res => {
        this.typeOptions = res.data.records
      })
    },
    async getData(menuName) {
      this.loading = true
      await getMenuList(this.input ? { menuName } : null).then(res => {
        if (res.code === 200) {
          const { records = [] } = res.data
          this.tableData = records
          this.total = res.data?.total
        }
      })
      this.loading = false
    },
    handleSearch() {
      if (this.input) {
        this.getData(this.input)
      } else {
        this.$message('请输入菜单名称')
      }
    },
    handleClear() {
      this.input = ''
      this.getData()
    },
    handleAdd() {
      this.changeAddVisible = true
      this.diaTitle = '增加菜式'
      this.isAdd = true
      this.form = {
        typeId: '',
        typeName: '',
        menuName: '',
        menuMoney: '',
        menuFMoney: '',
        menuPic: '',
        departmentId: '',
        departmentName: '',
        departmentfloorId: '',
        departmentfloorName: ''
      }
    },
    uploadPicSucc(response, file, fileList) {
      this.form.menuPic = response.data
    },
    beforePicUpload(file) {
      // const picReg = /\.(png|jpg|gif|jpeg|webp)$/i
      // const isJPG = picReg.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 10

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是png|jpg|gif|jpeg|webp格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      // isJPG &&
      return isLt2M
    },
    changeAddDiaClose() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          changeMenu(this.form).then(() => {
            this.$message({
              showClose: true,
              message: '变更成功',
              type: 'success'
            })
            this.getData()
            this.isAdd = false
            this.isChange = false
            this.changeAddVisible = false
            this.dialogFormVisible = false
          }).catch(() => {
            this.$message.error('变更失败，请重试')
          })
        }
      })
    },
    handleClose() {
      this.isChange = false
      this.isAdd = false
      this.isCheck = false
      this.changeAddVisible = false
    },
    handleCheck(row) {
      this.form = row
      this.diaTitle = '查看菜式详情'
      this.changeAddVisible = true
      this.isCheck = true
    },
    handleChange(row) {
      this.changeAddVisible = true
      this.diaTitle = '修改菜式详情'
      this.form = row
      this.isChange = true
      this.isCheck = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogImgVisible = true
    },
    handleDelete(row) {
      this.$confirm('此操作将删除菜式, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenuList({ menuId: row.menuId }).then(() => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getData()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    selectChange(val) {
      const select = this.typeOptions.filter(item => item.typeName === val
      )
      this.form.typeId = select[0]?.typeId
    },
    async changeData(current, size, input) {
      this.loading = true
      if (input) {
        await getMenuList({ current, size, menuName: input }).then(res => {
          this.tableData = res.data.records
          this.total = res?.data?.total || 0
        })
        this.loading = false
        return
      }
      await getMenuList({ current, size }).then(res => {
        this.tableData = res.data.records
        this.total = res?.data?.total || 0
      })
      this.loading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      if (this.input) {
        this.changeData(this.currentPage, val, this.input)
        return
      }
      this.changeData(this.currentPage, val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.input) {
        this.changeData(this.currentPage, val, this.input)
        return
      }
      this.changeData(val, this.pageSize)
    },
    componentClick(row) {
      this.componentRow = row
      this.componentDia = true
    },
    componentDiaClose() {
      this.componentDia = false
    },
    componentOperateClose() {
      this.addComponent = false
      this.checkComponent = false
    },
    async getMenuComponentsList() {
      this.loadingComponent = true
      const menuId = this.componentRow?.menuId
      await getMenuComponents({ menuId }).then((res) => {
        this.componentData = res?.data || []
      })
      this.loadingComponent = false
    },
    addMenuComponent() {
      this.componentForm.menuId = this.componentRow.menuId
      this.addComponent = true
    },
    confirmAddComponent() {
      this.$refs['componentForm'].validate((valid) => {
        if (valid) {
          addMenuComponent(this.componentForm).then(() => {
            this.$notify({
              title: '成功',
              message: '增加配料成功！',
              type: 'success'
            })
            this.addComponent = false
          }).catch(() => {
            this.$notify.error({
              title: '错误',
              message: '增加配料失败!'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleDeleteComponent(index, row) {
      this.$alert('确定删除该菜的配料？', '', {
        confirmButtonText: '确定删除',
        distinguishCancelAndClose: true,
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            deleteMenuComponent({ MenuComponentId: +row.menucomponentId }).then(res => {
              if (res.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '删除该菜配料成功！',
                  type: 'success'
                })
                this.getMenuComponentsList()
              }
            }).catch(() => {
              this.$notify.error({
                title: '错误',
                message: '删除该菜配料失败!'
              })
            })
            this.visible = false
          }
        }
      })
    },
    checkComponentClick() {
      this.getMenuComponentsList()
      this.checkComponent = true
    }

  }
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  margin: 5px 1rem 5px 50px;
  justify-content: space-between;

  .header_left {
    .input {
      display: inline-block;
      width: 20rem;
      margin-right: 1rem;

      input {
        width: 20rem;
      }
      .btn {
        display: inline-block;
      }
    }
    .clear_btn {
      margin-left: 10px;
    }
  }

  .header_right {
    .addBtn {
      width: 3rem;
    }
  }
}

.dialog {
  .form {
    .form_item_pic {
      margin: 1rem;
      display: flex;
    }
  }
}
.pagination {
  margin-top: 10px;
  text-align: center;
}
.component_btn {
  text-align: center;
  span {
    margin-right: 10px;
  }
}
</style>
