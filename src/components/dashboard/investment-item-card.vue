<script setup>
const props = defineProps({
  projectTitle: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  dailyInterest: {
    type: Number,
    required: true,
  },
  minimumInvestment: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});
//  setup and emit for invest-click
const emit = defineEmits(["invest-click"]);

const handleInvestClick = () => {
  emit("invest-click", { projectId: props.projectId });
};
</script>

<template>
  <div class="w-full bg-[#F9FAFB] p-5 rounded-lg">
    <!-- <div class="w-10 h-10">
      <img
        src="https://via.placeholder.com/150"
        class="w-full h-full object-cover rounded-full bg-[#f9fafb00]"
        alt="item"
      />
    </div> -->
    <div
      class="flex items-center justify-between mt-2 gap-2 font-medium md:text-base text-sm w-full"
    >
      <span class="">Project</span>
      <span class="w-full text-ellipsis text-end">{{ projectTitle }}</span>
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Interest</span>
      <span
        class="text-ellipsis text-end bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-2xl"
        >{{ dailyInterest }}% daily</span
      >
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Minimum</span>
      <span class="text-ellipsis text-end">${{ minimumInvestment }}</span>
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Duration</span>
      <span class="text-ellipsis text-end text-[#027A48]">{{ duration }}</span>
    </div>
    <button
      @click="handleInvestClick"
      class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none mt-2 px-[14px] py-[10px] font-medium flex items-center justify-center w-full"
    >
      <span> Invest </span>
    </button>
  </div>
</template>
