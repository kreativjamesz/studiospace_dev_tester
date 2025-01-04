<template>
  <div class="flex justify-between items-center bg-gray-800 p-4">
    <Logo fill="white" class="w-[150px]" />
    <div class="flex items-center nav-links">
      <NuxtLink
        to="/welcome"
        class="text-white hover:text-gray-300 mr-4 text-2xl"
        active-class="text-blue-500"
        exact
        >Welcome</NuxtLink
      >
      <div class="separator text-white h-9 border-r border-white mr-4" />
      <NuxtLink
        to="/reports"
        class="text-white hover:text-gray-300 mr-4 text-2xl"
        active-class="text-blue-500"
        >Reports</NuxtLink
      >
    </div>
    <div class="flex items-center">
      <p class="text-white mr-4">{{ username }}</p>
      <CoreButton
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        text="Logout"
        @click="handleLogout"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserDataStore } from "@/stores/userDataStore";
const userDataStore = useUserDataStore();
const { username } = userDataStore;
const handleLogout = useHandleLogout();
</script>

<style></style>
