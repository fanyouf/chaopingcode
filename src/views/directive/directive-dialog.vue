<template>
  <el-dialog v-model="visible" :title="cTitle" width="500px" @close="close">
    <el-form ref="formRef" :model="data" :rules="rules" label-position="top">
      <el-form-item
        v-if="state.objectName === '指令分类'"
        label="选择科目"
        prop="subject"
      >
        <el-select v-model="data.subjectId" placeholder="请选择">
          <el-option
            v-for="item in subjects"
            :key="item.id"
            :value="item.id"
            :label="item.title"
          >
            {{ item.title }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="state.objectName + '名称'" prop="name">
        <el-input v-model="data.name" aria-placeholder="请输入" />
      </el-form-item>
      <el-form-item :label="state.objectName + '描述'" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          aria-placeholder="请输入"
        />
      </el-form-item>
      <el-form-item :label="state.objectName + '图片'" prop="intro">
        <MyUploadImge v-model="data.image" />
      </el-form-item>
      <el-form-item
        v-if="state.objectName === '指令分类'"
        :label="state.objectName + '类型'"
        prop="intro"
      >
        <el-radio-group v-model="data.type">
          <el-radio label="图片">图片</el-radio>
          <el-radio label="文字">文字</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示排序" prop="order">
        <el-input v-model.number="data.order" type="number" />
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
  // import MyUploadImge from './my-upload-imge.vue'
  import { doAdd as doAddCourse } from '@/api/course'
  const $baseMessage = inject('$baseMessage')

  const emit = defineEmits(['fetch-data'])

  const { list: subjects } = useSubject()

  const data = reactive({
    // id: '',
    subjectId: -1,
    name: '测试标题', // 标题
    intro: '', // 介绍
    type: '图片',
    image: '', // 指令的图片
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
  const cTitle = computed(() => {
    return `${state.objectName}-${state.opName}`
  })
  const showDialog = (
    objectName: OPObject = '目录',
    opName: OPType = '添加',
    subjectId = -1,
    row = null
  ) => {
    state.objectName = objectName
    state.opName = opName
    data.subjectId = subjectId
    if (row) {
      // data.id = row.id
      data.order = row.order || 1
      // data.title = row.title
    }

    if (opName === '添加') {
      // data.title = ''
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
    }
    $baseMessage('添加成功', 'success', 'vab-hey-message-success')
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
