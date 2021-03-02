<template>
  <div>
    <div class="header">
      <div class="header_left">
        <span class="input">
          <el-input v-model="input" placeholder="请输入搜索内容" />
        </span>
        <span class="btn">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </span>
      </div>
      <div>
        <span> <el-button type="primary">将已勾选列为今日菜谱</el-button></span>
      </div>
      <div class="header_right">
        <span class="addBtn">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </span>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="新增菜式" :visible.sync="dialogFormVisible">
        <div class="form">
          <div class="form_item">
            <span>饭堂ID：</span>
            <span><el-input v-model="addID" placeholder="请输入饭堂ID" /></span>
          </div>
          <div class="form_item">
            <span>楼层：</span>
            <span><el-input v-model="addFloor" placeholder="请输入楼层" /></span>
          </div>
          <div class="form_item">
            <span>类别：</span>
            <span><el-input v-model="addType" placeholder="请输入类别" /></span>
          </div>
          <div class="form_item">
            <span>菜名：</span>
            <span><el-input v-model="addName" placeholder="请输入菜名" /></span>
          </div>
          <div class="form_item_pic">
            <span>菜图：</span>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4M</div>
            </el-upload>
          </div>
          <div class="form_item">
            <span>价钱：</span>
            <span><el-input v-model="addMoney" placeholder="请输入价钱" /></span>
          </div>
          <div class="form_item">
            <span>食材：</span>
            <span><el-input v-model="addMaterial" placeholder="请输入食材" /></span>
          </div>
          <div class="form_item">
            <span>菜式ID</span>
            <span><el-input v-model="addMenuID" placeholder="请输入菜式ID" /></span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormConfirm">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <el-table
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
        prop="menuID"
        label="菜式ID"
        width="80"
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
        label="创建日期"
        width="120"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDelete(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handleChange(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[15, 20, 25, 30]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '', // 模糊搜索输入框
      dialogFormVisible: false, // 增加菜式弹窗
      fileList: [], // 菜图
      addID: '',
      addFloor: '',
      addType: '',
      addName: '',
      addMoney: '',
      addMaterial: '',
      addMenuID: '',
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
      }],
      total: 30,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleSearch() {
      console.log('search')
    },
    handleAdd() {
      this.dialogFormVisible = true
      console.log('add')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    dialogFormConfirm() {
      this.dialogFormVisible = false
    },
    handleSelectionChange() {
      console.log('ad')
    },
    handleClick(row) {
      console.log(row)
    },
    handleDelete(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  display:flex;
  margin: 5px 1rem 5px 50px;
  justify-content:space-between;

  .header_left{

    .input{
      display:inline-block;
      width: 20rem;
      margin-right: 1rem;

      input{
        width: 20rem;
      }
    }

  .btn{
      display: inline-block;
    }
  }

  .header_right{

     .addBtn{
      width: 3rem;
    }
  }
}

.dialog{
  .form{

    .form_item_pic{
      margin: 1rem;
      display:flex;
    }
  }
}
.pagination{
  margin-top: 10px;
  text-align: center;
}

</style>
