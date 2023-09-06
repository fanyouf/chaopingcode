<template>
  <section class="competition-add-container">
    <h3>添加习题</h3>
    <el-form ref="formRef" label-width="80px" :model="data" :rules="rules">
      <el-form-item label="科目" prop="subjectId">
        <el-select v-model="data.subjectId">
          <el-option
            v-for="item in subjectList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
            {{ item.title }}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="习题编号" prop="no">
        <el-input
          v-model="data.no"
          style="width: 500px"
          aria-placeholder="请输入习题统一编号"
        />
      </el-form-item>
      <el-form-item label="习题名称" prop="title">
        <el-input
          v-model="data.title"
          style="width: 500px"
          aria-placeholder="请输入习题名称"
        />
      </el-form-item>
      <el-form-item label="习题简介" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入习题简介"
        />
      </el-form-item>

      <el-form-item label="难度" prop="level">
        <el-radio-group v-model="data.level">
          <el-radio label="easy">简单</el-radio>
          <el-radio label="medium">中等</el-radio>
          <el-radio label="hard">困难</el-radio>
          <el-radio label="challenge">挑战</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="选择赛事" prop="explainVideo">
        <ExercisesCompetitionSelect v-model="data.competition" />
      </el-form-item>
      <el-form-item label="习题类型" prop="diff">
        <el-radio-group v-model="data.type">
          <el-radio label="single">单选题</el-radio>
          <el-radio label="multi">多选题</el-radio>
          <el-radio label="judge">判断题</el-radio>
          <el-radio label="answer">问答题</el-radio>
          <el-radio label="code">编程题</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题干部分" prop="body">
        <ExercisesInput v-model="data.body" />
      </el-form-item>
      <el-form-item
        v-if="visibles['选择项']"
        label="答案选项"
        prop="subjectContent"
      >
        <ExercisesAnsArea v-model="data.ans" :multi="visibles['多选']" />
      </el-form-item>
      <el-form-item v-if="visibles['单选']" label="单选答案" prop="diff">
        <el-radio-group v-model="data.ans">
          <el-radio label="A">A</el-radio>
          <el-radio label="B">B</el-radio>
          <el-radio label="C">C</el-radio>
          <el-radio label="D">D</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="visibles['多选']" label="多选答案" prop="diff">
        <el-checkbox-group v-model="data.anss">
          <el-checkbox label="A" name="A" />
          <el-checkbox label="B" name="B" />
          <el-checkbox label="C" name="C" />
          <el-checkbox label="D" name="D" />
          <el-checkbox label="E" name="E" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="visibles['判断']" label="判断答案" prop="diff">
        <el-radio-group v-model="data.ans">
          <el-radio label="正确">正确</el-radio>
          <el-radio label="错误">错误</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="visibles['简答']" label="参考答案" prop="answer">
        <el-input
          v-model="data.answer"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入习题简介"
        />
      </el-form-item>

      <my-knowledges v-model="data.knowledgeIDs" :subject="curSubject" />
      <my-directives v-model="data.directiveIDs" :subject="curSubject" />

      <el-form-item label="文本讲解" prop="explainText">
        <el-input
          v-model="data.explainText"
          style="width: 500px"
          type="textarea"
          aria-placeholder="请输入文本讲解"
        />
      </el-form-item>

      <el-form-item label="视频讲解" prop="explainVideo">
        <el-input
          v-model="data.explainVideo"
          placeholder="请输入视频讲解的url地址"
          style="width: 500px"
        >
          <template #prepend>http://</template>
        </el-input>
      </el-form-item>

      <el-form-item label="习题备注" prop="remark">
        <el-input
          v-model="data.remark"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入习题备注"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
  import ExercisesInput from './components/exercises-input.vue'
  import ExercisesAnsArea from './components/exercises-ans-area.vue'
  import ExercisesKnowledges from './components/exercises-knowledges.vue'
  import ExercisesCompetitionSelect from './components/exercises-competition-select.vue'
  import { getList as getSubject } from '@/api/subject'
  import { doAdd } from '@/api/exercise'
  const $baseMessage = inject('$baseMessage')

  const data = reactive({
    // id: '',
    subjectId: '',
    title: '习题名称11', // 习题名称
    no: 'zj001',
    intro: '习题介绍',
    level: 'easy',
    answer: '参考答案',
    body: '',
    explainText: '', // 文字讲解
    explainVideo: 'www.baidu.com', // 视频讲解
    remark: '备注', // 备注
    competition: {},
    type: 'single',
    contentAnswer: {
      body: '问答题题干',
      answer: '问答题答案',
    },
    contentCode: {
      body: '编码题题干',
      answer: '问答题答案',
    },
    contentJudge: {
      body: '判断题题干',
      answer: '',
    },
    contentSelect: {
      body: '选择题干',
      optionA: 'choose A',
      optionB: 'choose B',
      optionLen: 2,
      answer: 3,
    }, //单选，多选题内容
    knowledgeIDs: '',
    directiveIDs: '',
    state: true, // boolean
  })

  // setTimeout(() => {
  //   data.remark = 'ajax数据'
  //   console.log('ajax数据')
  // }, 5000)
  const subjectList = ref([])
  onMounted(async () => {
    // 获取到课程
    const { data } = await getSubject()
    subjectList.value = data.list.map((item) => {
      return {
        id: item.id,
        title: item.title,
      }
    })
  })

  const curSubject = ref({})
  watch(
    () => data.subjectId,
    (val) => {
      if (!val) {
        curSubject.value = {}
        return
      }

      const curCourse = subjectList.value.find((it) => it.id === val)
      curSubject.value = {
        value: curCourse.id,
        label: curCourse.title,
      }
    }
  )

  const visibles = computed(() => {
    if (data.type === 'single') {
      return { 单选: true, 选择项: true }
    } else if (data.type === 'multi') {
      return { 多选: true, 选择项: true }
    } else if (data.type === 'judge') {
      return { 判断: true }
    } else if (data.type === 'answer') {
      return { 简答: true }
    } else {
      return {}
    }
  })
  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)

  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }
  const doSave = async (data) => {
    const d = {
      ...data,
      competitionID: data.competitionId,
      labelValueIDs: data.labelValueIds,
    }
    delete d.competition
    delete d.body
    delete d.answer

    await doAdd(d)
    $baseMessage('添加成功', 'success', 'vab-hey-message-success')
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await doSave(data)
      }
    })
  }
</script>

<style lang="scss" scoped>
  footer {
    // padding-left: 66px;
  }
  .competition-add-container {
    padding: 1em 0;
  }
</style>
