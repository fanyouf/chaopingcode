<template>
  <el-dialog v-model="visible" :title="cTitle" width="600px" @close="close">
    <el-form ref="formRef" label-width="100px" :model="data" :rules="rules">
      <!-- label-position="top" -->
      <el-form-item
        v-if="state.objectName === '指令分类'"
        label="当前科目"
        prop="subject"
      >
        {{ data.subjectTitle }}
        <!-- <el-select v-model="data.subjectID" placeholder="请选择">
          <el-option
            v-for="item in subjects"
            :key="item.id"
            :value="item.id"
            :label="item.title"
          >
            {{ item.title }}
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item :label="state.objectName + '名称'" prop="name">
        <el-input v-model="data.title" aria-placeholder="请输入" />
      </el-form-item>
      <el-form-item :label="state.objectName + '描述'" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          aria-placeholder="请输入"
        />
      </el-form-item>

      <el-form-item
        v-if="state.objectName === '指令分类'"
        :label="state.objectName + '类型'"
        prop="intro"
      >
        <el-radio-group v-model="data.type">
          <el-radio label="image">图片</el-radio>
          <el-radio label="text">文字</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="data.type === 'image'"
        :label="state.objectName + '图片'"
        prop="intro"
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
  import { objUnit } from '@/utils'
  import {
    add as doAddDirectiveGroup,
    put as doUpdateDirectiveGroup,
  } from '@/api/directiveGroup'
  import { gp } from '@gp'
  import {
    add as doAddDirective,
    put as doUpdateDirective,
  } from '@/api/directive'

  const emit = defineEmits(['fetch-data', 'view-directives'])

  const data = reactive({
    id: '',
    subjectTitle: '',
    directiveGroupID: -1,
    title: '',
    subjectID: -1,
    intro: '', // 介绍
    type: 'image', // image or text
    logo: '', // 指令的图片
    order: 1,
    state: false,
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
  const showDialog = (
    objectName: OPObject = '目录',
    opName: OPType = '添加',
    row: any = {}
  ) => {
    state.objectName = objectName
    state.opName = opName

    if (opName === '添加' && objectName === '指令分类') {
      data.id = null
      data.directiveGroupID = null
      data.title = ''
      data.intro = ''
      data.type = 'image'
      data.remark = ''
      data.order = 1
      data.state = true
      data.subjectID = row.subject_id
      data.subjectTitle = row.subjectTitle
    } else if (opName === '添加' && objectName === '指令') {
      data.subjectID = null
      data.id = null

      data.type = row.type

      data.title = ''
      data.intro = ''
      data.logo = data.type === 'image' ? '' : null
      data.remark = ''
      data.order = 1
      data.state = true
      data.directiveGroupID = row.id
    } else if (opName === '修改' && objectName === '指令') {
      data.subjectID = null

      data.id = row.id
      data.type = row.type

      data.title = row.title
      data.intro = row.intro
      data.logo = row.logo
      data.type = row.type
      data.remark = row.remark
      data.order = row.order
      data.state = true
      data.directiveGroupID = row.directiveGroupID
    } else if (opName === '修改' && objectName === '指令分类') {
      data.subjectID = row.subject
      data.id = row.id
      data.type = row.type

      data.title = row.title
      data.intro = row.intro
      data.logo = row.logo
      data.type = row.type
      data.remark = row.remark
      data.order = row.order
      data.state = true
      data.subjectTitle = row.subjectTitle
      data.directiveGroupID = row.directiveGroupID
    }

    cTitle.value = `${state.objectName}-${state.opName}`
    visible.value = true
  }
  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }
  const doSave = async (data) => {
    if (state.objectName === '指令分类' && state.opName === '添加') {
      await doAddDirectiveGroup(data)
      emit('fetch-data')
    } else if (state.objectName === '指令' && state.opName === '添加') {
      await doAddDirective(data)
      // 让页面跳转到详情页
      emit('view-directives', { id: data.directiveGroupID, title: data.title })
    } else if (state.objectName === '指令' && state.opName === '修改') {
      await doUpdateDirective(data)
      emit('fetch-data')
    } else if (state.objectName === '指令分类' && state.opName === '修改') {
      await doUpdateDirectiveGroup(data)
      emit('fetch-data')
    }
    gp.$baseMessage(
      `${state.opName + state.objectName}成功`,
      'success',
      'vab-hey-message-success'
    )
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
