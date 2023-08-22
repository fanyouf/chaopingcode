<template>
  <div>
    <el-input v-if="!isEdit" :model-value="html" @focus="hFocus" />
    <my-wang-editor v-else v-model="html" @blur="isEdit = false" />
  </div>
</template>

<script setup lang="ts">
  import { watch, ref } from 'vue'

  const isEdit = ref(false)
  const html = ref('<p>123</p>')
  const props = defineProps<{
    modelValue: string
  }>()

  const emit = defineEmits(['update:modelValue'])
  watch(
    () => props.modelValue,
    (val) => {
      html.value = val
    }
  )

  watch(html, () => {
    emit('update:modelValue', html.value)
  })
  const hFocus = () => {
    isEdit.value = true
  }
</script>
