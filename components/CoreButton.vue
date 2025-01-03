<script lang="ts" setup>
import type { PropType } from 'vue'

type Size = 'default' | 'small' | 'large'
type IconUse = 'none' | 'right' | 'left' | 'icon-only'
type ButtonStyle =
  | 'primary'
  | 'primary-alt'
  | 'primary-dia'
  | 'secondary'
  | 'secondary-dia'
  | 'tertiary'
  | 'tertiary-dia'
  | 'action-red'

defineProps({
  text: {
    type: String,
    default: ''
  },
  size: {
    type: String as PropType<Size>,
    default: 'default'
  },
  buttonStyle: {
    type: String as PropType<ButtonStyle>,
    default: 'primary'
  },
  iconUse: {
    type: String as PropType<IconUse>,
    default: 'none'
  },
  iconFill: {
    type: Boolean,
    default: false
  },
  icon: {},
  disabled: {
    type: Boolean,
    default: false
  },
  isResponsive: {
    type: Boolean,
    default: false
  },
  hasEllipses: {
    type: Boolean,
    default: false
  },
  hasBadge: {
    type: Boolean,
    default: false
  },
  badgeText: {
    type: String,
    default: ''
  },
  badgeColor: {
    type: String as PropType<'red'>,
    required: false
  }
})

const getIconStyle = (style: ButtonStyle) => {
  switch (style) {
    case 'primary':
    case 'primary-alt':
    case 'secondary-dia':
    case 'tertiary':
    case 'tertiary-dia':
      return 'dia'
    default:
      return 'default'
  }
}
</script>

<template>
  <button
    :class="[
      'button',
      `button--${size}`,
      `button--${buttonStyle}`,
      `button--${iconUse}`,
      { 'button--disabled': disabled },
      { 'button--responsive': isResponsive }
    ]"
    @click="$emit('onClick')"
  >
    <component
      v-if="iconUse === 'left'"
      :is="icon"
      :size="size === 'small' ? '16' : '24'"
      :icon-style="getIconStyle(buttonStyle)"
      :icon-fill="iconFill"
    />
    <span
      v-if="iconUse !== 'icon-only'"
      :class="[
        'button__text',
        `button__text--${size}`,
        { 'button__text--responsive': isResponsive },
        { 'button__text--ellipses': hasEllipses }
      ]"
      >{{ text }}</span
    >
    <span v-if="hasBadge" class="button__badge" :class="`button__badge--${badgeColor}`">{{ badgeText }} </span>
    <component
      v-if="iconUse === 'right' || iconUse === 'icon-only'"
      :is="icon"
      :size="size === 'small' ? '16' : '24'"
      :icon-style="getIconStyle(buttonStyle)"
      :icon-fill="iconFill"
    />
  </button>
</template>

<style lang="sass" scoped>
@use "sass:map"
@import '@/assets/css/all.sass'
.button
  height: 4rem
  display: flex
  gap: $space-01
  align-items: center
  justify-content: center
  border-radius: 2.4rem
  padding: 0.8rem 1.6rem
  white-space: nowrap
  cursor: pointer
  transition: all .2s

  &--disabled
    opacity: 0.5
    pointer-events: none

  &__text
    @include paragraph-01-B

    &--small
      @include paragraph-02-B

    &--responsive
      @media (max-width: $breakpoint-tablet-portrait)
        display: none

    &--ellipses
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

  &.button--icon-only
    aspect-ratio: 1/1
    padding: 0
    border-radius: 50%

  &--responsive
    @media (max-width: $breakpoint-tablet-portrait)
      aspect-ratio: 1/1
      padding: 0
      border-radius: 50%

  &--small
    height: 3.2rem
    padding: 0.8rem 1.6rem

  &--large
    height: 4.8rem
    padding: 1.6rem 2.4rem
    border-radius: 3.2rem

  &--primary
    color: $white
    background-color: $purple

    &:hover
      background-color: #5561EC

    &:active
      background-color: #434EDD

    &:disabled
      background-color: $purple-disabled

    &-alt
      color: $white
      background-color: $primary

      &:hover
        background-color: #26354A

      &:active
        background-color: $primary

    &-dia
      color: $primary
      background-color: $background

      &:hover
        background-color: $white

      &:active
        background-color: map.get($greyShades, 'greyShade20')

  &--secondary
    color: $primary
    background-color: transparent
    border: 0.1rem solid map.get($greyShades, 'greyShade60')

    &:hover
      border-color: $primary
      background-color: map.get($greyShades, 'greyShade10')

    &-dia
      color: $white
      border: 0.1rem solid $white
      background-color: transparent

      &:hover
        background-color: rgba($white, 0.1)

      &:active
        background-color: rgba($white, 0.2)

  &--tertiary
    color: $white
    background-color: rgba($white, 0.2)
    backdrop-filter: blur(20px)

    &:hover
      background-color: rgba($white, 0.5)

    &:active
      background-color: rgba($white, 0.8)

    &-dia
      color: $white
      background-color: rgba($primary, 0.2)
      backdrop-filter: blur(20px)

      &:hover
        background-color: rgba($primary, 0.5)

      &:active
        background-color: rgba($primary, 0.8)
  &--action-red
    color: $red
    border: 1px solid $red
    background-color: transparent
    &:hover
      background-color: map.get($greyShades, 'greyShade10')
  &__badge
    margin: 0 4px
    color: white
    text-align: center
    position: relative
    border-radius: 50%
    min-width: 2rem
    display: inline-flex
    align-items: center
    justify-content: center
    padding: 2px
    font-weight: bold
    &::after
      content: ''
      padding-top: 100%
      display: table

    &--red
      background-color: $pink
</style>
