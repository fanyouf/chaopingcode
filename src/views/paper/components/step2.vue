<template>
  <section class="competition-add-container">
    <h3>添加试卷第2步</h3>
    <p>第14届蓝桥杯8月份STEM测评</p>
    <p>所属分类：xxx</p>
    <p>试卷类型：真题</p>
    <div>
      <el-row>
        <el-col :span="6">
          <el-tree />
        </el-col>
        <el-col :span="18">11</el-col>
      </el-row>
    </div>

    <div class="pay-button-group">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handlePrev">上一步</el-button>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { doAdd as doAddCourse } from '@/api/course'
  const $baseMessage = inject('$baseMessage')

  const emit = defineEmits(['change-step'])

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
  const handleSubmit = () => {
    state['formRef'].validate((valid) => {
      if (valid) {
        setTimeout(() => {
          emit('change-step', 2)
        }, 2000)
      }
    })
  }
  const handlePrev = () => {
    emit('change-step', 0)
  }

  const formRef = ref(null)
  const visible = ref(false)
  const state = reactive<{ opName: OPType; objectName: OPObject }>({
    opName: '添加', // 操作方式的名字： 编辑 or 添加
    objectName: '赛事', // 操作对象的类型: 目录 or 知识点
  })
</script>

<style lang="scss" scoped>
  footer {
    // padding-left: 66px;
  }
  .competition-add-container {
    padding: 1em 0;
  }
</style>
