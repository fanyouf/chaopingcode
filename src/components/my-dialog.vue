<template>
  <el-dialog
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="cTitle"
    width="500px"
    @close="close"
  >
    <el-form ref="formRef" :model="data" :rules="rules" label-position="top">
      <el-form-item :label="state.objectName + '名称'" prop="name">
        <el-input v-model="data.title" aria-placeholder="请输入" />
      </el-form-item>
      <el-form-item :label="state.objectName + '描述'" prop="intro">
        <el-input v-model="data.intro" aria-placeholder="请输入" />
      </el-form-item>
      <el-form-item
        v-if="cHasImage"
        :label="state.objectName + '图片'"
        prop="name"
      >
        <my-upload-image v-model="data.logo" />
      </el-form-item>
      <el-form-item label="显示排序" prop="order">
        <el-input-number v-model="data.order" :step="1" />
      </el-form-item>
      <el-form-item :label="state.objectName + '备注'" prop="remark">
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
  import { doAdd as doAddCourse, doEdit as editSubject } from '@/api/subject'
  import { gp } from '@gp'
  import {
    add as addKnowledgeGroup,
    put as editKnowledgeGroup,
  } from '@/api/knowledgeGroup'

  import { add as addKnowledge, put as editKnowledge } from '@/api/knowledge'

  const emit = defineEmits(['fetch-data'])

  const data = reactive({
    knowledgeGroupID: '',
    id: '',
    subjectID: '',
    title: '', // 标题
    intro: '', // 介绍
    logo: '', //
    remark: '', // 备注
    type: '',
    order: 1,
    state: true, // boolean
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
  const cTitle = computed(() => {
    return `${state.objectName}-${state.opName}`
  })
  const cHasImage = computed(() => {
    return ['科目', '赛事'].includes(state.objectName)
  })

  const showDialog = (
    objectName: OPObject = '目录',
    opName: OPType = '添加',
    row = null
  ) => {
    state.objectName = objectName
    state.opName = opName

    if (opName === '添加' && objectName === '目录') {
      data.subjectID = row.id
      data.title = ''
      data.id = null
    } else if (opName === '添加' && objectName === '科目') {
      data.id = null
      // data.title = ''
    } else if (opName === '添加' && objectName === '知识点') {
      data.title = ''
      data.intro = ''
      data.remark = ''
      data.order = 1
      data.knowledgeGroupID = row.id

      data.id = null
      data.subjectID = null
      data.state = null
    } else if (opName === '修改' && objectName === '知识点') {
      data.title = row.title
      data.intro = row.intro
      data.remark = row.remark
      data.order = row.order
      data.id = row.id

      data.knowledgeGroupID = null
      data.subjectID = null
      data.state = null
    } else if (opName === '修改' && objectName === '目录') {
      data.title = row.title
      data.intro = row.intro
      data.order = row.order
      data.remark = row.remark
      data.id = row.id
      data.subjectID = row.subject_id
    } else if (opName === '修改' && objectName === '科目') {
      data.title = row.title
      data.intro = row.intro
      data.order = row.order
      data.remark = row.remark
      data.id = row.id
      data.logo = row.logo
      data.subjectID = row.subjectID
    }

    visible.value = true
  }
  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }
  const doSave = async (data) => {
    if (state.objectName === '科目' && state.opName === '添加') {
      await doAddCourse(data)
    } else if (state.objectName === '目录' && state.opName === '添加') {
      await addKnowledgeGroup(data)
    } else if (state.objectName === '目录' && state.opName === '修改') {
      await editKnowledgeGroup(data)
    } else if (state.objectName === '知识点' && state.opName === '添加') {
      await addKnowledge(data)
    } else if (state.objectName === '知识点' && state.opName === '修改') {
      await editKnowledge(data)
    } else if (state.objectName === '科目' && state.opName === '修改') {
      await editSubject(data)
    }
    gp.$baseMessage(
      `${state.opName + state.objectName}成功`,
      'success',
      'vab-hey-message-success'
    )
    emit('fetch-data')
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await doSave(data)
        // $baseMessage(msg, 'success', 'vab-hey-message-success')
        // emit('fetch-data')
        close()
      }
    })
  }

  defineExpose({ showDialog })
</script>
