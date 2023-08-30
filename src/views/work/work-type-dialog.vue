<template>
  <el-dialog v-model="visible" :title="cTitle" width="500px" @close="close">
    <el-form ref="formRef" :model="data" :rules="rules" label-position="top">
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
      <el-form-item :label="state.objectName + '图片上传'" prop="intro">
        <my-upload-image v-model="data.cover" />
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
  import useSubject from '~/src/hooks/useSubject'
  import { add as addWorkCart, put as updateWorkCart } from '@/api/workCate'
  import { gp } from '@gp'

  const emit = defineEmits(['fetch-data'])

  const { list: subjects } = useSubject()

  const data = reactive<WorkCate>({
    id: -1,
    title: '',
    intro: '', // 介绍
    cover: '', // 指令的图片
    order: 1,
    state: true,
    subjectID: -1,
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
  const cTitle = computed(() => {
    return `${state.objectName}-${state.opName}`
  })
  const showDialog = (
    objectName: OPObject = '目录',
    opName: OPType = '添加',
    row: WorkCate = null
  ) => {
    state.objectName = objectName
    state.opName = opName
    if (opName === '修改' && objectName === '作品分类') {
      data.id = row.id
      data.title = row.title
      data.intro = row.intro // 介绍
      data.cover = row.cover // 指令的图片
      data.order = row.order
      data.remark = row.remark
      data.subjectID = row.subjectID
    } else if (opName === '添加' && objectName === '作品分类') {
      data.id = null

      data.subjectID = row.subjectID
      data.title = ''
      data.intro = '' // 介绍
      data.cover = '' // 图片
      data.order = 1
      data.remark = ''
    }
    visible.value = true
  }
  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }
  const doSave = async (data) => {
    if (state.objectName === '作品分类' && state.opName === '添加') {
      await addWorkCart(data)
    } else if (state.objectName === '作品分类' && state.opName === '修改') {
      await updateWorkCart(data)
    }
    gp.$baseMessage('添加成功', 'success', 'vab-hey-message-success')
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
