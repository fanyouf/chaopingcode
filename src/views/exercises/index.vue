<template>
  <section class="section">
    <vab-card class="page-header" shadow="never">
      <!-- <my-radio
            v-model="formData.subjectId"
            label="所属科目"
            :list="subjectList"
          /> -->
      <my-radio-subject v-model="formData.subjectId" />

      <my-radio-competition v-model="formData.subjectId" />

      <my-radio
        v-model="formData.courses"
        label="题目类型"
        :list="[
          { id: null, title: '全部' },
          // 'single' | 'multiple' | 'judge' | 'answer' | 'code'
          {
            id: 'single',
            title: '单选题',
          },
          {
            id: 'multiple',
            title: '多选题',
          },
          {
            id: 'judge',
            title: '判断题',
          },
          {
            id: 'answer',
            title: '简答题',
          },
          {
            id: 'code',
            title: '代码题',
          },
        ]"
      />

      <hr />
      <div class="items-container">
        <label for="">关键字:</label>
        <el-input v-model="formData.keyword" style="width: 200px" />
        &nbsp; &nbsp;
        <label for="">难度:</label>
        <el-select v-model="formData.level">
          <el-option label="全部" :value="null">全部</el-option>
          <el-option label="简单" value="easy">简单</el-option>
          <el-option label="中等" value="medium">中等</el-option>
          <el-option label="困难" value="hard">困难</el-option>
          <el-option label="挑战" value="challenge">挑战</el-option>
        </el-select>
        &nbsp; &nbsp;
        <my-knowledges :subject="curSubject" />
        <my-directives :subject="curSubject" />
        <el-button type="success" @click="search">搜索</el-button>
      </div>
    </vab-card>

    <vab-card
      v-for="item in exerciseList"
      :key="item.id"
      class="section-item"
      :body-style="{ padding: '0px' }"
      shadow="never"
    >
      <div class="header">
        <h3>{{ item.title }}</h3>
        <span>{{ CONST_LEVEL[item.level] }}</span>
        <span>{{ CONST_EX_TYPE[item.type] }}</span>
      </div>

      <div
        v-if="item.type === 'single' || item.type === 'multi'"
        class="section-item-body"
      >
        <div v-html="item.contentSelect.body"></div>
        <div v-for="i in item.contentSelect.optionLen" :key="i">
          {{ String.fromCharCode(64 + i) }}.
          <div
            v-html="item.contentSelect['option' + String.fromCharCode(64 + i)]"
          ></div>
        </div>
        <div>
          <label>答案</label>
          {{ getSelectOptionCode(item.contentSelect.answer) }}
        </div>
      </div>
      <div v-if="item.type === 'answer'" class="section-item-body">
        <div v-html="item.contentAnswer.body"></div>
        <el-collapse>
          <el-collapse-item title="答案" name="1">
            <div>
              {{ item.contentAnswer.ans }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div v-if="item.type === 'judge'" class="section-item-body">
        <div v-html="item.contentJudge.body"></div>
      </div>
      <div>
        <el-button type="primary" @click="hEdit(item.id)">修改</el-button>
        <el-button type="danger" @click="hDel(item.id)">删除</el-button>
        <el-button type="danger" @click="hAdd(item.id)">加试题篮</el-button>
      </div>
    </vab-card>
  </section>
</template>
<script setup lang="ts">
  import { getSelectOptionCode } from '@/utils'
  import { CONST_EX_TYPE, CONST_LEVEL } from '~/src/constant'
  import { getList as getExerciseList } from '@/api/exercise'
  import { gp } from '@gp'
  import MyRadio from '~/src/components/my-radio.vue'
  import MyKnowledges from '~/src/components/my-knowledges.vue'

  const formData = reactive({
    subjectId: null,
    productGroupID: null,
    courses: null, // 默认学科是 全部 。表示不用传过去
    level: 'medium',
    keyword: '', // 关键字
  })

  const curSubject = ref({})
  watch(
    () => formData.subjectId,
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
  onMounted(() => {
    search()
  })

  const search = async () => {
    // 查询条件
    const d = {}
    const { data } = await getExerciseList(d)
    exerciseList.value = data.list
  }
  // const hDel = (id) => {
  //   gp.$baseConfirm('你确定要删除当前项吗', null, async () => {
  //     await delWork(id)
  //     gp.$baseMessage('删除成功')
  //     search()
  //   })
  // }
  const subjectList = ref<Subject[]>([])
  const exerciseList = ref<Work[]>([])

  const cateList = computed(() => {
    const t = subjectList.value.find((item) => {
      console.log(item.id, formData.subjectId)
      return item.id === formData.subjectId
    })
    const res = [{ title: '全部', id: -1 }]
    if (t && t.productGroups) {
      res.push(...t.productGroups)
    }
    return res
  })

  // const hDel = (item) => {
  //   if (
  //     item.children?.length ||
  //     item.directives?.length ||
  //     item.knowledge?.length
  //   ) {
  //     $baseMessage('还有子项，不能删除', 'error', 'vab-hey-message-error')
  //     return
  //   }

  //   $baseConfirm('你确定要删除当前项吗', null, () => {
  //     emit('del-container', item)
  //   })
  // }
</script>
<style lang="scss" scoped>
  .section {
    background-color: #f6f8f9;
  }
  .section-item {
    padding: 1em;
    border: none !important;
  }
  .header {
    display: flex;
    align-items: center;
  }
</style>
