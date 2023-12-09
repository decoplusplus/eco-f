<script setup></script>

<template>
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <h2 class="font-medium md:text-2xl text-xl text-[#101828]">
      Welcome back,
      <span class="font-semibold">Olivia</span>
    </h2>
    <p class="md:text-base text-sm text-[#667085] my-4">
      Manage your investments, earnings and assets here.
    </p>
    <div class="max-w-xs w-full flex items-center justify-between gap-2">
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
        <span>Add Funds</span>
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
        <span>Add Funds</span>
      </button>
    </div>
    <div class="mt-4 flex flex-row gap-2">
      <div class="bg-[#00D99D] rounded-lg p-5 text-white">
        <h4 class="md:text-sm text-xs w-96">Wallet balance</h4>
        <div class="font-semibold md:text-2xl text-xl mt-2">$2,420.00</div>
      </div>
      <div class="rounded-lg p-5 border-[#E4E7EC] border-[0.6px]">
        <h4 class="md:text-sm text-xs w-96 text-[#667085]">Wallet balance</h4>
        <div class="font-semibold md:text-2xl text-xl mt-2">$2,420.00</div>
      </div>
    </div>
  </main>
</template>
