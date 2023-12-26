import { defineStore } from "pinia";
import axios from "../service/axios";
const useCompanyStore = defineStore("company", {
  state: () => ({
    company: null,
    isFetchingCompany: false,
    isError: false,
  }),
  actions: {
    async getCompany(id) {
      this.isFetchingCompany = true;
      try {
        const { data } = await axios.get(`/company/${id}`);
        this.isFetchingCompany = false;
        if (data?.status === "success") {
          this.company = data?.data?.company;
          return data;
        } else {
          throw data;
        }
      } catch (error) {
        this.isFetchingCompany = false;
        throw error;
      }
    },
  },
});

export default useCompanyStore;
