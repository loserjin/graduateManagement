<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input">
          <el-input
            v-model="search"
            placeholder="请输入饭堂Id"
          />
        </span>
        <span class="input">
          <el-input
            v-model="floorId"
            placeholder="请输入饭堂楼层Id"
          />
        </span>
        <span>
          <el-button
            type="primary"
            @click="handleSearch"
          >搜索</el-button>
        </span>
        <span>
          <el-button @click="handleClear">重置</el-button>
        </span>
      </div>
      <div class="date">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </div>
    </div>
    <el-table
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
        prop="departmentId"
        label="饭堂ID"
        width="120"
        align="center"
      />
      <el-table-column
        prop="departmentfloorName"
        label="楼层"
        width="80"
        align="center"
      />
      <el-table-column
        prop="menuPic"
        label="菜图"
        width="150"
        align="center"
      />
      <el-table-column
        prop="menuName"
        label="菜名"
        width="120"
        align="center"
      />
      <el-table-column
        prop="dailymenuId"
        label="菜式ID"
        width="120"
        align="center"
      />
      <el-table-column
        prop="menuFMoney"
        label="价钱"
        width="120"
        align="center"
      />
      <el-table-column
        prop="material"
        label="食材"
        width="150"
        align="center"
      />
      <el-table-column
        prop="dailymenuCreatime"
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
          <el-button
            type="text"
            size="small"
            @click="handleCheck(scope.row)"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row)"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <el-dialog
        v-loading="loading"
        title="菜式详情"
        :visible.sync="menuDetail"
        width="50%"
        :before-close="handleClose"
      >
        <div>
          <div class="dia_item">
            <span>饭堂ID:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
          <div class="dia_item">
            <span>楼层:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
          <div class="dia_item">
            <span>类别:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
          <div class="dia_item">
            <span>菜名:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
          <div class="dia_item">
            <span>菜式ID:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
          <div class="dia_item">
            <span>价钱:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
          <div class="dia_item">
            <span>食材:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
          <div class="dia_item">
            <span>菜图:</span>
            <span>
              <img
                :src="menuDtail.ID"
                alt=""
              ></span>
          </div>
          <div class="dia_item">
            <span>日期:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="diaClose"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <WordTips />
  </div>
</template>

<script>
import WordTips from '@/components/tips/index'
import { getDailyMenuList, addMaterial, deleteMaterial } from '@/api/dailyMenu.js'
export default {
  components: { WordTips },
  data() {
    return {
      search: '',
      date: '',
      floorId: '',
      menuDetail: false,
      isAdd: false,
      menuDtail: {
        name: '',
        ID: ''
      },
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      await getDailyMenuList().then(res => {
        const { records = [] } = res.data
        if (res.code === 200) {
          this.tableData = records
        }
      })
      this.loading = false
    },
    handleSearch() {
      if (!this.search && !this.date && this.floorId) {
        this.$message('请选择日期或饭堂或楼层ID')
        return
      }
      const obj = {}
      if (this.date) {
        obj.date = this.date
      }
      if (this.search) {
        obj.departmentId = this.search
      }
      if (this.floorId) {
        obj.departmentfloorId = this.floorId
      }
      getDailyMenuList(obj).then(res => {
        this.tableData = res.data.records
      })
    },
    handleCheck(row) {
      this.menuDtail = row
      this.menuDetail = true
    },
    handleClose() {
      this.menuDetail = false
    },
    handleDelete(message) {
      deleteMaterial().then(res => {
        console.log(res)
      })
    },
    handleClear() {
      this.search = ''
      this.date = ''
      this.floorId = ''
      this.getData()
    },
    diaClose() {
      this.menuDetail = false
      if (this.isAdd) {
        addMaterial().then(res => {
          this.$message('新增成功！')
          this.getData()
        }).catch(() => {
          this.$message * ('新增失败')
        })
      }
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
      width: 10rem;
      margin-right: 2rem;
    }
  }
}
.dialog {
  .dia_item {
    margin-top: 15px;
  }
}
.tips {
  margin: 10px 0 0 2rem;
  color: grey;
}
</style>
