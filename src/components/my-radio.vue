<template>
  <div class="items-container">
    <label for="">{{ label }}:</label>
    <div class="items">
      <div
        v-for="item in list"
        :key="item.id"
        :class="{ selected: modelValue === item.id }"
        class="item"
        @click="emit('update:modelValue', item.id)"
      >
        {{ item[propName] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['update:modelValue'])

  type List = { title: string; id: number | string | null }[]
  withDefaults(
    defineProps<{
      propName: string
      modelValue: string | number | null
      list: List
      label: string
    }>(),
    {
      propName: 'title',
      label: '默认标题',
    }
  )
</script>

<style lang="scss">
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
