<template>
  <NuxtLayout :name="layout">
    <div
      class="welcome-page flex flex-col items-center justify-center h-[calc(100vh-9rem)]"
    >
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
  </NuxtLayout>
</template>

<script lang="ts" setup>
const layout = "admin";
import { useUserDataStore } from "@/stores/userDataStore";
const handleLogout = useHandleLogout();
const userDataStore = useUserDataStore();
const username = userDataStore.username;
</script>

<style></style>
