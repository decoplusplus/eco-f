<template>
  <div class="bg-[#F9FAFB] rounded-lg p-5">
    <div
      class="flex items-center justify-between mt-2 gap-2 font-medium md:text-base text-sm w-full"
    >
      <span class="">Type</span>
      <span class="w-full text-ellipsis text-end">Deposit</span>
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Amount</span>
      <span class="text-ellipsis text-end px-2 py-1 rounded-2xl">$10</span>
    </div>
    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Status</span>
      <span
        class="text-ellipsis text-end bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-2xl"
        >success</span
      >
    </div>

    <div
      class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
    >
      <span class="text-[#667085]">Date</span>
      <span class="text-ellipsis text-end">22. 03. 2022 09:41 AM</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  //   transactionType: {
  //     type: String,
  //     required: true,
  //   },
  //   transactionAmount: {
  //     type: String,
  //     required: true,
  //   },
  //   transactionDate: {
  //     type: String,
  //     required: true,
  //   },
  //   transactionStatus: {
  //     type: String,
  //     required: true,
  //   },
});
</script>
