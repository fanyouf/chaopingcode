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
        <el-form-item label="知识点">
          <el-input v-model.trim="name" style="width: 300px" />
          &nbsp;&nbsp;&nbsp;
          <el-button type="success">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="dataList"
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="科目名称" width="120" />
        <el-table-column prop="title" label="知识点名称" width="120" />
        <el-table-column
          prop="intro"
          label="知识点介绍"
          show-overflow-tooltip
        />
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
  const name = ref('')

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
