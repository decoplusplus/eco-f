<template>
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <div>
      <h3 class="font-semibold md:text-2xl text-xl">Transactions</h3>
      <div class="mt-3">
        <div v-if="user && !isFetchingTransactions && transactions.length">
          <div class="mb-2">
            <TransactionCard
              v-for="transaction in transactions"
              :key="transaction._id"
              :amount="transaction?.amount"
              :fee="transaction?.fee"
              :status="transaction?.status"
              :type="transaction?.type"
              :date="transaction?.date"
            />
          </div>
        </div>

        <div
          class="mt-2 text-sm text-center bg-[#F9FAFB] p-5"
          v-else-if="user && !isFetchingTransactions && !transactions.length"
        >
          no transactions. check back later
        </div>
        <div
          class="mt-2 p-6 bg-[#F9FAFB] text-center flex items-center justify-center gap-1"
          v-else
        >
          <span class="text-sm">Fetching transactions</span>
          <Loader />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import TransactionCard from "@/components/dashboard/transaction-card.vue";
import Loader from "@/components/loader.vue";
import useDashboardStore from "@/stores/dashboard";
import useUserStore from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const dashboardStore = useDashboardStore();

const { user, isLoggedIn } = storeToRefs(useUserStore());
const { transactions, isFetchingTransactions } = storeToRefs(dashboardStore);

const { fetchTransactions } = dashboardStore;

onMounted(() => {
  if (
    isLoggedIn.value &&
    user.value &&
    !transactions.value.length &&
    !isFetchingTransactions.value
  )
    fetchTransactions();
});
</script>
