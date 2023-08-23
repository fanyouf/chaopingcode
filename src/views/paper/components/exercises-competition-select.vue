<template>
  <div>
    <el-select v-model="matchName">
      <el-option label="信息素养大赛" value="信息素养大赛" />
      <el-option label="GESP" value="GESP" />
      <el-option label="蓝桥杯" value="蓝桥杯" />
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
  const props = defineProps<{
    modelValue: object
  }>()
  const matchName = ref('')

  const cTableData = computed(() => {
    return tableData.value[matchName.value] || []
  })

  const emit = defineEmits(['update:modelValue'])

  const tableData = ref({
    信息素养大赛: [
      {
        key: '年份',
        value: ['2022', '2023', '2024'],
        selected: '2022',
      },
    ],
    GESP: [
      {
        key: '年份',
        value: ['2023', '2024'],
        selected: '2024',
      },
      {
        key: '组别',
        value: ['stem', '省赛', '国赛'],
        selected: '省赛',
      },
    ],
    蓝桥杯: [
      {
        key: '年份',
        value: ['2021', '2023', '2024'],
        selected: '2023',
      },
    ],
  })
</script>
