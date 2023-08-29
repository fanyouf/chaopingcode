<template>
  <section class="competition-add-container">
    <h3>添加教学单元</h3>
    <el-form ref="formRef" label-width="66px" :model="data" :rules="rules">
      <el-form-item label="单元名称" prop="name">
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
      <el-form-item label="封面图片" prop="logo">
        <my-upload-image v-model="data.logo" />
      </el-form-item>
      <el-form-item label="教学单元目标">
        <el-tabs type="border-card">
          <el-tab-pane label="知识与技能">
            <my-wang-editor />
          </el-tab-pane>
          <el-tab-pane label="过程与方法">
            <my-wang-editor />
          </el-tab-pane>
          <el-tab-pane label="情感态度与价值观">
            <my-wang-editor />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="教学重点" prop="keypoints">
        <el-input
          v-model="data.keypoints"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入教学重点"
        />
      </el-form-item>
      <el-form-item label="教学难点" prop="diffpoints">
        <el-input
          v-model="data.diffpoints"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入教学难点"
        />
      </el-form-item>
      <el-form-item label="相关知识" prop="knowledges">
        <ExercisesKnowledges />
      </el-form-item>
      <el-form-item label="建议时长" prop="time">
        <el-input-number v-model="data.time" :step="1" />
      </el-form-item>
      <el-form-item label="教学流程">
        <el-tabs type="border-card">
          <el-tab-pane label="1.情景引入">
            <my-wang-editor />
          </el-tab-pane>
          <el-tab-pane label="2.思维构建">
            <my-wang-editor />
          </el-tab-pane>
          <el-tab-pane label="3.创作实践">
            <my-wang-editor />
          </el-tab-pane>
          <el-tab-pane label="4.总结与思考">
            <my-wang-editor />
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="选用作品" prop="knowledges">
        <my-input-dialog
          v-model="data.anss"
          name="作品"
          getapiname="name"
          :getapi="getList"
          :columns="[
            { label: '知识点1', prop: 'name', width: 120 },
            { label: 'title', prop: 'title' },
          ]"
        />
      </el-form-item>
      <el-form-item label="课后练习" prop="knowledges">
        <my-input-dialog
          v-model="data.anss"
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

      <el-form-item label="状态" prop="diff">
        <el-radio-group v-model="data.diff">
          <el-radio label="正常">正常</el-radio>
          <el-radio label="停用">停用</el-radio>
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
    {{ data.ans }}
  </section>
</template>

<script setup lang="ts">
  import ExercisesKnowledges from './components/exercises-knowledges.vue'
  import { doAdd as doAddCourse } from '@/api/course'
  import { getList } from '@/api/subject'
  const $baseMessage = inject('$baseMessage')

  const emit = defineEmits(['fetch-data'])

  const data = reactive({
    // id: '',
    title: '测试标题', // 标题
    code: '',
    diff: '',
    intro: '', // 介绍
    logo: '', //
    remark: '备注', // 备注
    competition: {},
    type: '',
    ans: '',
    anss: [],
    knowledges: '',
    directives: '',
    netpage: 'www.baidu.com',
    state: true, // boolean
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
