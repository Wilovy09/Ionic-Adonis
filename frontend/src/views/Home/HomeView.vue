<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { IonContent, IonPage } from "@ionic/vue";
import { type Task } from "@/entities/Task";
import VInput from "@/components/VInput.vue";

const authStore = useAuthStore();
const api = authStore.api;

const userTitle = ref("");
const userContent = ref("");
const userIsComplete = ref(false);
const tasks = ref<Task[]>([]);
const isModalOpen = ref(false);

async function getTasks() {
  try {
    tasks.value = await api("GET", "/tasks");
  } catch (error) {
    console.log(error);
  }
}

async function createTask() {
  try {
    const userId = await authStore.getUserID();
    await api("POST", "/tasks", {
      owner_id: userId,
      title: userTitle.value,
      content: userContent.value,
      isComplete: userIsComplete.value,
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  await getTasks();
});
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <div class="grid">
        <div v-if="tasks.length" v-for="task in tasks" :key="task.id">
          <div>{{ task.title }}</div>
          <div>{{ task.content }}</div>
          <div>{{ task.isComplete }}</div>
        </div>
        <div v-else>
          <p class="text-center text-3xl mt-4">No tasks</p>
        </div>
      </div>
      <div class="grid">
        <VInput v-model="userTitle" labelText="Title" type="text" />
        <VInput v-model="userContent" labelText="Content" type="text" />
        <input
          v-model="userIsComplete"
          type="checkbox"
          name="isComplete"
          id="isComplete"
        />
        <button @click="createTask()">Create Task</button>
      </div>
    </IonContent>
  </IonPage>
</template>
