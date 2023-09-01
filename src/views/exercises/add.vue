<template>
  <section class="competition-add-container">
    <h3>添加习题</h3>
    <el-form ref="formRef" label-width="66px" :model="data" :rules="rules">
      <el-form-item label="习题编号" prop="code">
        <el-input
          v-model="data.code"
          style="width: 500px"
          aria-placeholder="请输入习题统一编号"
        />
      </el-form-item>
      <el-form-item label="习题名称" prop="name">
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
      <el-form-item label="习题难度" prop="diff">
        <el-radio-group v-model="data.diff">
          <el-radio label="简单">简单</el-radio>
          <el-radio label="中等">中等</el-radio>
          <el-radio label="困难">困难</el-radio>
          <el-radio label="挑战">挑战</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="选择赛事" prop="netpage">
        <ExercisesCompetitionSelect v-model="data.competition" />
      </el-form-item>
      <el-form-item label="习题类型" prop="diff">
        <el-radio-group v-model="data.type">
          <el-radio label="单选题">单选题</el-radio>
          <el-radio label="多选题">多选题</el-radio>
          <el-radio label="判断题">判断题</el-radio>
          <el-radio label="问答题">问答题</el-radio>
          <el-radio label="编程题">编程题</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题干部分" prop="subjectContent">
        <ExercisesInput v-model="data.ans" />
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
      <el-form-item v-if="visibles['简答']" label="参考答案" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入习题简介"
        />
      </el-form-item>

      <el-form-item label="相关知识" prop="knowledges">
        <my-input-dialog
          v-model="data.anss"
          name="知识"
          getapiname="name"
          :getapi="getList"
          :columns="[
            { label: '知识点1', prop: 'name', width: 120 },
            { label: 'title', prop: 'title' },
          ]"
        />
      </el-form-item>

      <el-form-item label="相关指令" prop="directives">
        <!-- <el-input v-model="data.directives" style="width: 500px" /> -->
        <my-input-dialog
          v-model="data.anss"
          name="相关指令"
          getapiname="name"
          :getapi="getList"
          :columns="[
            { label: '知识点1', prop: 'name', width: 120 },
            { label: 'title', prop: 'title' },
          ]"
        />
      </el-form-item>

      <el-form-item label="文本讲解" prop="remark">
        <el-input
          v-model="data.intro"
          style="width: 500px"
          type="textarea"
          aria-placeholder="请输入文本讲解"
        />
      </el-form-item>

      <el-form-item label="视频讲解" prop="netpage">
        <el-input
          v-model="data.netpage"
          placeholder="请输入视频讲解的url地址"
          style="width: 500px"
        >
          <template #prepend>http://</template>
        </el-input>
      </el-form-item>

      <el-form-item label="习题备注" prop="remark">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入习题备注"
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
  import ExercisesInput from './components/exercises-input.vue'
  import ExercisesAnsArea from './components/exercises-ans-area.vue'
  import ExercisesKnowledges from './components/exercises-knowledges.vue'
  import ExercisesCompetitionSelect from './components/exercises-competition-select.vue'
  import { doAdd as doAddCourse } from '@/api/course'
  import { getList } from '@/api/knowledge'
  const $baseMessage = inject('$baseMessage')

  const emit = defineEmits(['fetch-data'])

  const data = reactive({
    // id: '',
    title: '', // 习题名称
    code: '',
    diff: '简单',
    intro: '', // 介绍
    logo: '', //
    remark: '备注', // 备注
    competition: {},
    type: '单选题',
    ans: '正确',
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

  const visibles = computed(() => {
    if (data.type === '单选题') {
      return { 单选: true, 选择项: true }
    } else if (data.type === '多选题') {
      return { 多选: true, 选择项: true }
    } else if (data.type === '判断题') {
      return { 判断: true }
    } else if (data.type === '问答题') {
      return { 简答: true }
    } else {
      return {}
    }
  })
  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)
  const visible = ref(false)
  const state = reactive<{ opName: OPType; objectName: OPObject }>({
    opName: '添加', // 操作方式的名字： 编辑 or 添加
    objectName: '赛事', // 操作对象的类型: 目录 or 知识点
  })

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
</script>

<style lang="scss" scoped>
  footer {
    // padding-left: 66px;
  }
  .competition-add-container {
    padding: 1em 0;
  }
</style>
