<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen text-gray-600 body-font p-5"
  >
    <h2 class="md:text-9xl text-6xl font-bold text-red-500 animate-bounce">
      404
    </h2>
    <p class="mb-8 animate-pulse md:text-base text-sm text-center">
      Oops! The page you are looking for could not be found.
    </p>
    <router-link
      to="/"
      class="text-white text-base md:text-xl bg-[#00D99D] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded animate-bounce"
      >Go Home</router-link
    >
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped></style>
