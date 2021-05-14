<template>
  <div>
    <div class="content_wrapper">
      <p class="header_title">个人信息</p>
      <div class="mess_wrapper">
        <span class="mess_label">用户名：</span>
        <span class="mess_content">{{ message.adminName }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">性别：</span>
        <span class="mess_content">{{ message.adminSex }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">身份证号码：</span>
        <span class="mess_content">{{ message.adminIdcard }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">联系方式：</span>
        <span class="mess_content">{{ message.adminTel||'无' }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">邮箱地址：</span>
        <span class="mess_content">{{ message.adminEmail||'无' }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">状态：</span>
        <span class="mess_content">{{ message.adminStatus? '已激活':'未激活' }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">密码：</span>
        <span class="mess_content">
          <el-input
            v-model="message.adminPwd"
            :type="pwdType"
          />
        </span>
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">创建时间：</span>
        <span class="mess_content">{{ message.adminCreatime }} </span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">所属饭堂ID：</span>
        <span class="mess_content">{{ message.departmentId }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">所属饭堂名称：</span>
        <span class="mess_content">{{ message.departmentName }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">所属楼层ID：</span>
        <span class="mess_content">{{ message.departmentfloorId }}</span>
      </div>
      <div class="mess_wrapper">
        <span class="mess_label">所属楼层名称：</span>
        <span class="mess_content">{{ message.departmentfloorName }}</span>
      </div>
    </div>
    <div class="changeMess_btn">
      <span>
        <el-button
          type="primary"
          size="small"
          @click="changeMessClick"
        >修改个人信息</el-button>
      </span>
    </div>
    <div class="dialog">

      <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
        >
          <el-form-item label="密码：">
            <el-input v-model="form.adminPwd" />
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="form.adminEmail" />
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="form.adminTel" />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-popover
            v-model="visible"
            placement="top"
            width="160"
          >
            <p>您确定要修改个人信息吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="visible = false"
              >取消</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="confirmChange"
              >确定</el-button>
            </div>
            <el-button
              slot="reference"
              type="primary"
              class="popBtn"
            >确定</el-button>
          </el-popover>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getAdminInfo, changeAdminInfo } from '@/api/administrator.js'
export default {
  name: 'PersonalMessage',
  props: {
  },
  data() {
    return {
      message: {},
      pwdType: 'password',
      dialogVisible: false,
      visible: false,
      form: {
        adminPwd: '',
        adminTel: '',
        adminEmail: ''
      }
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      const adminId = sessionStorage.getItem('adminId')
      try {
        getAdminInfo({ adminId: +adminId }).then(res => {
          this.message = res.data
          console.log(res)
        })
      } catch {
        this.message('获取数据失败！')
      }
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
    changeMessClick() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    confirmChange() {
      const data = {}
      if (this.form.adminPwd) {
        data.adminPwd = this.form.adminPwd
      }
      if (this.form.adminTel) {
        data.adminTel = this.form.adminTel
      }
      if (this.form.adminEmail) {
        data.adminEmail = this.form.adminEmail
      }
      const obj = Object.assign(this.message, data)
      changeAdminInfo(obj).then(async res => {
        if (res.code === 200) {
          this.$message('修改成功，请重新登录')
          await this.$store.dispatch('user/logout')
          this.visible = false
          this.dialogVisible = false
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
      }).catch(() => {
        this.$message('修改失败，请稍后重试！')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.content_wrapper {
  .header_title {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 1.1rem;
    margin-bottom: 1rem;
  }
  width: 40%;
  margin: 10px auto;
  .mess_wrapper {
    display: flex;
    .mess_label {
      height: 40px;
      line-height: 40px;
      width: 120px;
      text-align: right;
    }
    .mess_content {
      height: 40px;
      line-height: 40px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .show-pwd {
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
}
.changeMess_btn {
  width: 40%;
  text-align: right;
  margin: 18px auto;
}
.popBtn {
  margin-left: 5px;
}
</style>
