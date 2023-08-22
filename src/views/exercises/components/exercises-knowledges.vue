<template>
  <div style="width: 500px">
    <el-input :value="cValue" @click="hFocus" />
    <el-dialog
      v-model="visible"
      title="选择知识点"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form>
        <el-form-item label="提交人">
          <el-input />
        </el-form-item>
        <el-form-item>
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="dataList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="姓名" width="120" />
        <el-table-column prop="intro" label="介绍" show-overflow-tooltip />
      </el-table>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="hSave">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { watch, ref, computed } from 'vue'

  const isEdit = ref(false)

  const props = defineProps<{
    modelValue: string
  }>()

  const emit = defineEmits(['update:modelValue'])
  const dataList = ref([
    { id: 1, title: 'a', intro: 'a' },
    { id: 2, title: 'b', intro: 'a' },
    { id: 3, title: 'c', intro: 'a' },
  ])
  const visible = ref(false)
  const multipleSelection = ref([])

  const handleSelectionChange = (val) => {
    console.log(val)
    multipleSelection.value = val
  }
  const hSave = () => {
    visible.value = false
    emit('update:modelValue', multipleSelection.value)
  }
  const cValue = computed(() => {
    return multipleSelection.value.reduce((acc, cur) => {
      return acc + cur.title
    }, '')
  })
  const hFocus = () => {
    visible.value = true
  }
</script>
