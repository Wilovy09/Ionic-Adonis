<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonInput,
  IonInputPasswordToggle,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

async function login() {
  try {
    const result = await auth.login(form);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  router.push("/");
}
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main class="flex justify-center items-center h-full">
        <form @submit.prevent="login()">
          <ion-card class="grid p-4">
            <ion-card-header>
              <ion-card-title>Login</ion-card-title>
              <ion-card-subtitle>Inicia sesión</ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              <ion-input
                v-model="form.email"
                label-placement="floating"
                placeholder="micorreo@gmail.com"
                class="mb-4"
              >
                <div slot="label">Correo</div>
              </ion-input>

              <ion-input
                v-model="form.password"
                type="password"
                label-placement="floating"
                placeholder="NeverGonnaGiveYouUp"
                class="mb-4"
              >
                <div slot="label" class="text-xl">Contraseña</div>
                <ion-input-password-toggle
                  slot="end"
                ></ion-input-password-toggle>
              </ion-input>
            </ion-card-content>

            <ion-button type="submit">Login</ion-button>
            <ion-text class="text-center"
              ><a href="/register"> No tienes cuenta? </a></ion-text
            >
          </ion-card>
        </form>
      </main>
    </ion-content>
  </ion-page>
</template>
