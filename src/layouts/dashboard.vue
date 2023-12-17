<script setup>
import Sidebar from "@/components/dashboard/sidebar.vue";
import Loader from "@/components/loader.vue";
import Modal from "@/components/modal.vue";
import DashboardHeader from "@/components/header.vue";
import useMainStore from "@/stores/user";
import { storeToRefs } from "pinia";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "../service/axios";
import { useToast } from "vue-toast-notification";

const mainStore = useMainStore();
const route = useRoute();
const logoutModal = ref(null);
const isLogginOut = ref(false);
const $toast = useToast();

const { isSidebarOpened } = storeToRefs(mainStore);

const toggleLogoutModal = () => {
  logoutModal?.value?.toggleModal?.();
};

const logUserOut = async () => {
  try {
    const { data } = await axios.get("/auth/logout");

    if (data?.status === "success") {
      window.location = window.location.origin;
    } else {
      $toast.open({
        message: data?.message ?? "An error occured",
        type: "error",
        position: "top",
      });
    }
  } catch (error) {
    $toast.open({
      message: error?.response?.data?.message ?? "Something went wrong",
      type: "error",
      position: "top",
    });
  }
};

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
  <Modal ref="logoutModal" :close-on-backdrop-click="!isLogginOut"
    ><div class="w-full">
      <div class="flex items-center justify-between">
        <h3 class="font-medium md:text-lg text-base text-center w-full">
          Are you sure you want to logout?
        </h3>
      </div>
      <div class="mt-4 w-full flex items-center justify-center">
        <div class="flex gap-2">
          <button
            :disabled="isLogginOut"
            @click="toggleLogoutModal"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-70"
          >
            No
          </button>
          <button
            :disabled="isLogginOut"
            @click="logUserOut"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-70"
          >
            <span v-if="!isLogginOut"> Yes </span>
            <div v-else class="w-4 h-4 flex items-center justify-center">
              <Loader />
            </div>
          </button>
        </div>
      </div>
    </div>
  </Modal>
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
      <Sidebar :toggleLogoutModal="toggleLogoutModal" />
    </section>
  </div>
  <dashboard-header />
  <router-view />
</template>
