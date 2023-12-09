<template>
  <main class="p-5 max-w-[1300px] mx-auto w-full">
    <div class="max-w-sm mx-auto w-full md:mt-5">
      <h3 class="font-semibold md:text-2xl text-xl">Reset password</h3>
      <p class="md:text-sm text-xs mt-3 text-[#000000] opacity-50">
        input your new password
      </p>
      <form action="#" @submit.prevent class="mt-2">
        <div>
          <div class="mt-3">
            <input
              type="password"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="New Password"
            />
          </div>
          <div class="mt-3">
            <input
              type="password"
              class="text-xs text-[#667085] rounded-lg border-[0.6px] border-[#D0D5DD] outline-none w-full px-[14px] py-[10px]"
              placeholder="Repeat Password"
            />
          </div>

          <div class="mt-3">
            <button
              class="text-xs text-white rounded-lg bg-[#00D99D] outline-none w-full px-[14px] py-[10px] font-medium"
              placeholder="Confirm Password"
            >
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
