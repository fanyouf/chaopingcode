<template>
  <el-dialog
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="添加课程"
    width="700px"
    @close="close"
  >
    <el-form ref="formRef" label-width="66px" :model="data" :rules="rules">
      <el-form-item label="科目" prop="subjectID">
        <my-select-subject v-model="data.subject" />
      </el-form-item>
      <el-form-item label="课程名称" prop="name">
        <el-input
          v-model="data.title"
          style="width: 500px"
          aria-placeholder="请输入课程名称"
        />
      </el-form-item>
      <el-form-item label="课程简介" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入课程简介"
        />
      </el-form-item>
      <el-form-item label="封面图片" prop="cover">
        <my-upload-image v-model="data.cover" />
      </el-form-item>
      <el-form-item label="课程难度" prop="level">
        <my-level v-model="data.level" />
      </el-form-item>

      <el-form-item label="建议时长" prop="duration">
        <el-input-number v-model="data.duration" :step="1" />
      </el-form-item>
      <el-form-item label="课程类型" prop="knowledges">
        <my-select-coursetype v-model="data.lessonGroupType" />
      </el-form-item>

      <el-form-item label="显示顺序" prop="order">
        <el-input-number v-model="data.order" :step="1" />
      </el-form-item>

      <el-form-item label="备注信息" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入课程简介"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="close">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import { add } from '@/api/lessonGroup'
  import { gp } from '@gp'

  const props = defineProps<{
    listDetail: any[]
    lessonGroupId: string | number
  }>()

  const emit = defineEmits(['add-paper-ok'])
  const visible = ref(false)
  const showDialog = () => {
    visible.value = true
  }

  const data = reactive({
    // id: '',
    paperType: { id: 1 },
    subject: { id: 1 },
    title: '常规班', // 标题
    intro: '按年的48课时的常规班', // 介绍
    lessonGroupType: { id: -1 },
    duration: 100,
    cover: '', // 封面
    remark: '备注', // 备注
    order: 1,
  })

  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)

  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }

  const doSave = async () => {
    const res = await add({
      lessonIDs: props.listDetail.map((it) => it.id),
      // lessonGroupId: props.lessonGroupId,
      lessonGroupTypeID: data.lessonGroupType.id,
      title: data.title,
      intro: data.intro,
      cover: data.cover,
      level: data.level,
      duration: data.duration,
      order: data.order,
      remark: data.remark,
      subjectID: data.subject.id,
      withLessons: true,
    })
    gp.$baseMessage('添加试卷成功', 'success')
    visible.value = false
    emit('add-paper-ok')

    gp.$baseConfirm('要看看课程的详情吗?', null, () => {
      window.open(`/#/course/detail?id=${res.data.id}`)
    })
  }

  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        doSave()
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
