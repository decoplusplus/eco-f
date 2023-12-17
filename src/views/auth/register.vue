<script setup>
import { ref } from "vue";
import axios from "../../service/axios";
import { useToast } from "vue-toast-notification";
import Loader from "../../components/loader.vue";
import { useRouter } from "vue-router";
import { useMeta } from "vue-meta";

useMeta({
  title: "Register",
  htmlAttrs: {
    lang: "en",
    amp: true,
  },
});

const isLoading = ref(false);
const $toast = useToast();
const router = useRouter();

const formData = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const register = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.post("/auth/register", formData.value);
    isLoading.value = false;

    if (data?.status !== "success") {
      $toast.open({
        message: data?.message ?? "Something went wrong",
        type: "error",
        position: "top",
      });
    } else {
      $toast.open({
        message: data?.message ?? "Registered successfully",
        type: "success",
        position: "top",
      });
      router.push({ name: "login" });
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
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <div class="max-w-sm mx-auto w-full md:mt-5">
      <h3 class="font-semibold md:text-2xl text-xl">Register</h3>
      <p class="md:text-sm text-xs mt-3 text-[#000000] opacity-50">
        Join EcoHarvest Capitals for Green Investments!
      </p>
      <form action="#" @submit.prevent="register" class="mt-2">
        <div>
          <div class="mt-3">
            <input
              required
              type="text"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Full name"
              v-model="formData.name"
            />
          </div>
          <div class="mt-3">
            <input
              required
              type="email"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Email address"
              v-model="formData.email"
            />
          </div>
          <div class="mt-3">
            <input
              required
              type="password"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Password"
              v-model="formData.password"
            />
          </div>
          <div class="mt-3">
            <input
              required
              type="password"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Confirm Password"
              v-model="formData.confirmPassword"
            />
          </div>
          <div class="mt-3">
            <button
              :disabled="isLoading"
              class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none w-full px-[14px] py-[10px] font-medium flex items-center justify-center w-full"
            >
              <span v-if="!isLoading"> Register </span>
              <div v-else class="w-4 h-4 flex items-center justify-center">
                <Loader />
              </div>
            </button>
          </div>
          <div class="mt-3 text-center w-full text-black md:text-sm text-xs">
            Already have an account?
            <router-link
              :to="{ name: 'login' }"
              class="text-[#00D99D] font-medium"
              >login</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
