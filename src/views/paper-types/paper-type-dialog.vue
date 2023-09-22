<template>
  <el-dialog
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="cTitle"
    width="600px"
    @close="close"
  >
    <el-form ref="formRef" label-width="100px" :model="data" :rules="rules">
      <!-- label-position="top" -->
      <el-form-item label="类型名称" prop="name">
        <el-input :model-value="data.name" />
      </el-form-item>
      <el-form-item label="类型简介" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          aria-placeholder="请输入"
        />
      </el-form-item>

      <el-form-item label="显示顺序" prop="order">
        <el-input-number v-model="data.order" :step="1" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="data.remark" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import {
    add as doAddDirectiveGroup,
    put as doUpdateDirectiveGroup,
  } from '@/api/directiveGroup'
  import { gp } from '@gp'
  import {
    add as doAddDirective,
    put as doUpdateDirective,
  } from '@/api/directive'

  const emit = defineEmits(['fetch-data'])

  const data = reactive({
    id: '',
    name: '',
    intro: -1,
    order: 1,
    remark: '备注', // 备注
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
  const showDialog = (opName: OPType = '添加', row: any = {}) => {
    state.opName = opName

    if (opName === '添加') {
      data.id = null
    }
    cTitle.value = `试卷类型-${state.opName}`
    visible.value = true
  }
  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }
  const doSave = async (data) => {
    if (state.opName === '添加') {
      await doAddDirectiveGroup(data)
      emit('fetch-data')
    } else if (state.opName === '修改') {
      await doUpdateDirective(data)
      emit('fetch-data')
    }

    gp.$baseMessage(`${state.opName}成功`, 'success', 'vab-hey-message-success')
    close()
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await doSave(data)
      }
    })
  }

  defineExpose({ showDialog })
</script>
