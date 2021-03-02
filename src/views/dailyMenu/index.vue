<template>
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
        <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
        <el-button type="text" size="small">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

  data() {
    return {
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
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
