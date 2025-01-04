<script setup lang="ts">
const layout = "admin";
import { onMounted } from "vue";
import { useAgencyReport } from "@/composables/useAgencyReport";

const { fetchReport, report, isLoading, error } = useAgencyReport();
onMounted(() => {
  fetchReport();
});
</script>

<template>
  <NuxtLayout :name="layout">
    <div class="container mx-auto">
      <h1 class="text-3xl font-semibold text-gray-700 py-4">Agency Report</h1>
      <div v-if="isLoading" class="loading">Loading report...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="report grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card">
          <h3 class="text-xl font-semibold text-gray-700">AU</h3>
          <p class="text-3xl font-bold">{{ report.AU }}</p>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold text-gray-700">GB</h3>
          <p class="text-3xl font-bold">{{ report.GB }}</p>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold text-gray-700">US</h3>
          <p class="text-3xl font-bold">{{ report.US }}</p>
        </div>

        <div
          class="card flex bg-white shadow rounded-lg p-4 text-center w-full"
        >
          <h3 class="text-xl font-semibold text-gray-700">Other</h3>
          <p class="text-3xl font-bold">{{ report.Other }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
