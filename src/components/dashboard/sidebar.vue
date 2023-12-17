<template>
  <aside
    @click.stop
    class="p-5 flex flex-col h-full overflow-y-auto md:px-10 transition-all duration-200"
  >
    <div class="min-w-[250px] md:w-96 mx-auto">
      <div class="my-10">
        <button
          class="navbar-toggle cursor-pointer flex-col gap-[4px] w-[40px] h-[40px] border-[#00D99D] border rounded-full flex items-center justify-center"
          @click="toggleSidebar"
        >
          <div
            class="w-3 h-[2px] bg-[#00D99D] rotate rounded"
            style="transform: translateY(3px) rotate(45deg)"
          ></div>
          <div
            class="w-3 h-[2px] bg-[#00D99D] rotate rounded"
            style="transform: translateY(-3px) rotate(-45deg)"
          ></div>
        </button>
      </div>
      <div
        class="nav-items mt-[2.5rem] flex-col flex md:text-xl text-base text-textColor"
      >
        <router-link
          @click="toggleSidebar"
          class="flex items-center gap-3 rounded-[4px] px-[10px] py-[.6rem] cursor-pointer hover:bg-[#F5F7F9] duration-400 my-[2px]"
          to="/"
        >
          Dashboard
        </router-link>

        <router-link
          @click="toggleSidebar"
          class="flex items-center gap-3 rounded-[4px] px-[10px] py-[.6rem] cursor-pointer hover:bg-[#F5F7F9] duration-400 my-[2px]"
          to="/transactions"
        >
          Transactions</router-link
        >

        <router-link
          @click="toggleSidebar"
          class="flex items-center gap-3 rounded-[4px] px-[10px] py-[.6rem] cursor-pointer hover:bg-[#F5F7F9] duration-400 my-[2px]"
          to="/account"
        >
          Account</router-link
        >
        <router-link
          @click="toggleSidebar"
          class="flex items-center gap-3 rounded-[4px] px-[10px] py-[.6rem] cursor-pointer hover:bg-[#F5F7F9] duration-400 my-[2px]"
          to="/app/account"
        >
          Help</router-link
        >
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  background: linear-gradient(
      270deg,
      rgba(245, 247, 249, 0.85) 0%,
      rgba(245, 247, 249, 0) 12.73%
    ),
    #ffffff;
}
</style>
<script setup>
import useMainStore from "@/stores/user";
const { toggleSidebar } = useMainStore();
</script>
