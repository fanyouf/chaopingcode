<template>
  <el-dialog v-model="visible" :title="cTitle" width="500px" @close="close">
    <el-form ref="formRef" :model="data" :rules="rules" label-position="top">
      <el-form-item :label="state.objectName + '名称'" prop="name">
        <el-input v-model="data.name" aria-placeholder="请输入" />
      </el-form-item>
      <el-form-item :label="state.objectName + '描述'" prop="intro">
        <el-input v-model="data.intro" aria-placeholder="请输入" />
      </el-form-item>
      <el-form-item :label="state.objectName + '图片'" prop="name">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <!-- :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList" -->
          <el-button size="small" type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传 jpg/png 文件，且不超过 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="显示排序" prop="order">
        <el-input v-model="data.order" type="number" />
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
  import { doEdit } from '@/api/knowledge'

  // export default defineComponent({
  //   name: 'PythonEdit',
  // emits: ['fetch-data'],
  // setup(props, { emit }) {
  const $baseMessage = inject('$baseMessage')

  const data = reactive({
    id: '',
    order: 1,
    name: '', // 名称
    intro: '', // 介绍
    logo: '', //
    remark: '', // 备注
  })
  const rules = {
    dircName: [{ required: true, trigger: 'blur', message: '请输入标题' }],
    knowName: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)
  const visible = ref(false)
  const state = reactive<{ opName: string; objectName: OPObject }>({
    opName: '', // 操作方式的名字： 编辑 or 添加
    objectName: '目录', // 操作对象的类型: 目录 or 知识点
  })
  const cTitle = computed(() => {
    return `${state.objectName}-${state.opName}`
  })
  const showDialog = (
    objectName: OPObject = '目录',
    opName: OPType = '添加',
    row = null
  ) => {
    state.objectName = objectName
    state.opName = opName
    if (row) {
      data.id = row.id
      data.order = row.order || 1
      data.dircName = row.dircName
      data.knowName = row.knowName
    }

    if (opName === '添加') {
      data.dircName = data.knowName = ''
    }

    visible.value = true
  }
  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await doEdit(data)
        // $baseMessage(msg, 'success', 'vab-hey-message-success')
        // emit('fetch-data')
        close()
      }
    })
  }

  defineExpose({ showDialog })

  //     return {
  //       ...toRefs(state),
  //       showDialog,
  //       close,
  //       save,
  //     }
  //   },
  // })
</script>
