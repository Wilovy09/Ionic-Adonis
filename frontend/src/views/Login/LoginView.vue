<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import VInput from "@/components/VInput.vue";
import VButton from "@/components/VButton.vue";
import VLoader from "@/components/VLoader.vue";
import { showErrorToast } from "@/helpers/swalFunctions";
import { authErrorHandler } from "@/helpers/authErrorsHandler";

const auth = useAuthStore();
const router = useRouter();
const loginMode = ref<"login" | "signup">("login");
const confirmPassword = ref("");
const isLoading = ref(false);

const form = ref({
  email: "",
  password: "",
});

async function login() {
  try {
    isLoading.value = true;
    const result = await auth.login(form);
    if (result.errors) throw result;
    if (result.errors) return;
    router.push("/");
  } catch (error: any) {
    authErrorHandler(error);
  } finally {
    isLoading.value = false;
  }
}

async function signup() {
  try {
    isLoading.value = true;
    if (!passwordsMatch()) {
      showErrorToast("The passwords dosent match");
      return;
    }
    const result = await auth.register(form);
    if (result.errors) throw result;
    router.push("/");
  } catch (error: any) {
    authErrorHandler(error);
  } finally {
    isLoading.value = false;
  }
}

function passwordsMatch() {
  if (form.value.password === confirmPassword.value) return true;
  return false;
}
</script>

<template>
  <main class="grid h-screen">
    <div class="flex justify-center items-center">
      <h1 class="text-center text-6xl">TEST</h1>
    </div>
    <form
      @submit.prevent="loginMode === 'login' ? login() : signup()"
      class="dropShadow bg-[#231e2a] rounded-tr-[40px] rounded-tl-[40px] px-6 flex flex-col justify-between"
    >
      <div class="flex-grow flex flex-col justify-center space-y-4">
        <h2 class="text-center text-3xl">
          {{ loginMode === "login" ? "Login" : "SignUp" }}
        </h2>
        <VInput v-model="form.email" type="email" labelText="Email" />
        <VInput
          v-model="form.password"
          type="password"
          labelText="Password"
          hasEye
        />
        <VInput
          v-if="loginMode === 'signup'"
          v-model="confirmPassword"
          type="password"
          labelText="Confirm password"
        />

        <p
          v-if="loginMode === 'login'"
          class="text-center hover:underline cursor-pointer"
        >
          I forgot my password
        </p>
      </div>
      <div class="mt-auto grid gap-4">
        <VButton type="submit" backgroundColor="primary" :disabled="isLoading">
          <template v-if="!isLoading">
            {{ loginMode === "login" ? "Login" : "SignUp" }}
          </template>
          <VLoader v-show="isLoading" />
        </VButton>

        <p
          @click="
            loginMode === 'signup'
              ? (loginMode = 'login')
              : (loginMode = 'signup')
          "
          class="text-center mb-4 hover:underline transition-all cursor-pointer"
        >
          {{ loginMode === "login" ? "I dont have account" : "I have account" }}
        </p>
      </div>
    </form>
  </main>
</template>

<style>
@keyframes move {
  0% {
    background-position: 0 0, 16px 16px;
  }
  100% {
    background-position: 32px 32px, 48px 48px;
  }
}

main {
  background-color: #231e2a;
  opacity: 0.8;
  background-image: radial-gradient(#ffffff 0.8px, transparent 0.8px),
    radial-gradient(#ffffff 0.8px, #231e2a 0.8px);
  background-size: 32px 32px;
  animation: move 2s linear infinite;
}

.dropShadow {
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.9));
}
</style>
