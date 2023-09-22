<template>
  <el-dialog
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="添加试卷"
    width="500px"
    @close="close"
  >
    <el-form ref="formRef" label-width="66px" :model="data" :rules="rules">
      <el-form-item label="试卷名称" prop="name">
        <el-input
          v-model="data.title"
          style="width: 500px"
          aria-placeholder="请输入试卷名称"
        />
      </el-form-item>
      <el-form-item label="试卷简介" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入试卷简介"
        />
      </el-form-item>
      <el-form-item label="封面图片" prop="logo">
        <my-upload-image v-model="data.logo" />
      </el-form-item>
      <el-form-item label="试卷难度" prop="diff">
        <!-- <el-radio-group v-model="data.diff">
          <el-radio label="简单">简单</el-radio>
          <el-radio label="中等">中等</el-radio>
          <el-radio label="困难">困难</el-radio>
          <el-radio label="挑战">挑战</el-radio>
        </el-radio-group> -->
        <my-level v-model="data.diff" />
      </el-form-item>
      <el-form-item label="选择赛事" prop="explainVideo">
        <ExercisesCompetitionSelect v-model="data.competition" />
      </el-form-item>

      <el-form-item label="建议时长" prop="time">
        <el-input-number v-model="data.time" :step="1" />
      </el-form-item>
      <el-form-item label="试卷类型" prop="knowledges">
        <ExercisesKnowledges />
      </el-form-item>

      <el-form-item label="显示顺序" prop="order">
        <el-input-number v-model="data.order" :step="1" />
      </el-form-item>

      <el-form-item label="备注信息" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入试卷简介"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">下一步</el-button>
        <el-button @click="close">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import ExercisesCompetitionSelect from './exercises-competition-select.vue'

  import ExercisesKnowledges from './exercises-knowledges.vue'
  const $baseMessage = inject('$baseMessage')

  const emit = defineEmits(['change-step'])
  const visible = ref(false)
  const showDialog = () => {
    visible.value = true
  }

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
    time: 90,
    order: 1,
  })

  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)
  const state = reactive<{ opName: OPType; objectName: OPObject }>({
    opName: '添加', // 操作方式的名字： 编辑 or 添加
    objectName: '赛事', // 操作对象的类型: 目录 or 知识点
  })

  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }

  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        emit('change-step', 1, data)
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
