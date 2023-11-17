<template>
  <my-radio
    v-model="subjectId"
    label="选择难度"
    prop-name="title"
    :list="list"
  />
</template>
<script setup>
  import { CONST_LEVEL_LIST } from '@/constant'
  const props = defineProps({
    all: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '0',
    },
  })
  const list = computed(() => {
    if (props.all) {
      return [
        {
          id: 'ALL',
          title: '全部',
        },
        ...CONST_LEVEL_LIST,
      ]
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const subjectId = ref('')
  watch(subjectId, (newValue) => {
    emit('update:modelValue', newValue)
  })
  onMounted(() => {
    subjectId.value = props.modelValue
  })
</script>
<style scoped lang="scss">
  .courseList {
    :deep() {
      .el-tabs__nav-wrap::after {
        height: 0 !important;
      }
    }
  }
</style>
