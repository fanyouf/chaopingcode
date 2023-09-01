<template>
  <div>
    <el-select v-model="matchName">
      <!-- <el-option label="信息素养大赛" value="信息素养大赛" /> -->
      <!-- <el-option label="GESP" value="GESP" /> -->
      <el-option
        v-for="item in competitionList"
        :key="item.label"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div>
      <div v-for="(item, idx) in cTableData" :key="idx" style="display: flex">
        <label for="" style="margin-right: 20px">{{ item.key }}:</label>
        <el-radio-group v-model="item.selected">
          <el-radio
            v-for="it in item.value"
            :key="it"
            :value="it"
            :label="it"
          />
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
      label: it.title,
      value: it.title,
    }))
    tableData.value = data.list.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.title]: cur.labels.map((i) => {
          return {
            key: i.title,
            value: i.labelValues.map((j) => j.val),
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
