<script setup>
import { ref } from "vue";
import axios from "../../service/axios";
import { useToast } from "vue-toast-notification";
import Loader from "../../components/loader.vue";
import { useRouter } from "vue-router";

const isLoading = ref(false);
const $toast = useToast();

const formData = ref({
  email: "",
  password: "",
});

const login = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.post("/auth/login", formData.value);
    isLoading.value = false;

    if (data?.status !== "success") {
      $toast.open({
        message: data?.message ?? "Something went wrong",
        type: "error",
        position: "top",
      });
    } else {
      $toast.open({
        message: data?.message ?? "Logged in successfully",
        type: "success",
        position: "top",
      });
      window.location = window.location.origin;
    }
  } catch (error) {
    isLoading.value = false;
    $toast.open({
      message: error?.response?.data?.message ?? "Something went wrong",
      type: "error",
      position: "top",
    });
  }
};
</script>

<template>
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <div class="max-w-sm mx-auto w-full md:mt-5">
      <h3 class="font-semibold md:text-2xl text-xl">Log in</h3>
      <p class="md:text-sm text-xs mt-3 text-[#000000] opacity-50">
        Log in to your Ecoharvest account
      </p>
      <form action="#" @submit.prevent="login" class="mt-2">
        <div>
          <div class="mt-3">
            <input
              type="email"
              required
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Email address"
              v-model="formData.email"
            />
          </div>
          <div class="mt-3">
            <input
              type="password"
              required
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Password"
              v-model="formData.password"
            />
          </div>

          <div class="mt-3">
            <button
              :disabled="isLoading"
              class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none w-full px-[14px] py-[10px] font-medium flex items-center justify-center"
            >
              <span v-if="!isLoading"> Login </span>
              <div v-else class="w-4 h-4 flex items-center justify-center">
                <Loader />
              </div>
            </button>
          </div>
          <div class="mt-3 text-center w-full text-black md:text-sm text-xs">
            Don’t have an account?
            <router-link
              :to="{ name: 'register' }"
              class="text-[#00D99D] font-medium"
              >register</router-link
            >
          </div>
          <div class="mt-2 w-full text-center">
            <router-link
              :to="{ name: 'forgot-password' }"
              class="text-[#00D99D] md:text-sm text-xs"
              >Forgot password?</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
