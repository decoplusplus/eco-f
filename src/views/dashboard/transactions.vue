<template>
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <div>
      <h3 class="font-semibold md:text-2xl text-xl">Transactions</h3>
      <div class="mt-5">
        <TransactionCard />
      </div>
    </div>
  </main>
</template>
<script setup>
import TransactionCard from "@/components/dashboard/transaction-card.vue";
</script>
