<template>
  <header class="border-b border-b-[#E4E7EC] sticky top-0 bg-white z-10">
    <nav
      class="p-5 max-w-[1300px] mx-auto w-full flex items-center justify-between"
    >
      <a href="/" class="sm:h-auto h-[20px]">
        <img
          src="../assets/images/eco-logo.png"
          alt="Logo"
          class="w-full h-full object-cover"
        />
      </a>

      <div>
        <button
          @click="toggleSidebar"
          class="navbar-toggle cursor-pointer flex flex-col gap-[4px] w-[33px] h-[17px] items-end"
        >
          <div
            class="w-6 h-[3px] bg-[#00D99D] rotate rounded-l"
            style="transform: translateY(0px) rotate(0deg)"
          ></div>
          <div
            class="w-full h-[3px] bg-[#00D99D] rotate rounded-l"
            style="opacity: 1"
          ></div>
          <div
            class="w-6 h-[3px] bg-[#00D99D] rotate rounded-l"
            style="transform: translateY(0px) rotate(0deg)"
          ></div>
        </button>
      </div>
    </nav>
  </header>
</template>
<script setup>
import useMainStore from "@/stores/user";
import Logo from "../components/icons/logo.vue";
const { toggleSidebar } = useMainStore();
</script>
