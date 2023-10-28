<template>
  <section class="competition-add-container">
    <h3>添加教学单元</h3>
    <el-form ref="formRef" label-width="80px" :model="data" :rules="rules">
      <el-form-item label="单元名称" prop="title">
        <el-input
          v-model="data.title"
          style="width: 500px"
          aria-placeholder="请输入教学单元名称"
        />
      </el-form-item>
      <el-form-item label="单元描述" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入教学单元描述"
        />
      </el-form-item>
      <el-form-item label="封面图片" prop="cover">
        <my-upload-image v-model="data.cover" />
      </el-form-item>
      <el-form-item label="教学目标">
        <el-tabs type="card">
          <el-tab-pane label="知识与技能">
            <my-wang-editor v-model="data.targetOne" />
          </el-tab-pane>
          <el-tab-pane label="过程与方法">
            <my-wang-editor v-model="data.targetTwo" />
          </el-tab-pane>
          <el-tab-pane label="情感态度与价值观">
            <my-wang-editor v-model="data.targetThree" />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="教学重点" prop="focus">
        <el-input
          v-model="data.focus"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入教学重点"
        />
      </el-form-item>
      <el-form-item label="教学难点" prop="difficulty">
        <el-input
          v-model="data.difficulty"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入教学难点"
        />
      </el-form-item>
      <!-- <el-form-item label="相关知识" prop="knowledges">
      </el-form-item> -->
      <my-knowledges v-model="data.knowledgeIDs" :subject="curSubject" />
      <el-form-item label="建议时长" prop="duration">
        <el-input-number v-model="data.duration" :step="1" />
      </el-form-item>
      <el-form-item label="教学流程">
        <el-tabs type="card">
          <el-tab-pane label="1.情景引入">
            <my-wang-editor v-model="data.flowOne" />
          </el-tab-pane>
          <el-tab-pane label="2.思维构建">
            <my-wang-editor v-model="data.flowTwo" />
          </el-tab-pane>
          <el-tab-pane label="3.创作实践">
            <my-wang-editor v-model="data.flowThree" />
          </el-tab-pane>
          <el-tab-pane label="4.总结与思考">
            <my-wang-editor v-model="data.flowFour" />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="选用作品" prop="knowledges">
        <my-works v-model="data.productIDs" :subject="curSubject" />
      </el-form-item>

      <el-form-item label="教学PPT" prop="ppt">
        <my-upload-file v-model="data.ppt" tip="上传PPT" />
      </el-form-item>

      <el-form-item label="课后练习" prop="questionIDs">
        <my-input-dialog
          v-model="data.questionIDs"
          name="课后练习"
          getapiname="name"
          :getapi="getList"
          :columns="[
            { label: '知识点1', prop: 'name', width: 120 },
            { label: 'title', prop: 'title' },
          ]"
        />
        <!-- <ExercisesKnowledges /> -->
      </el-form-item>
      <el-form-item label="显示顺序" prop="order">
        <el-input-number v-model="data.order" :step="1" />
      </el-form-item>

      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="data.state">
          <el-radio :label="true">正常</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="单元备注" prop="remark">
        <el-input
          v-model="data.intro"
          style="width: 500px"
          type="textarea"
          aria-placeholder="请输入单元备注"
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
  import { add } from '@/api/lesson'
  import { getList as getLessType } from '@/api/lessonType'
  import { useRoute } from 'vue-router'
  const $baseMessage = inject('$baseMessage')

  const emit = defineEmits(['fetch-data'])

  const data = reactive({
    // id: '',
    title: '教学单元标题1', // 标题
    intro: '教学单元的内容是这样的', // 介绍
    cover: '', // 封面
    targetOne: '目标1',
    targetTwo: '目标12',
    targetThree: '目标123',
    focus: '教学重点是', // 教学重点
    difficulty: '教学难点是', // 教学难点
    flowOne: '教学流程1', // 教学流程1
    flowTwo: '教学流程2', // 教学流程2
    flowThree: '教学流程3', // 教学流程3
    flowFour: '教学流程4', // 教学流程4
    duration: 60, // 教学时长
    order: 0, // 顺序
    ppt: '',
    remark: '备注', //
    lessonTypeID: '', // 教学分类类型ID
    state: true, // boolean
    productIDs: [],
    knowledgeIDs: [],
    questionIDs: [],
  })
  const curSubject = ref<any>({})
  onMounted(async () => {
    // 获取id
    const id = useRoute().query.id as string
    console.log('id', id)
    if (id) {
      const res = await getLessType({ id })
      console.log('res', res)
      data.lessonTypeID = id * 1
      curSubject.value = {
        id: res.data.subject.id,
        title: res.data.subject.title,
      }
    }
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
    await add(data)
    $baseMessage('添加成功', 'success', 'vab-hey-message-success')
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
