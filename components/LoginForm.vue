<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserDataStore } from "@/stores/userDataStore";

const username = ref("SuperAdministrator");
const password = ref("password123");
const auth = ref(Math.random().toString(36)); // Generate a base64 token
const userDataStore = useUserDataStore();
const router = useRouter();

const handleLogin = () => {
  userDataStore.save_login(username.value, auth.value); // Save credentials
  router.push("/welcome"); // Redirect to welcome page
};
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <div class="form-field">
      <span class="form-field__label">Username</span>
      <InputTextControl
        id="username"
        placeholder="Username"
        v-model="username"
      />
    </div>
    <br />
    <div class="form-field">
      <span class="form-field__label">Password</span>
      <InputTextControl
        id="password"
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <br />
    <ButtonWrapper>
      <template #floatLeft>
        <CoreButton text="Login"></CoreButton>
      </template>
    </ButtonWrapper>
  </form>
</template>

<style></style>
