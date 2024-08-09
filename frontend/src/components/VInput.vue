<script setup lang="ts">
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { ref } from "vue";

const props = defineProps<{
  modelValue: string | null;
  labelText: string;
  isDisabled?: boolean;
  type: "text" | "email" | "password";
  hasEye?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isPassword = ref(props.type === "password");
const showEye = props.hasEye && props.type === "password";

const togglePasswordVisibility = () => {
  isPassword.value = !isPassword.value;
};
</script>

<template>
  <div class="mt-3 relative">
    <label class="text-base">{{ labelText }}</label>
    <div class="flex">
      <input
        :type="isPassword ? 'password' : 'text'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as any).value)"
        v-bind="$attrs"
        :disabled="isDisabled"
        :class="{ 'text-base': isDisabled }"
        class="bg-[#1B1621] rounded-lg w-full p-2 pr-10"
      />
      <button
        v-if="showEye"
        type="button"
        @click="togglePasswordVisibility"
        class="-ml-8 mt-2"
      >
        <ion-icon
          v-if="isPassword"
          :icon="eyeOffOutline"
          class="text-2xl"
        ></ion-icon>
        <ion-icon v-else :icon="eyeOutline" class="text-2xl"></ion-icon>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
