<template>
  <div class="bg-[#F9FAFB] rounded-lg shadow-lg p-5"></div>
</template>
<script setup>
const props = defineProps({
  transactionType: {
    type: String,
    required: true,
  },
  transactionAmount: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: String,
    required: true,
  },
  transactionStatus: {
    type: String,
    required: true,
  },
});
</script>
