<template>
  <el-radio-group :model-value="modelValue.title">
    <el-radio-button
      v-for="(item, index) in competitionList"
      :key="item.id"
      :label="item.title"
      :name="item.title"
      @click="click({ index })"
    />
  </el-radio-group>
</template>
<script setup>
  import { getList } from '@/api/competition'
  defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const click = (e) => {
    emit('update:modelValue', competitionList.value[e.index])
  }
  const competitionList = ref([])
  onMounted(async () => {
    const { data } = await getList()
    competitionList.value = data.list
    // isLoading.value = false
    if (data.list.length) {
      console.log(competitionList.value[0])
      emit('update:modelValue', competitionList.value[0])
    }
  })
</script>
<style scoped lang="scss">
  .competitionList {
    :deep() {
      .el-tabs__nav-wrap::after {
        height: 0 !important;
      }
    }
  }
</style>
