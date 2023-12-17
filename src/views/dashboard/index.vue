<script setup>
import useMainStore from "@/stores/user";
import useDashboardStore from "@/stores/dashboard";
import InvestmentItemCard from "@/components/dashboard/investment-item-card.vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification";
import ActiveInvestmentCard from "@/components/dashboard/active-investment-card.vue";
import { onMounted, ref, watch } from "vue";
import Loader from "@/components/loader.vue";
import CopyIcon from "@/components/icons/copy.vue";
import Modal from "@/components/modal.vue";
import { useMeta } from "vue-meta";
const { user, firstName, refLink, isLoggedIn } = storeToRefs(useMainStore());

useMeta({
  title: "Dashboard",
  htmlAttrs: {
    lang: "en",
    amp: true,
  },
});

const $toast = useToast();
const fundModal = ref(null);
const investModal = ref(null);
const withdrawModal = ref(null);
const investAmount = ref(null);
const withdrawalAddress = ref(null);
const amountToWithdraw = ref(null);
const amountAfterDuration = ref(null);

const dashboardStore = useDashboardStore();
const {
  isFetchingPlanTemplates,
  isFetchingRunningInvestments,
  planTemplates,
  runningInvestments,
  selectedPlan,
  isMakingInvestment,
  isTransferingRefFunds,
  isGeneratingDepositAddress,
} = storeToRefs(dashboardStore);
const {
  generateDepositAddress,
  getPlanTemplates,
  getRunningInvestments,
  setSelectedPlan,
  makeInvestment,
  transferRefFunds,
} = dashboardStore;

const handleGenerateDepositAddress = () => {
  generateDepositAddress()
    .then((e) => {
      if (e?.status === "success") {
        $toast.open({
          message: "Address generated successfully",
          type: "success",
          position: "top",
        });
      } else {
        $toast.open({
          message: e?.message ?? "Something went wrong",
          type: "error",
          position: "top",
        });
      }
    })
    .catch((e) => {
      $toast.open({
        message: e?.response?.data?.message ?? "Something went wrong",
        type: "error",
        position: "top",
      });
    });
};

const handleInput = (e) => {
  investAmount.value = null;
  investAmount.value = Number(e.target.value.replace(/[^0-9]/g, ""));
};
const handleWithdrawInput = (e) => {
  amountToWithdraw.value = null;
  amountToWithdraw.value = Number(e.target.value.replace(/[^0-9]/g, ""));
};

const handleCopy = (itemToCopy) => {
  navigator.clipboard.writeText(itemToCopy);
  $toast.open({
    message: "Copied to clipboard",
    type: "success",
    position: "top",
  });
};

const toggleWithdrawModal = () => {
  withdrawModal?.value?.toggleModal?.();
};
const toggleFundModal = () => {
  fundModal?.value?.toggleModal?.();
};

const handleFundsTransfer = () => {
  transferRefFunds()
    .then((e) => {
      if (e?.status === "success") {
        $toast.open({
          message: "Transfer successful",
          type: "success",
          position: "top",
        });
      } else {
        $toast.open({
          message: e?.message ?? "Something went wrong",
          type: "error",
          position: "top",
        });
      }
    })
    .catch((e) => {
      $toast.open({
        message: e?.response?.data?.message ?? "Something went wrong",
        type: "error",
        position: "top",
      });
    });
};

const toggleInvestModal = ({ projectId }) => {
  investModal?.value?.toggleModal?.();
  if (projectId)
    setSelectedPlan(planTemplates.value.find((item) => item._id === projectId));
};

const handleInvestmentButtonClick = () => {
  makeInvestment({
    amount: investAmount.value,
    planId: selectedPlan.value._id,
  })
    .then((e) => {
      if (e?.status === "success") {
        $toast.open({
          message: "Investment successful",
          type: "success",
          position: "top",
        });
        investModal?.value?.toggleModal?.();
      }
    })
    .catch((e) => {
      $toast.open({
        message: e?.response?.data?.message ?? "Something went wrong",
        type: "error",
        position: "top",
      });
    });
};

watch(investAmount, (value) => {
  if (value && selectedPlan.value) {
    amountAfterDuration.value = (
      value +
      (selectedPlan?.value?.dailyInterestPercentage / 100) *
        value *
        selectedPlan?.value?.durationInDays
    ).toFixed(2);
  }
});

