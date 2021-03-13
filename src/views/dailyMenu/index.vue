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
        prop="id"
        label="饭堂ID"
        width="120"
        align="center"
      />
      <el-table-column
        prop="floor"
        label="楼层"
        width="80"
        align="center"
      />
      <el-table-column
        prop="type"
        label="类别"
        width="150"
        align="center"
      />
      <el-table-column
        prop="name"
        label="菜名"
        width="120"
        align="center"
      />
      <el-table-column
        prop="picture"
        label="菜式ID"
        width="120"
        align="center"
      />
      <el-table-column
        prop="money"
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
        prop="date"
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
          <el-button type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <el-dialog
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
export default {

  data() {
    return {
      search: '',
      date: '',
      menuDetail: false,
      menuDtail: {
        name: '',
        ID: ''
      },
      tableData: [{
        id: '1001',
        floor: '1',
        date: '2016-05-02',
        name: '王小虎',
        type: '南北风味',
        province: '上海',
        money: '11',
        material: '白菜，猪肉'
      }, {
        id: '1002',
        floor: '2',
        type: '南北风味',
        money: '11',
        date: '2016-05-04',
        name: '王小虎',
        material: '白菜，猪肉'
      }, {
        id: '1003',
        floor: '3',
        type: '南北风味',
        date: '2016-05-01',
        money: '11',
        name: '王小虎',
        material: '白菜，猪肉'
      }, {
        id: '1004',
        floor: '4',
        date: '2016-05-03',
        type: '南北风味',
        name: '王小虎',
        money: '11',
        material: '白菜，猪肉'
      }]
    }
  },
  methods: {
    handleSearch() {
      console.log('search')
    },
    handleCheck(row) {
      console.log(row)
      this.menuDetail = true
    },
    handleClose() {
      this.menuDetail = false
      console.log('close')
    },
    diaClose() {
      console.log('close')
      this.menuDetail = false
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
