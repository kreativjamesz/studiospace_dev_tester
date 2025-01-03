<script setup lang="ts"></script>

<template>
  <div class="btn-wrapper">
    <div class="btn-wrapper__float btn-wrapper__float--left">
      <slot name="floatLeft"></slot>
    </div>
    <div class="btn-wrapper__float btn-wrapper__float--center">
      <slot name="floatCenter"></slot>
    </div>
    <div class="btn-wrapper__float btn-wrapper__float--right">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/css/all.sass'
.btn-wrapper
  display: flex
  align-items: center
  justify-content: space-between

  &__float
    height: 100%
    display: flex
    gap: $space-03
</style>
