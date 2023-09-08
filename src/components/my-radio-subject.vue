<template>
  <my-radio v-model="subjectId" label="选择科目" :list="courseList" />
</template>
<script setup>
  import { getList } from '@/api/subject'
  defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const subjectId = ref('')
  watch(subjectId, (newValue) => {
    emit('update:modelValue', newValue)
  })
  const courseList = ref([])
  onMounted(async () => {
    const { data } = await getList()
    // isLoading.value = false
    if (data.list.length) {
      data.list.unshift({ id: null, title: '全部' })
      courseList.value = data.list
      subjectId.value = data.list[0].id
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
