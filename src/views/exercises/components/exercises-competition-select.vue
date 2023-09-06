<template>
  <div>
    <el-select v-model="matchName">
      <!-- <el-option label="信息素养大赛" value="信息素养大赛" /> -->
      <!-- <el-option label="GESP" value="GESP" /> -->
      <el-option
        v-for="item in competitionList"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </el-select>
    <div>
      <div v-for="(item, idx) in cTableData" :key="idx" style="display: flex">
        <label for="" style="margin-right: 20px">{{ item.key }}:</label>
        <el-radio-group v-model="item.selected" @change="hChange">
          <el-radio v-for="it in item.value" :key="it.id" :label="it.id">
            {{ it.value }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getList } from '@/api/competition'
  const props = defineProps<{
    modelValue: object
  }>()
  const matchName = ref('')

  onMounted(async () => {
    const { data } = await getList({ withLabel: true, withLabelValue: true })
    console.log('赛事', data.list)
    competitionList.value = data.list.map((it) => ({
      id: it.id,
      title: it.title,
    }))
    tableData.value = data.list.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.id]: cur.labels.map((i) => {
          return {
            key: i.title,
            value: i.labelValues.map((j) => ({ value: j.val, id: j.id })),
            selected: '',
          }
        }),
      }
    }, {})
    console.log(tableData.value)
  })

  const cTableData = computed(() => {
    return tableData.value[matchName.value] || []
  })

  const emit = defineEmits(['update:modelValue'])

  const hChange = () => {
    console.log(cTableData)
    emit('update:modelValue', {
      competitionID: matchName.value,
      labelValueIDs: cTableData.value.map((it) => it.selected),
    })
  }

  const tableData = ref({})
  const competitionList = ref([])
  //   {
  //   信息素养大赛: [
  //     {
  //       key: '年份',
  //       value: ['2022', '2023', '2024'],
  //       selected: '2022',
  //     },
  //   ],
  //   GESP: [
  //     {
  //       key: '年份',
  //       value: ['2023', '2024'],
  //       selected: '2024',
  //     },
  //     {
  //       key: '组别',
  //       value: ['stem', '省赛', '国赛'],
  //       selected: '省赛',
  //     },
  //   ],
  //   蓝桥杯: [
  //     {
  //       key: '年份',
  //       value: ['2021', '2023', '2024'],
  //       selected: '2023',
  //     },
  //   ],
  // }
</script>
