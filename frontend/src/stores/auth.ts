import { ref, unref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));

  async function api(method: string, url: string, payload = {}) {
    const response = await fetch(`http://localhost:3333${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: method !== "GET" ? JSON.stringify(unref(payload)) : null,
    });
    return response.json();
  }

  function authentication(result: any) {
    token.value = result.token;
    if (token.value) localStorage.setItem("token", token.value);
  }

  async function login(payload: any) {
    const result = await api("POST", "/login", payload);
    authentication(result);
    setUserID();
    return result;
  }

  async function register(payload: any) {
    const result = await api("POST", "/register", payload);
    authentication(result);
    return result;
  }

  async function logout() {
    await api("DELETE", "/logut");
    clearUser();
  }

  async function me() {
    const result = await api("GET", "/me");
    user.value = result.user;
    return user.value;
  }

  async function setUserID() {
    const result = await api("GET", "/me");
    const userId = result.user.id;
    localStorage.setItem("userId", userId);
    return userId;
  }

  async function getUserID() {
    return localStorage.getItem("userId");
  }

  function clearUser() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  }

  return { user, token, login, register, logout, me, getUserID, api };
});
