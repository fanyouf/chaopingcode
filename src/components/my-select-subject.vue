<template>
  <el-select :model-value="modelValue.id" @change="hChange">
    <el-option
      v-for="item in subjectList"
      :key="item.id"
      :label="item.title"
      :value="item.id"
    >
      {{ item.title }}
    </el-option>
  </el-select>
</template>
<script setup lang="ts">
  import { getList } from '@/api/subject'
  defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const hChange = (subjectId) => {
    const t = subjectList.value.find((item) => item.id === subjectId)
    emit('update:modelValue', t)
  }
  const subjectList = ref([])
  onMounted(async () => {
    const { data } = await getList()
    // isLoading.value = false
    if (data.list.length) {
      subjectList.value = data.list
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
