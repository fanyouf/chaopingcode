<template>
  <el-tabs
    class="courseList"
    :model-value="modelValue.title"
    @tab-click="click"
  >
    <el-tab-pane
      v-for="item in courseList"
      :key="item.id"
      :label="item.title"
      :name="item.title"
    />
  </el-tabs>
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
  const click = (e) => {
    console.log(e.index)
    emit('update:modelValue', courseList.value[e.index])
  }
  const courseList = ref([])
  onMounted(async () => {
    const { data } = await getList()
    courseList.value = data.list
    // isLoading.value = false
    if (data.list.length) {
      console.log(courseList.value[0])
      emit('update:modelValue', courseList.value[0])
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
