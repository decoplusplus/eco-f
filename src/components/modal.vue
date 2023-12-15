<script setup>
import { ref } from "vue";

const isOpened = ref(false);
const toggleModal = () => (isOpened.value = !isOpened.value);

const props = defineProps({
  closeOnBackdropClick: {
    type: Boolean,
    default: true,
  },
});

const handleBackDropClick = () => {
  if (!props.closeOnBackdropClick) return;
  toggleModal();
};

defineExpose({
  isOpened,
  toggleModal,
});
</script>

<template>
  <div
    :class="`fixed p-5 w-full h-full top-0 left-0 bottom-0 right-0  flex items-center bg-[#00000091] justify-center z-20 transition-all duration-300 ${
      isOpened
        ? 'visible opacity-100'
        : 'invisible opacity-0 pointer-events-none'
    }`"
    @click.self="handleBackDropClick"
  >
    <div class="bg-white rounded-lg shadow-lg p-5 sm:max-w-[400px] w-full">
      <slot />
    </div>
  </div>
</template>
