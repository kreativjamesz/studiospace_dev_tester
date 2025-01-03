<template>
  <div class="welcome-page flex flex-col items-center justify-center h-screen">
    <OnboardSection>
      <template #title>
        <Logo />
      </template>
      <template #content>
        <OnboardCard>
          <template #content>
            <h1 class="text-3xl font-bold">Welcome, {{ username }}!</h1>
            <p>You are now logged in.</p>
            <CoreButton
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click="handleLogout"
              text="Logout"
            />
          </template>
        </OnboardCard>
      </template>
    </OnboardSection>
  </div>
</template>

<script lang="ts" setup>
import { useUserDataStore } from "@/stores/userDataStore";
import { useRouter } from "vue-router";

const userDataStore = useUserDataStore();
const router = useRouter();
const username = userDataStore.username;

const handleLogout = () => {
  userDataStore.$reset(); // Clear user data
  router.push("/"); // Redirect to login
};
</script>

<style></style>
