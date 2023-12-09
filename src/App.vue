<script setup>
import { storeToRefs } from "pinia";
import useMainStore from "./stores/user";
import UniversalLoader from "./components/universal-loader.vue";

const { isGettingUser, isFetchingInitialUser } = storeToRefs(useMainStore());
</script>
<template>
  <!-- <transition name="fade">
    <UniversalLoader v-if="isGettingUser && isFetchingInitialUser" />
    <RouterView v-else> </RouterView>
  </transition> -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <UniversalLoader v-if="isGettingUser && isFetchingInitialUser" />
      <div v-else>
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
