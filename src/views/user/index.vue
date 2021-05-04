<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="input"
            placeholder="请输入用户名或地址"
          />
        </span>
        <span>
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
        </span>
        <span class="clearBtn">
          <el-button @click="getData">重置</el-button>
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
        label="序号"
        fixed
      >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickName"
        label="用户别名"
      />
      <el-table-column
        align="center"
        prop="realName"
        label="真实姓名"
      />
      <el-table-column
        align="center"
        prop="gender"
        label="性别"
        :formatter="formatSex"
      />
      <el-table-column
        align="center"
        prop="province"
        label="省份"
      />
      <el-table-column
        align="center"
        prop="userTel"
        label="联系方式"
      />
      <el-table-column
        align="center"
        prop="lastTime"
        label="上一次登录时间"
      />
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
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
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="dialog">
      <el-dialog
        title="用户详情"
        :visible.sync="userDetail"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <div class="dia_item">
            <span class="dia_label">用户别名:</span>
            <span>{{ userDetailData.nickName }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label">真实姓名:</span>
            <span>{{ userDetailData.realName }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label dia_img_label">用户头像:</span>
            <span class="dia_img">
              <el-image
                style="width: 100px; height: 100px; vertical-align:middle"
                :src="userDetailData.avatarUrl"
              />
            </span>
          </div>
          <div class="dia_item">
            <span class="dia_label">性别:</span>
            <span>{{ formatSex(null,null,userDetailData.gender) }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label">国家:</span>
            <span>{{ userDetailData.county }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label">省份:</span>
            <span>{{ userDetailData.province }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label">地址:</span>
            <span>{{ userDetailData.userAddress }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label">联系方式:</span>
            <span>{{ userDetailData.userTel }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label">最近登录时间:</span>
            <span>{{ userDetailData.lastTime }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label">用户openID:</span>
            <span>{{ userDetailData.openId }}</span>
          </div>
          <div class="dia_item">
            <span class="dia_label">用户sessionKey:</span>
            <span>{{ userDetailData.sessionKey }}</span>
          </div>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="userDetail = false">取 消</el-button>
          <el-button
            type="primary"
            @click="diaClose"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { getUserList } from '@/api/user'
export default {
  data() {
    return {
      input: '',
      userDetail: false,
      userDetailData: {},
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      loading: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      if (this.input) {
        this.input = ''
      }
      this.loading = true
      await getUserList().then(res => {
        this.tableData = res.data.records
        this.total = res?.data?.total || 0
      })
      this.loading = false
    },
    handleCheck(row) {
      this.userDetail = true
      this.userDetailData = row
    },
    formatSex(row, column, cellValue, index) {
      if (+cellValue === 0) {
        return '女'
      }
      if (+cellValue === 1) {
        return '男'
      }
      return ''
    },
    async handleSearch() {
      if (this.input) {
        this.loading = true
        await getUserList({ text: this.input }).then(res => {
          this.tableData = res.data.records
          this.total = res?.data?.total || 0
        })
        this.loading = false
      }
    },
    handleClose() {
      this.userDetail = false
    },
    async changeData(current, size, input) {
      this.loading = true
      if (input) {
        await getUserList({ current, size, text: input }).then(res => {
          this.tableData = res.data.records
          this.total = res?.data?.total || 0
        })
        this.loading = false
        return
      }

      await getUserList({ current, size }).then(res => {
        this.tableData = res.data.records
        this.total = res?.data?.total || 0
      })
      this.loading = false
    },
    diaClose() {
      this.userDetail = false
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
  margin: 10px 1rem;
  justify-content: space-between;
  .search {
    display: flex;
    .input {
      width: 20rem;
      margin-right: 2rem;
    }
    .clearBtn {
      margin-left: 20px;
    }
  }
}
.dialog {
  .dia_item {
    margin-top: 15px;
    vertical-align: middle;
    .dia_label {
      display: inline-block;
      width: 120px;
      text-align: right;
      margin-right: 15px;
    }
    .dia_img {
      display: inline-block;
      width: 100px;
      height: 100px;
    }
  }
  .dia_img_label {
    height: 100px;
    line-height: 100px;
  }
  .pagination {
    margin-top: 10px;
    text-align: center;
    .el-pagination {
      display: inline-block;
    }
  }
}
</style>
