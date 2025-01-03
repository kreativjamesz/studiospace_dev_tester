<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  title: {
    type: String
  }
})
</script>

<template>
  <div class="onboard-card-header">
    <h1 class="onboard-card-header__title">
      {{ title }}
    </h1>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/css/all.sass'
.onboard-card-header
  display: flex
  gap: $space-02
  align-items: center
  padding: $space-02 $space-04

  &__title
    @include heading-04-B
    color: $primary

    &::first-letter
      text-transform: capitalize
</style>
