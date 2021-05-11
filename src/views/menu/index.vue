<template>
  <div>
    <div class="header">
      <div class="header_left">
        <span class="input">
          <el-input
            v-model="input"
            placeholder="请输入搜索内容"
          />
        </span>
        <span class="btn">
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
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
              <el-input
                v-model="form.typeName"
                :disabled="isCheck"
              />
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
                :disabled="isCheck"
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
                v-model="form.menuMoney"
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
                v-model="form.menuFMoney"
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
        prop="typeId"
        label="类型ID"
        align="center"
      />
      <el-table-column
        prop="typeName"
        label="菜式类型"
        align="center"
      />
      <el-table-column
        prop="menuId"
        label="菜式ID"
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
      />
      <el-table-column
        prop="menuMoney"
        label="单价"
        align="center"
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
            @click="handleDelete(scope.row)"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-if="total"
        :current-page="currentPage"
        :page-sizes="[15, 20, 25, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getMenuList, deleteMenuList, changeMenu } from '@/api/menu.js'
export default {
  data() {
    return {
      input: '', // 模糊搜索输入框
      fileList: [], // 菜图
      changeAddVisible: false,
      dialogImgVisible: false,
      diaTitle: '',
      isCheck: false,
      isChange: false,
      isAdd: false,
      form: {},
      limit: 1,
      tableData: [],
      total: 0,
      currentPage: 1,
      loading: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      await getMenuList().then(res => {
        if (res.code === 200) {
          const { records = [] } = res.data
          this.tableData = records
        }
      })
      this.loading = false
    },
    handleSearch() {
      console.log('search')
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
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
    }

    .btn {
      display: inline-block;
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
</style>
