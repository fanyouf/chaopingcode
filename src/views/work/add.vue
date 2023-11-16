<template>
  <section class="competition-add-container">
    <h3>添加作品</h3>
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

      <el-form-item label="科目与分类" prop="productGroupIDs">
        <!--  -->
        <el-cascader
          v-model="data.productGroupIDs"
          :options="courseAndWorkgroup"
          clearable
          style="width: 500px"
        />
      </el-form-item>

      <el-form-item label="作品简介" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入作品简介"
        />
      </el-form-item>
      <el-form-item label="作品亮点" prop="highlight">
        <el-input
          v-model="data.highlight"
          type="textarea"
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
      <my-knowledges v-model="data.knowledgeIDs" :subject="curSubject" />
      <!-- <el-form-item label="相关知识点" prop="knowledges">
        <el-cascader
          v-model="data.knowledgeIDs"
          popper-class="last-check"
          :options="knowledges"
          clearable
          style="width: 500px"
          :props="{ multiple: true, checkStrictly: true }"
        />
      </el-form-item> -->
      <my-directives v-model="data.directiveIDs" :subject="curSubject" />

      <!-- <el-form-item label="相关指令" prop="directives">
        
        <el-cascader
          v-model="data.directiveIDs"
          :options="directives"
          clearable
          style="width: 500px"
          :props="{ multiple: true }"
        />
      </el-form-item> -->

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
        <ExercisesInput v-model="data.note" />
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
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
  import ExercisesInput from './components/exercises-input.vue'
  import { add as doAddWork } from '@/api/work'
  import { gp } from '@gp'

  import { getList as getCourseAndWorkgroup } from '@/api/course'
  import { SUBJECT } from '@/constant'
  const data = reactive({
    // id: '',
    title: '飞机大战', // 标题
    no: 'xz001', // 作品编号
    intro: '用100个积木块实现一个飞机大战的游戏', // 作品介绍
    highlight: '游戏非常的好玩~~', // 作品亮点
    cover: '', // 作品图片
    codeBasic: '1', // 作品基础代码
    codeReference: '1', // 作品完成代码
    codeLineNum: 10, // 代码行数
    demoAddress: 'www.baidu.com', // 效果演示地址
    productGroupIDs: [], // 作品分类
    knowledgeIDs: [], // 知识点
    subjectIDs: [], // 科目
    directiveIDs: [], // 相关指令
    courses: ['mathematics'], // 学科
    order: 1,
    level: 'medium', // 难度
    note: '1', // 注意事项
    remark: '备注', // 备注
  })

  const courseAndWorkgroup = ref([])
  const curSubject = ref({})
  watch(
    () => data.productGroupIDs,
    (val) => {
      if (!val) {
        curSubject.value = {}
        return
      }

      const curCourse = courseAndWorkgroup.value.find(
        (it) => it.value === data.productGroupIDs[0]
      )
      curSubject.value = {
        id: curCourse.value,
        title: curCourse.label,
      }
    }
  )

  const accept = computed(() => {
    if (data.productGroupIDs && data.productGroupIDs.length > 0) {
      const couId = data.productGroupIDs[0]
      const t = courseAndWorkgroup.value.find((it) => it.value === couId)
      const label = t.label.toLowerCase()
      if (label.includes('python')) {
        return '.py'
      } else if (label.includes('c++')) {
        return '.cpp'
      } else if (label.includes('scratch')) {
        return '.sb3'
      }
    }
    return '.py,.cpp,.sb3'
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
    const d = {
      ...data,
      courses: data.courses.join(','),
      productGroupIDs: [data.productGroupIDs.pop()],
      directiveIDs: data.directiveIDs,
      knowledgeIDs: data.knowledgeIDs,
    }
    await doAddWork(d)
    gp.$baseMessage('添加成功', 'success', 'vab-hey-message-success')
    // emit('fetch-data')
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await doSave()
        // $baseMessage(msg, 'success', 'vab-hey-message-success')
        // emit('fetch-data')
        close()
      }
    })
  }

  // const buildKnowledge = async (subjectID: number) => {
  //   // 获取对应的知识点
  //   const { data } = await getKnowledge({
  //     subjectID,
  //     withKnowledge: true,
  //   })

  //   debugger
  //   const curCourse = courseAndWorkgroup.value.find(
  //     (it) => it.value === subjectID
  //   )

  //   const res = [
  //     {
  //       value: curCourse.value,
  //       label: curCourse.label,
  //       children: data.list.map((item) => {
  //         return {
  //           value: item.id,
  //           label: item.title,
  //           children: item.knowledge.map((item) => {
  //             return {
  //               value: item.id,
  //               label: item.title,
  //             }
  //           }),
  //         }
  //       }),
  //     },
  //   ]

  //   knowledges.value = res
  // }
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
