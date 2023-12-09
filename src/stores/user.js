import { defineStore } from "pinia";
import axios from "../service/axios";

const useMainStore = defineStore("main", {
  state: () => ({
    user: null,
    isLoggedIn: false,
    isGettingUser: false,
    fetchedInitialUser: false,
    isFetchingInitialUser: false,
  }),
  actions: {
    async getUserDetails() {
      this.isGettingUser = true;

      if (!this.fetchedInitialUser) {
        this.isFetchingInitialUser = true;
      }

      try {
        const { data } = await axios.get("/user");
        if (data?.status === "success") {
          this.isLoggedIn = true;
          this.user = data.data;
        }
      } catch (error) {
        console.log(error);
      }
      this.isGettingUser = false;
      if (!this.fetchedInitialUser) {
        this.fetchedInitialUser = true;
        this.isFetchingInitialUser = false;
      }
    },
  },
  getters: {
    firstName() {
      return this.user?.name?.split(" ")[0];
    },
    refLink() {
      return `${window.location.origin}/auth/register/?ref=${this.user?.refCode}`;
    },
  },
});
export default useMainStore;
