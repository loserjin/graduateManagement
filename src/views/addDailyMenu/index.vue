<template>
  <div>
    <div class="header">
      <div class="header_left">
        <span class="input">
          <el-input
            v-model="input"
            placeholder="请输入菜单名"
          />
        </span>
        <span class="btn">
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
          <el-button @click="handleClear">重置</el-button>
        </span>
      </div>
      <div>
        <span class="times_range">
          <el-select
            v-model="value"
            placeholder="请选择时间段"
            class="range_width"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
        <span>
          <el-date-picker
            v-model="date"
            class="range_width"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :picker-options="dateOptions"
          >
            />
          </el-date-picker>
        </span>
      </div>
      <div>
        <span>
          <el-button
            type="primary"
            @click="addMenu"
          >将已勾选列为当日菜谱</el-button>
        </span>
      </div>
    </div>
    <div class="dialog">
      <el-dialog
        title="查看菜式详情"
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
            >
              <el-input v-model="form.typeName" />
            </el-form-item>
            <el-form-item
              label="类别ID"
              prop="typeId"
            >
              <el-input v-model="form.typeId" />
            </el-form-item>
            <el-form-item
              label="菜式ID"
              prop="menuId"
            >
              <el-input v-model="form.menuId" />
            </el-form-item>
            <el-form-item
              label="菜名"
              prop="menuName"
            >
              <el-input v-model="form.menuName" />
            </el-form-item>

            <el-form-item
              label="菜图"
              prop="menuPic"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="form.menuPic"
              />
            </el-form-item>
            <el-form-item
              label="单价"
              prop="menuFMoney"
            >
              <el-input v-model="form.menuFMoney" />
            </el-form-item>
            <el-form-item
              label="饭堂ID"
              prop="departmentId"
            >
              <el-input v-model="form.departmentId" />
            </el-form-item>
            <el-form-item
              label="饭堂名称"
              prop="departmentName"
            >
              <el-input v-model="form.departmentName" />
            </el-form-item>
            <el-form-item
              label="楼层ID"
              prop="departmentfloorId"
            >
              <el-input v-model="form.departmentfloorId" />
            </el-form-item>
            <el-form-item
              label="楼层名称"
              prop="departmentfloorName"
            >
              <el-input v-model="form.departmentfloorName" />
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
            @click="handleClose"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
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
        </template>
      </el-table-column>
    </el-table>
    <div
      class="pagination"
      style="width: 50%;margin: 10px auto;text-align:center;font-size:1.1rem"
    >
      <el-pagination
        v-if="total"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getMenuList, addDailyMenu } from '@/api/menu.js'
export default {
  data() {
    return {
      input: '', // 模糊搜索输入框
      options: [{
        value: 0,
        label: '早上'
      }, {
        value: 1,
        label: '中午'
      }, {
        value: 2,
        label: '晚上'
      }],
      value: '',
      date: '',
      changeAddVisible: false,
      form: {},
      tableData: [],
      menuIdList: [],
      total: 0,
      currentPage: 1,
      menuPic: '',
      pageSize: 5,
      loading: false,
      dateOptions: {
        disabledDate(time) {
          // const nowDate = Date.now() - 8.64e7
          // const minDate = nowDate + 3 * 24 * 60 * 60 * 1000
          // return time.getTime() < minDate
          return false
        }
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(input) {
      this.loading = true
      if (input) {
        await getMenuList({ menuName: input }).then(res => {
          if (res.code === 200) {
            const { records = [], total } = res.data
            this.tableData = records
            this.total = total
          }
        })
      }
      await getMenuList().then(res => {
        if (res.code === 200) {
          const { records = [], total } = res.data
          this.tableData = records
          this.total = total
        }
      })
      this.loading = false
    },
    async addMenu() {
      if (this.menuIdList.length === 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
        return
      }
      if (!this.value && this.value !== 0) {
        this.$message({
          message: '请选择时间段',
          type: 'warning'
        })
        return
      }
      if (!this.date) {
        this.$message({
          message: '请选择菜单日期',
          type: 'warning'
        })
      }
      const menuId = []
      this.menuIdList.forEach(item => {
        menuId.push(item.menuId)
      })
      const mess = { dailymenuCreatime: this.date, dailymenuTime: this.value, menuId: menuId.join(',') }
      await addDailyMenu(mess).then(() => {
        this.$notify({
          title: '成功',
          message: '增加成功！',
          type: 'success'
        })
        this.$refs.multipleTable.clearSelection()
      }).catch(() => {
        this.$notify.error({
          title: '错误',
          message: '增加失败！'
        })
      })
    },
    handleClear() {
      this.input = ''
      this.value = ''
      this.date = ''
      this.$refs.multipleTable.clearSelection()
    },
    handleSearch() {
      if (this.input) {
        this.getData(this.input)
        return
      }
      this.$message({
        message: '输入菜单名',
        type: 'warning'
      })
    },
    handleClose() {
      this.changeAddVisible = false
    },
    handleSelectionChange(rows) {
      this.menuIdList = rows
    },
    handleCheck(row) {
      this.form = row
      this.changeAddVisible = true
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
      width: 10rem;
      margin-right: 1rem;

      input {
        width: 20rem;
      }
    }
    .btn {
      display: inline-block;
    }
  }
  .times_range {
    display: inline-block;
    margin-right: 5px;
    .range_width {
      width: 9rem;
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
