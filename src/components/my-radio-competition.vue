<template>
  <my-radio
    v-model="formData.competionID"
    label="所属赛事"
    :list="competitionList"
    prop-name="title"
  />
  <my-radio
    v-for="(item, idx) in tableData"
    :key="item.id"
    v-model="formData.checked[idx]"
    :label="item.title"
    :list="item.labelValues"
    prop-name="val"
  />
</template>
<script setup>
  import { getList } from '@/api/competition'
  defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })
  const formData = reactive({
    competionID: null,
    checked: [],
  })
  const emit = defineEmits(['update:modelValue'])
  const click = (e) => {
    emit('update:modelValue', competitionList.value[e.index])
  }
  const competitionList = ref([])
  const tableData = computed(() => {
    let t = []
    if (formData.competionID) {
      t = competitionList.value.find(
        (item) => item.id === formData.competionID
      ).labels
    }
    t.forEach((item) => {
      if (item.labelValues[0].id !== 'all')
        item.labelValues.unshift({ id: 'all', val: '全部' })
    })

    console.log(t)
    return t
  })
  onMounted(async () => {
    const { data } = await getList({ withLabel: true, withLabelValue: true })
    competitionList.value = [{ id: 'all', title: '全部' }, ...data.list]
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
