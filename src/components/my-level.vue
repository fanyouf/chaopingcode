<template>
  <el-radio-group :model-value="modelValue" @change="change">
    <el-radio v-for="(item, key) in CONST_LEVEL" :key="key" :label="key">
      {{ item }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
  import { CONST_LEVEL } from '@/constant'
  const emit = defineEmits(['update:modelValue'])
  const change = (e) => {
    emit('update:modelValue', e)
  }
  withDefaults(
    defineProps<{
      modelValue: string
    }>(),
    {
      modelValue: 'medium',
    }
  )
</script>

<style lang="scss" scoped>
  .items-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    label {
      margin-right: 5px;
    }
    .items {
      display: flex;
      .item {
        padding: 6px;
        cursor: pointer;
        margin: 5px;
        border-radius: 4px;
      }
    }

    .selected {
      color: #fff;
      background-color: var(--el-color-primary);
    }
  }
</style>