onMounted(() => {
  if (isLoggedIn.value === true && user.value?._id) {
    if (!planTemplates.value.length && !isFetchingPlanTemplates.value)
      getPlanTemplates();

    if (!runningInvestments.value.length && !isFetchingRunningInvestments.value)
      getRunningInvestments();
  }
});
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <h2 class="font-medium md:text-2xl text-xl text-[#101828]">
      Welcome back,
      <span class="font-semibold capitalize">{{ firstName }}</span>
    </h2>
    <p class="md:text-base text-sm text-[#667085] my-4">
      Manage your investments, earnings and assets here.
    </p>
    <div class="max-w-sm w-full flex items-center justify-between gap-2">
      <button
        @click="toggleFundModal"
        class="hover:opacity-90 transition-all duration-150 w-full rounded-lg border-[0.6px] border-[#D0D5DD] p-2 pointer flex items-center justify-center gap-2 flex-row"
      >
        <span
          ><svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49996 1.16667V12.8333M1.66663 7H13.3333"
              stroke="#344054"
              stroke-width="1.67"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span class="font-medium md:text-sm text-xs">Add Funds</span>
      </button>
      <button
        @click="toggleWithdrawModal"
        class="hover:opacity-90 transition-all duration-150 w-full rounded-lg border-[0.6px] text-white border-[#00D99D] bg-[#00D99D] p-2 pointer flex items-center justify-center gap-2 flex-row"
      >
        <span
          ><svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 12.3333L9.99997 9M9.99997 9L6.66663 12.3333M9.99997 9V16.5M16.9916 14.325C17.8044 13.8819 18.4465 13.1807 18.8165 12.3322C19.1866 11.4836 19.2635 10.536 19.0351 9.63891C18.8068 8.74179 18.2862 7.94626 17.5555 7.37787C16.8248 6.80948 15.9257 6.50061 15 6.5H13.95C13.6977 5.52436 13.2276 4.61861 12.5749 3.85082C11.9222 3.08304 11.104 2.47321 10.1817 2.06717C9.25943 1.66113 8.25709 1.46946 7.25006 1.50657C6.24304 1.54367 5.25752 1.80858 4.36761 2.28138C3.47771 2.75419 2.70656 3.42258 2.11215 4.23631C1.51774 5.05005 1.11554 5.98794 0.935783 6.97949C0.756025 7.97104 0.803388 8.99044 1.07431 9.96105C1.34523 10.9317 1.83267 11.8282 2.49997 12.5833"
              stroke="white"
              stroke-width="1.67"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span class="font-medium md:text-sm text-xs">Withdraw Funds</span>
      </button>
    </div>
    <div class="mt-4 flex flex-row flex-wrap gap-2">
      <div
        class="bg-[#00D99D] rounded-lg p-5 text-white lg:w-[calc(33%-8px)] md:w-[calc(50%-8px)] w-full"
      >
        <h4 class="md:text-sm text-xs">Wallet balance</h4>
        <div class="font-semibold md:text-2xl text-xl mt-2">
          ${{ user?.balance }}
        </div>
      </div>
      <div
        class="rounded-lg p-5 border-[#E4E7EC] border-[0.6px] lg:w-[calc(33%-8px)] md:w-[calc(50%-8px)] w-full"
      >
        <h4 class="md:text-sm text-xs text-[#667085]">Open investments</h4>
        <div class="font-semibold md:text-2xl text-xl mt-2">
          {{ user?.openInvestments }}
        </div>
      </div>
      <div
        class="rounded-lg p-5 border-[#E4E7EC] border-[0.6px] lg:w-[calc(33%-8px)] md:w-[calc(50%-8px)] w-full"
      >
        <div class="flex items-center justify-between">
          <h4 class="md:text-sm text-xs text-[#667085]">My Refferals</h4>
          <button
            :disabled="isTransferingRefFunds"
            @click="handleFundsTransfer"
            class="text-xs w-[145px] text-white rounded-lg bg-[#00D99D] outline-none px-[14px] py-[10px] font-medium flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span v-if="!isTransferingRefFunds"> Transfer to balance</span>
            <div v-else class="w-4 h-4 flex items-center justify-center">
              <Loader />
            </div>
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div class="font-semibold md:text-2xl text-xl mt-2">
            ${{ user?.referralBalance }}
          </div>
          <span class="text-[#1E1E1E7A] md:text-sm text-xs"
            >{{ user?.totalReferrals }} Referrals</span
          >
        </div>
        <div class="mt-2 flex items-center justify-between">
          <span class="md:text-sm text-xs">Ref link</span>
          <div
            id="refLinkWrapper"
            class="flex items-center cursor-pointer"
            @click="handleCopy(refLink)"
          >
            <span
              id="refLinkItem"
              class="text-[13px] leading-[16px] text-[#003d66] bg-[#F9FAFB] rounded-[6px] p-[5px] text-ellipsis max-w-[150px] overflow-hidden whitespace-nowrap"
              >{{ refLink }}</span
            ><button class="ml-[5px] outline-none border-none bg-transparent">
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
      </div>
    </div>
    <div class="mt-6 flex gap-4 md:flex-row flex-col-reverse">
      <div class="md:w-[60%] lg:w-[70%] w-full md:mt-0 mt-5">
        <h3 class="font-medium md:text-lg text-base">
          Explore Sustainable Opportunities
        </h3>
        <p class="my-3 text-[#667085] max-w-lg w-full md:text-base text-sm">
          Discover a range of impactful green eco programs designed to align
          your investments with environmental sustainability.
        </p>
        <div
          class="mt-2"
          v-if="user && !isFetchingPlanTemplates && planTemplates.length"
        >
          <div class="flex flex-row flex-wrap gap-2">
            <div
              class="lg:w-[calc(50%-8px)] w-full"
              v-for="item in planTemplates"
              :key="item._id"
            >
              <investment-item-card
                @invest-click="toggleInvestModal"
                :projectTitle="item.projectTitle"
                :minimumInvestment="item.minimumAmountToTrade"
                :duration="item.duration"
                :projectId="item._id"
                :dailyInterest="item.dailyInterestPercentage"
              />
            </div>
          </div>
        </div>
        <div
          class="mt-2 text-sm text-center bg-[#F9FAFB] p-5"
          v-else-if="user && !isFetchingPlanTemplates && !planTemplates.length"
        >
          no templates. check back later
        </div>
        <div
          class="mt-2 p-6 bg-[#F9FAFB] text-center flex items-center justify-center gap-1"
          v-else
        >
          <span class="text-sm">Fetching templates</span>
          <Loader />
        </div>
      </div>
      <div class="md:w-[40%] lg:w-[30%] w-full">
        <h3 class="font-medium md:text-lg text-base">Active Investments</h3>
        <p class="my-3 text-[#667085] max-w-lg w-full md:text-base text-sm">
          Explore your Active Investments. Witness your funds at work, actively
          contributing to sustainable projects.
        </p>
        <div
          class="mt-2"
          v-if="
            user && !isFetchingRunningInvestments && runningInvestments.length
          "
        >
          <div class="flex flex-row flex-wrap gap-2">
            <div
              class="w-full"
              v-for="item in runningInvestments"
              :key="item?._id"
            >
              <active-investment-card
                :capital="item?.principal"
                :project-title="item?.projectTitle"
                :profitsMade="item?.profitsMade"
                :durationAsDays="item?.durationAsDays"
                :timeRemaining="item?.timeRemaining"
                :dailyInterest="item?.dailyInterestPercentage"
              />
            </div>
          </div>
        </div>
        <div
          class="mt-2 text-sm text-center bg-[#F9FAFB] p-5"
          v-else-if="
            user && !isFetchingRunningInvestments && !runningInvestments.length
          "
        >
          you have no active investments
        </div>
        <div
          class="mt-2 p-6 bg-[#F9FAFB] text-center flex items-center justify-center gap-1"
          v-else
        >
          <span class="text-sm">Fetching investments</span>
          <Loader />
        </div>
      </div>
    </div>
  </main>
  <Modal ref="fundModal" :close-on-backdrop-click="!isGeneratingDepositAddress">
    <div>
      <div class="flex items-center justify-between">
        <h3 class="font-medium md:text-lg text-base">Add Funds</h3>
        <button
          @click="toggleFundModal"
          :disabled="isGeneratingDepositAddress"
          class="text-[#667085] text-sm"
        >
          Close
        </button>
      </div>

      <div class="mt-3">
        <div class="w-full" v-if="user?.depositAddress">
          <div
            class="address-section flex items-center justify-between w-full gap-5 my-3"
          >
            <span
              class="text-[#667085] text-base overflow-hidden w-[calc(100%-50px)] text-ellipsis whitespace-pre-wrap"
              >{{ user?.depositAddress }}</span
            >
            <button
              @click="handleCopy(user?.depositAddress)"
              class="outline-none border-none bg-transparent w-[25px] h-[25px]"
            >
              <CopyIcon />
            </button>
          </div>
          <div
            class="minimum-deposit-warning p-2 bg-[#f8d7da] text-[#58151c] border-[#f1aeb5] border rounded-lg"
          >
            <span class="text-[#667085] text-xs bg-ye">
              This is your deposit wallet address. You must only deposit USDT
              BEP20 to this address.<br />
              The minimum deposit is $1, any amount less than $1 will not be
              reflected in your account.
            </span>
          </div>
        </div>
        <div class="w-full" v-else>
          <button
            @click="handleGenerateDepositAddress"
            :disabled="isGeneratingDepositAddress"
            class="hover:opacity-90 transition-all duration-150 w-full rounded-lg border-[0.6px] text-white border-[#00D99D] bg-[#00D99D] p-2 pointer flex items-center justify-center gap-2 flex-row"
          >
            <span v-if="!isGeneratingDepositAddress">
              Generate deposit address
            </span>
            <div v-else class="w-4 h-4 flex items-center justify-center">
              <Loader />
            </div>
          </button>
        </div>
      </div>
    </div>
  </Modal>
  <Modal ref="withdrawModal">
    <div>
      <div class="flex items-center justify-between">
        <h3 class="font-medium md:text-lg text-base">Withdraw</h3>
        <button @click="toggleWithdrawModal" class="text-[#667085] text-sm">
          Close
        </button>
      </div>
      <form @submit.prevent class="w-full">
        <div class="mt-3">
          <input
            required
            :value="amountToWithdraw"
            @input="handleWithdrawInput"
            type="text"
            class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
            placeholder="Amount to withdraw"
          />
        </div>
        <div class="mt-3">
          <input
            required
            v-model="withdrawalAddress"
            type="text"
            class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
            placeholder="withdrawal address - usdt-bep20"
          />
        </div>
        <button
          class="text-xs text-white rounded-lg bg-[#00D99D] outline-none mt-3 px-[14px] py-[10px] font-medium flex items-center justify-center w-full"
        >
          Withdraw
        </button>
      </form>
    </div>
  </Modal>
  <Modal ref="investModal" :close-on-backdrop-click="!isMakingInvestment">
    <div class="">
      <div
        class="flex items-center justify-between mt-2 gap-2 font-medium md:text-base text-sm w-full"
      >
        <span class="">Project</span>
        <span class="w-full text-ellipsis text-end">{{
          selectedPlan?.projectTitle
        }}</span>
      </div>
      <div
        class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
      >
        <span class="text-[#667085]">Interest</span>
        <span
          class="text-ellipsis text-end bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-2xl"
          >{{ selectedPlan?.dailyInterestPercentage }}% daily</span
        >
      </div>
      <div
        class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
      >
        <span class="text-[#667085]">Minimum</span>
        <span class="text-ellipsis text-end"
          >${{ selectedPlan?.minimumAmountToTrade }}</span
        >
      </div>

      <div
        class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
      >
        <span class="text-[#667085]">Duration</span>
        <span class="text-ellipsis text-end text-[#027A48]">{{
          selectedPlan?.duration
        }}</span>
      </div>
      <div
        class="flex items-center justify-between mt-2 gap-2 md:text-sm text-xs w-full"
      >
        <span class="text-[#667085]"
          >Amount after {{ selectedPlan?.duration }}</span
        >
        <span class="text-ellipsis text-end" v-if="investAmount"
          >${{ amountAfterDuration }}</span
        >
      </div>
      <form @submit.prevent="handleInvestmentButtonClick" class="w-full">
        <div class="mt-3">
          <input
            required
            :value="investAmount"
            type="text"
            @input="handleInput"
            inputmode="numeric"
            pattern="[0-9]+"
            class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
            :placeholder="`Amount to invest (Min - $${selectedPlan?.minimumAmountToTrade})`"
          />
        </div>
        <button
          :disabled="
            !investAmount ||
            investAmount < selectedPlan?.minimumAmountToTrade ||
            isMakingInvestment
          "
          class="text-xs disabled:cursor-not-allowed disabled:opacity-70 text-white rounded-lg bg-[#00D99D] outline-none mt-3 px-[14px] py-[10px] font-medium flex items-center justify-center w-full"
        >
          <span v-if="!isMakingInvestment"> Invest </span>
          <div v-else class="w-4 h-4 flex items-center justify-center">
            <Loader />
          </div>
        </button>
      </form>
    </div>
  </Modal>
</template>
