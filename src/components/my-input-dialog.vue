<template>
  <div class="container" style="width: 500px">
    <el-button size="small" class="btn" @click="visible = true">
      选择{{ name }}
    </el-button>
    <div>
      <el-tag
        v-for="(item, idx) in multipleSelection"
        :key="item.id"
        type="success"
        closable
        @close="hClose(idx)"
      >
        {{ item.title }}
      </el-tag>
    </div>
  </div>

  <el-dialog
    v-model="visible"
    :title="'选择' + name"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form>
      <el-form-item label="知识点">
        <el-input v-model.trim="keyword" style="width: 300px" />
        &nbsp;&nbsp;&nbsp;
        <el-button type="success">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="tableRef"
      :data="dataList"
      style="width: 100%; margin-top: 20px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
    </el-table>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="hSave">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { debug } from 'console'
  import { ElTable } from 'element-plus'
  import { Ref, watch, ref, computed } from 'vue'

  const props = defineProps<{
    getapiname: string
    getapi: () => Promise<any>
    name: string
    modelValue: []
    columns: { prop: string; label: string; width?: number }[]
  }>()
  const keyword = ref('')

  // const tableRef = ref<<InstanceType<ElTable>>(null)
  const tableRef: Ref<ElTable> = ref(null)

  const emit = defineEmits(['update:modelValue'])
  const dataList = ref([
    { id: 1, title: 'a', intro: 'a' },
    { id: 2, title: 'b', intro: 'a' },
    { id: 3, title: 'c', intro: 'a' },
  ])
  const visible = ref(false)
  const multipleSelection = ref([])
  onMounted(async () => {
    const res = await props.getapi()
    dataList.value = res.data.list
    console.log('加载数据....', res.data.list)
  })
  watch(
    () => multipleSelection,
    () => {
      emit('update:modelValue', multipleSelection.value)
    }
  )
  // tags上的删除按钮
  const hClose = (idx) => {
    // 它会自动触发 handleSelectionChange
    tableRef.value.toggleRowSelection(multipleSelection.value[idx], false)
  }

  const handleSelectionChange = (val) => {
    // console.log('handleSelectionChange', val)
    multipleSelection.value = val
  }

  const hSave = () => {
    visible.value = false
    emit('update:modelValue', multipleSelection.value)
  }
</script>

<style scoped>
  .container {
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btn {
    margin-right: 10px;
  }
</style>
