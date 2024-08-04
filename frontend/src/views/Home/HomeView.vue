<script setup lang="ts">
import { onMounted, ref } from "vue";

const fetchedData = ref<{
  hello: string;
}>();

async function getData() {
  const url = "http://localhost:3333/";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    fetchedData.value = await response.json();
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await getData();
  console.log(fetchedData.value);
});
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1 v-if="fetchedData">{{ fetchedData.hello }}</h1>
    </ion-content>
  </ion-page>
</template>
