<script setup>
import Sidebar from "@/components/dashboard/sidebar.vue";
import DashboardHeader from "@/components/header.vue";
import useMainStore from "@/stores/user";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRoute } from "vue-router";

const mainStore = useMainStore();
const route = useRoute();

const { isSidebarOpened } = storeToRefs(mainStore);

watch(
  () => route.name,
  () => {
    if (isSidebarOpened.value) {
      mainStore.toggleSidebar();
    }
  }
);
</script>

<template>
  <div
    :class="`${
      isSidebarOpened ? 'opacity-100 visible' : 'opacity-0 invisible'
    } fixed w-full h-full z-[99] bottom-0 bg-[#0000004f] cursor-pointer transition-all duration-200`"
    @click="isSidebarOpened = false"
  >
    <section
      :class="`h-[100vh] z-[99999] transition-all duration-200 fixed right-0 top-0 bottom-0 translate-x-[100%] ${
        isSidebarOpened ? '!translate-x-0' : ''
      }`"
    >
      <Sidebar />
    </section>
  </div>
  <dashboard-header />
  <router-view />
</template>
