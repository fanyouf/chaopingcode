<template>
  <section class="competition-add-container">
    <h3>添加作品</h3>
    <el-form ref="formRef" label-width="80px" :model="data" :rules="rules">
      <el-form-item label="作品名称" prop="name">
        <el-input
          v-model="data.name"
          style="width: 500px"
          aria-placeholder="请输入作品名称"
        />
      </el-form-item>
      <el-form-item label="作品编号" prop="code">
        <el-input
          v-model="data.code"
          style="width: 500px"
          aria-placeholder="请输入作品统一编号"
        />
      </el-form-item>
      <el-form-item label="作品简介" prop="intro">
        <el-input
          v-model="data.intro"
          style="width: 500px"
          aria-placeholder="请输入作品简介"
        />
      </el-form-item>
      <el-form-item label="作品亮点" prop="intro">
        <el-input
          v-model="data.points"
          style="width: 500px"
          aria-placeholder="请输入作品亮点"
        />
      </el-form-item>
      <el-form-item label="所属分类" prop="diff">
        <ExercisesKnowledges v-model="data.cate" />
      </el-form-item>
      <el-form-item label="作品图片" prop="intro">
        <my-upload-image v-model="data.logo" />
      </el-form-item>

      <el-form-item label="基础代码" prop="codeBaseUrl">文件上传</el-form-item>
      <el-form-item label="参考代码" prop="codeFinishedUrl">
        文件上传
      </el-form-item>

      <el-form-item label="代码行数" prop="codeRowNum">
        <el-input
          v-model.number="data.codeRowNum"
          style="width: 100px"
          type="number"
        />
      </el-form-item>

      <el-form-item label="效果演示" prop="netpage">
        <el-input
          v-model="data.previewUrl"
          placeholder="请效果演示的地址"
          style="width: 500px"
        >
          <template #prepend>Http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="相关知识点" prop="knowledges">
        <ExercisesKnowledges v-model="data.knowledges" />
      </el-form-item>

      <el-form-item label="相关指令" prop="directives">
        <ExercisesKnowledges v-model="data.diectives" />
      </el-form-item>

      <el-form-item label="涉及学科" prop="diff">
        <el-checkbox-group v-model="data.subject">
          <el-checkbox label="语文" name="type" />
          <el-checkbox label="数学" name="type" />
          <el-checkbox label="英语" name="type" />
          <el-checkbox label="物理" name="type" />
          <el-checkbox label="生物" name="type" />
          <el-checkbox label="化学" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="习题难度" prop="diff">
        <el-radio-group v-model="data.diff">
          <el-radio label="简单">简单</el-radio>
          <el-radio label="中等">中等</el-radio>
          <el-radio label="困难">困难</el-radio>
          <el-radio label="挑战">挑战</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="注意事项" prop="subjectContent">
        <ExercisesInput v-model="data.tips" />
      </el-form-item>

      <el-form-item label="作品备注" prop="remark">
        <el-input
          v-model="data.remark"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入作品备注"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
  import ExercisesInput from './components/exercises-input.vue'
  import ExercisesKnowledges from './components/exercises-knowledges.vue'
  import { doAdd as doAddCourse } from '@/api/course'
  const $baseMessage = inject('$baseMessage')

  const emit = defineEmits(['fetch-data'])

  const data = reactive({
    // id: '',
    name: '作品名字', // 标题
    title: '测试标题', // 标题
    code: 'xz001', // 作品编号
    intro: '', // 作品介绍
    points: '', // 作品亮点
    cate: '', // 作品分类
    logo: '', // 作品图片
    codeBaseUrl: '', // 作品基础代码
    codeFinishedUrl: '', // 作品完成代码
    codeRowNum: 10, // 代码行数
    previewUrl: 'www.baidu.com', // 效果演示地址
    knowledges: '', // 知识点
    diectives: '', // 相关指令
    subject: [], // 学科
    diff: 1, // 难度
    tips: '', // 注意事项
    remark: '备注', // 备注
  })

  setTimeout(() => {
    data.remark = 'ajax数据'
    console.log('ajax数据')
  }, 5000)
  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)
  const visible = ref(false)
  const state = reactive<{ opName: OPType; objectName: OPObject }>({
    opName: '添加', // 操作方式的名字： 编辑 or 添加
    objectName: '赛事', // 操作对象的类型: 目录 or 知识点
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
      // data.id = row.id
      data.order = row.order || 1
      data.title = row.title
    }

    if (opName === '添加') {
      data.title = ''
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

<style lang="scss" scoped>
  footer {
    // padding-left: 66px;
  }
  .competition-add-container {
    padding: 1em 0;
  }
</style>
