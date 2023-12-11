import { defineStore } from "pinia";
import axios from "../service/axios";

const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    planTemplates: [],
    isFetchingPlanTemplates: false,
    runningInvestments: [],
    isFetchingRunningInvestments: false,
  }),
  actions: {
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
    async getRunningInvestments() {
      this.isFetchingRunningInvestments = true;
      try {
        const { data } = await axios.get("/user/investments/running");
        if (data?.status === "success") {
          this.runningInvestments = data?.data?.plans;
        }
      } catch (error) {
        console.log(error);
      }
      this.isFetchingRunningInvestments = false;
    },
  },
});

export default useDashboardStore;
