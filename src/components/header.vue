<template>
  <header class="border-b border-b-[#E4E7EC] sticky top-0 bg-white z-10">
    <nav
      class="p-5 max-w-[1300px] mx-auto w-full flex items-center justify-between"
    >
      <a href="/" class="sm:h-auto h-[20px]">
        <Logo class="w-full h-full object-cover" />
      </a>
      <ul class="md:flex hidden flex-row items-center gap-5">
        <li>
          <router-link
            :to="{ name: 'dashboard' }"
            class="text-[#101828] text-base"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'transactions' }"
            class="text-[#101828] text-base"
          >
            Transactions
          </router-link>
        </li>
      </ul>
      <!-- <div
        class="p-2 px-5 rounded-[20px] border-[0.6px] border-[#E4E7EC] md:flex hidden flex-row items-center gap-2"
      >
        <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
        <span class="text-xs text-[#1E1E1EA3]">
          Copy referral url -
          <span class="text-green-700">www.greenbounty.net/ref_9200</span>
        </span> 
      </div> -->
      <div>
        <button
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
import Logo from "../components/icons/logo.vue";
</script>
