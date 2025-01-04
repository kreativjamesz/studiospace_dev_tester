<template>
  <NuxtLayout :name="layout">
    <OnboardSection>
      <template #title>
        <Logo />
      </template>
      <template #content>
        <OnboardCard>
          <template #content>
            <LoginForm />
          </template>
        </OnboardCard>
      </template>
    </OnboardSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const layout = "auth";
</script>
