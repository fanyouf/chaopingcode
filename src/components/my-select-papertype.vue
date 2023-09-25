<template>
  <el-select :model-value="modelValue.id" @change="hChange">
    <el-option
      v-for="item in papertypeList"
      :key="item.id"
      :label="item.title"
      :value="item.id"
    >
      {{ item.title }}
    </el-option>
  </el-select>
</template>
<script setup lang="ts">
  import { getList } from '@/api/paperType'
  defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const hChange = (subjectId) => {
    const t = papertypeList.value.find((item) => item.id === subjectId)
    emit('update:modelValue', t)
  }
  const papertypeList = ref([])
  onMounted(async () => {
    const { data } = await getList()
    // isLoading.value = false
    if (data.list.length) {
      papertypeList.value = data.list
    }
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
