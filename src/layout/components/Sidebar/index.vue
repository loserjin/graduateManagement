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
    searchMeta(router, roleType) {
      if (router?.meta) {
        if (router.meta?.roles) {
          if (router.meta?.roles.includes(roleType)) {
            if (router?.children) {
              router?.children.forEach(item => {
                this.searchMeta(item)
              })
            }
            return true
          }
          return false
        }
        return true
      }
      return true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      const adminRole = sessionStorage.getItem('adminRole')
      const menu = sessionStorage.getItem('menu')
      // console.log(adminRole, 111, typeof adminRole)
      // let menuRouter = []
      // if (adminRole) {
      //   menuRouter = this.$router.options.routes.filter(item => {
      //     return this.searchMeta(item)
      //     // console.log(item, 111)
      //     // console.log(item.meta?.roles, typeof item.meta?.roles)
      //     // if (item?.meta?.roles && item?.meta?.roles.includes(adminRole)) {
      //     //   console.log(4564564654)
      //     //   return true
      //     // } else {
      //     //   return true
      //     // }
      //   })
      // }
      return this.$router.options.routes
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
