<script setup>
import Check from "@/components/icons/check.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  location: {
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
  minimumDuration: {
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
      <!-- <div class="flex flex-row items-start justify-between gap-2"> -->
      <div class="flex flex-row gap-2 items-center">
        <div class="w-10 h-10 rounded bg-gray-50">
          <img :src="logo" class="w-full h-full rounded" alt="item" />
        </div>
        <div class="flex flex-row justify-between item-start">
          <div class="flex flex-col">
            <div class="flex flex-row items-center gap-1">
              <span class="font-medium text-sm text-[#101828]">{{ name }}</span>
              <div class="w-4 h-4" v-if="isVerified">
                <Check />
              </div>
            </div>
            <span class="text-xs leading-[10px] font-normal mt-2">{{
              location
            }}</span>
          </div>
        </div>
      </div>
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
      <span class="text-[#667085]">Minimum Investment</span>
      <span class="text-ellipsis text-end">${{ minimumInvestment }}</span>
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Minimum Duration</span>
      <span class="text-ellipsis text-end text-[#027A48]">{{
        minimumDuration
      }}</span>
    </div>
    <div class="flex flex-row gap-1">
      <button
        @click="handleInvestClick"
        class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none mt-2 px-[14px] py-[10px] font-medium flex items-center justify-center w-full"
      >
        <span> Invest </span>
      </button>
    </div>
  </div>
</template>
