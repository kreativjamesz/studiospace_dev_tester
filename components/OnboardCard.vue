<script lang="ts" setup>
import type { PropType } from 'vue'

//import type { User } from '@/types'
//import OnboardCardHeader from '@/components/organisms/onboard/OnboardCardHeader.vue'

defineProps({
  title: {
    type: String
  },
  subtitle: {},
  /*user: {
    type: String as PropType<User>
  }*/
})
</script>

<template>
  <div class="onboard-card">
    <div class="onboard-card__header-wrapper" v-if="title && subtitle">
      <OnboardCardHeader class="onboard-card__header" v-if="title" :title="title"></OnboardCardHeader>
      <h2 v-if="subtitle" class="onboard-card__legend" v-html="subtitle"></h2>
    </div>
    <div class="onboard-card__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use 'sass:map'
@import '@/assets/css/all.sass'
.onboard-card
  width: 100%
  max-width: 68.4rem
  background-color: $white
  border-radius: $radius-02
  padding: 4rem
  box-sizing: content-box
  border: 0.08rem solid map.get($greyShades, 'greyShade10')

  @media (max-width: $ms-breakpoint)
    width: 100%
    min-height: 100%
    border: none
    box-shadow: none
    border-radius: 0
    flex-grow: 1

  &__header
    padding: 0

    &-wrapper
      margin-bottom: 3.2rem
      display: flex
      flex-direction: column
      gap: 0.8rem

  &__legend
    @include paragraph-01
    color: $primary
    line-height: 160%

  &__content
    display: flex
    flex-direction: column
    gap: 3.2rem

    @media (max-width: $ms-breakpoint)
      padding: $space-04
</style>
