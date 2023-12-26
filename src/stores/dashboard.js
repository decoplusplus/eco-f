import { defineStore } from "pinia";
import axios from "../service/axios";
import useMainStore from "./user";

const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    planTemplates: [],
    isFetchingPlanTemplates: false,
    runningInvestments: [],
    transactions: [],
    isFetchingTransactions: false,
    currentTransactionsPage: 1,
    totalTransactionsPages: 1,
    isFetchingRunningInvestments: false,
    selectedPlan: null,
    isMakingInvestment: false,
    isTransferingRefFunds: false,
    isGeneratingDepositAddress: false,
    isWithdrawing: false,
  }),
  actions: {
    async setSelectedPlan(plan) {
      this.selectedPlan = plan;
    },
    async withdraw({ amount, address }) {
      this.isWithdrawing = true;
      try {
        const { data } = await axios.post("/user/withdraw", {
          amount,
          address,
        });
        this.isWithdrawing = false;
        if (data?.status === "success") {
          const mainStore = useMainStore();
          mainStore.user = {
            ...mainStore.user,
            balance: data?.data?.balance?.toFixed(2),
          };
          return data;
        } else {
          throw data;
        }
      } catch (error) {
        this.isWithdrawing = false;
        throw error;
      }
    },

    async getPlanTemplates() {
      this.isFetchingPlanTemplates = true;
      try {
        const { data } = await axios.get("/company/all");
        if (data?.status === "success") {
          this.planTemplates = data?.data?.companies;
        }
      } catch (error) {
        console.log(error);
      }
      this.isFetchingPlanTemplates = false;
    },
    async generateDepositAddress() {
      this.isGeneratingDepositAddress = true;
      try {
        const { data } = await axios.post("/user/generate-address");
        this.isGeneratingDepositAddress = false;
        if (data?.status === "success") {
          const mainStore = useMainStore();
          mainStore.user = {
            ...mainStore.user,
            depositAddress: data?.data?.depositAddress,
          };
          return data;
        } else {
          throw data;
        }
      } catch (error) {
        console.log(error);
        this.isGeneratingDepositAddress = false;
        throw error;
      }
    },
    async makeInvestment({ amount, planId, duration }) {
      this.isMakingInvestment = true;
      try {
        const { data } = await axios.post(`/company/${planId}/start`, {
          amount,
          duration,
        });
        this.isMakingInvestment = false;
        if (data?.status === "success") {
          this.runningInvestments = [
            data?.data?.plan,
            ...this.runningInvestments,
          ];
          const mainStore = useMainStore();
          mainStore.user = {
            ...mainStore.user,
            balance: data?.data?.balance,
          };
          return data;
        } else {
          throw data;
        }
      } catch (error) {
        this.isMakingInvestment = false;
        throw error;
      }
    },
    async getRunningInvestments() {
      this.isFetchingRunningInvestments = true;
      try {
        const { data } = await axios.get("/user/investments/running");
        if (data?.status === "success") {
          this.runningInvestments = data?.data?.openInvestments;
        }
      } catch (error) {
        console.log(error);
      }
      this.isFetchingRunningInvestments = false;
    },
    async fetchTransactions() {
      this.isFetchingTransactions = true;
      try {
        const { data } = await axios.get("/transaction/all");
        if (data?.status === "success") {
          this.transactions = data?.data?.transactions;
        }
      } catch (error) {
        console.log(error);
      }
      this.isFetchingTransactions = false;
    },
    async transferRefFunds() {
      this.isTransferingRefFunds = true;
      try {
        const { data } = await axios.post("/user/transfer-ref-funds");
        this.isTransferingRefFunds = false;

        if (data?.status === "success") {
          const mainStore = useMainStore();
          mainStore.user = { ...mainStore.user, ...data?.data };
          return data;
        } else {
          throw data;
        }
      } catch (error) {
        this.isTransferingRefFunds = false;
        throw error;
      }
    },
  },
});

export default useDashboardStore;
