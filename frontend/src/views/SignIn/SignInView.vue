<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonInput,
  IonInputPasswordToggle,
} from "@ionic/vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "../../router/index";

const auth = useAuthStore();

const form = ref({
  email: "",
  password: "",
});

async function createUser() {
  await auth.register(form);
  router.push("/");
}
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main class="flex justify-center items-center h-full">
        <form @submit.prevent="createUser()">
          <ion-card class="grid p-4">
            <ion-card-header>
              <ion-card-title>Creara cuenta</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              <ion-input
                v-model="form.email"
                label-placement="floating"
                label="Correo"
                placeholder="micorreo@gmail.com"
                class="mb-4"
              >
              </ion-input>

              <ion-input
                v-model="form.password"
                type="password"
                label-placement="floating"
                label="Contraseña"
                placeholder="NeverGonnaGiveYouUp"
                class="mb-4"
              >
                <ion-input-password-toggle
                  slot="end"
                ></ion-input-password-toggle>
              </ion-input>
            </ion-card-content>

            <ion-button type="submit">Crear cuenta</ion-button>
            <ion-text class="text-center"
              ><a href="/login"> Ya tienes cuenta? </a></ion-text
            >
          </ion-card>
        </form>
      </main>
    </ion-content>
  </ion-page>
</template>
