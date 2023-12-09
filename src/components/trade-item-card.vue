<template>
  <div class="w-full bg-[#F9FAFB] p-5 rounded-lg">
    <div class="w-10 h-10">
      <!-- image with example src -->

      <img
        src="https://via.placeholder.com/150"
        class="w-full h-full object-cover rounded-full bg-[#f9fafb00]"
        alt="item"
      />
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 font-medium md:text-base text-sm w-full"
    >
      <span class="">Project</span>
      <span class="w-full text-ellipsis text-end"
        >Wind Turbine Cooperative</span
      >
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Interest</span>
      <span
        class="text-ellipsis text-end bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-2xl"
        >5.04% daily</span
      >
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Minimum</span>
      <span class="text-ellipsis text-end">$150</span>
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Duration</span>
      <span class="text-ellipsis text-end text-[#027A48]">7 days</span>
    </div>
    <button
      class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none mt-2 px-[14px] py-[10px] font-medium flex items-center justify-center w-full"
    >
      <span> Invest </span>
      <!-- <div v-else class="w-4 h-4 flex items-center justify-center">
        <Loader />
      </div> -->
    </button>
  </div>
</template>
