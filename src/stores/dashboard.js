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
  }),
  actions: {
    async setSelectedPlan(plan) {
      this.selectedPlan = plan;
    },
    async getPlanTemplates() {
      this.isFetchingPlanTemplates = true;
      try {
        const { data } = await axios.get("/plan/templates");
        if (data?.status === "success") {
          this.planTemplates = data?.data?.plans;
        }
      } catch (error) {
        console.log(error);
      }
      this.isFetchingPlanTemplates = false;
    },
    async makeInvestment({ amount, planId }) {
      this.isMakingInvestment = true;
      try {
        const { data } = await axios.post(`/plan/${planId}/start`, {
          amount,
        });
        this.isMakingInvestment = false;
        if (data?.status === "success") {
          this.runningInvestments = [
            data?.data?.plan,
            ...this.runningInvestments,
          ];
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
          console.log(this.transactions);
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
