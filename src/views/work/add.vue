<template>
  <section class="competition-add-container">
    <h3>{{ route.params.id ? '编辑' : '添加' }}作品</h3>
    <el-form ref="formRef" label-width="80px" :model="data" :rules="rules">
      <el-form-item label="作品名称" prop="title">
        <el-input
          v-model="data.title"
          style="width: 500px"
          aria-placeholder="请输入作品名称"
        />
      </el-form-item>
      <el-form-item label="作品编号" prop="code">
        <el-input
          v-model="data.no"
          style="width: 500px"
          aria-placeholder="请输入作品统一编号"
        />
      </el-form-item>
      <el-form-item label="选择科目" prop="subjectID">
        <my-select-subject v-model="data.subject" />
      </el-form-item>
      <el-form-item label="选择分类" prop="productGroupIDs">
        <!--  -->
        <el-cascader
          v-model="data.productGroupIDs"
          :options="workGroup"
          clearable
          style="width: 500px"
          :show-all-levels="false"
          :props="{ emitPath: false, multiple: true }"
        />
      </el-form-item>

      <el-form-item label="作品简介" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          :autosize="{ minRows: 5, maxRows: 6 }"
          aria-placeholder="请输入作品简介"
        />
      </el-form-item>
      <el-form-item label="作品亮点" prop="highlight">
        <el-input
          v-model="data.highlight"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 6 }"
          style="width: 500px"
          aria-placeholder="请输入作品亮点"
        />
      </el-form-item>
      <el-form-item label="作品图片" prop="intro">
        <my-upload-image v-model="data.cover" />
      </el-form-item>

      <el-form-item label="基础代码" prop="codeBaseUrl">
        <my-upload-file v-model="data.codeBasic" :accept="accept" />
      </el-form-item>
      <el-form-item label="参考代码" prop="codeFinishedUrl">
        <my-upload-file v-model="data.codeReference" :accept="accept" />
      </el-form-item>

      <el-form-item label="代码行数" prop="codeRowNum">
        <el-input
          v-model.number="data.codeLineNum"
          style="width: 100px"
          type="number"
        />
      </el-form-item>

      <el-form-item label="效果演示" prop="netpage">
        <el-input
          v-model="data.demoAddress"
          placeholder="请效果演示的地址"
          style="width: 500px"
        >
          <template #prepend>Http://</template>
        </el-input>
      </el-form-item>
      <my-knowledges v-model="data.knowledgeIDs" :subject="data.subject" />
      <my-directives v-model="data.directiveIDs" :subject="data.subject" />
      <el-form-item label="涉及学科" prop="subject">
        <el-checkbox-group v-model="data.courses">
          <el-checkbox
            v-for="item in SUBJECT"
            :key="item.value"
            :label="item.value"
            name="type"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="习题难度" prop="diff">
        <el-radio-group v-model="data.level">
          <el-radio label="easy">简单</el-radio>
          <el-radio label="medium">中等</el-radio>
          <el-radio label="hard">困难</el-radio>
          <el-radio label="challenge">挑战</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="注意事项" prop="subjectContent">
        <el-input
          v-model="data.note"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 6 }"
          style="width: 500px"
          aria-placeholder="请输入作品注意事项"
        />
      </el-form-item>

      <el-form-item label="作品备注" prop="remark">
        <el-input
          v-model="data.remark"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 6 }"
          style="width: 500px"
          aria-placeholder="请输入作品备注"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">
          {{ route.params.id ? '保存修改' : '确定添加' }}
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
  import { add as doAddWork, getList, put as doSaveWork } from '@/api/work'
  import { gp } from '@gp'

  import { getList as getCourseAndWorkgroup } from '@/api/course'
  import { SUBJECT } from '@/constant'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const data = reactive({
    // id: '',
    title: '飞机大战', // 标题
    no: 'xz001', // 作品编号
    intro: '用100个积木块实现一个飞机大战的游戏', // 作品介绍
    highlight: '游戏非常的好玩~~', // 作品亮点
    cover:
      'http://8.142.32.7:8888/assets/26/5f/265ff10d718a21212d24980f6149ff26.png', // 作品图片
    codeBasic: '1', // 作品基础代码
    codeReference: '1', // 作品完成代码
    codeLineNum: 10, // 代码行数
    demoAddress: 'www.baidu.com', // 效果演示地址
    productGroupIDs: [], // 作品分类
    knowledgeIDs: [], // 知识点
    subject: { id: '', title: '' }, // 科目
    directiveIDs: [], // 相关指令
    courses: ['mathematics'], // 学科
    order: 1,
    level: 'medium', // 难度
    note: '请输入注意事项', // 注意事项
    remark: '备注', // 备注
  })

  const courseAndWorkgroup = ref([])
  const workGroup = computed(() => {
    const rs = courseAndWorkgroup.value.find(
      (it) => it.value === data.subject.id
    )
    return rs ? rs.children : []
  })

  const accept = computed(() => {
    const couId = data.subject.id
    const t = courseAndWorkgroup.value.find((it) => it.value === couId)
    const label = t.label.toLowerCase()
    if (label.includes('python')) {
      return '.py'
    } else if (label.includes('c++')) {
      return '.cpp'
    } else if (label.includes('scratch')) {
      return '.sb3'
    }

    return '.py,.cpp,.sb3'
  })

  onMounted(async () => {
    const id = route.params.id
    if (!id) return
    const { data: rs } = await getList({
      id,
      withProductGroup: true,
      withKnowledge: true,
      withDirective: true,
    })
    console.log(rs)
    data.title = rs.title // 标题
    data.no = rs.no // 作品编号
    data.intro = rs.intro // 作品介绍
    data.highlight = rs.highlight // 作品亮点
    data.cover = rs.cover // 作品图片
    data.codeBasic = rs.codeBasic // 作品基础代码
    data.codeReference = rs.codeReference // 作品完成代码
    data.codeLineNum = rs.codeLineNum // 代码行数
    data.demoAddress = rs.demoAddress // 效果演示地址
    data.productGroupIDs = rs.productGroups.map((r) => r.id) // 作品分类
    data.knowledgeIDs = rs.knowledges.map((r) => r.id) // 知识点
    data.subject = { id: rs.productGroups[0].subjectID, title: '' } // 科目
    data.directiveIDs = rs.directives.map((r) => r.id) || [] // 相关指令
    data.courses = rs.courses.split() // 学科
    data.order = rs.order
    data.level = rs.level // 难度
    data.note = rs.note // 注意事项
    data.remark = rs.remark // 备注
  })

  onMounted(async () => {
    // 获取到课程和作品分组
    const { data } = await getCourseAndWorkgroup({ withProductGroup: true })

    courseAndWorkgroup.value = data.list.map((item) => {
      return {
        value: item.id,
        label: item.title,
        children: item.productGroups.map((item) => {
          return {
            value: item.id,
            label: item.title,
          }
        }),
      }
    })
  })

  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)
  const state = reactive<{ opName: OPType; objectName: OPObject }>({
    opName: '添加', // 操作方式的名字： 编辑 or 添加
    objectName: '赛事', // 操作对象的类型: 目录 or 知识点
  })
  const cTitle = computed(() => {
    return `${state.objectName}-${state.opName}`
  })
  const doSave = async () => {
    debugger
    const d = {
      ...data,
      courses: data.courses.join(','),
      productGroupIDs: data.productGroupIDs,
      directiveIDs: data.directiveIDs,
      knowledgeIDs: data.knowledgeIDs,
      subjectIDs: [data.subject.id],
    }
    delete d.subject

    if (route.params.id) {
      d.id = route.params.id * 1
      await doSaveWork(d)
      gp.$baseMessage('修改成功', 'success', 'vab-hey-message-success')
    } else {
      await doAddWork(d)
      gp.$baseMessage('添加成功', 'success', 'vab-hey-message-success')
    }

    // emit('fetch-data')
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await doSave()
        // $baseMessage(msg, 'success', 'vab-hey-message-success')
        // emit('fetch-data')
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

<style lang="scss">
  .last-check {
    li[aria-haspopup='true'] {
      .el-checkbox {
        display: none;
      }
    }
  }
</style>
