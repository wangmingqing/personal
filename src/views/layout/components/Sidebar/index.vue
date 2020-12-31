<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item
        v-for="route in routeList"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>
<script>
import SidebarItem from "./SidebarItem";
import { constantRouterMap } from "@/router";
export default {
  components: { SidebarItem },
  data: function() {
    return {
      routeList: constantRouterMap
    };
  }
};
</script>
