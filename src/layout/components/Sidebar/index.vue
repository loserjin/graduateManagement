<template>
  <div :class="{'has-logo':showLogo}">
    <logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      roles: ''
    }
  },
  methods: {
    hasPermission(roles, route) {
      if (route.meta && route.meta.roles) {
        const rolesArr = route.meta.roles
        return rolesArr.some(role => role === roles)
      } else {
        return true
      }
    },
    filterAsyncRoutes(routes, roles) {
      const res = []
      routes.forEach(route => {
        const tmp = { ...route }
        if (this.hasPermission(roles, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterAsyncRoutes(tmp.children, roles)
          }
          res.push(tmp)
        }
      })
      return res
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      const adminRole = sessionStorage.getItem('adminRole')
      const cloneRouter = this.filterAsyncRoutes(this.$router.options.routes, adminRole)
      return cloneRouter
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  updated() {
    if (sessionStorage.getItem('adminRole')) {
      this.roles = sessionStorage.getItem('adminRole')
    }
  }

}
</script>
