<script setup>
import Loader from "@/components/loader.vue";
import useMainStore from "@/stores/user";
import { storeToRefs } from "pinia";
import axios from "../../service/axios";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

import { useMeta } from "vue-meta";

useMeta({
  title: "Account Details",
  htmlAttrs: {
    lang: "en",
    amp: true,
  },
});

const { user, refLink } = storeToRefs(useMainStore());
const $toast = useToast();
const isLoading = ref(false);

const formData = ref({
  password: "",
  newPassword: "",
  repeatNewPassword: "",
});

const handleCopy = (itemToCopy) => {
  navigator.clipboard.writeText(itemToCopy);
  $toast.open({
    message: "Reflink Copied to clipboard",
    type: "success",
    position: "top",
  });
};

const updatePassword = () => {
  if (
    !formData.value.password?.trim() ||
    !formData.value.newPassword?.trim() ||
    !formData.value.repeatNewPassword?.trim()
  ) {
    $toast.open({
      message: "Please fill all fields",
      type: "error",
      position: "top",
    });
    return;
  }

  if (formData.value.newPassword !== formData.value.repeatNewPassword) {
    $toast.open({
      message: "Passwords do not match",
      type: "error",
      position: "top",
    });
    return;
  }

  if (formData.value.newPassword.length < 6) {
    $toast.open({
      message: "Password must be at least 6 characters",
      type: "error",
      position: "top",
    });
    return;
  }

  isLoading.value = true;
  axios
    .post("/auth/update-password", formData.value)
    .then(({ data }) => {
      isLoading.value = false;
      if (data?.status !== "success") {
        $toast.open({
          message: data?.message ?? "Something went wrong",
          type: "error",
          position: "top",
        });
      } else {
        $toast.open({
          message: data?.message ?? "Password updated successfully",
          type: "success",
          position: "top",
        });
        formData.value = {
          password: "",
          newPassword: "",
          repeatNewPassword: "",
        };
      }
    })
    .catch((error) => {
      isLoading.value = false;
      $toast.open({
        message: error?.response?.data?.message ?? "Something went wrong",
        type: "error",
        position: "top",
      });
    });
};
</script>
<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <div class="account-card w-full flex flex-col gap-[10px]">
      <div class="border-[#E4E7EC]">
        <div class="p-[1rem] border-b-[1px] border-[#E4E7EC]">
          <h4 class="text-[#101828] leading-[28px] text-[18px]">
            Account Details
          </h4>
          <span class="text-[#667085] leading-[20px] text-[14px]"
            >View your personal details here.</span
          >
        </div>
        <div
          class="flex items-center justify-between w-full border-b-[0.5px] border-[#6670851f] p-[1rem]"
        >
          <form action="" method="post" class="space-y-4 w-full">
            <div
              class="double-input flex items-center gap-[10px] md:flex-row flex-col"
            >
              <div class="flex flex-col w-full">
                <label class="text-sm">Name</label>
                <input
                  type="text"
                  readonly
                  class="mt-1 text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
                  :value="user.name"
                />
              </div>
              <div class="flex flex-col w-full">
                <label class="text-sm">Email</label>
                <input
                  type="text"
                  readonly
                  class="mt-1 text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
                  :value="user.email"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="border-[#E4E7EC] border-t-[1px]">
        <div class="ref-card-header p-[1rem] border-b-[1px] border-[#E4E7EC]">
          <h4 class="text-[#101828] leading-[28px] text-[18px]">Password</h4>
          <span class="text-[#667085] leading-[20px] text-[14px]">
            Update your password
          </span>
        </div>
        <div
          class="flex items-center justify-between w-full border-b-[0.5px] border-[#6670851f] p-[1rem]"
        >
          <form
            method="post"
            class="space-y-4 w-full"
            @submit.prevent="updatePassword"
          >
            <div class="flex flex-col w-full">
              <label for="password" class="text-sm">Old Password</label>
              <input
                type="password"
                id="password"
                name="password"
                v-model="formData.password"
                class="mt-1 text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="newPassword" class="text-sm">New Password</label>
              <input
                type="password"
                v-model="formData.newPassword"
                class="mt-1 text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="repeatNewPassword" class="text-sm"
                >Repeat New Password</label
              >
              <input
                type="password"
                v-model="formData.repeatNewPassword"
                class="mt-1 text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              />
            </div>

            <div class="flex items-center gap-[10px]">
              <button
                :disabled="isLoading"
                class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none px-[14px] py-[10px] font-medium flex items-center justify-center"
              >
                <span v-if="!isLoading"> Change Password </span>
                <div v-else class="w-4 h-4 flex items-center justify-center">
                  <Loader />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="card ref-card border-[#E4E7EC] border-t-[1px]">
        <div class="ref-card-header p-[1rem] border-b-[1px] border-[#E4E7EC]">
          <h4 class="text-[#101828] leading-[28px] text-[18px]">
            Refer and Earn
          </h4>
          <span class="text-[#667085] leading-[20px] text-[14px]"
            >Invite and earn 10% of their first deposit.</span
          >
        </div>
        <div>
          <div
            class="flex items-center justify-between w-full border-b-[0.5px] border-[#6670851f] p-[1rem]"
          >
            <div class="flex items-center">
              <span
                ><svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1333 5.14168C15.8 6.30001 16.95 8.14168 17.1833 10.2667"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M2.9082 10.3083C3.12487 8.19165 4.2582 6.34999 5.9082 5.18332"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M6.8252 17.45C7.79186 17.9417 8.89186 18.2167 10.0502 18.2167C11.1669 18.2167 12.2169 17.9667 13.1585 17.5084"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M10.0501 6.41664C11.3295 6.41664 12.3667 5.37944 12.3667 4.09998C12.3667 2.82052 11.3295 1.78331 10.0501 1.78331C8.77061 1.78331 7.7334 2.82052 7.7334 4.09998C7.7334 5.37944 8.77061 6.41664 10.0501 6.41664Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M4.02516 16.6C5.30462 16.6 6.34183 15.5628 6.34183 14.2834C6.34183 13.0039 5.30462 11.9667 4.02516 11.9667C2.7457 11.9667 1.7085 13.0039 1.7085 14.2834C1.7085 15.5628 2.7457 16.6 4.02516 16.6Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M15.9749 16.6C17.2543 16.6 18.2915 15.5628 18.2915 14.2834C18.2915 13.0039 17.2543 11.9667 15.9749 11.9667C14.6954 11.9667 13.6582 13.0039 13.6582 14.2834C13.6582 15.5628 14.6954 16.6 15.9749 16.6Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path></svg></span
              ><span
                class="ml-[5px] text-[14px] leading-[17px] opacity-[0.7] text-black"
                >Ref link</span
              >
            </div>
            <div id="refLinkWrapper" class="flex items-center cursor-pointer">
              <span
                id="refLinkItem"
                class="text-[13px] leading-[16px] text-[#003d66] bg-[#F9FAFB] rounded-[6px] p-[5px] text-ellipsis sm:max-w-max max-w-[150px] overflow-hidden whitespace-nowrap"
                >{{ refLink }}</span
              ><button
                @click="handleCopy(refLink)"
                class="ml-[5px] outline-none border-none bg-transparent"
              >
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      d="M12.0415 9.99166V12.1167C12.0415 14.95 10.9082 16.0833 8.07484 16.0833H5.38317C2.54984 16.0833 1.4165 14.95 1.4165 12.1167V9.425C1.4165 6.59166 2.54984 5.45833 5.38317 5.45833H7.50817"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M12.0416 9.99166H9.77497C8.07497 9.99166 7.5083 9.425 7.5083 7.72499V5.45833L12.0416 9.99166Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M8.2168 1.91667H11.0501"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M4.9585 4.04167C4.9585 2.86584 5.90766 1.91667 7.0835 1.91667H8.93933"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M15.5832 6.16667V10.5513C15.5832 11.6492 14.6907 12.5417 13.5928 12.5417"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M15.5835 6.16667H13.4585C11.8647 6.16667 11.3335 5.63542 11.3335 4.04167V1.91667L15.5835 6.16667Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div
            class="flex items-center justify-between w-full border-b-[0.5px] border-[#6670851f] p-[1rem]"
          >
            <div class="flex items-center">
              <span
                ><svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.55 2.09844L10.525 2.15678L8.1083 7.76511H5.7333C5.16663 7.76511 4.62497 7.88178 4.1333 8.09011L5.59163 4.60678L5.62497 4.52344L5.6833 4.39011C5.69997 4.34011 5.71663 4.29011 5.74163 4.24844C6.8333 1.72344 8.06663 1.14844 10.55 2.09844Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M15.0417 7.93178C14.6667 7.81512 14.2667 7.76512 13.8667 7.76512H8.1084L10.5251 2.15678L10.5501 2.09845C10.6751 2.14012 10.7917 2.19845 10.9167 2.24845L12.7584 3.02345C13.7834 3.44845 14.5001 3.89012 14.9334 4.42345C15.0167 4.52345 15.0834 4.61512 15.1417 4.72345C15.2167 4.84012 15.2751 4.95678 15.3084 5.08178C15.3417 5.15678 15.3667 5.23178 15.3834 5.29845C15.6084 5.99845 15.4751 6.85678 15.0417 7.93178Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M17.9346 11.832V13.457C17.9346 13.6236 17.9263 13.7903 17.9179 13.957C17.7596 16.8653 16.1346 18.332 13.0513 18.332H6.55127C6.35127 18.332 6.15127 18.3153 5.9596 18.2903C3.3096 18.1153 1.89294 16.6986 1.71794 14.0486C1.69294 13.857 1.67627 13.657 1.67627 13.457V11.832C1.67627 10.157 2.69294 8.7153 4.14294 8.0903C4.64294 7.88196 5.17627 7.7653 5.74294 7.7653H13.8763C14.2846 7.7653 14.6846 7.82363 15.0513 7.93196C16.7096 8.4403 17.9346 9.9903 17.9346 11.832Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5.5915 4.60678L4.13317 8.09011C2.68317 8.71511 1.6665 10.1568 1.6665 11.8318V9.39011C1.6665 7.02345 3.34984 5.04845 5.5915 4.60678Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M17.9322 9.38972V11.8314C17.9322 9.99805 16.7155 8.43972 15.0488 7.93972C15.4822 6.85638 15.6072 6.00638 15.3988 5.29805C15.3822 5.22305 15.3572 5.14805 15.3238 5.08138C16.8738 5.88138 17.9322 7.52305 17.9322 9.38972Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path></svg></span
              ><span
                class="ml-[5px] text-[14px] leading-[17px] opacity-[0.7] text-black"
                >Current earnings</span
              >
            </div>
            <div
              class="flex items-center text-[14px] leading-[17px] font-semibold"
            >
              ${{ user?.referralBalance }}
            </div>
          </div>
          <div
            class="flex items-center justify-between w-full border-b-[0.5px] border-[#6670851f] p-[1rem]"
          >
            <div class="flex items-center">
              <span
                ><svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.55016 11.4416C10.8434 11.4416 11.8918 10.3933 11.8918 9.09998C11.8918 7.80672 10.8434 6.75832 9.55016 6.75832C8.25689 6.75832 7.2085 7.80672 7.2085 9.09998C7.2085 10.3933 8.25689 11.4416 9.55016 11.4416Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M13.8751 16.8333C13.8751 14.8917 11.9418 13.3083 9.5501 13.3083C7.15843 13.3083 5.2251 14.8833 5.2251 16.8333"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M17.4998 10.4167C17.4998 14.7917 13.9582 18.3333 9.58317 18.3333C5.20817 18.3333 1.6665 14.7917 1.6665 10.4167C1.6665 6.04167 5.20817 2.5 9.58317 2.5C10.6748 2.5 11.7165 2.71666 12.6665 3.11666C12.5582 3.44999 12.4998 3.8 12.4998 4.16667C12.4998 4.79167 12.6748 5.38333 12.9832 5.88333C13.1498 6.16666 13.3665 6.42498 13.6165 6.64164C14.1998 7.17498 14.9748 7.5 15.8332 7.5C16.1998 7.5 16.5498 7.44165 16.8748 7.32498C17.2748 8.27498 17.4998 9.325 17.4998 10.4167Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M19.1667 4.16667C19.1667 4.43333 19.1333 4.69166 19.0667 4.94166C18.9917 5.27499 18.8583 5.6 18.6833 5.88333C18.2833 6.55833 17.6417 7.08331 16.875 7.32498C16.55 7.44165 16.2 7.5 15.8333 7.5C14.975 7.5 14.2 7.17497 13.6167 6.64164C13.3667 6.42497 13.15 6.16666 12.9833 5.88333C12.675 5.38333 12.5 4.79167 12.5 4.16667C12.5 3.8 12.5583 3.44999 12.6667 3.11666C12.825 2.63332 13.0917 2.20002 13.4417 1.84168C14.05 1.21668 14.9 0.833332 15.8333 0.833332C16.8167 0.833332 17.7083 1.25835 18.3083 1.94168C18.8417 2.53335 19.1667 3.31667 19.1667 4.16667Z"
                    stroke="#292D32"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M17.0751 4.14998H14.5918"
                    stroke="#292D32"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M15.8335 2.93335V5.42501"
                    stroke="#292D32"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path></svg></span
              ><span
                class="ml-[5px] text-[14px] leading-[17px] opacity-[0.7] text-black"
                >Total referrals</span
              >
            </div>
            <div
              class="flex items-center text-[#00000094] text-[14px] leading-[17px] font-semibold"
            >
              <span class="text-[#000000] font-medium">{{
                user?.totalReferrals
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.account-card {
  background: #fff;
  border: 1px solid #e4e7ec;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}
</style>
