<script setup>
import { ref } from "vue";
import axios from "../../service/axios";
import { useToast } from "vue-toast-notification";
import Loader from "../../components/loader.vue";
import { useRouter } from "vue-router";

const isLoading = ref(false);
const $toast = useToast();
const router = useRouter();

const formData = ref({
  password: "",
  repeatPassword: "",
});

const handleResetPassword = async () => {
  try {
    if (
      !formData.value.password?.trim() ||
      !formData.value.repeatPassword?.trim()
    ) {
      $toast.open({
        message: "Please fill all fields",
        type: "error",
        position: "top",
      });
      return;
    }

    if (formData.value.password !== formData.value.repeatPassword) {
      $toast.open({
        message: "Passwords do not match",
        type: "error",
        position: "top",
      });
      return;
    }

    if (formData.value.password.length < 6) {
      $toast.open({
        message: "Password must be at least 6 characters",
        type: "error",
        position: "top",
      });
      return;
    }

    const token = router.currentRoute.value.params.token;
    const selector = router.currentRoute.value.params.selector;

    if (!token || !selector) {
      console.log(token, selector);
      $toast.open({
        message: "Invalid reset link",
        type: "error",
        position: "top",
      });
      return;
    }

    isLoading.value = true;
    const { data } = await axios.post(
      `/auth/reset-password/${selector}/${token}`,
      {
        password: formData.value.password,
        confirmPassword: formData.value.repeatPassword,
      }
    );
    isLoading.value = false;

    if (data?.status !== "success") {
      $toast.open({
        message: data?.message ?? "Something went wrong",
        type: "error",
        position: "top",
      });
    } else {
      $toast.open({
        message: data?.message ?? "Password reset successfully",
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
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <div class="max-w-sm mx-auto w-full md:mt-5">
      <h3 class="font-semibold md:text-2xl text-xl">Reset password</h3>
      <p class="md:text-sm text-xs mt-3 text-[#000000] opacity-50">
        input your new password
      </p>
      <form action="#" @submit.prevent="handleResetPassword" class="mt-2">
        <div>
          <div class="mt-3">
            <input
              type="password"
              required
              v-model="formData.password"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="New Password"
            />
          </div>
          <div class="mt-3">
            <input
              required
              type="password"
              v-model="formData.repeatPassword"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Repeat Password"
            />
          </div>

          <div class="mt-3">
            <button
              :disabled="isLoading"
              class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none w-full px-[14px] py-[10px] font-medium flex items-center justify-center"
            >
              <span v-if="!isLoading"> Reset password </span>
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
