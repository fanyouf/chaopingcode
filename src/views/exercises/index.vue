<template>
  <section class="section">
    <vab-card class="page-header" shadow="never">
      <!-- <my-radio
            v-model="formData.subjectId"
            label="所属科目"
            :list="subjectList"
          /> -->
      <my-radio-subject v-model="formData.subject" />

      <my-radio-competition v-model="formData.subject" />

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

      <my-radio-level v-model="formData.level" all />

      <my-knowledges :subject="formData.subject" />
      <my-directives :subject="formData.subject" />
      <div class="m1">
        <label for="">关键字:</label>
        &nbsp;&nbsp;
        <el-input v-model="formData.keyword" style="width: 200px" />
        &nbsp;&nbsp;
        <el-button type="success" @click="search">搜索</el-button>
      </div>
    </vab-card>

    <paperCart
      :cart-list="cartList"
      :subject="formData.subject"
      @moveout="hMoveout"
      @moveoutall="hMoveoutAll"
    />
    <vab-card
      v-for="item in exerciseList"
      :key="item.id"
      class="section-item"
      :body-style="{ padding: '0px' }"
      shadow="never"
    >
      <div class="header">
        <label style="margin-right: 20px">
          <el-tag size="small" type="success">
            {{ CONST_LEVEL[item.level] }}
          </el-tag>
          <el-tag size="small" type="warning">
            {{ CONST_EX_TYPE[item.type] }}
          </el-tag>
        </label>
        <div>{{ item.title }}</div>
        <!-- &nbsp; &nbsp;
        <el-button
          size="small"
          :icon="Edit"
          type="primary"
          @click="hEdit(item.id)"
        />
        <el-button
          size="small"
          :icon="Delete"
          type="danger"
          @click="hDel(item.id)"
        />
        <el-button
          v-if="!item.inCart"
          size="small"
          type="primary"
          :icon="Plus"
          @click="hAddtoCart(item)"
        />
        <el-button
          v-else
          size="small"
          type="success"
          @click="hRemoveFromCart(item)"
        >
          移出试题篮
        </el-button> -->
      </div>
      <exercisesContentBody>
        <div v-if="item.type === 'single' || item.type === 'multi'">
          <contentBody :content="item.contentSelect.body" />
          <div v-for="i in item.contentSelect.optionLen" :key="i" class="flex1">
            <label>{{ String.fromCharCode(64 + i) }}.</label>
            <div
              v-html="
                item.contentSelect['option' + String.fromCharCode(64 + i)]
              "
            ></div>
          </div>
          <div>
            <label>答案</label>
            {{ getSelectOptionCode(item.contentSelect.answer) }}
          </div>
        </div>
        <div v-else-if="item.type === 'answer'">
          <div v-html="item.contentAnswer.body"></div>
          <el-collapse>
            <el-collapse-item title="答案" name="1">
              <div>
                {{ item.contentAnswer.ans }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div v-else-if="item.type === 'judge'">
          <div v-html="item.contentJudge.body"></div>
        </div>
        <div v-else-if="item.type === 'code'">
          <div v-html="item.contentCode.body"></div>
        </div>
      </exercisesContentBody>
      <div class="m-top1">
        <el-button
          size="small"
          :icon="Edit"
          type="primary"
          @click="hEdit(item.id)"
        />
        <el-button
          size="small"
          :icon="Delete"
          type="danger"
          @click="hDel(item.id)"
        />
        <el-button
          v-if="!item.inCart"
          size="small"
          type="primary"
          :icon="Plus"
          @click="hAddtoCart(item)"
        />
        <el-button
          v-else
          size="small"
          type="success"
          @click="hRemoveFromCart(item)"
        >
          移出试题篮
        </el-button>
      </div>
    </vab-card>

    <div class="m1">
      <my-pagination v-model="cond" :fetch-data="search" />
    </div>
  </section>
</template>
<script setup lang="ts">
  import { Delete, Edit, Plus } from '@element-plus/icons-vue'
  import paperCart from './components/paper-cart.vue'
  import { getSelectOptionCode } from '@/utils'
  import { CONST_EX_TYPE, CONST_LEVEL } from '~/src/constant'
  import { getList as getExerciseList, doDelete } from '@/api/exercise'
  import { gp } from '@gp'
  import MyRadio from '~/src/components/my-radio.vue'
  import MyKnowledges from '~/src/components/my-knowledges.vue'
  import exercisesContentBody from './components/exercises-content-body.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const formData = reactive({
    subject: { id: null, title: '' },
    productGroupID: null,
    courses: null, // 默认学科是 全部 。表示不用传过去
    level: 'medium',
    keyword: '', // 关键字
  })
  const cond = ref({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  })

  const isShowMore = ref(false)
  const toggle = () => {
    isShowMore.value = !isShowMore.value
  }
  const cartList = ref([])
  // 添加到试题篮
  const hAddtoCart = (item) => {
    item.inCart = true
    cartList.value.push(item)
  }
  const hMoveoutAll = () => {
    cartList.value.forEach((it, idx) => {
      const item = exerciseList.value.find((i) => i.id === it.id)
      item.inCart = false
    })
    cartList.value = []
  }
  const hMoveout = (it) => {
    const item = exerciseList.value.find((i) => i.id === it.id)
    item.inCart = false

    const idx = cartList.value.find((i) => i.id === it.id)
    cartList.value.splice(idx, 1)
  }
  const hRemoveFromCart = (item) => {
    item.inCart = false
    cartList.value.splice(cartList.value.indexOf(item), 1)
  }

  onMounted(() => {
    search()
  })

  const search = async () => {
    // 查询条件

    const { data } = await getExerciseList({
      ...cond.value,
    })
    exerciseList.value = data.list
    cond.value.total = data.total
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

  const hDel = (id) => {
    gp.$baseConfirm('你确定要删除当前项吗', null, async () => {
      // emit('del-container', item)
      await doDelete(id)
      gp.$baseMessage('删除成功', 'success')
      search()
    })
  }

  const hEdit = (id) => {
    router.push(`/exercises/edit/${id}`)
  }
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
