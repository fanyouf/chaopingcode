<template>
  <my-radio v-model="subjectId" label="选择科目" :list="subjectList" />
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
    const t = subjectList.value.find((item) => item.id === newValue)
    emit('update:modelValue', t)
  })
  const subjectList = ref([])
  onMounted(async () => {
    const { data } = await getList()
    // isLoading.value = false
    if (data.list.length) {
      data.list.unshift({ id: null, title: '全部' })
      subjectList.value = data.list
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
