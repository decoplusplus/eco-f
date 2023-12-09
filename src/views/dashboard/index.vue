<script setup>
import useMainStore from "@/stores/user";
import TradeItemCard from "@/components/trade-item-card.vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification";

const { user, firstName, refLink } = storeToRefs(useMainStore());
const $toast = useToast();

const handleCopy = () => {
  navigator.clipboard.writeText(refLink.value);
  $toast.open({
    message: "referral link copied to clipboard",
    type: "success",
    position: "top",
  });
};
</script>

<template>
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
        <h4 class="md:text-sm text-xs text-[#667085]">Open trades</h4>
        <div class="font-semibold md:text-2xl text-xl mt-2">
          {{ user?.openTrades }}
        </div>
      </div>
      <div
        class="rounded-lg p-5 border-[#E4E7EC] border-[0.6px] lg:w-[calc(33%-8px)] md:w-[calc(50%-8px)] w-full"
      >
        <h4 class="md:text-sm text-xs text-[#667085]">My Refferals</h4>
        <div class="flex items-center justify-between">
          <div class="font-semibold md:text-2xl text-xl mt-2">
            {{ user?.balance }}
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
            @click="handleCopy"
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
    <div class="mt-4">
      <h3 class="font-medium md:text-lg text-base">
        Explore Sustainable Opportunities
      </h3>
      <p class="my-3 text-[#667085] max-w-lg w-full md:text-base text-sm">
        Discover a range of impactful green eco programs designed to align your
        investments with environmental sustainability.
      </p>
      <div class="mt-2">
        <div class="flex flex-row flex-wrap gap-2">
          <div class="lg:w-[calc(33%-8px)] md:w-[calc(50%-8px)] w-full">
            <trade-item-card />
          </div>
          <div class="lg:w-[calc(33%-8px)] md:w-[calc(50%-8px)] w-full">
            <trade-item-card />
          </div>
          <div class="lg:w-[calc(33%-8px)] md:w-[calc(50%-8px)] w-full">
            <trade-item-card />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
