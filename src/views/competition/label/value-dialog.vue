<template>
  <el-dialog v-model="visible" :title="cTitle" width="500px" @close="close">
    <el-form ref="formRef" :model="data" :rules="rules" label-position="top">
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
  import { addValue } from '@/api/label'
  import { gp } from '@gp'
  // import {
  //   add as doAddDirective,
  //   put as doUpdateDirective,
  // } from '@/api/directive'

  const emit = defineEmits(['fetch-data', 'view-directives'])

  const data = reactive({
    id: '',
    keyID: -1, // 属性id
    order: 1,
    val: '',
  })

  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
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
    row = {}
  ) => {
    state.objectName = objectName
    state.opName = opName

    if (opName === '添加' && objectName === '属性值') {
      data.id = null
      data.keyID = row.keyID
      data.order = 1
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
    }
    gp.$baseMessage(
      `${state.opName + state.objectName}成功`,
      'success',
      'vab-hey-message-success'
    )
    // emit('fetch-data')
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
