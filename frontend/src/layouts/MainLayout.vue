<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import {
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonRouterOutlet,
} from "@ionic/vue";
import { backspace } from "ionicons/icons";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

async function logout() {
  try {
    await auth.logout();
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <ion-button @click="logout()" slot="end">
          <ion-icon slot="icon-only" :icon="backspace"></ion-icon>
        </ion-button>
        <ion-title>Home</ion-title>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <ion-router-outlet></ion-router-outlet>
    </IonContent>
  </IonPage>
</template>
