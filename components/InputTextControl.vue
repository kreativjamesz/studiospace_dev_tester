<script lang="ts" setup>
import { type PropType, ref, watch } from 'vue'

type InputType = 'text' | 'email' | 'password' | 'number'
type Size = 'small'
type Status = null | 'disabled' | 'validated' | 'error' | 'warning'
interface ModelValueType {
  valueTypes: string | number | null
}

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  status: {
    type: String as PropType<Status>
  },
  size: {
    type: String as PropType<Size>
  },
  name: {
    type: String
  },
  modelValue: {
    type: [String, null, Number] as PropType<ModelValueType['valueTypes']>,
    required: false
  },
  border: {
    type: Boolean,
    default: true
  },
  search: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    required: false
  }
})
const inputValue = ref<string | number | null>(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      inputValue.value = newValue
    }
  }
)
</script>

<template>
  <input
    :id="id"
    :maxlength="maxlength"
    :class="['input-control', status, size, border ? `input-control--border` : '', { 'input-control--search': search }]"
    :type="type"
    :disabled="status === 'disabled'"
    v-model="inputValue"
    @input="$emit('update:modelValue', inputValue)"
  />
</template>

<style lang="sass" scoped>
@use 'sass:map'
@import '@/assets/css/all.sass'
.input-control
  @include paragraph-01
  width: 100%
  height: 4.8rem
  color: $primary
  border-radius: 0.2rem
  padding: 1.6rem 1.2rem

  &--border
    border: 0.1rem solid map.get($greyShades, 'greyShade20')

  &::placeholder
    @include paragraph-01
    color: map.get($greyShades, 'greyShade60')

  &:hover,
  &:active,
  &:focus
    border-color: map.get($greyShades, 'greyShade70')

  &.disabled
    color: map.get($greyShades, 'greyShade60')
    border: 0.1rem solid map.get($greyShades, 'greyShade20')
    background-color: $background
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.5 4C5.5 2.61929 6.61929 1.5 8 1.5C9.38071 1.5 10.5 2.61929 10.5 4V6H11C12.1046 6 13 6.89543 13 8V12C13 13.1046 12.1046 14 11 14H5C3.89543 14 3 13.1046 3 12V8C3 6.89543 3.89543 6 5 6H5.5V4ZM9.5 4V6H6.5V4C6.5 3.17157 7.17157 2.5 8 2.5C8.82843 2.5 9.5 3.17157 9.5 4ZM5 7H5.5H6.5H9.5H10.5H11C11.5523 7 12 7.44772 12 8V12C12 12.5523 11.5523 13 11 13H5C4.44772 13 4 12.5523 4 12V8C4 7.44772 4.44772 7 5 7ZM7.5 8V12H8.5V8H7.5Z' fill='%230E1E36'/%3E%3C/svg%3E%0A")
    background-size: 1.6rem
    background-repeat: no-repeat
    background-position: calc(100% - 1.2rem) center

  &.validated
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.72066 7.87347C3.37462 8.30391 3.44304 8.93337 3.87348 9.2794L6.42217 11.3284C6.62901 11.4946 6.89348 11.5719 7.15731 11.5431C7.42114 11.5143 7.66269 11.3817 7.82876 11.1747L12.28 5.62577C12.6256 5.19496 12.5565 4.56558 12.1257 4.22C11.6949 3.87442 11.0655 3.9435 10.7199 4.37431L6.89508 9.14238L5.12659 7.72066C4.69616 7.37462 4.0667 7.44304 3.72066 7.87347Z' fill='%2314D88A'/%3E%3C/svg%3E%0A")
    background-size: 1.6rem
    background-repeat: no-repeat
    background-position: calc(100% - 1.2rem) center

  &.error
    border-color: #FD3A57

  &.small
    height: 3.4rem

  &--search
    background-image: url("data:image/svg+xml;utf8,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.40623 9.54167C8.779 10.1357 7.93205 10.5 7 10.5C5.067 10.5 3.5 8.933 3.5 7C3.5 5.067 5.067 3.5 7 3.5C8.933 3.5 10.5 5.067 10.5 7C10.5 7.93205 10.1357 8.77902 9.54166 9.40624C9.51666 9.42559 9.4926 9.44674 9.46966 9.46968C9.44672 9.49262 9.42558 9.51668 9.40623 9.54167ZM9.96543 11.0261C9.13577 11.6382 8.11013 12 7 12C4.23858 12 2 9.76142 2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 8.11014 11.6382 9.13578 11.0261 9.96545L13.5303 12.4697C13.8232 12.7626 13.8232 13.2375 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L9.96543 11.0261Z' fill='%230E1E36'/%3E%3C/svg%3E%0A")
    background-size: 1.6rem
    background-position-x: 1.6rem
    background-position-y: 50%
    background-repeat: no-repeat
    padding-left: calc(1.6rem + 1.6rem + 0.8rem)
</style>
