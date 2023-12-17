<template>
  <div class="bg-[#F9FAFB] rounded-lg p-5">
    <div
      class="flex items-center justify-between mt-2 gap-2 font-medium md:text-base text-sm w-full"
    >
      <span class="">Type</span>
      <span class="w-full text-ellipsis text-end">{{ type }}</span>
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Amount</span>
      <span class="text-ellipsis text-end px-2 py-1 rounded-2xl"
        >${{ amount }}</span
      >
    </div>
    <div
      v-if="fee"
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Fee</span>
      <span class="text-ellipsis text-end px-2 py-1 rounded-2xl"
        >${{ fee }}</span
      >
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Status</span>
      <span
        class="text-ellipsis text-end bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-2xl"
        >{{ status }}</span
      >
    </div>

    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Date</span>
      <span class="text-ellipsis text-end">{{
        moment(date).format("DD. MM. YYYY hh:mm A")
      }}</span>
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
</script>
