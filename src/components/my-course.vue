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
  import useCourse from '@/hooks/useCourse'

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
  // const activeName = ref('Scratch')
  const { list: courseList, isLoading } = useCourse()
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
