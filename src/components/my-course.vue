<template>
  <el-tabs class="courseList" :model-value="modelValue" @tab-click="click">
    <el-tab-pane
      v-for="item in courseList"
      :key="item.id"
      :label="item.name"
      :name="item.name"
    />
  </el-tabs>
</template>
<script setup>
  defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const click = (e) => {
    console.log(e.index)
    emit('update:modelValue', courseList.value[e.index].name)
  }
  // const activeName = ref('Scratch')
  const courseList = ref([
    {
      id: 1,
      name: 'Scratch',
    },
    {
      id: 2,
      name: 'Python',
    },
    {
      id: 3,
      name: 'C++',
    },
    {
      id: 4,
      name: '数学',
    },
  ])
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
