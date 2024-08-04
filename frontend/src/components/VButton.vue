<script setup lang="ts">
defineProps<{
  backgroundColor?: "primary" | "secondary" | "danger";
}>();
</script>
<template>
  <button
    class="font-normal disabled:opacity-50 disabled:cursor-not-allowed w-full rounded-lg duration-300 p-2 transition-all text-sm text-center"
    :class="{
      'text-white animated-color': backgroundColor === 'primary',
      'bg-gray-100 text-black hover:enabled:bg-gray-300':
        backgroundColor === 'secondary',
      'bg-red-500 text-white hover:enabled:bg-red-700':
        backgroundColor === 'danger',
    }"
  >
    <slot></slot>
  </button>
</template>

<style>
.animated-color {
  --bg-size: 400%;
  --color-one: #282033;
  --color-two: #322a3f;
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  animation: move-bg 8s infinite linear;

  &:hover {
    animation: none;
  }
}

@keyframes move-bg {
  to {
    background-position: var(--bg-size) 0;
  }
}
@media (prefers-reduced-motion: no-preference) {
  .boujee-text {
    animation: move-bg 8s linear infinite;
  }
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
}
</style>
