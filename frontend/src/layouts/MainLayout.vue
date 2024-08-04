<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { IonIcon, IonPage, IonRouterOutlet, useIonRouter } from "@ionic/vue";
import { personCircle, backspace } from "ionicons/icons";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

async function logout() {
  await auth.logout();
  await router.replace("/login");
}
</script>

<template>
  <ion-page>
    <ion-toolbar>
      <ion-button @click="logout()" slot="end">
        <ion-icon slot="icon-only" :icon="backspace"></ion-icon>
      </ion-button>
      <ion-title>Home</ion-title>
    </ion-toolbar>

    <ion-content>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>
