<template>
  <el-dialog
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="cTitle"
    width="500px"
    @close="close"
  >
    <el-form ref="formRef" :model="data" label-position="top">
      <el-form-item label="属性值" prop="val">
        <el-input v-model="data.val" aria-placeholder="请输入" />
      </el-form-item>

      <el-form-item label="显示排序" prop="order">
        <el-input-number v-model="data.order" :step="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { addValue, putValue } from '@/api/label'
  import { gp } from '@gp'
  // import {
  //   add as doAddDirective,
  //   put as doUpdateDirective,
  // } from '@/api/directive'

  const emit = defineEmits(['fetch-data', 'view-directives'])

  const data = reactive({
    id: -1,
    labelID: -1, // 属性id
    order: 1,
    val: '',
    state: true,
  })
  const formRef = ref(null)
  const visible = ref(false)
  const state = reactive<{ opName: OPType; objectName: OPObject }>({
    opName: '添加', // 操作方式的名字： 编辑 or 添加
    objectName: '目录', // 操作对象的类型: 目录 or 知识点
  })
  const cTitle = ref('')
  const showDialog = (
    objectName: OPObject = '属性',
    opName: OPType = '添加',
    row: LabelValue
  ) => {
    state.objectName = objectName
    state.opName = opName

    if (opName === '添加' && objectName === '属性值') {
      data.id = null
      data.labelID = row.labelID
      data.order = 1
    } else if (opName === '修改' && objectName === '属性值') {
      data.id = row.id
      data.labelID = row.labelID
      data.order = row.order
      data.val = row.val
    }

    cTitle.value = `${state.objectName}-${state.opName}`
    visible.value = true
  }
  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }
  const doSave = async (data) => {
    if (state.objectName === '属性值' && state.opName === '添加') {
      await addValue(data)
      emit('fetch-data')
    } else if (state.objectName === '属性值' && state.opName === '修改') {
      await putValue(data)
      emit('fetch-data')
    }

    gp.$baseMessage(
      `${state.opName + state.objectName}成功`,
      'success',
      'vab-hey-message-success'
    )
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await doSave(data)
        close()
      }
    })
  }

  defineExpose({ showDialog })
</script>
