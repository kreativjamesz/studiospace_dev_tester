<script setup lang="ts"></script>

<template>
  <section class="onboard-section">
    <div class="onboard-section__header">
      <h1 class="onboard-section__title">
        <slot name="title"></slot>
      </h1>
      <slot name="progress"></slot>
    </div>
    <slot name="content"></slot>
  </section>
</template>

<style lang="sass" scoped>
@import '@/assets/css/all.sass'
.onboard-section
  width: 100%
  padding-bottom: 5rem
  padding-left: $space-06
  padding-right: $space-06
  display: flex
  flex-direction: column
  align-items: center

  @media (max-width: $breakpoint-tablet-portrait)
    padding: 0 $space-04
    min-height: calc(100vh - 7.2rem)

  &__header
    display: flex
    gap: $space-04
    flex-direction: column
    align-items: center
    justify-content: space-between
    margin: 4rem auto
    width: 100%
    max-width: 92rem

    @media (max-width: $breakpoint-tablet-portrait)
      text-align: left
      font-size: 3.2rem
      width: 100%
      max-width: 100%
      display: flex
      margin: 3.2rem auto
      padding: 0 1.6rem

  &__title
    @include display-hero-02
    color: $primary
    text-align: center

    &:only-child
      margin: auto

    @media (max-width: $breakpoint-tablet-portrait)
      text-align: center
      font-size: 3.2rem
</style>
