<template>
  <div>
    <div class="header">
      <div class="search">
        <span class="input"><el-input v-model="search" placeholder="请输入内容" /></span>
        <span><el-button type="primary" @click="handleSearch">搜索</el-button></span>
      </div>
      <div class="date">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
        />
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
          <el-button type="text" size="small" @click="handleCheck(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">移除</el-button>
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
            <span><img :src="menuDtail.ID" alt=""></span>
          </div>
          <div class="dia_item">
            <span>日期:</span>
            <span>{{ menuDtail.ID }}</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="diaClose">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="tips">默认显示最新菜谱，可根据日期选择当天菜谱</div>
  </div>
</template>

<script>
import { getMaterialList, addMaterial, deleteMaterial, searchMaterial } from '@/api/dailyMenu.js'
export default {
  data() {
    return {
      search: '',
      date: '',
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
      await getMaterialList().then(res => {
        const { records = [] } = res.data
        if (res.code === 200) {
          this.tableData = records
        }
      })
      this.loading = false
    },
    handleSearch() {
      console.log('search')
      searchMaterial().then(res => {

      })
    },
    handleCheck(row) {
      console.log(row)
      this.menuDetail = true
    },
    handleClose() {
      this.menuDetail = false
      console.log('close')
    },
    handleDelete(message) {
      console.log(message)
      deleteMaterial().then(res => {
        console.log(res)
      })
    },
    diaClose() {
      console.log('close')
      this.menuDetail = false
      if (this.isAdd) {
        addMaterial().then(res => {
          console.log(res)
        })
      }
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
  .dialog{
    .dia_item{
      margin-top: 15px;
    }
  }
  .tips{
    margin: 10px 0 0 2rem;
    color: grey;
  }

</style>
