<script setup>
import { ref } from "vue";
import axios from "../../service/axios";
import { useToast } from "vue-toast-notification";
import Loader from "../../components/loader.vue";
import { useRouter } from "vue-router";
import { useMeta } from "vue-meta";

useMeta({
  title: "Forgot Password",
  htmlAttrs: {
    lang: "en",
    amp: true,
  },
});

const isLoading = ref(false);
const $toast = useToast();
const router = useRouter();
const email = ref("");

const forgotPassword = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.post("/auth/forgot-password", {
      email: email.value,
    });
    isLoading.value = false;

    if (data?.status !== "success") {
      $toast.open({
        message: data?.message ?? "Something went wrong",
        type: "error",
        position: "top",
      });
    } else {
      $toast.open({
        message: data?.message ?? "Password reset link sent successfully",
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
      <h3 class="font-semibold md:text-2xl text-xl">Forgot password?</h3>
      <p class="md:text-sm text-xs mt-3 text-[#000000] opacity-50">
        A link will be sent to your email address
      </p>
      <form action="#" @submit.prevent="forgotPassword" class="mt-2">
        <div>
          <div class="mt-3">
            <input
              type="email"
              v-model="email"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Email address"
            />
          </div>
          <div class="mt-3">
            <button
              :disabled="isLoading"
              class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none w-full px-[14px] py-[10px] font-medium flex items-center justify-center"
            >
              <span v-if="!isLoading"> Proceed </span>
              <div v-else class="w-4 h-4 flex items-center justify-center">
                <Loader />
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
