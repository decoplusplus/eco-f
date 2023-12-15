<script setup>
const props = defineProps({
  projectTitle: {
    type: String,
    required: true,
  },
  capital: {
    type: Number,
    required: true,
  },
  profitsMade: {
    type: Number,
    required: true,
  },
  dailyInterest: {
    type: Number,
    required: true,
  },
  durationAsDays: {
    type: Number,
    required: true,
  },
  timeRemaining: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="bg-[#101828] rounded-lg p-5 w-full">
    <div class="flex w-full items-center justify-between text-white text-xs">
      <div class="flex flex-col">
        <div>Capital</div>
        <div class="font-medium text-xl mt-1">${{ capital }}</div>
      </div>
      <div class="flex flex-col">
        <div>Earnings</div>
        <div class="font-medium text-xl mt-1">
          ${{ profitsMade?.toFixed(2) }}
        </div>
      </div>
    </div>
    <div class="mt-3">
      <div
        class="flex w-full items-center justify-between text-white text-sm font-medium mb-2"
      >
        <span>Project</span>
        <span>{{ projectTitle }}</span>
      </div>
      <div
        class="flex w-full items-center justify-between text-white text-xs mb-2"
      >
        <span>Interest</span>
        <span class="px-2 py-1 rounded-2xl bg-[#00D99D]"
          >{{ dailyInterest }}% daily</span
        >
      </div>

      <div
        class="flex w-full items-center justify-between text-white text-xs mb-2"
      >
        <span>Period</span>
        <span class="">{{ durationAsDays }} days</span>
      </div>
      <button
        class="px-5 py-2 bg-[#00D99D80] text-white w-full mt-1 cursor-not-allowed rounded-lg font-medium text-xs"
      >
        {{ timeRemaining }} left
      </button>
    </div>
  </div>
</template>
